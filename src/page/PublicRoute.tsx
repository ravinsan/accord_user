import { Navigate } from "react-router";
import Login from "@/page/login/Login";

const PublicRoute = () => {
  const token = localStorage.getItem("token");

  // ✅ already logged in → dashboard
  if (token) {
    return <Navigate to="/" replace />;
  }

  // ❌ not logged in → login page
  return <Login />;
};

export default PublicRoute;
