import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { MdOutlineCallMissedOutgoing } from "react-icons/md";
import { Select } from "antd";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Filler
);

const createGradient = (ctx, chartArea) => {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top
  );
  gradient.addColorStop(0, "rgba(68, 84, 255, 0)");
  gradient.addColorStop(1, "rgba(68, 84, 255, 0.2)");
  return gradient;
};

const UserPerformanceChart = ({ performanceData = [] }) => {
  const [selectedDay, setSelectedDay] = useState("All");

  const dropdownOptions = [
    { value: "All", label: "All Time" },
    { value: "Day-1", label: "Day-1" },
    { value: "Day-2", label: "Day-2" },
    { value: "Day-3", label: "Day-3" },
    { value: "Day-4", label: "Day-4" },
    { value: "Day-5", label: "Day-5" },
    { value: "Day-6", label: "Day-6" },
    { value: "Day-7", label: "Day-7" },
  ];

  const filteredData =
    selectedDay && selectedDay !== "All"
      ? performanceData.filter((item) => item.day === selectedDay)
      : performanceData;

  const labels = filteredData.map((item) => item.date);
  const values = filteredData.map((item) => item.average_marks);

  const data = {
    labels,
    datasets: [
      {
        label: "User Performance",
        data: values,
        borderColor: "#4454FF",
        borderWidth: 2,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#4454FF",
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
        backgroundColor: (context) => {
          const { chart } = context;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return createGradient(ctx, chartArea);
        },
      },
    ],
  };

  const chartOptions = {
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
      line: { tension: 0.3 },
    },
  };

  return (
    <div className="w-full flex xl:flex-row flex-col justify-between items-start sm:gap-10 gap-4">
      <div className="w-full sm:h-[600px] flex flex-col sm:gap-10 gap-4 bg-white shadow rounded-lg p-4">
        <div className="w-full flex sm:flex-row flex-col sm:justify-between justify-start sm:items-center gap-3 items-start">
          <div className="w-full flex gap-4 items-center">
            <h2 className="sm:text-2xl xs:text-xl text-lg text-[#161C24] font-semibold">
              User Performance
            </h2>
            <p className="xs:text-sm text-xs text-[#1FCB4F]">+8.06%</p>
            <div className="w-7 h-7 bg-[#3EC65D] rounded-full p-1">
              <MdOutlineCallMissedOutgoing size={20} />
            </div>
          </div>
          <Select
            placeholder="Select a day"
            options={dropdownOptions}
            optionFilterProp="label"
            className="min-w-[152px]"
            showSearch
            allowClear
            onChange={(value) => setSelectedDay(value)}
            value={selectedDay}
          />
        </div>

        <div className="w-full h-full sm:mb-6">
          {filteredData.length === 0 ? (
            <p className="text-center text-gray-500">No data available.</p>
          ) : (
            <Line data={data} options={chartOptions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPerformanceChart;
