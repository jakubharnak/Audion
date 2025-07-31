import React, { useState } from "react";
import {
  Upload,
  FileAudio,
  BarChart3,
  ArrowRight,
  Play,
  Pause,
  Waveform,
  Download,
} from "lucide-react";

const AnalyzePage = ({ onBack }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("audio/")
    );
    if (files.length > 0) {
      setAudioFile(files[0]);
      // Create audio element for playback
      const audio = new Audio(URL.createObjectURL(files[0]));
      setAudioElement(audio);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      // Create audio element for playback
      const audio = new Audio(URL.createObjectURL(file));
      setAudioElement(audio);
    }
  };

  const analyzeAudio = async () => {
    if (!audioFile) return;

    setIsAnalyzing(true);

    // TODO: Replace with actual API call to FastAPI backend
    const formData = new FormData();
    formData.append("audio_file", audioFile);

    try {
      // const response = await fetch('/api/analyze-audio', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();

      // Simulate processing time and generate mock analysis results
      setTimeout(() => {
        const mockAnalysis = {
          filename: audioFile.name,
          fileSize: (audioFile.size / 1024 / 1024).toFixed(2),
          duration: "3.42s",
          sampleRate: "44.1 kHz",
          channels: "Stereo",
          bitRate: "320 kbps",
          format: audioFile.type.split("/")[1].toUpperCase(),
          features: {
            centroidMean: (1200 + Math.random() * 800).toFixed(1),
            centroidStd: (150 + Math.random() * 100).toFixed(1),
            bandwidthMean: (800 + Math.random() * 400).toFixed(1),
            bandwidthStd: (120 + Math.random() * 80).toFixed(1),
            spectralRolloff: (3500 + Math.random() * 1000).toFixed(1),
            zeroCrossingRate: (0.05 + Math.random() * 0.1).toFixed(4),
            mfccCoefficients: Array.from({ length: 13 }, () =>
              (Math.random() * 2 - 1).toFixed(3)
            ),
          },
          frequencyBands: [
            {
              band: "20-200 Hz",
              energy: (Math.random() * 0.3).toFixed(3),
              label: "Sub-bass",
            },
            {
              band: "200-500 Hz",
              energy: (0.2 + Math.random() * 0.3).toFixed(3),
              label: "Bass",
            },
            {
              band: "500-2000 Hz",
              energy: (0.3 + Math.random() * 0.4).toFixed(3),
              label: "Midrange",
            },
            {
              band: "2000-4000 Hz",
              energy: (0.1 + Math.random() * 0.3).toFixed(3),
              label: "Upper Mid",
            },
            {
              band: "4000-8000 Hz",
              energy: (Math.random() * 0.2).toFixed(3),
              label: "Presence",
            },
            {
              band: "8000+ Hz",
              energy: (Math.random() * 0.15).toFixed(3),
              label: "Brilliance",
            },
          ],
          audioQuality: {
            snr: (20 + Math.random() * 15).toFixed(1), // Signal-to-noise ratio
            dynamicRange: (12 + Math.random() * 8).toFixed(1), // Dynamic range in dB
            peakLevel: (-3 + Math.random() * -10).toFixed(1), // Peak level in dB
            rmsLevel: (-18 + Math.random() * -10).toFixed(1), // RMS level in dB
            crestFactor: (8 + Math.random() * 7).toFixed(1), // Crest factor
          },
          classification: {
            type: ["Music", "Speech", "Environmental", "Mixed"][
              Math.floor(Math.random() * 4)
            ],
            confidence: (0.7 + Math.random() * 0.3).toFixed(3),
            subtype: "Auto-detected based on spectral characteristics",
          },
        };
        setAnalysis(mockAnalysis);
        setIsAnalyzing(false);
      }, 2500);
    } catch (error) {
      console.error("Analysis failed:", error);
      setIsAnalyzing(false);
    }
  };

  const togglePlayback = () => {
    if (!audioElement) return;

    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play();
      setIsPlaying(true);

      // Handle when audio ends
      audioElement.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  const downloadReport = () => {
    if (!analysis) return;

    const reportData = {
      filename: analysis.filename,
      analysisDate: new Date().toISOString(),
      fileProperties: {
        size: `${analysis.fileSize} MB`,
        duration: analysis.duration,
        sampleRate: analysis.sampleRate,
        channels: analysis.channels,
        bitRate: analysis.bitRate,
        format: analysis.format,
      },
      spectralFeatures: analysis.features,
      frequencyBands: analysis.frequencyBands,
      audioQuality: analysis.audioQuality,
      classification: analysis.classification,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audio-analysis-${analysis.filename.replace(
      /\.[^/.]+$/,
      ""
    )}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-4"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">
              Audio Analysis
            </h1>
            <p className="text-slate-400">
              Deep analysis of single audio files with detailed visualizations
            </p>
          </div>
          {analysis && (
            <button
              onClick={downloadReport}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Download Report</span>
            </button>
          )}
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <div
            className={`relative border-2 border-dashed rounded-xl p-12 transition-all duration-300 ${
              dragActive
                ? "border-purple-400 bg-purple-500/10"
                : "border-slate-600 hover:border-slate-500"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <div
                className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                  dragActive ? "bg-purple-500/20" : "bg-slate-700/50"
                }`}
              >
                <FileAudio
                  className={`w-10 h-10 ${
                    dragActive ? "text-purple-400" : "text-slate-400"
                  }`}
                />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Upload Audio File
              </h3>
              <p className="text-slate-400 mb-6">
                Drag and drop your audio file here, or click to browse
              </p>

              <label className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors duration-200 text-lg font-medium">
                <Upload className="w-6 h-6 mr-2" />
                Choose Audio File
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </label>

              <div className="mt-4 text-sm text-slate-500">
                Supported formats: MP3, WAV, FLAC, AAC, OGG, M4A
              </div>
            </div>
          </div>
        </div>

        {/* Current File Display */}
        {audioFile && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-600 rounded-lg">
                  <FileAudio className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {audioFile.name}
                  </h3>
                  <p className="text-slate-400">
                    Size: {(audioFile.size / 1024 / 1024).toFixed(1)} MB • Type:{" "}
                    {audioFile.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={togglePlayback}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                  <span>{isPlaying ? "Pause" : "Play"}</span>
                </button>
                <button
                  onClick={analyzeAudio}
                  disabled={isAnalyzing}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    isAnalyzing
                      ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                  }`}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-slate-400/20 border-t-slate-400 rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5" />
                      <span>Analyze</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-8">
            {/* Basic Properties */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                File Properties
              </h2>
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-purple-400 mb-1">
                    {analysis.duration}
                  </div>
                  <div className="text-slate-400 text-sm">Duration</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-blue-400 mb-1">
                    {analysis.sampleRate}
                  </div>
                  <div className="text-slate-400 text-sm">Sample Rate</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-green-400 mb-1">
                    {analysis.channels}
                  </div>
                  <div className="text-slate-400 text-sm">Channels</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-orange-400 mb-1">
                    {analysis.bitRate}
                  </div>
                  <div className="text-slate-400 text-sm">Bit Rate</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-cyan-400 mb-1">
                    {analysis.format}
                  </div>
                  <div className="text-slate-400 text-sm">Format</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-pink-400 mb-1">
                    {analysis.fileSize} MB
                  </div>
                  <div className="text-slate-400 text-sm">File Size</div>
                </div>
              </div>
            </div>

            {/* Audio Classification */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Audio Classification
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Content Type
                  </h3>
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {analysis.classification.type}
                  </div>
                  <div className="text-slate-400 text-sm">
                    {analysis.classification.subtype}
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Confidence
                  </h3>
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {(
                      parseFloat(analysis.classification.confidence) * 100
                    ).toFixed(1)}
                    %
                  </div>
                  <div className="text-slate-400 text-sm">
                    Classification accuracy
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Quality Score
                  </h3>
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {analysis.audioQuality.snr} dB
                  </div>
                  <div className="text-slate-400 text-sm">
                    Signal-to-noise ratio
                  </div>
                </div>
              </div>
            </div>

            {/* Spectral Features */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Spectral Features
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">
                      Spectral Centroid (Mean)
                    </span>
                    <span className="text-white font-semibold">
                      {analysis.features.centroidMean} Hz
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">
                      Spectral Centroid (Std)
                    </span>
                    <span className="text-white font-semibold">
                      {analysis.features.centroidStd} Hz
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Bandwidth (Mean)</span>
                    <span className="text-white font-semibold">
                      {analysis.features.bandwidthMean} Hz
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Bandwidth (Std)</span>
                    <span className="text-white font-semibold">
                      {analysis.features.bandwidthStd} Hz
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Spectral Rolloff</span>
                    <span className="text-white font-semibold">
                      {analysis.features.spectralRolloff} Hz
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Zero Crossing Rate</span>
                    <span className="text-white font-semibold">
                      {analysis.features.zeroCrossingRate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Quality Metrics */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Audio Quality Metrics
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-green-400 mb-1">
                    {analysis.audioQuality.snr} dB
                  </div>
                  <div className="text-slate-400 text-sm">SNR</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-blue-400 mb-1">
                    {analysis.audioQuality.dynamicRange} dB
                  </div>
                  <div className="text-slate-400 text-sm">Dynamic Range</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-yellow-400 mb-1">
                    {analysis.audioQuality.peakLevel} dB
                  </div>
                  <div className="text-slate-400 text-sm">Peak Level</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-orange-400 mb-1">
                    {analysis.audioQuality.rmsLevel} dB
                  </div>
                  <div className="text-slate-400 text-sm">RMS Level</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-purple-400 mb-1">
                    {analysis.audioQuality.crestFactor}
                  </div>
                  <div className="text-slate-400 text-sm">Crest Factor</div>
                </div>
              </div>
            </div>

            {/* Frequency Band Analysis */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Frequency Band Energy Distribution
              </h2>
              <div className="space-y-4">
                {analysis.frequencyBands.map((band, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">
                        {band.band} ({band.label})
                      </span>
                      <span className="text-white font-semibold">
                        {(parseFloat(band.energy) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full transition-all duration-1000 ${
                          index === 0
                            ? "bg-gradient-to-r from-red-500 to-red-400"
                            : index === 1
                            ? "bg-gradient-to-r from-orange-500 to-orange-400"
                            : index === 2
                            ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                            : index === 3
                            ? "bg-gradient-to-r from-green-500 to-green-400"
                            : index === 4
                            ? "bg-gradient-to-r from-blue-500 to-blue-400"
                            : "bg-gradient-to-r from-purple-500 to-purple-400"
                        }`}
                        style={{ width: `${parseFloat(band.energy) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MFCC Coefficients */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                MFCC Coefficients
              </h2>
              <div className="grid grid-cols-13 gap-2">
                {analysis.features.mfccCoefficients.map((coeff, index) => (
                  <div
                    key={index}
                    className="bg-slate-700/50 rounded p-2 text-center"
                  >
                    <div className="text-xs text-slate-400 mb-1">C{index}</div>
                    <div className="text-sm text-white font-mono">{coeff}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-slate-500">
                Mel-frequency cepstral coefficients used for audio feature
                extraction and classification
              </div>
            </div>

            {/* Visualization Placeholder */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Audio Visualizations
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-700/30 rounded-lg p-8 text-center border-2 border-dashed border-slate-600">
                  <Waveform className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Waveform
                  </h3>
                  <p className="text-slate-400">Time-domain representation</p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-8 text-center border-2 border-dashed border-slate-600">
                  <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Spectrogram
                  </h3>
                  <p className="text-slate-400">Time-frequency analysis</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-slate-500 text-sm">
                  Advanced visualizations will be generated by the Python
                  backend using matplotlib and librosa
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzePage;
