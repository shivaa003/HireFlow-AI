
import os
import httpx
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import check_database

load_dotenv()

app = FastAPI(
    title="HireFlow AI API",
    description="AI-powered job search and career automation",
    version="0.1.0",
)

frontend_url = os.getenv(
    "FRONTEND_URL",
    "http://localhost:3000",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "Welcome to HireFlow AI",
        "version": "0.1.0",
    }


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "HireFlow AI API",
    }

@app.get("/health/database")
async def database_health():
    is_connected = check_database()

    return {
        "database": "connected" if is_connected else "disconnected"
    }


@app.post("/api/n8n/test")
async def test_n8n_connection():
    webhook_url = os.getenv("N8N_WEBHOOK_URL")

    if not webhook_url:
        return {
            "success": False,
            "message": "N8N_WEBHOOK_URL is not configured",
        }

    payload = {
        "project": "HireFlow AI",
        "action": "test_connection",
    }

    async with httpx.AsyncClient(timeout=20.0) as client:
        response = await client.post(
            webhook_url,
            json=payload,
        )

        response.raise_for_status()

        return response.json()
