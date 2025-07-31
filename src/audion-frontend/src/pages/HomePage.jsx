import React from "react";
import {
  Upload,
  FileAudio,
  BarChart3,
  Zap,
  Music,
  Mic,
  Volume2,
  Waveform,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const HomePage = ({ onNavigate }) => {
  const features = [
    {
      id: "match",
      title: "Audio Matching",
      description:
        "Compare unknown audio recordings with a database of known sounds",
      icon: <FileAudio className="w-8 h-8" />,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      features: [
        "Multiple file comparison",
        "Similarity scoring",
        "Visual spectrograms",
        "FFT analysis",
      ],
    },
    {
      id: "analyze",
      title: "Audio Analysis",
      description:
        "Deep analysis of single audio files with detailed visualizations",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      features: [
        "Frequency analysis",
        "Spectral features",
        "STFT processing",
        "Band energy distribution",
      ],
    },
    {
      id: "speech",
      title: "Speech Detection",
      description: "Identify and analyze speech content in audio recordings",
      icon: <Mic className="w-8 h-8" />,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      features: [
        "Voice activity detection",
        "Speech-to-text",
        "Language identification",
        "Speaker analysis",
      ],
    },
    {
      id: "events",
      title: "Sound Events",
      description: "Detect specific sound events and classify audio content",
      icon: <Volume2 className="w-8 h-8" />,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      features: [
        "Event classification",
        "Environmental sounds",
        "Machine learning detection",
        "Real-time analysis",
      ],
    },
    {
      id: "visualization",
      title: "Audio Visualization",
      description:
        "Generate comprehensive visual representations of audio data",
      icon: <Waveform className="w-8 h-8" />,
      color: "bg-gradient-to-br from-pink-500 to-pink-600",
      features: [
        "Waveform display",
        "Spectrograms",
        "Frequency plots",
        "Interactive charts",
      ],
    },
    {
      id: "processing",
      title: "Audio Processing",
      description: "Clean, filter, and enhance audio recordings",
      icon: <Zap className="w-8 h-8" />,
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      features: [
        "Noise reduction",
        "Audio enhancement",
        "Format conversion",
        "Quality optimization",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
                <Music className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Audion
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Professional audio analysis platform powered by advanced machine
              learning and signal processing algorithms. Analyze, compare, and
              visualize audio data with precision and ease.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-slate-300">Real-time Processing</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-slate-300">Machine Learning</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-slate-300">Visual Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Analysis Tool
          </h2>
          <p className="text-xl text-slate-400">
            Select from our comprehensive suite of audio analysis features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl"
              onClick={() => onNavigate(feature.id)}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div
                className={`inline-flex p-4 rounded-xl ${feature.color} mb-6 shadow-lg`}
              >
                {feature.icon}
                <span className="text-white font-semibold"></span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                {feature.description}
              </p>

              <ul className="space-y-2 mb-6">
                {feature.features.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 text-slate-300"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm font-medium">
                  Click to start
                </span>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-slate-400">
            <p>
              &copy; 2025 Audion. Built with React & Python FastAPI. Licensed
              under GPL v3.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
