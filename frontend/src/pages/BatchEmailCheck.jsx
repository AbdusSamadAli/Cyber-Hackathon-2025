import { useState } from "react";
import axios from "axios";

export default function EmailInputChecker() {
  const [inputText, setInputText] = useState("");
  const [trustScore, setTrustScore] = useState(0.5);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/predict/email", {
        text: inputText,
        trust_score: trustScore,
      });
      setResult(res.data);
    } catch (err) {
      console.error("Prediction error:", err);
      setResult({ error: "Prediction failed. Check backend." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded-xl border border-blue-800 backdrop-blur-md bg-white/10 shadow-[0_0_25px_#2563eb66] text-white transition-all duration-300">
      <h2 className="text-3xl font-extrabold mb-4 text-blue-400 text-center drop-shadow-[0_1px_2px_rgba(37,99,235,0.7)]">
        📧 Email Spam Predictor
      </h2>

      <textarea
        rows={6}
        className="w-full p-4 rounded-lg border border-blue-600 bg-[#101827] placeholder:text-blue-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner resize-none"
        placeholder="Paste or type your email content here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button
        onClick={handleCheck}
        disabled={loading}
        className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 rounded shadow-md hover:shadow-blue-500/40 transition cursor-pointer"
      >
        {loading ? "Checking..." : "Check for Spam"}
      </button>

      {result && !result.error && (
        <>
          <div className="mt-6 p-4 rounded-xl font-medium shadow-lg bg-white/10 border border-white/20 space-y-2">
            <p>
              <strong>Prediction:</strong>{" "}
              <span
                className={
                  result.prediction.toLowerCase() === "spam"
                    ? "text-red-400"
                    : "text-green-400"
                }
              >
                {result.prediction.toUpperCase()}
              </span>
            </p>
            <p>
              <strong>Spam Probability:</strong>{" "}
              {(result.spam_probability * 100).toFixed(2)}%
            </p>
            <p>
              <strong>Fused Score:</strong>{" "}
              {(result.fused_score * 100).toFixed(2)}%
            </p>
            <p>
              <strong>Risk Score:</strong> {result.risk_score}%
            </p>
            <p>
              <strong>Risk Level:</strong>{" "}
              <span
                className={`font-semibold ${
                  result.risk_level === "Critical"
                    ? "text-red-500"
                    : result.risk_level === "High"
                    ? "text-orange-400"
                    : result.risk_level === "Medium"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {result.risk_level}
              </span>
            </p>
          </div>

          <div className="mt-4">
            <label className="text-sm font-semibold text-blue-300 mb-2 block">
              🔒 Your Trust Score (0.1 - 1.0)
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.01"
              value={trustScore}
              onChange={(e) => setTrustScore(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-blue-200 mt-1">
              Selected: {trustScore.toFixed(2)}
            </p>
          </div>
        </>
      )}

      {result?.error && (
        <p className="text-red-400 text-center font-medium mt-4">
          ⚠️ {result.error}
        </p>
      )}
    </div>
  );
}
