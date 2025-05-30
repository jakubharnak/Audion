# Running the Backend
## Development Mode
```
bash# From the audion-backend directory
python -m app.main
```

## Or using uvicorn directly
```
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
Production Mode
```
bashuvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```
## Testing the API
Once running, you can:

View API documentation: http://localhost:8000/docs
Test health endpoint: http://localhost:8000/health
Upload audio files: Use the /audio/match or /audio/analyze endpoints

Next Steps

Add error handling for different audio file issues
Implement caching for repeated analyses
Add authentication if needed
Set up logging for debugging
Create Docker container for easy deployment
Add unit tests for your audio analysis functions

This backend setup integrates your existing car sound analysis code into a modern FastAPI application that your React frontend can easily communicate with!