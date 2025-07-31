from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # App settings
    APP_NAME: str = "Audion API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Server settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # CORS settings
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    
    # File upload settings
    MAX_FILE_SIZE: int = 50  # MB
    ALLOWED_AUDIO_FORMATS: List[str] = ["wav", "mp3", "flac", "m4a"]
    
    # Temporary file storage
    TEMP_DIR: str = "./temp_uploads"
    
    class Config:
        env_file = ".env"

settings = Settings()

# Create temp directory if it doesn't exist
os.makedirs(settings.TEMP_DIR, exist_ok=True)