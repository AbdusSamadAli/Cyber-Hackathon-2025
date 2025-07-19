import React, { useState, useEffect } from "react";
import axios from "axios";
import CallResult from "../components/CallResult"; 

function CallFraudChecker() {
  const [transcript, setTranscript] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [reportStatus, setReportStatus] = useState("");
  const [trustScore, setTrustScore] = useState(0.5);
  const [debouncedTrustScore, setDebouncedTrustScore] = useState(trustScore);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTrustScore(trustScore);
    }, 300);
    return () => clearTimeout(timer);
  }, [trustScore]);
  useEffect(() => {
    if (response && transcript && !audioFile) {
      handleCheck(debouncedTrustScore);
    }

  }, [debouncedTrustScore]);

  const handleCheck = async (score = trustScore) => {
    if (!transcript.trim() || !phoneNumber.trim()) return;

    setLoading(true);
    setReportStatus("");
    try {
      const res = await axios.post("http://localhost:8000/predict/call", {
        text: transcript,
        trust_score: score,
        phone_number: phoneNumber,
      });

      setResponse(res.data);
    } catch (err) {
      console.error(err);
      setResponse({ error: "Prediction failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleAudioUpload = async () => {
    if (!audioFile) return;
    setLoading(true);
    setReportStatus("");
    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("trust_score", trustScore); 
    formData.append("phone_number", phoneNumber);

    try {
      const res = await axios.post(
        "http://localhost:8000/predict/call/audio",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      setResponse({ error: "Audio prediction failed." });
    } finally {
      setLoading(false);
    }
  };

  const handleReport = async () => {
    try {
      await axios.post("http://localhost:8000/report/spam", {
        phone_number: phoneNumber,
        transcript: transcript,
      });
      setReportStatus("📢 Report submitted successfully!");
    } catch (error) {
      setReportStatus("❌ Failed to report. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-5 p-6 rounded-xl border border-blue-800 backdrop-blur-md bg-white/10 shadow-[0_0_25px_#2563eb66] text-white transition-all duration-300">
      <h2 className="text-3xl font-extrabold mb-4 text-blue-400 text-center drop-shadow-[0_1px_2px_rgba(37,99,235,0.7)]">
        📞 Call Spam Predictor
      </h2>

      <input
        type="text"
        placeholder="Enter phone number"
        className="w-full mb-4 p-3 rounded-lg border border-blue-600 bg-[#101827] text-white placeholder:text-blue-300"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <textarea
        rows={4}
        className="w-full p-4 rounded-lg border border-blue-600 bg-[#101827] placeholder:text-blue-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
        placeholder="Paste call transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />

      <button
        onClick={() => handleCheck()}
        disabled={loading}
        className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 rounded shadow-md hover:shadow-blue-500/40 transition cursor-pointer"
      >
        {loading ? "Checking..." : "Check for Spam"}
      </button>

      <div className="border-t border-blue-700 mt-6 pt-4">
        <h3 className="font-semibold text-blue-300 mb-2 flex justify-center items-center">
          Upload Audio File
        </h3>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files[0])}
          className="bg-[#101827] text-white border border-blue-600 p-2 rounded mb-2 w-full"
        />
        <button
          onClick={handleAudioUpload}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 rounded shadow-md hover:shadow-green-500/40 transition cursor-pointer mt-3"
        >
          {loading ? "Processing..." : "Upload & Check Audio"}
        </button>
      </div>

      {response && (
        <div className="mt-4 border-t border-gray-700 pt-4 space-y-4">
          <CallResult
            response={response}
            handleReport={handleReport}
            reportStatus={reportStatus}
          />

          <div>
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
        </div>
      )}
    </div>
  );
}

export default CallFraudChecker;
