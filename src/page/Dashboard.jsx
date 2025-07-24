import { MdOutlineCallMissedOutgoing } from "react-icons/md";
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

import { useEffect, useState } from "react";
import CallDuration from "@/components/Dashboard/CallDuration";
import CallSuccessRate from "@/components/Dashboard/CallSuccessRate";
import CallDropRate from "@/components/Dashboard/CallDropRate";
import AICall from "@/components/Dashboard/AICall";
import { getDashboardData } from "@/components/api/dashboard";
import UserPerformanceChart from "@/components/Dashboard/UserPerformance.jsx";

ChartJS.register(
  ArcElement,
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
  const [userPerformanceData, setUserPerformanceData] = useState([]); // ✅ corrected

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
        setUserPerformanceData(res.data.user_performance || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col justify-start items-start sm:gap-10 gap-4 overflow-hidden">
      <div className="w-full grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:gap-6 gap-4">
        <CallDuration dashboardData={dashboardData} isLoading={loading} />
        <CallSuccessRate dashboardData={dashboardData} isLoading={loading} />
        <AICall dashboardData={dashboardData} isLoading={loading} />
        <CallDropRate dashboardData={dashboardData} isLoading={loading} />
      </div>

      <UserPerformanceChart performanceData={userPerformanceData} />
    </div>
  );
};

export default Dashboard;
