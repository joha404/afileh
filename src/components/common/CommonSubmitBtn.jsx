import { Link } from "react-router-dom";
import Loader from "@/components/common/Loader";

const CommonSubmitBtn = ({
  children,
  type = "submit",
  link = false,
  className = "",
  path = "",
  isLoading = false,
  onclick,
}) => {
  const commonStyle =
    " w-full cursor-pointer flex justify-center items-center gap-3 sm:px-5 px-1 font-medium text-lg text-white bg-[#3EC65D] rounded-[8px]  sm:min-h-[50px] min-h-10 ";
  return (
    <>
      {link ? (
        <Link to={path} className={` ${commonStyle} ${className}`}>
          {children}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onclick}
          className={` ${commonStyle} ${className}`}
        >
          {isLoading ? <Loader size={25} color="white" speed={1} /> : children}
        </button>
      )}
    </>
  );
};

export default CommonSubmitBtn;
