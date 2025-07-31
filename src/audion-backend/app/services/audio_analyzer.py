# This is your existing CarSoundAnalyzer class with some modifications
import numpy as np
import soundfile as sf
from scipy import signal
from scipy.fft import fft, fftfreq
from scipy.stats import pearsonr
import matplotlib.pyplot as plt
import io
import base64
from typing import Dict, List, Tuple, Optional

class CarSoundAnalyzer:
    def __init__(self, fs: int = None):
        self.fs = fs
        self.freq_bands = [
            (20, 200),     # low frequencies
            (200, 500),    # lower mid frequencies  
            (500, 2000),   # mid frequencies
            (2000, 4000),  # upper mid frequencies
            (4000, 8000)   # high frequencies
        ]

    def load_audio_file(self, file_path: str) -> Tuple[np.ndarray, int]:
        """Load audio file and return signal and sample rate"""
        audio_data, sample_rate = sf.read(file_path)
        
        # Convert stereo to mono if needed
        if len(audio_data.shape) > 1:
            audio_data = np.mean(audio_data, axis=1)
            
        self.fs = sample_rate
        return audio_data, sample_rate

    def normalize_signal(self, audio: np.ndarray) -> np.ndarray:
        """Normalize signal to unit energy"""
        return audio / np.sqrt(np.sum(audio ** 2))

    def compute_fft_features(self, audio: np.ndarray) -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
        """Extract FFT-based features"""
        n = len(audio)
        fft_result = fft(audio)
        freqs = fftfreq(n, 1/self.fs)
        positive_mask = freqs >= 0
        freqs = freqs[positive_mask]
        fft_mag = np.abs(fft_result[positive_mask])

        # Calculate band energies
        band_energies = []
        for low, high in self.freq_bands:
            mask = (freqs >= low) & (freqs <= high)
            energy = np.sum(fft_mag[mask]**2)
            band_energies.append(energy)

        # Normalize band energies
        band_energies = np.array(band_energies)
        if np.sum(band_energies) > 0:
            band_energies = band_energies / np.sum(band_energies)

        return band_energies, freqs, fft_mag

    def compute_stft_features(self, audio: np.ndarray) -> Dict:
        """Extract STFT-based features"""
        f, t, Sxx = signal.spectrogram(audio, self.fs, nperseg=1024, noverlap=512)

        # Calculate spectral centroid and bandwidth
        centroid = np.sum(f[:, np.newaxis] * Sxx, axis=0) / (np.sum(Sxx, axis=0) + 1e-10)
        bandwidth = np.sqrt(np.sum((f[:, np.newaxis] - centroid[np.newaxis, :])**2 * Sxx, axis=0) / (np.sum(Sxx, axis=0) + 1e-10))

        features = {
            'centroid_mean': np.mean(centroid),
            'centroid_std': np.std(centroid),
            'bandwidth_mean': np.mean(bandwidth),
            'bandwidth_std': np.std(bandwidth)
        }

        return features

    def compute_similarity(self, signal1: np.ndarray, signal2: np.ndarray) -> Dict:
        """Compute similarity between two signals"""
        # Normalize signals
        signal1 = self.normalize_signal(signal1)
        signal2 = self.normalize_signal(signal2)

        # FFT features
        energies1, _, fft1 = self.compute_fft_features(signal1)
        energies2, _, fft2 = self.compute_fft_features(signal2)

        # Enhanced energy similarity with weighted bands
        band_weights = np.array([0.35, 0.25, 0.20, 0.15, 0.05])
        energy_diff = np.abs(energies1 - energies2)
        energy_similarity = 1 - np.sum(energy_diff * band_weights)

        # STFT features
        stft1 = self.compute_stft_features(signal1)
        stft2 = self.compute_stft_features(signal2)

        feature_weights = {
            'centroid_mean': 0.4,
            'centroid_std': 0.2,
            'bandwidth_mean': 0.3,
            'bandwidth_std': 0.1
        }

        weighted_diffs = []
        for key in stft1.keys():
            diff = abs(stft1[key] - stft2[key])
            max_val = max(abs(stft1[key]), abs(stft2[key]))
            if max_val > 0:
                similarity = 1 - diff/max_val
                weighted_diffs.append(similarity * feature_weights[key])
            else:
                weighted_diffs.append(feature_weights[key])

        spectral_similarity = np.sum(weighted_diffs)

        # Frequency correlation
        min_len = min(len(fft1), len(fft2))
        freq_corr, p_value = pearsonr(fft1[:min_len], fft2[:min_len])
        freq_corr = (freq_corr + 1) / 2

        if p_value > 0.05:
            freq_corr *= 0.8

        # Calculate total similarity
        total_similarity = (
            0.45 * energy_similarity +
            0.30 * spectral_similarity +
            0.25 * freq_corr
        )

        # Calculate confidence score
        confidence_factors = [
            energy_similarity > 0.7,
            spectral_similarity > 0.6,
            freq_corr > 0.5,
            p_value < 0.05
        ]
        confidence_score = sum(confidence_factors) / len(confidence_factors)

        if confidence_score < 0.5:
            total_similarity *= 0.8

        return {
            'total': float(total_similarity),
            'energy': float(energy_similarity),
            'spectral': float(spectral_similarity),
            'frequency': float(freq_corr),
            'confidence': float(confidence_score)
        }

    def generate_spectrogram_base64(self, audio: np.ndarray, title: str = "") -> str:
        """Generate spectrogram and return as base64 encoded image"""
        plt.figure(figsize=(10, 6))
        f, t, Sxx = signal.spectrogram(audio, self.fs, nperseg=1024, noverlap=512)
        plt.pcolormesh(t, f, 10 * np.log10(Sxx + 1e-10), shading='gouraud')
        plt.title(f"Spectrogram - {title}")
        plt.xlabel("Time [s]")
        plt.ylabel("Frequency [Hz]")
        plt.ylim(0, 8000)
        plt.colorbar(label='Power [dB]')
        
        # Convert to base64
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png', dpi=100, bbox_inches='tight')
        buffer.seek(0)
        image_base64 = base64.b64encode(buffer.getvalue()).decode()
        plt.close()
        
        return f"data:image/png;base64,{image_base64}"

    def analyze_multiple_files(self, test_files: List[str], ref_files: List[str]) -> Dict:
        """Analyze multiple audio files and find matches"""
        # Load all audio files
        test_signals = []
        ref_signals = []
        
        for file_path in test_files:
            audio, _ = self.load_audio_file(file_path)
            test_signals.append(audio)
            
        for file_path in ref_files:
            audio, _ = self.load_audio_file(file_path)
            ref_signals.append(audio)
        
        # Calculate similarity matrix
        similarity_matrix = np.zeros((len(test_signals), len(ref_signals)))
        
        for i, test_signal in enumerate(test_signals):
            for j, ref_signal in enumerate(ref_signals):
                sim = self.compute_similarity(test_signal, ref_signal)
                similarity_matrix[i, j] = sim['total']
        
        # Find optimal matching
        matching, unmatched, total_score = self._find_optimal_matching(similarity_matrix)
        
        # Prepare results
        results = {}
        for i, test_file in enumerate(test_files):
            test_name = os.path.basename(test_file)
            
            if i == unmatched:
                results[test_name] = {
                    "match": None,
                    "confidence": 0.0,
                    "similarity_details": {}
                }
            else:
                ref_idx = matching[i]
                ref_name = os.path.basename(ref_files[ref_idx])
                confidence = similarity_matrix[i][ref_idx]
                
                # Get detailed similarity
                similarity_details = self.compute_similarity(test_signals[i], ref_signals[ref_idx])
                
                results[test_name] = {
                    "match": ref_name,
                    "confidence": float(confidence),
                    "similarity_details": similarity_details,
                    "spectrogram": self.generate_spectrogram_base64(test_signals[i], test_name)
                }
        
        return {
            "results": results,
            "similarity_matrix": similarity_matrix.tolist(),
            "total_score": float(total_score),
            "unmatched_count": 1 if unmatched is not None else 0
        }

    def _find_optimal_matching(self, similarity_matrix: np.ndarray) -> Tuple[Dict, Optional[int], float]:
        """Find optimal matching between test and reference signals"""
        n_test = similarity_matrix.shape[0]
        n_ref = similarity_matrix.shape[1]
        
        best_matching = None
        best_score = float('-inf')
        best_unmatched = None

        # Try each test signal as potentially unmatched
        candidates = list(range(n_test)) + [None]

        for unmatched in candidates:
            matching = {}
            used_refs = set()
            score = 0

            available_tests = [i for i in range(n_test) if i != unmatched]
            pairs = []
            
            for test_idx in available_tests:
                for ref_idx in range(n_ref):
                    sim = similarity_matrix[test_idx][ref_idx]
                    pairs.append((sim, test_idx, ref_idx))
            
            pairs.sort(reverse=True)

            for sim, test_idx, ref_idx in pairs:
                if test_idx not in matching and ref_idx not in used_refs:
                    matching[test_idx] = ref_idx
                    used_refs.add(ref_idx)
                    score += sim

            if len(matching) == len(available_tests):
                if score > best_score:
                    best_score = score
                    best_matching = matching.copy()
                    best_unmatched = unmatched

        return best_matching, best_unmatched, best_score