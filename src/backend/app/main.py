from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
# ------------------------------------------------------------
from api import create_api

app = FastAPI(title="Trip Explorer API")
# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/static", StaticFiles(directory="static"), name="static")
create_api(app)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
