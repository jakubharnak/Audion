import React, { useState } from "react";
import { Upload, FileAudio, ArrowRight, Zap } from "lucide-react";

const AudioMatchPage = ({ onBack }) => {
  const [testFiles, setTestFiles] = useState([]);
  const [refFiles, setRefFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [dragActive, setDragActive] = useState({ test: false, ref: false });

  const handleDrag = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive((prev) => ({
      ...prev,
      [type]: e.type === "dragenter" || e.type === "dragover",
    }));
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive((prev) => ({ ...prev, [type]: false }));

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("audio/")
    );
    if (type === "test") {
      setTestFiles((prev) => [...prev, ...files]);
    } else {
      setRefFiles((prev) => [...prev, ...files]);
    }
  };

  const handleFileInput = (e, type) => {
    const files = Array.from(e.target.files);
    if (type === "test") {
      setTestFiles((prev) => [...prev, ...files]);
    } else {
      setRefFiles((prev) => [...prev, ...files]);
    }
  };

  const removeFile = (index, type) => {
    if (type === "test") {
      setTestFiles((prev) => prev.filter((_, i) => i !== index));
    } else {
      setRefFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const analyzeFiles = async () => {
    if (testFiles.length === 0 || refFiles.length === 0) return;

    setIsAnalyzing(true);

    // Simulate API call to backend - replace with actual FastAPI integration
    const formData = new FormData();
    testFiles.forEach((file) => {
      formData.append(`test_files`, file);
    });
    refFiles.forEach((file) => {
      formData.append(`ref_files`, file);
    });

    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/audio-match', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();

      // Simulate processing time and mock results
      setTimeout(() => {
        const mockResults = testFiles.map((file) => ({
          testFile: file.name,
          match: refFiles[Math.floor(Math.random() * refFiles.length)].name,
          confidence: (0.7 + Math.random() * 0.3).toFixed(3),
          similarity: {
            total: (0.7 + Math.random() * 0.3).toFixed(3),
            energy: (0.6 + Math.random() * 0.4).toFixed(3),
            spectral: (0.5 + Math.random() * 0.5).toFixed(3),
            frequency: (0.6 + Math.random() * 0.4).toFixed(3),
          },
        }));
        setResults(mockResults);
        setIsAnalyzing(false);
      }, 3000);
    } catch (error) {
      console.error("Analysis failed:", error);
      setIsAnalyzing(false);
    }
  };

  const FileUploadZone = ({ type, files, title, description }) => (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
        dragActive[type]
          ? "border-blue-400 bg-blue-500/10"
          : "border-slate-600 hover:border-slate-500"
      }`}
      onDragEnter={(e) => handleDrag(e, type)}
      onDragLeave={(e) => handleDrag(e, type)}
      onDragOver={(e) => handleDrag(e, type)}
      onDrop={(e) => handleDrop(e, type)}
    >
      <div className="text-center">
        <Upload
          className={`w-12 h-12 mx-auto mb-4 ${
            dragActive[type] ? "text-blue-400" : "text-slate-400"
          }`}
        />
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-400 mb-4">{description}</p>

        <label className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors duration-200">
          <Upload className="w-5 h-5 mr-2" />
          Choose Files
          <input
            type="file"
            multiple
            accept="audio/*"
            className="hidden"
            onChange={(e) => handleFileInput(e, type)}
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          <h4 className="text-sm font-medium text-slate-300">
            Uploaded Files:
          </h4>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3"
            >
              <div className="flex items-center space-x-3">
                <FileAudio className="w-5 h-5 text-blue-400" />
                <span className="text-slate-200 text-sm">{file.name}</span>
                <span className="text-slate-400 text-xs">
                  ({(file.size / 1024 / 1024).toFixed(1)} MB)
                </span>
              </div>
              <button
                onClick={() => removeFile(index, type)}
                className="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded hover:bg-red-500/10 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
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
              Audio Matching
            </h1>
            <p className="text-slate-400">
              Compare unknown audio recordings with reference database
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-slate-300 text-sm">
                Test Files: {testFiles.length}
              </span>
            </div>
            <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-slate-300 text-sm">
                Reference Files: {refFiles.length}
              </span>
            </div>
          </div>
        </div>

        {/* Upload Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <FileUploadZone
            type="test"
            files={testFiles}
            title="Test Audio Files"
            description="Upload unknown audio files to be identified"
          />
          <FileUploadZone
            type="ref"
            files={refFiles}
            title="Reference Database"
            description="Upload known audio files for comparison"
          />
        </div>

        {/* Analysis Button */}
        <div className="text-center mb-8">
          <button
            onClick={analyzeFiles}
            disabled={
              testFiles.length === 0 || refFiles.length === 0 || isAnalyzing
            }
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              testFiles.length > 0 && refFiles.length > 0 && !isAnalyzing
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>Analyzing Audio...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Start Analysis</span>
              </div>
            )}
          </button>
        </div>

        {/* Analysis Instructions */}
        {!results && !isAnalyzing && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              How Audio Matching Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="font-semibold text-white mb-2">
                  Feature Extraction
                </h3>
                <p className="text-slate-400">
                  Extract spectral features, frequency bands, and STFT
                  characteristics from each audio file
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="font-semibold text-white mb-2">
                  Similarity Calculation
                </h3>
                <p className="text-slate-400">
                  Compare energy distribution, spectral centroid, and frequency
                  correlation between files
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="font-semibold text-white mb-2">
                  Optimal Matching
                </h3>
                <p className="text-slate-400">
                  Find the best match for each test file with confidence scoring
                  and detailed analysis
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Analysis Results
            </h2>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="bg-slate-700/50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      {result.testFile}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-400">
                        Confidence:
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          parseFloat(result.confidence) > 0.8
                            ? "bg-green-600 text-white"
                            : parseFloat(result.confidence) > 0.6
                            ? "bg-yellow-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {(parseFloat(result.confidence) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-slate-300 mb-2">
                        <span className="font-medium">Best Match:</span>{" "}
                        {result.match}
                      </p>
                      <p className="text-slate-300">
                        <span className="font-medium">Overall Similarity:</span>{" "}
                        {(parseFloat(result.similarity.total) * 100).toFixed(1)}
                        %
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">
                          Energy Similarity:
                        </span>
                        <span className="text-slate-200">
                          {(parseFloat(result.similarity.energy) * 100).toFixed(
                            1
                          )}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">
                          Spectral Similarity:
                        </span>
                        <span className="text-slate-200">
                          {(
                            parseFloat(result.similarity.spectral) * 100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">
                          Frequency Correlation:
                        </span>
                        <span className="text-slate-200">
                          {(
                            parseFloat(result.similarity.frequency) * 100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bars for Visual Representation */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-slate-400 w-20">
                        Energy
                      </span>
                      <div className="flex-1 bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-1000"
                          style={{
                            width: `${
                              parseFloat(result.similarity.energy) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-300 w-12">
                        {(parseFloat(result.similarity.energy) * 100).toFixed(
                          0
                        )}
                        %
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-slate-400 w-20">
                        Spectral
                      </span>
                      <div className="flex-1 bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full transition-all duration-1000"
                          style={{
                            width: `${
                              parseFloat(result.similarity.spectral) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-300 w-12">
                        {(parseFloat(result.similarity.spectral) * 100).toFixed(
                          0
                        )}
                        %
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-slate-400 w-20">
                        Frequency
                      </span>
                      <div className="flex-1 bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-1000"
                          style={{
                            width: `${
                              parseFloat(result.similarity.frequency) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-300 w-12">
                        {(
                          parseFloat(result.similarity.frequency) * 100
                        ).toFixed(0)}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioMatchPage;
