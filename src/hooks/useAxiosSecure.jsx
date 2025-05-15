import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const { logout } = auth;
    const accessToken = localStorage.getItem("accessToken");
    const axiosSecure = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 30000, // Default timeout
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    // Response Interceptor - Handle errors
    axiosSecure.interceptors.response.use(
        (response) => response,
        (error) => {
            let errorMessage = "Something went wrong!!!";
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 403) {
                    errorMessage = "Session expired. Please log in again.";
                    toast.error(errorMessage);
                    logout(); // Log the user out
                    navigate("/"); // Redirect to login page
                } else if (error.response.status === 500) {
                    errorMessage = "Internal server error, please try again later.";
                    toast.error(errorMessage);
                }
            } else if (error.request) {
                errorMessage = "Network issue, try again.";
                toast.error(errorMessage);
            } else {
                errorMessage = "Request failed.";
                toast.error(errorMessage);
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;



