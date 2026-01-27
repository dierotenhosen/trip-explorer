import firebase_admin
from firebase_admin import auth, credentials
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import os
from typing import Optional

from database import get_db
from models import User

# Initialize Firebase Admin SDK
if not firebase_admin._apps:
    try:
        # Try to use service account credentials from environment variable
        service_account_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
        if service_account_path and os.path.exists(service_account_path):
            cred = credentials.Certificate(service_account_path)
            firebase_admin.initialize_app(cred)
        else:
            # Try Application Default Credentials
            cred = credentials.ApplicationDefault()
            firebase_admin.initialize_app(cred)
    except Exception as e:
        print(f"Warning: Firebase initialization failed: {e}")
        print("Please ensure GOOGLE_APPLICATION_CREDENTIALS is set or ADC is configured")
        # In development, you might want to initialize without credentials
        # firebase_admin.initialize_app()

security = HTTPBearer()

class AuthenticatedUser:
    def __init__(self, user: User, firebase_uid: str, email: str):
        self.user = user
        self.firebase_uid = firebase_uid
        self.email = email

async def verify_firebase_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """
    Verify Firebase ID token and return decoded token.
    """
    try:
        # Verify the ID token
        decoded_token = auth.verify_id_token(credentials.credentials)
        return decoded_token
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )

async def get_current_user(
    token_data: dict = Depends(verify_firebase_token),
    db: Session = Depends(get_db)
) -> AuthenticatedUser:
    """
    Get or create user from Firebase token data.
    """
    firebase_uid = token_data.get("uid")
    email = token_data.get("email")
    display_name = token_data.get("name")
    
    if not firebase_uid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token: missing user ID"
        )
    
    # Try to find existing user by firebase_uid, then by email
    user = db.query(User).filter(User.firebase_uid == firebase_uid).first()
    if not user and email:
        user = db.query(User).filter(User.email == email).first()
        if user:
            # Update the existing record with the new Firebase UID
            user.firebase_uid = firebase_uid
            db.commit()
            db.refresh(user)
    
    # Create user if doesn't exist
    if not user:
        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email is required for new users"
            )
        
        user = User(
            firebase_uid=firebase_uid,
            email=email,
            display_name=display_name
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    return AuthenticatedUser(user=user, firebase_uid=firebase_uid, email=email)

# Optional dependency for endpoints that can work with or without authentication
async def get_current_user_optional(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer(auto_error=False)),
    db: Session = Depends(get_db)
) -> Optional[AuthenticatedUser]:
    """
    Get current user if token is provided, otherwise return None.
    """
    if not credentials:
        return None
    
    try:
        token_data = await verify_firebase_token(credentials)
        return await get_current_user(token_data, db)
    except HTTPException:
        return None 