from fastapi import APIRouter
from app.core.config import settings

router = APIRouter()

@router.get("/")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "app_name": settings.APP_NAME,
        "version": settings.APP_VERSION
    }

@router.get("/info")
async def app_info():
    """Get application information"""
    return {
        "app_name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "debug": settings.DEBUG,
        "supported_formats": settings.ALLOWED_AUDIO_FORMATS,
        "max_file_size_mb": settings.MAX_FILE_SIZE
    }