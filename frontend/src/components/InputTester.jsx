import { useState } from "react";
import axios from "axios";

export default function InputTester() {
  const [type, setType] = useState("sms");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post(`http://localhost:8000/predict/${type}`, {
        text: input,
      });

      if (type === "email") {
        setResult({
          label: res.data.label
        });
      } else if (type === "call") {
        setResult({
          label: res.data.label,
          confidence: res.data.confidence,
        });
      } else {
        setResult({ label: res.data.prediction }); // SMS case
      }
    } catch (err) {
      console.error("Prediction error", err);
      setResult({ label: "Error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0b0f1a] p-8 rounded-xl mt-10 border border-blue-900 shadow-[0_0_25px_#2563eb66] text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">🧪 Try It Yourself</h2>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <select
          className="bg-gray-800 text-white p-2 rounded border border-gray-700"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="sms">SMS</option>
          <option value="email">Email</option>
          <option value="call">Call</option>
        </select>

        <input
          type="text"
          className="flex-1 p-3 rounded-lg border border-blue-700 bg-[#101827] text-white placeholder-blue-300"
          placeholder={`Enter ${type} content...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handlePredict}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {result && (
        <div
          className={`mt-4 text-center font-bold text-xl ${
            result.label === "spam"
              ? "text-red-400"
              : result.label === "ham" || result.label === "not spam"
              ? "text-green-400"
              : "text-yellow-400"
          }`}
        >
          Result: {result.label?.toUpperCase()}
        </div>
      )}
    </div>
  );
}
