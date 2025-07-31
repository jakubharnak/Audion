from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from typing import List
import os
import tempfile
import aiofiles
from pathlib import Path

from app.services.audio_analyzer import CarSoundAnalyzer
from app.core.config import settings
from app.models.responses import AudioAnalysisResponse, AudioMatchResponse

router = APIRouter()

async def save_upload_file(upload_file: UploadFile, destination: str) -> str:
    """Save uploaded file to destination"""
    async with aiofiles.open(destination, 'wb') as f:
        content = await upload_file.read()
        await f.write(content)
    return destination

def validate_audio_file(file: UploadFile) -> bool:
    """Validate if file is an allowed audio format"""
    if not file.filename:
        return False
    
    extension = file.filename.split('.')[-1].lower()
    return extension in settings.ALLOWED_AUDIO_FORMATS

@router.post("/match")
async def match_audio_files(
    test_files: List[UploadFile] = File(...),
    reference_files: List[UploadFile] = File(...)
):
    """Match test audio files against reference files"""
    
    # Validate files
    for file in test_files + reference_files:
        if not validate_audio_file(file):
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid file format: {file.filename}"
            )
    
    # Create temporary directory for this request
    with tempfile.TemporaryDirectory() as temp_dir:
        try:
            # Save test files
            test_paths = []
            for i, file in enumerate(test_files):
                file_path = os.path.join(temp_dir, f"test_{i}_{file.filename}")
                await save_upload_file(file, file_path)
                test_paths.append(file_path)
            
            # Save reference files
            ref_paths = []
            for i, file in enumerate(reference_files):
                file_path = os.path.join(temp_dir, f"ref_{i}_{file.filename}")
                await save_upload_file(file, file_path)
                ref_paths.append(file_path)
            
            # Analyze audio files
            analyzer = CarSoundAnalyzer()
            results = analyzer.analyze_multiple_files(test_paths, ref_paths)
            
            return {
                "status": "success",
                "data": results,
                "message": f"Analyzed {len(test_files)} test files against {len(reference_files)} reference files"
            }
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.post("/analyze")
async def analyze_single_audio(
    audio_file: UploadFile = File(...)
):
    """Analyze a single audio file and return features"""
    
    if not validate_audio_file(audio_file):
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid file format: {audio_file.filename}"
        )
    
    with tempfile.TemporaryDirectory() as temp_dir:
        try:
            # Save uploaded file
            file_path = os.path.join(temp_dir, audio_file.filename)
            await save_upload_file(audio_file, file_path)
            
            # Analyze audio
            analyzer = CarSoundAnalyzer()
            audio_data, sample_rate = analyzer.load_audio_file(file_path)
            
            # Extract features
            band_energies, freqs, fft_mag = analyzer.compute_fft_features(audio_data)
            stft_features = analyzer.compute_stft_features(audio_data)
            spectrogram = analyzer.generate_spectrogram_base64(audio_data, audio_file.filename)
            
            return {
                "status": "success",
                "data": {
                    "filename": audio_file.filename,
                    "sample_rate": sample_rate,
                    "duration": len(audio_data) / sample_rate,
                    "band_energies": band_energies.tolist(),
                    "stft_features": stft_features,
                    "spectrogram": spectrogram
                }
            }
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.get("/formats")
async def get_supported_formats():
    """Get list of supported audio formats"""
    return {
        "supported_formats": settings.ALLOWED_AUDIO_FORMATS,
        "max_file_size_mb": settings.MAX_FILE_SIZE
    }