import { Outlet } from "react-router-dom";
import "./AdminLayout.css";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <AdminTopbar />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
