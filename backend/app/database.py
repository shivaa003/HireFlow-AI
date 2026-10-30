
import os

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv(
    "MONGODB_DATABASE",
    "hireflow_ai",
)

client = None
database = None

if MONGODB_URI:
    client = MongoClient(
        MONGODB_URI,
        serverSelectionTimeoutMS=5000,
    )

    database = client[DATABASE_NAME]


def check_database():
    if client is None:
        return False

    try:
        client.admin.command("ping")
        return True
    except Exception:
        return False
