import React from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { IoIosArrowForward } from "react-icons/io";
function CallDropRate({ dashboardData, isLoading }) {
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
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Call Drop Rate",
        data: [dashboardData.call_drop_rate, 35, 50, 45, 60, 40, 70],
        borderColor: "red",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div>
      <div className="w-full rounded-lg shadow bg-white">
        <div className="w-full py-2 px-3.5 flex justify-start items-center gap-3 border-b border-[#E1E7EC]">
          <div className="shrink-0"></div>
          <div className="w-full ">
            <div className="flex  items-center">
              <FaPhoneVolume />
              <h1 className="xs:text-lg mx-2 text-base flex flex-col text-[#161C24] font-semibold">
                Call Drop Rate
              </h1>
            </div>

            {/* <p className="text-[#919EAB] text-xs">
              Averate Drop Rate : {dashboardData.call_drop_rate} %
            </p> */}
          </div>
          <IoIosArrowForward size={36} />
        </div>
        <div className="w-full flex p-4 flex-col justify-start items-start">
          <h2 className="md:text-[22px] flex items-center gap-4 xs:text-xl text-lg text-[#161C24] font-medium">
            Call Drop Rate{" "}
            {isLoading ? (
              <div className="flex space-x-2 justify-center items-center bg-white h-1 dark:invert">
                <span className="sr-only">Loading...</span>
                <div className="h-2 w-2 bg-[red] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 bg-[red] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 bg-[red] rounded-full animate-bounce"></div>
              </div>
            ) : (
              parseInt(dashboardData.call_drop_rate)
            )}{" "}
            %
          </h2>

          <div className="w-full">
            {/* <div className="flex justify-between items-center gap-1 text-green-500 text-[8px] font-medium">
              <span className="flex gap-2">
                {dropRate} <FaArrowRight size={8} />
              </span>
              <span className="text-gray-500">{formattedTime}</span>
            </div> */}
            <div className="w-full h-16 mt-2">
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallDropRate;
