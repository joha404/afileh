import { IoNotificationsOutline } from "react-icons/io5";
import img from "@/assets/images/profile_image.png";
import { useState, useEffect, useRef } from "react";
import { Modal } from "antd";
import SignInModal from "@/components/auth/SignInModal";
import SignUpModal from "@/components/auth/SignUpModal";
import { MdDashboard } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { GetSingleUser } from "@/components/api/auth";
import userIcon from "@/assets/images/userIcon.jpg";

const Header = ({ isSidebarOpen, handleSidebar }) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const popupRef = useRef(null);
  const profileImgRef = useRef(null);
  const [userDetails, setUserDetails] = useState("");

  const fetchUserData = () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken === null) {
      setIsSignIn(true);
    } else {
      setIsSignIn(false);
    }
  };
  const fetchSingleUser = async () => {
    try {
      const singleUserData = await GetSingleUser();
      setUserDetails(singleUserData);
    } catch (error) {
      console.log("Something Went Wrong ", error);
    }
  };
  useEffect(() => {
    fetchUserData();
    fetchSingleUser();
  }, []);

  const handleProfileClick = () => {
    setShowDetails(!showDetails);
  };

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
        setShowDetails(false);
        setIsSignUp(true);
        setIsSignIn(false);

        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          confirmButtonColor: "#3EC65D",
        });
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !profileImgRef.current.contains(event.target)
      ) {
        setShowDetails(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header className="w-full flex sticky lg:p-6 p-2 bg-white top-0 z-10">
      <div className="w-full flex lg:gap-5 gap-3">
        <button className="2xl:hidden block" onClick={handleSidebar}>
          <MdDashboard size={40} className="text-[#3EC65D]" />
        </button>

        <div className="w-full hidden sm:block">
          <h1 className="text-[#161C24] md:text-2xl text-xl font-semibold">
            {userDetails
              ? `Welcome Back, ${userDetails.name}`
              : "Welcome Back, Guest"}
          </h1>
          <p className="text-[#919EAB] md:text-lg text-base">
            {userDetails
              ? "Here is your performance rate 😊"
              : "Sign in to view your dashboard"}
          </p>
        </div>
      </div>

      <div className="w-full flex sm:gap-5 gap-3 justify-end items-center">
        <IoNotificationsOutline className="text-2xl cursor-pointer" />
        <div
          ref={profileImgRef}
          className="sm:w-12 w-10 sm:h-12 h-10 cursor-pointer overflow-hidden rounded-full"
          onClick={handleProfileClick}
        >
          <img
            className="w-full h-full object-cover"
            src={userDetails.profile_image_url ?? userIcon}
            alt="profile"
          />
        </div>

        <div className="flex flex-col sm:text-base text-sm text-right">
          <p>{userDetails ? userDetails.name : "Guest"}</p>
          <p>{userDetails ? userDetails.role : "User"}</p>
        </div>
        {showDetails && (
          <div
            ref={popupRef}
            className="absolute bg-white  rounded-lg mt-30 z-[999]  shadow-lg p-2 "
          >
            <div className="z-10  flex flex-col  w-27 ">
              <a
                onClick={handleLogout}
                className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#eef2f5] text-[#eef2f5] text-white"
              >
                <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#eef2f5] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative flex justify-between items-center text-[#328E6E] transition duration-300 group-hover:text-black ease">
                  <p className="text-[12px]">Log Out</p>{" "}
                  <FaSignOutAlt size={12} />
                </span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Sign In Modal */}
      <Modal
        closable={false}
        className="custom-modal xl:min-w-[900px] lg:min-w-[750px] md:min-w-[650px] sm:min-w-[550px] min-w-[300px]"
        footer={null}
        centered
        open={isSignIn}
      >
        <SignInModal setIsSignIn={setIsSignIn} setIsSignUp={setIsSignUp} />
      </Modal>

      {/* Sign Up Modal */}
      <Modal
        closable={false}
        className="custom-modal xl:min-w-[900px] lg:min-w-[750px] md:min-w-[650px] sm:min-w-[550px] min-w-[300px]"
        footer={null}
        centered
        open={isSignUp}
      >
        <SignUpModal setIsSignIn={setIsSignIn} setIsSignUp={setIsSignUp} />
      </Modal>
    </header>
  );
};

export default Header;
