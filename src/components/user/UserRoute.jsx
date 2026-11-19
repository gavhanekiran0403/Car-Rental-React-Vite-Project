import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function UserRoute() {
  const location = useLocation();
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("loggedUser"));
  } catch {
    localStorage.removeItem("loggedUser");
  }

  return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}
