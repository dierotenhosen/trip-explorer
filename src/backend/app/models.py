from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey, TIMESTAMP, func
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    firebase_uid = Column(String(128), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    display_name = Column(String(255))
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp())

    trips = relationship('Trip', back_populates='user', cascade='all, delete-orphan')

class Trip(Base):
    __tablename__ = 'trips'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    name = Column(String(255), nullable=False)
    start_date = Column(Date)
    end_date = Column(Date)
    notes = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp())
    updated_at = Column(TIMESTAMP, server_default=func.current_timestamp(), onupdate=func.current_timestamp())

    user = relationship('User', back_populates='trips')
    destinations = relationship('TripDestination', back_populates='trip', cascade='all, delete-orphan')

class TripDestination(Base):
    __tablename__ = 'trip_destinations'

    id = Column(Integer, primary_key=True, autoincrement=True)
    trip_id = Column(Integer, ForeignKey('trips.id', ondelete='CASCADE'), nullable=False)
    location = Column(String(255), nullable=False)
    arrival_date = Column(Date)
    departure_date = Column(Date)
    notes = Column(Text)

    trip = relationship('Trip', back_populates='destinations')
