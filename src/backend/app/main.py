from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os
from sqlalchemy.orm import Session
## ------------------------------------------------------------
from database import get_db
from models import User, Trip, TripDestination
## ------------------------------------------------------------

app = FastAPI(title="Trip Explorer API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files (including favicon)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    return {"message": "Welcome to Trip Explorer API"}

@app.get("/favicon.ico")
async def favicon():
    return FileResponse(os.path.join("static", "favicon.ico"))

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    users_count = db.query(User).count()
    trips_count = db.query(Trip).count()
    destinations_count = db.query(TripDestination).count()
    return {
        "status": "ok",
        "users": users_count,
        "trips": trips_count,
        "trip_destinations": destinations_count
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
