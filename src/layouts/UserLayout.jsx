import { Outlet } from "react-router-dom";
import Navbar from "../components/user/Navbar";
import Footer from "../components/user/Footer";
import "./UserLayout.css";

const UserLayout = () => {
  return (
    <div className="user-layout">
      <Navbar />

      <main className="user-main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default UserLayout;