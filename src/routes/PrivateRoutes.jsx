// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");

  return token ? children : <Navigate to="/ai_caller" replace />;
};

export default ProtectedRoute;
