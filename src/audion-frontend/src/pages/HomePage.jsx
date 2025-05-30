// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Waves,
  GitCompare,
  BarChart3,
  Mic,
  Play,
  Upload,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Cpu,
} from "lucide-react";

const HomePage = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: GitCompare,
      title: "Audio Matching",
      description:
        "Compare unknown sounds against your reference database with advanced ML algorithms",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: BarChart3,
      title: "Spectral Analysis",
      description:
        "Visualize frequency patterns and extract detailed audio characteristics",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Mic,
      title: "Real-time Processing",
      description:
        "Upload and analyze audio files instantly with our optimized processing engine",
      color: "from-pink-500 to-red-600",
    },
  ];

  const useCases = [
    { icon: CheckCircle, text: "Car engine sound identification" },
    { icon: CheckCircle, text: "Audio forensics and analysis" },
    { icon: CheckCircle, text: "Music and voice recognition" },
    { icon: CheckCircle, text: "Industrial sound monitoring" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Logo and Title */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="relative">
                <Waves className="h-16 w-16 text-blue-400" />
                <div className="absolute inset-0 h-16 w-16 text-blue-400 animate-pulse opacity-50">
                  <Waves className="h-16 w-16" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Audion
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced audio analysis platform powered by machine learning.
              <span className="text-blue-400 font-semibold">
                {" "}
                Compare, analyze, and visualize
              </span>{" "}
              your audio data like never before.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/match"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <GitCompare className="h-5 w-5" />
                <span>Start Audio Matching</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/analyze"
                className="group bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-gray-600 hover:border-gray-500 flex items-center space-x-2"
              >
                <BarChart3 className="h-5 w-5" />
                <span>Analyze Single File</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  99.2%
                </div>
                <div className="text-gray-300">Accuracy Rate</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  &lt;2s
                </div>
                <div className="text-gray-300">Processing Time</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-pink-400 mb-2">
                  50MB
                </div>
                <div className="text-gray-300">Max File Size</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Animation */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 320" className="w-full h-32 text-gray-50">
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Audio Analysis Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our suite of advanced audio processing capabilities
              designed for professionals and researchers.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentFeature === index;

              return (
                <div
                  key={index}
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    isActive ? "scale-105" : "hover:scale-102"
                  }`}
                  onClick={() => setCurrentFeature(index)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity`}
                  ></div>
                  <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-200/50 h-full">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>

                    <div
                      className={`mt-6 w-full h-1 bg-gray-200 rounded-full overflow-hidden ${
                        isActive ? "block" : "hidden"
                      }`}
                    >
                      <div
                        className={`h-full bg-gradient-to-r ${feature.color} animate-pulse`}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feature Navigation Dots */}
          <div className="flex justify-center space-x-3">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeature(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentFeature === index
                    ? "bg-blue-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get professional audio analysis results in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Upload",
                description:
                  "Drag and drop your audio files or browse to select them",
                step: "01",
              },
              {
                icon: Cpu,
                title: "Process",
                description:
                  "Our AI analyzes frequency patterns and extracts key features",
                step: "02",
              },
              {
                icon: BarChart3,
                title: "Results",
                description:
                  "View detailed analysis, spectrograms, and matching results",
                step: "03",
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative text-center group">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>

                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-full w-full">
                      <ArrowRight className="h-6 w-6 text-gray-400 mx-auto" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Perfect for Multiple
                <span className="text-blue-600"> Use Cases</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                From automotive diagnostics to audio forensics, Audion adapts to
                your specific needs with precision and reliability.
              </p>

              <div className="space-y-4">
                {useCases.map((useCase, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <useCase.icon className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">
                      {useCase.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-white">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Enterprise Ready</h3>
                    <p className="text-gray-300">Scalable and secure</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Processing Speed</span>
                    <span className="text-green-400 font-semibold">
                      99% faster
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Accuracy</span>
                    <span className="text-blue-400 font-semibold">99.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Supported Formats</span>
                    <span className="text-purple-400 font-semibold">
                      WAV, MP3, FLAC
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    <span className="text-sm text-gray-300">
                      Enterprise-grade security and privacy
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-2xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-xl opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Analyzing?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join professionals who trust Audion for their audio analysis needs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/match"
              className="group bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-gray-100 flex items-center justify-center space-x-2 shadow-xl"
            >
              <Play className="h-5 w-5" />
              <span>Try Audio Matching</span>
            </Link>

            <Link
              to="/analyze"
              className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-gray-900 flex items-center justify-center space-x-2"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Single File Analysis</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
