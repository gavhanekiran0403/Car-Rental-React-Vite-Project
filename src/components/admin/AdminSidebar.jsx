import { NavLink } from "react-router-dom";
import { FaBell, FaCarSide, FaChartPie, FaCreditCard, FaHome, FaSignOutAlt, FaUsers, FaUserTie } from "react-icons/fa";
import "./AdminSidebar.css";

const links = [
  ["Dashboard", "/admin/dashboard", FaHome],
  ["Users", "/admin/users", FaUsers],
  ["Cars", "/admin/cars", FaCarSide],
  ["Owners", "/admin/owners", FaUserTie],
  ["Banks", "/admin/banks", FaCreditCard],
  ["Bookings", "/admin/bookings", FaChartPie],
  ["Notifications", "/admin/notifications", FaBell],
];

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">

      <NavLink className="admin-brand" to="/admin/dashboard"><FaCarSide /><span>Drive<span>Hub</span></span></NavLink>
      <p className="admin-brand-caption">ADMIN CONSOLE</p>
      <nav className="sidebar-menu" aria-label="Admin navigation">
        {links.map(([label, path, Icon]) => <NavLink key={path} to={path} className={({ isActive }) => isActive ? "active" : ""}><Icon /><span>{label}</span>{label === "Notifications" && <b>3</b>}</NavLink>)}
      </nav>
      <NavLink className="sidebar-profile" to="/admin/profile"><span className="avatar">A</span><span><strong>Alex Morgan</strong><small>Administrator</small></span></NavLink>
      <button className="sidebar-logout" type="button" onClick={() => { localStorage.removeItem("adminSession"); window.location.assign("/login"); }}><FaSignOutAlt /> Log out</button>

    </aside>
  );
};

export default AdminSidebar;
