import { createBrowserRouter, Navigate, Outlet } from "react-router";
import MasterLayout from "./MasterLayout";

import UserDashboard from "./page/dashboard/UserDashboard";
import UserProfile from "./page/profile/UserProfile";
import TemplateUsage from "./page/actionBoard/TemplateUsage";
import { TeamplateUsageCreate } from "./page/actionBoard/TeamplateUsageCreate";
import { ActionTask } from "./page/actionBoard/ActionTask";
import Login from "./page/login/Login";
// import PublicRoute from "./page/PublicRoute";
// import AuthGuard from "./page/AuthGuard";

const token = localStorage.getItem("token");
const Router = createBrowserRouter([
  // 🔓 LOGIN ROUTE
  {
    path: "/login",
     element: (token) ? <Navigate to="/" replace />:<Login />
  },

  // 🔐 PROTECTED ROUTES
  {
    path: "/",
    element: token ? <Outlet /> : <Navigate to="/login" replace />,
    children: [
      {
        element: <MasterLayout />,
        children: [
          { index: true, element: <UserDashboard /> },
          { path: "profile", element: <UserProfile /> },
          { path: "template-usage", element: <TemplateUsage /> },
          { path: "template-usage-create", element: <TeamplateUsageCreate /> },
          { path: "action-tasks", element: <ActionTask /> },
        ],
      },
    ],
  },
]);

export default Router;
