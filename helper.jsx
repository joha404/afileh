import { FaPhoneVolume } from "react-icons/fa6";
import { MdPhoneCallback, MdOutlineCallMissedOutgoing } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Line } from "react-chartjs-2";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { getAllCalls } from "@/components/api/callLog";
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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
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
        const allCall = await getAllCalls();
        const callData = allCall;
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
      } catch (error) {
        console.error("Error fetching calls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, []);
};

export default Dashboard;
