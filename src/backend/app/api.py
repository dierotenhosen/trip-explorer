from datetime import date
from fastapi import Depends, FastAPI
from fastapi import HTTPException
from fastapi.responses import FileResponse
import os
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional
# ------------------------------------------------------------
from database import get_db
from models import User, Trip, TripDestination
# ------------------------------------------------------------

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

class TripCreate(BaseModel):
    name: str
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    notes: Optional[str] = None
    firebase_uid: str  # Added to identify the user by firebase_uid

async def create_trip(trip: TripCreate, db: Session = Depends(get_db)):
    """
    Create a new trip for a user identified by firebase_uid.
    """
    # Find the user by firebase_uid
    user = db.query(User).filter(User.firebase_uid == trip.firebase_uid).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Create new trip
    new_trip = Trip(
        user_id=user.id,
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


async def read_trip(trip_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a trip by its ID.
    """
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
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

async def delete_trip(trip_id: int, db: Session = Depends(get_db)):
    """
    Delete a trip by its ID.
    """
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    db.delete(trip)
    db.commit()
    
    return {"detail": "Trip deleted successfully"}

def create_api(app: FastAPI):
    app.add_api_route("/", root, methods=["GET"])
    app.add_api_route("/favicon.ico", favicon, methods=["GET"])
    app.add_api_route("/.well-known/appspecific/com.chrome.devtools.json", well_known, methods=["GET"])
    app.add_api_route("/health", health_check, methods=["GET"])
    app.add_api_route("/trips/", create_trip, methods=["POST"])
    app.add_api_route("/trips/{trip_id}", read_trip, methods=["GET"])
    app.add_api_route("/trips/{trip_id}", delete_trip, methods=["DELETE"])
