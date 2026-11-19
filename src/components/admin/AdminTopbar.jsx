import { Link, useLocation } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";
import "./AdminTopbar.css";

const names = { "/admin": "Dashboard", "/admin/dashboard": "Dashboard", "/admin/users": "Users", "/admin/cars": "Cars", "/admin/owners": "Owners", "/admin/banks": "Banks", "/admin/bookings": "Bookings", "/admin/notifications": "Notifications", "/admin/profile": "Profile" };

const AdminTopbar = () => {
  const { pathname } = useLocation();
  return (
    <header className="admin-topbar">

      <div><h1>{names[pathname] || "Admin"}</h1><p>Car rental management workspace</p></div>
      <div className="topbar-actions"><label className="topbar-search"><FaSearch /><input placeholder="Search anything..." aria-label="Search" /></label><Link to="/admin/notifications" className="notification-button" aria-label="Notifications"><FaBell /><b>3</b></Link><Link to="/admin/profile" className="topbar-user"><span className="avatar">A</span><span><strong>Alex Morgan</strong><small>Administrator</small></span></Link></div>

    </header>
  );
};

export default AdminTopbar;
