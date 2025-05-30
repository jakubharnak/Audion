import api from "./api";

export const audioService = {
  // Upload and match audio files
  async matchAudio(testFiles, referenceFiles) {
    const formData = new FormData();

    testFiles.forEach((file) => {
      formData.append(`test_files`, file);
    });

    referenceFiles.forEach((file) => {
      formData.append(`reference_files`, file);
    });

    const response = await api.post("/audio/match", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Analyze single audio file
  async analyzeAudio(file) {
    const formData = new FormData();
    formData.append("audio_file", file);

    const response = await api.post("/audio/analyze", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Get audio features/visualization data
  async getAudioFeatures(file) {
    const formData = new FormData();
    formData.append("audio_file", file);

    const response = await api.post("/audio/features", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};
