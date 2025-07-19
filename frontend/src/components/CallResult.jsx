const CallResult = ({ response, handleReport, reportStatus }) => {
  if (!response) return null;

  if (response.error) {
    return <p className="text-red-400">{response.error}</p>;
  }

  return (
    <>
      {response.transcript && (
        <p>
          <strong>Transcript:</strong>{" "}
          <span className="text-gray-300">{response.transcript}</span>
        </p>
      )}
      <p>
        <strong>Prediction:</strong>{" "}
        <span
          className={
            response.label === "spam" ? "text-red-400" : "text-green-400"
          }
        >
          {response.label.toUpperCase()}
        </span>
      </p>
      <p>
        <strong>Risk Score:</strong> {(response.risk_score * 100).toFixed(2)}%
      </p>
      <p>
        <strong>Risk Level:</strong>{" "}
        <span
          className={`font-semibold ${
            response.risk_level === "Critical"
              ? "text-red-500"
              : response.risk_level === "High"
              ? "text-orange-400"
              : response.risk_level === "Medium"
              ? "text-yellow-400"
              : "text-green-400"
          }`}
        >
          {response.risk_level}
        </span>
      </p>

      {response.label === "spam" && (
        <div>
          <button
            onClick={handleReport}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded shadow hover:shadow-red-500/40 transition cursor-pointer"
          >
            🚨 Report This Number
          </button>
          {reportStatus && (
            <p className="mt-2 text-sm text-yellow-300">{reportStatus}</p>
          )}
        </div>
      )}
    </>
  );
};

export default CallResult;
