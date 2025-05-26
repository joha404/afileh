import { MdOutlineCallMissedOutgoing } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { getAllCalls } from "@/components/api/callLog";
import CallDuration from "@/components/Dashboard/CallDuration";
import CallSuccessRate from "@/components/Dashboard/CallSuccessRate";
import CallDropRate from "@/components/Dashboard/CallDropRate";
import AICall from "@/components/Dashboard/AICall";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [callHistory, setCallHistory] = useState([]);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [dropRate, setDropRate] = useState(0);
  const [callPercentage, setCallPercentage] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [avgSuccessRate, setAvgSuccessRate] = useState(0);
  const [avgDropRate, setAvgDropRate] = useState(0);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: {
      line: { tension: 0.4 },
    },
    plugins: { legend: { display: false } },
  };

  const calculateTime = (totalSeconds) => {
    const weeks = totalSeconds / (7 * 24 * 3600);
    const days = totalSeconds / (24 * 3600);
    const hours = totalSeconds / 3600;
    const minutes = totalSeconds / 60;

    if (weeks >= 1) return `${weeks.toFixed(2)} weeks`;
    if (days >= 1) return `${days.toFixed(2)} days`;
    if (hours >= 1) return `${hours.toFixed(2)} hours`;
    return `${minutes.toFixed(2)} minutes`;
  };
  const calculateAverageRate = (callData, key) => {
    const groupedByDay = {};
    callData.forEach((call) => {
      const date = new Date(call.startedAt).toISOString().split("T")[0];
      if (!groupedByDay[date]) groupedByDay[date] = [];
      groupedByDay[date].push(call);
    });

    let totalRate = 0;
    const daysCount = Object.keys(groupedByDay).length;

    for (const date in groupedByDay) {
      const dayCalls = groupedByDay[date];
      const relevantCalls = dayCalls.filter((call) =>
        key === "success"
          ? call.analysis?.successEvaluation === "true"
          : call.endedReason === "customer-ended-call"
      );

      const rate = (relevantCalls.length / dayCalls.length) * 100;
      totalRate += rate;
    }

    return daysCount ? (totalRate / daysCount).toFixed(2) : 0;
  };
  const calculateCallPercentage = (callData) => {
    const successfulCalls = callData.filter(
      (call) => call.analysis?.successEvaluation === "true"
    );
    const totalCalls = callData.length;
    return totalCalls
      ? ((successfulCalls.length / totalCalls) * 100).toFixed(2)
      : 0;
  };

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const userTokenRaw = localStorage.getItem("userInfo");
        const currentEmail = userTokenRaw?.trim().toLowerCase();
        if (!currentEmail) return;
        const allCall = await getAllCalls();
        const assistantCalls = allCall.filter((call) => {
          const email =
            call.assistantOverrides?.variableValues?.email?.toLowerCase();

          return email === currentEmail;
        });
        const callData = assistantCalls;
        setCallHistory(callData);
        const totalSeconds = callData.reduce((acc, call) => {
          const startTime = new Date(call.startedAt).getTime();
          const endTime = new Date(call.endedAt).getTime();
          return acc + (endTime - startTime) / 1000;
        }, 0);

        const minutes = (totalSeconds / 60).toFixed(2);
        setTotalMinutes(minutes);

        const formattedTimeValue = calculateTime(totalSeconds);
        setFormattedTime(formattedTimeValue);

        const successfulCalls = callData.filter(
          (call) => call.analysis?.successEvaluation === "true"
        );

        const successRatePercentage = (
          (successfulCalls.length / callData.length) *
          100
        ).toFixed(2);
        setSuccessRate(successRatePercentage);

        const droppedCalls = callData.filter(
          (call) => call.endedReason === "customer-ended-call"
        );

        const dropRatePercentage = (
          (droppedCalls.length / callData.length) *
          100
        ).toFixed(2);
        setDropRate(dropRatePercentage);

        // Calculate Call Percentage
        const callPercentageValue = calculateCallPercentage(callData);
        setCallPercentage(callPercentageValue);

        // Calculate Average Success Rate and Drop Rate
        const avgSuccess = calculateAverageRate(callData, "success");
        const avgDrop = calculateAverageRate(callData, "drop");

        setAvgSuccessRate(avgSuccess);
        setAvgDropRate(avgDrop);
      } catch (error) {
        console.error("Error fetching calls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, []);

  // Create a gradient fill
  const createGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, "rgba(68, 84, 255, 0.3)"); // Light blue at top
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Transparent at bottom
    return gradient;
  };

  const data = {
    labels: [
      "1 Feb",
      "2 Feb",
      "3 Feb",
      "4 Feb",
      "5 Feb",
      "6 Feb",
      "7 Feb",
      "8 Feb",
      "9 Feb",
      "10 Feb",
      "11 Feb",
      "12 Feb",
      "13 Feb",
    ],
    datasets: [
      {
        label: "User Performance",
        data: [40, 30, 35, 45, 60, 60, 50, 70, 50, 55, 55, 60, 70],
        borderColor: "#4454FF", // Line color
        borderWidth: 2,
        pointBackgroundColor: "#ffffff", // White center of points
        pointBorderColor: "#4454FF", // Blue border of points
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true, // Enable gradient fill
        backgroundColor: (context) => {
          const { chart } = context;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return createGradient(ctx, chartArea);
        },
      },
    ],
  };

  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#999" },
      },
      y: {
        grid: { color: "#E0E0E0" },
        ticks: { color: "#999" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    elements: {
      line: { tension: 0.3 }, // Smooth curve
    },
  };

  const option = [
    { value: "Day-1", label: "Day-1" },
    { value: "Day-2", label: "Day-2" },
    { value: "Day-3", label: "Day-3" },
    { value: "Day-4", label: "Day-4" },
    { value: "Day-5", label: "Day-5" },
  ];

  const data2 = {
    labels: [
      "Opening",
      "Building Rapport",
      "Handling Objection",
      "Closing",
      "Follow-Up",
    ],
    datasets: [
      {
        data: [20, 15, 25, 20, 20], // Adjust the percentage values
        backgroundColor: [
          "#FFA500",
          "#00D4FF",
          "#0091FF",
          "#FF9999",
          "#A488FF",
        ],
        hoverBackgroundColor: [
          "#FF8800",
          "#00BFFF",
          "#007BFF",
          "#FF6666",
          "#7A5FFF",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options3 = {
    responsive: true,
    cutout: "75%", // Donut effect
    plugins: {
      legend: { display: false }, // Hide default legend
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="w-full flex flex-col justify-start items-start sm:gap-10 gap-4 overflow-hidden">
      <div className="w-full grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:gap-6 gap-4">
        <CallDuration
          totalMinutes={totalMinutes}
          successRate={successRate}
          callPercentage={callPercentage}
          formattedTime={formattedTime}
        />
        <CallSuccessRate
          avgSuccessRate={avgSuccessRate}
          successRate={successRate}
          callPercentage={callPercentage}
          formattedTime={formattedTime}
        />
        <AICall callHistory={callHistory} />
        <CallDropRate
          dropRate={dropRate}
          avgDropRate={avgDropRate}
          successRate={successRate}
          callPercentage={callPercentage}
          formattedTime={formattedTime}
        />
      </div>
      <div className="w-full flex xl:flex-row flex-col justify-between items-start sm:gap-10 gap-4">
        <div className="w-full sm:h-[600px] flex flex-col sm:gap-10 gap-4 bg-white shadow rounded-lg p-4">
          <div className="w-full flex sm:flex-row flex-col sm:justify-center justify-start sm:items-center gap-3 items-start">
            <div className="w-full flex gap-4 items-center">
              <h2 className="sm:text-2xl xs:text-xl text-lg text-[#161C24] font-semibold">
                User Performance
              </h2>
              <p className="xs:text-sm text-xs text-[#1FCB4F]">8.06%</p>
              <div className="w-7 h-7 bg-[#3EC65D] rounded-full p-1">
                <MdOutlineCallMissedOutgoing size={20} />
              </div>
            </div>
            <Select
              placeholder="select a option"
              options={option}
              optionFilterProp="label"
              className="min-w-[152px]"
              showSearch
              allowClear
            />
          </div>
          <div className="w-full h-full sm:mb-6">
            <Line data={data} options={options2} />
          </div>
        </div>

        <div className="xl:w-[520px] 2xl:min-w-[520px] xl:min-w-[400px] w-full sm:h-[600px] h-full bg-white rounded-lg sm:p-10 p-4 shadow flex flex-col items-center">
          <h2 className="sm:text-2xl xs:text-xl text-lg font-semibold text-[#161C24]  text-start mb-5">
            Top Categories
          </h2>
          <div className="relative xs:w-60 w-40 xs:h-60 h-40">
            <Doughnut data={data2} options={options3} />
            <div className="absolute inset-0 flex flex-col items-center justify-center md:text-3xl xs:text-2xl text-xl text-[#161C24] font-semibold">
              <span>Over all</span>
              <span>80%</span>
            </div>
          </div>
          <div className="w-full mt-4">
            {data2.labels.map((label, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-1 text-gray-700"
              >
                <div className="flex items-center gap-5">
                  <span
                    className="sm:w-9 xs:w-6 w-4 sm:h-9 xs:h-6 h-4 rounded-full"
                    style={{
                      backgroundColor: data2.datasets[0].backgroundColor[index],
                    }}
                  ></span>
                  <p className="sm:text-xl text-[#161C24]">{label}</p>
                </div>
                <IoIosArrowForward size={33} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
