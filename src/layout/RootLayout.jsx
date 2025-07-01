import Header from "@/shared/Header";
import SideBar from "@/shared/SideBar";
import { useState, useRef, useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [hasAccessToken, setHasAccessToken] = useState(false);

  const handleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setHasAccessToken(!!token);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="w-full h-screen flex relative">
      {/* ✅ Conditionally render SideBar only if token exists */}
      {hasAccessToken && (
        <SideBar
          ref={sidebarRef}
          isSidebarOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
          handleSidebar={handleSidebar}
        />
      )}
      <div className="w-full h-full overflow-y-auto flex flex-col">
        <Header isSidebarOpen={isSidebarOpen} handleSidebar={handleSidebar} />
        <div className="w-full lg:p-10 p-3">
          <Outlet />
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default RootLayout;
