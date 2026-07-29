import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">

      <h2 className="logo">Admin Panel</h2>

      <ul className="sidebar-menu">
        <li>Dashboard</li>
        <li>Manage Cars</li>
        <li>Bookings</li>
        <li>Users</li>
        <li>Reports</li>
        <li>Logout</li>
      </ul>

    </aside>
  );
};

export default AdminSidebar;