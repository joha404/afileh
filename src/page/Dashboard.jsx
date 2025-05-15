import { FaPhoneVolume } from "react-icons/fa6";
import { MdPhoneCallback } from "react-icons/md";
import { MdOutlineCallMissedOutgoing } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
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

  const callItems = [
    {
      id: 1,
      icon: <FaPhoneVolume />,
      title: "Total Call Duration",
      subtitle: "",
      description: "12334 minutes",
      callPercent: "+5.09%",
      time: "+1.4 this week",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Call Duration",
            data: [20, 35, 30, 50, 45, 60, 40],
            borderColor: "#22c55e",
            borderWidth: 2,
            pointRadius: 0,
          },
        ],
      },
    },
    {
      id: 2,
      icon: <MdPhoneCallback size={20} />,
      title: "Call Success Rate",
      subtitle: "Avg. Success Rate: 70%",
      description: "Meeting Booked 50",
      callPercent: "+12.07%",
      time: "+1.4 this week",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Call Duration",
            data: [20, 35, 70, 50, 45, 60, 40],
            borderColor: "#22c55e",
            borderWidth: 2,
            pointRadius: 0,
          },
        ],
      },
    },
    {
      id: 3,
      icon: <FaPhoneVolume />,
      title: "Total AI Calls",
      subtitle: "",
      description: "100 Time",
      callPercent: "+5.09%",
      time: "-5.4 this week",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Call Duration",
            data: [20, 35, 30, 50, 45, 60, 40],
            borderColor: "#ff5733",
            borderWidth: 2,
            pointRadius: 0,
          },
        ],
      },
    },
    {
      id: 4,
      icon: <MdPhoneCallback size={20} />,
      title: "Call Drop Rate",
      subtitle: "Avg. Drop Rate: 12.9%",
      description: "Meeting Booked 70",
      callPercent: "+0.2%",
      time: "-0.2 this week",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Call Duration",
            data: [10, 5, 80, 40, 45, 70, 40],
            borderColor: "#ff5733",
            borderWidth: 2,
            pointRadius: 0,
          },
        ],
      },
    },
  ];

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
      <div className="w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-6 gap-4">
        {callItems.map((item) => (
          <div className="w-full rounded-lg shadow bg-white" key={item.id}>
            <div className="w-full py-2 px-3.5 flex justify-start items-center gap-3 border-b border-[#E1E7EC]">
              <div className="shrink-0">{item.icon}</div>
              <div className="w-full flex flex-col">
                <h1 className="xs:text-lg text-base text-[#161C24] font-semibold">
                  {item.title}
                </h1>
                <p className="text-[#919EAB] text-xs">{item.subtitle}</p>
              </div>
              <IoIosArrowForward size={36} />
            </div>
            <div className="w-full flex p-4 flex-col justify-start items-start">
              <h2 className="md:text-[22px] xs:text-xl text-lg text-[#161C24] font-medium">
                {item.description}
              </h2>
              <div className="w-full">
                <div className="flex justify-between items-center gap-1 text-green-500 text-[8px] font-medium">
                  <span className="flex gap-2">
                    {item.callPercent} <FaArrowRight size={8} />
                  </span>
                  <span className="text-gray-500">{item.time}</span>
                </div>
                <div className="w-full h-16 mt-2">
                  <Line data={item.data} options={options} />
                </div>
              </div>
            </div>
          </div>
        ))}
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
