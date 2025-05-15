import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import Dashboard from "@/page/Dashboard";
import AICaller from "@/page/AICaller";
import Assignment from "@/page/Assignment";
import CallLog from "@/page/CallLog";
import LeaderBoard from "@/page/LeaderBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/ai_caller",
        element: <AICaller />,
      },
      {
        path: "/assignment",
        element: <Assignment />,
      },
      {
        path: "/call_log",
        element: <CallLog />,
      },
      {
        path: "/leaderboard",
        element: <LeaderBoard />,
      },
    ],
  },
  {
    path: "*",
    element: () => <h1>Page Not Found</h1>,
  },
]);

export default router;
