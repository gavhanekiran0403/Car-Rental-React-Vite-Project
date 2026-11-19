import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AdminRoute() {
  const location = useLocation();
  const session = JSON.parse(localStorage.getItem("adminSession"));

  if (!session?.role || session.role !== "admin") {
    return <Navigate to="/admin-login" replace state={{ from: location.pathname, adminRequired: true }} />;
  }

  return <Outlet />;
}
