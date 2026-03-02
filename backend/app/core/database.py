import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Default local database address
DEFAULT_DATABASE_URL = "postgresql://postgres:michaelasilalahi@localhost:5432/postgres"
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", DEFAULT_DATABASE_URL)

# Engine untuk mengantar bolak-balik antara database
engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
