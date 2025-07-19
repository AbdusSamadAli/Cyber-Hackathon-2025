import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SpamHamPieChart() {
  const [data, setData] = useState({ spam: 0, ham: 0 });

  useEffect(() => {
    fetch("http://localhost:8000/stats/spam-ham")
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  const chartData = {
    labels: ["Spam", "Ham"],
    datasets: [
      {
        label: "Message Classification",
        data: [data.spam, data.ham],
        backgroundColor: ["#EF4444", "#10B981"], // red, green
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#FFFFFF", // bright white legend labels
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        bodyColor: "#FFFFFF", // tooltip text
        titleColor: "#FACC15", // tooltip title yellow
        backgroundColor: "#1F2937", // dark background
      },
    },
  };

  return (
    <div className="max-w-md mx-auto p-4 text-white">
      <h2 className="text-xl font-semibold mb-6 text-white flex justify-center">
        📊 Spam vs Ham Distribution
      </h2>
      <div className="mt-4">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
