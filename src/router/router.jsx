import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import Dashboard from "@/page/Dashboard";
import AICaller from "@/page/AICaller";
import Assignment from "@/page/Assignment";
import CallLog from "@/page/CallLog";
import LeaderBoard from "@/page/LeaderBoard";
import ProtectedRoute from "@/routes/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ai_caller",
        element: <AICaller />,
      },
      {
        path: "/assignment",
        element: (
          <ProtectedRoute>
            <Assignment />
          </ProtectedRoute>
        ),
      },
      {
        path: "/call_log",
        element: (
          <ProtectedRoute>
            <CallLog />
          </ProtectedRoute>
        ),
      },
      {
        path: "/leaderboard",
        element: (
          <ProtectedRoute>
            <LeaderBoard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <h1>Page Not Found</h1>,
  },
]);

export default router;
