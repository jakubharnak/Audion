# 🔊 Audion

A web-based tool for analyzing and comparing audio recordings, built with **React (frontend)** and **Python (backend)**. The platform allows users to upload multiple audio files, compare unknown sounds to a known database, generate visual feedback like spectrograms, and run various audio-processing tasks – all from a clean, browser-based interface.

---
## ✨ Features

- Upload and compare multiple audio files
- Automatic sound matching using machine learning
- Visualize audio signals (e.g., spectrograms, waveform)
- Modular architecture for future audio tools:
  - Speaker identification
  - Speech-to-text
  - Sound event detection
  - Noise filtering and preprocessing
- User-friendly UI with modern React and routing
- FastAPI backend for real-time audio processing

---
## 🧱 Tech Stack

| Layer     | Tech                     |
|-----------|--------------------------|
| Frontend  | React, Vite, Tailwind    |
| Backend   | Python, FastAPI, librosa |
| Audio Libs| NumPy, SciPy, matplotlib |
| Deploy    | Docker (planned), REST API

---
## 🚀 React Frontend for Audion

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (buttons, cards, etc.)
│   ├── AudioUploader.jsx
│   ├── AudioPlayer.jsx
│   ├── SpectrogramView.jsx
│   ├── ResultsDisplay.jsx
│   └── Navigation.jsx
├── pages/              # Main page components
│   ├── HomePage.jsx
│   ├── AudioMatchPage.jsx
│   ├── AnalyzePage.jsx
│   └── NotFoundPage.jsx
├── services/           # API communication
│   ├── api.js
│   └── audioService.js
├── utils/              # Helper functions
│   ├── audioUtils.js
│   ├── formatters.js
│   └── constants.js
├── hooks/              # Custom React hooks
│   └── useAudioAnalysis.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🐍 Python FastAPI Backend for Audion

### Project Structure
```
audion-backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app entry point
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py           # Settings and configuration
│   │   └── cors.py             # CORS setup
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── audio.py        # Audio analysis endpoints
│   │   │   └── health.py       # Health check
│   │   └── dependencies.py     # Shared dependencies
│   ├── services/
│   │   ├── __init__.py
│   │   ├── audio_analyzer.py   # Your CarSoundAnalyzer class
│   │   ├── audio_processor.py  # File processing utilities
│   │   └── visualization.py    # Spectrogram generation
│   ├── models/
│   │   ├── __init__.py
│   │   ├── audio.py           # Pydantic models for API
│   │   └── responses.py       # Response models
│   └── utils/
│       ├── __init__.py
│       ├── file_utils.py      # File handling utilities
│       └── audio_utils.py     # Audio processing helpers
├── requirements.txt
├── .env             ✅ For local development  
├── render.yaml      ✅ Optional but recommended
└── README.md
```

Environment Variables on Render Dashboard:
Instead of .env file, set these in Render's dashboard:

APP_NAME=Audion API
DEBUG=False
ALLOWED_ORIGINS=["https://your-frontend.vercel.app"]

Render Deployment Steps:

Push code to GitHub
Connect Render to your GitHub repo
Render auto-detects: Python app + requirements.txt
Set start command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
Deploy 🚀

Render automatically:

Installs Python dependencies from requirements.txt
Sets up the environment
Handles scaling and SSL certificates
Provides you with a public URL like https://your-backend.onrender.com