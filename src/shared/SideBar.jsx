import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Modal } from "antd";
import { MdOutlineDashboard } from "react-icons/md";
import { RiMessage2Line, RiLineChartLine } from "react-icons/ri";
import { IoMdCall } from "react-icons/io";
import { MdLeaderboard } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { IoMdClose } from "react-icons/io"; // Close Icon
import HelpLineModal from "@/components/auth/HelpLineModal";
import logo from "@/assets/images/logo.png";
import Swal from "sweetalert2";

const SideBar = ({ isSidebarOpen, handleSidebar, closeSidebar, ref }) => {
  const [isHelp, setIsHelp] = useState(false);
  const sidebarItems = [
    { id: 1, path: "/", icon: <MdOutlineDashboard />, element: "Dashboard" },
    {
      id: 2,
      path: "/ai_caller",
      icon: <RiMessage2Line />,
      element: "AI Caller",
    },
    {
      id: 3,
      path: "/assignment",
      icon: <RiLineChartLine />,
      element: "Assignment",
    },
    { id: 4, path: "/call_log", icon: <IoMdCall />, element: "Call Log" },
    {
      id: 5,
      path: "/leaderboard",
      icon: <MdLeaderboard />,
      element: "Leaderboard",
    },
  ];
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out and your session will be cleared.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3EC65D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("access_token");

        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          confirmButtonColor: "#3EC65D",
        });
        window.location.reload();
      }
    });
  };
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`sm:w-[350px] w-full shrink-0 h-full bg-dark text-white sm:p-6 p-3 flex flex-col gap-6 fixed 2xl:relative z-50 top-0 left-0 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          2xl:translate-x-0`}
        ref={ref}
      >
        {/* Close Button for Small Screens */}
        <button
          className="absolute top-4 right-4 2xl:hidden text-white text-3xl"
          onClick={handleSidebar}
        >
          <IoMdClose />
        </button>

        {/* Logo */}
        <Link
          onClick={closeSidebar}
          to="/"
          className="sm:w-[172px] w-[140px] h-[96px] mb-3"
        >
          <img className="w-full h-full object-contain" src={logo} alt="logo" />
        </Link>

        {/* Sidebar Links */}
        <div className="flex flex-col sm:gap-5 gap-1 h-full overflow-y-auto">
          {sidebarItems.map((item) => (
            <NavLink
              onClick={closeSidebar}
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center sm:gap-6 gap-4 text-3xl p-4 rounded-lg ${
                  isActive ? "bg-green-500 text-white" : "hover:bg-gray-700"
                }`
              }
            >
              {item.icon}
              <p className="text-lg">{item.element}</p>
            </NavLink>
          ))}
        </div>

        {/* Help & Sign Out */}
        <div
          onClick={closeSidebar}
          className="flex flex-col sm:gap-5 gap-1 sticky bottom-0"
        >
          <div
            className="w-full text-lg hover:bg-gray-700 cursor-pointer rounded-lg p-4"
            onClick={() => setIsHelp(true)}
          >
            Help
          </div>
          <button
            className="w-full flex items-center gap-6 p-4 rounded-lg cursor-pointer hover:bg-gray-700"
            onClick={handleLogout}
          >
            <PiSignOutBold className="text-3xl" />
            <span className="text-lg">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Help Modal */}
      <Modal
        closable={false}
        className="custom-modal xl:min-w-[900px] lg:min-w-[750px] md:min-w-[650px] sm:min-w-[550px] min-w-[300px]"
        footer={null}
        centered
        open={isHelp}
        onCancel={() => setIsHelp(false)}
      >
        <HelpLineModal setIsHelp={setIsHelp} />
      </Modal>
    </>
  );
};

export default SideBar;
