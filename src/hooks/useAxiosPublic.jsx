import axios from 'axios';
import { toast } from 'react-hot-toast';  // Assuming you're using react-hot-toast for toasts

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 30000, // Default timeout
    });

    // Response Interceptor - handle errors globally and show toast notifications
    axiosPublic.interceptors.response.use(
        (response) => {
            return response; // If the response is successful, return the data
        },
        (error) => {
            let errorMessage = 'Something went wrong!!!';
            // Handle server-side errors (e.g., 500)
            if (error.response) {
                if (error.response.status === 500) {
                    errorMessage = 'Internal server error, please try again later.';
                    toast.error(errorMessage);
                }
                console.error('API Error:', error);
            }
            // Handle network errors (e.g., no response from the server)
            else if (error.request) {
                errorMessage = 'Network issue, try again.';  // Short message for network errors
                console.error('Network Error:', error?.message);
                toast.error(errorMessage);  // Display network error via toast
            }

            // Reject the promise with the error to propagate it further if needed
            return Promise.reject(error);  // Propagate the original error
        }
    );

    return axiosPublic;
};

export default useAxiosPublic;
