from datetime import date, datetime
from fastapi import Depends, FastAPI
from fastapi import HTTPException
from fastapi.responses import FileResponse
import os
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional, List
# ------------------------------------------------------------
from database import get_db
from models import User, Trip, TripDestination
from auth import get_current_user, AuthenticatedUser

async def root():
    return {"message": "Welcome to Trip Explorer API"}

async def favicon():
    return FileResponse(os.path.join("static", "favicon.ico"))

async def well_known():
    return {"message": "This endpoint is recognized."}

async def health_check(db: Session = Depends(get_db)):
    users_count = db.query(User).count()
    trips_count = db.query(Trip).count()
    destinations_count = db.query(TripDestination).count()
    return {
        "status": "ok",
        "users": users_count,
        "trips": trips_count,
        "trip_destinations": destinations_count
    }

# CRUD operations for the Trip model.

class TripCreate(BaseModel):
    name: str
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    notes: Optional[str] = None

class TripUpdate(BaseModel):
    name: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    notes: Optional[str] = None

class TripResponse(BaseModel):
    id: int
    user_id: int
    name: str
    start_date: Optional[date]
    end_date: Optional[date]
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime

class UserResponse(BaseModel):
    id: int
    firebase_uid: str
    email: str
    display_name: Optional[str]
    created_at: datetime
    
async def create_trip(
    trip: TripCreate, 
    current_user: AuthenticatedUser = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new trip for the authenticated user.
    """
    # Create new trip for the authenticated user
    new_trip = Trip(
        user_id=current_user.user.id,
        name=trip.name,
        start_date=trip.start_date,
        end_date=trip.end_date,
        notes=trip.notes
    )
    
    db.add(new_trip)
    db.commit()
    db.refresh(new_trip)
    
    return {
        "id": new_trip.id,
        "user_id": new_trip.user_id,
        "name": new_trip.name,
        "start_date": new_trip.start_date,
        "end_date": new_trip.end_date,
        "notes": new_trip.notes,
        "created_at": new_trip.created_at,
        "updated_at": new_trip.updated_at
    }

async def read_trip(
    trip_id: int, 
    current_user: AuthenticatedUser = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Retrieve a trip by its ID (only if it belongs to the authenticated user).
    """
    trip = db.query(Trip).filter(
        Trip.id == trip_id,
        Trip.user_id == current_user.user.id
    ).first()
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    return {
        "id": trip.id,
        "user_id": trip.user_id,
        "name": trip.name,
        "start_date": trip.start_date,
        "end_date": trip.end_date,
        "notes": trip.notes,
        "created_at": trip.created_at,
        "updated_at": trip.updated_at
    }

async def read_trips(
    current_user: AuthenticatedUser = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> List[TripResponse]:
    """
    Retrieve all trips for the authenticated user.
    """
    trips = db.query(Trip).filter(Trip.user_id == current_user.user.id).all()
    return [TripResponse(**trip.__dict__) for trip in trips]

async def update_trip(
    trip_id: int, 
    trip_update: TripUpdate, 
    current_user: AuthenticatedUser = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update a trip by its ID (only if it belongs to the authenticated user).
    """
    trip_db = db.query(Trip).filter(
        Trip.id == trip_id,
        Trip.user_id == current_user.user.id
    ).first()
    
    if not trip_db:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    # Update only provided fields
    if trip_update.name is not None:
        trip_db.name = trip_update.name
    if trip_update.start_date is not None:
        trip_db.start_date = trip_update.start_date
    if trip_update.end_date is not None:
        trip_db.end_date = trip_update.end_date
    if trip_update.notes is not None:
        trip_db.notes = trip_update.notes
    
    db.commit() 
    db.refresh(trip_db)
    
    return {
        "id": trip_db.id,
        "user_id": trip_db.user_id,
        "name": trip_db.name,  
        "start_date": trip_db.start_date,
        "end_date": trip_db.end_date,
        "notes": trip_db.notes,
        "created_at": trip_db.created_at,
        "updated_at": trip_db.updated_at
    }

async def delete_trip(
    trip_id: int, 
    current_user: AuthenticatedUser = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete a trip by its ID (only if it belongs to the authenticated user).
    """
    trip = db.query(Trip).filter(
        Trip.id == trip_id,
        Trip.user_id == current_user.user.id
    ).first()
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    db.delete(trip)
    db.commit()
    
    return {"detail": "Trip deleted successfully"}

# User management endpoints
async def get_current_user_profile(
    current_user: AuthenticatedUser = Depends(get_current_user)
) -> UserResponse:
    """
    Get the current authenticated user's profile.
    """
    return UserResponse(
        id=current_user.user.id,
        firebase_uid=current_user.user.firebase_uid,
        email=current_user.user.email,
        display_name=current_user.user.display_name,
        created_at=current_user.user.created_at
    )

class UserUpdate(BaseModel):
    display_name: Optional[str] = None

async def update_user_profile(
    user_update: UserUpdate,
    current_user: AuthenticatedUser = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> UserResponse:
    """
    Update the current authenticated user's profile.
    """
    if user_update.display_name is not None:
        current_user.user.display_name = user_update.display_name
    
    db.commit()
    db.refresh(current_user.user)
    
    return UserResponse(
        id=current_user.user.id,
        firebase_uid=current_user.user.firebase_uid,
        email=current_user.user.email,
        display_name=current_user.user.display_name,
        created_at=current_user.user.created_at
    )

# Todo: add code to handle CRUD operations for the TripDestination model.

def create_api(app: FastAPI):
    app.add_api_route("/", root, methods=["GET"])
    app.add_api_route("/favicon.ico", favicon, methods=["GET"])
    app.add_api_route("/.well-known/appspecific/com.chrome.devtools.json", well_known, methods=["GET"])
    app.add_api_route("/health", health_check, methods=["GET"])
    
    # Trip endpoints (all require authentication)
    app.add_api_route("/trips/", create_trip, methods=["POST"])
    app.add_api_route("/trips/", read_trips, methods=["GET"])
    trip_path = "/trips/{trip_id}"
    app.add_api_route(trip_path, read_trip, methods=["GET"])
    app.add_api_route(trip_path, update_trip, methods=["PUT"])
    app.add_api_route(trip_path, delete_trip, methods=["DELETE"])
    
    # User endpoints (all require authentication)
    app.add_api_route("/users/me", get_current_user_profile, methods=["GET"])
    app.add_api_route("/users/me", update_user_profile, methods=["PUT"])
