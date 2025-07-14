import { MdOutlineCallMissedOutgoing } from "react-icons/md";
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

import { Select } from "antd";
import { useEffect, useState } from "react";
import CallDuration from "@/components/Dashboard/CallDuration";
import CallSuccessRate from "@/components/Dashboard/CallSuccessRate";
import CallDropRate from "@/components/Dashboard/CallDropRate";
import AICall from "@/components/Dashboard/AICall";
import { getDashboardData } from "@/components/api/dashboard";

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
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);

  const calculateTime = (totalMinutes) => {
    const totalSeconds = totalMinutes * 60;
    const weeks = totalSeconds / (7 * 24 * 3600);
    const days = totalSeconds / (24 * 3600);
    const hours = totalSeconds / 3600;

    if (weeks >= 1) return `${weeks.toFixed(2)} weeks`;
    if (days >= 1) return `${days.toFixed(2)} days`;
    if (hours >= 1) return `${hours.toFixed(2)} hours`;
    return `${totalMinutes.toFixed(2)} minutes`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getDashboardData();
        setDashboardData(res.data);
        setLoading(true);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const createGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, "rgba(68, 84, 255, 0.3)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
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

  const dropdownOptions = [
    { value: "Day-1", label: "Day-1" },
    { value: "Day-2", label: "Day-2" },
    { value: "Day-3", label: "Day-3" },
    { value: "Day-4", label: "Day-4" },
    { value: "Day-5", label: "Day-5" },
  ];

  return (
    <div className="w-full flex flex-col justify-start items-start sm:gap-10 gap-4 overflow-hidden">
      <div className="w-full grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:gap-6 gap-4">
        <CallDuration dashboardData={dashboardData} isLoading={loading} />
        <CallSuccessRate dashboardData={dashboardData} isLoading={loading} />
        <AICall dashboardData={dashboardData} isLoading={loading} />
        <CallDropRate dashboardData={dashboardData} isLoading={loading} />
      </div>

      <div className="w-full flex xl:flex-row flex-col justify-between items-start sm:gap-10 gap-4">
        <div className="w-full sm:h-[600px] flex flex-col sm:gap-10 gap-4 bg-white shadow rounded-lg p-4">
          <div className="w-full flex sm:flex-row flex-col sm:justify-between justify-start sm:items-center gap-3 items-start">
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
              placeholder="Select a day"
              options={dropdownOptions}
              optionFilterProp="label"
              className="min-w-[152px]"
              showSearch
              allowClear
            />
          </div>
          <div className="w-full h-full sm:mb-6">
            <Line data={data} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
