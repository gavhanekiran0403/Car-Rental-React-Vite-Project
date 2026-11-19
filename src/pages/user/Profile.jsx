import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileDetails from "../../components/user/Profile/ProfileDetails";
import UpdateProfile from "../../components/user/Profile/UpdateProfile";
import ChangePassword from "../../components/user/Profile/ChangePassword";
import MyBookings from "../../components/user/Profile/MyBookings";

import {
  FaUser,
  FaEdit,
  FaKey,
  FaCar,
  FaSignOutAlt,
} from "react-icons/fa";

import "./Profile.css";
import authService from "../../services/authService";

const Profile = () => {
  const [page, setPage] = useState("details");
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("loggedUser")));

  const navigate = useNavigate();

  const handleLogout = async () => { 
    const confirmLogout = window.confirm( 
      "Are you sure you want to logout?" 
    ); 

    if (!confirmLogout) { 
      return; 
    } 
    
    try { 
      if (user?.userId) { 
        await authService.logout(user.userId); 
      } 
    } catch (error) { 
      console.error("Logout API error:", error); 
    } finally { 
      // Clear frontend session even if API logout fails 
        localStorage.removeItem("token"); 
        localStorage.removeItem("loggedUser"); 
        localStorage.removeItem("adminSession"); 

        setUser(null); 

        navigate("/login", { 
          replace: true, 
        }); 
        
        } 
      };

  const handleProfileSaved = (updatedUser) => {
    setUser(updatedUser);
    setPage("details");
  };

  const handlePasswordChanged = (updatedUser) => {
    setUser(updatedUser);
    setPage("details");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* Left Menu */}

        <div className="profile-sidebar">

          <h2>My Account</h2>

          <button
            className={page === "details" ? "active" : ""}
            onClick={() => setPage("details")}
          >
            <FaUser />
            Profile
          </button>

          <button
            className={page === "bookings" ? "active" : ""}
            onClick={() => setPage("bookings")}
          >
            <FaCar />
            My Bookings
          </button>

          <button
            className={page === "edit" ? "active" : ""}
            onClick={() => setPage("edit")}
          >
            <FaEdit />
            Update Profile
          </button>

          <button
            className={page === "password" ? "active" : ""}
            onClick={() => setPage("password")}
          >
            <FaKey />
            Change Password
          </button>

          {/* Logout */}

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

        {/* Right Content */}

        <div className="profile-content">

          {page === "details" && <ProfileDetails user={user} />}

          {page === "bookings" && <MyBookings />}

          {page === "edit" && (
            <UpdateProfile
              user={user}
              onSaved={handleProfileSaved}
              onCancel={() => setPage("details")}
            />
          )}

          {page === "password" && (
            <ChangePassword
              user={user}
              onPasswordChanged={handlePasswordChanged}
              onCancel={() => setPage("details")}
            />
          )}

        </div>

      </div>
    </div>
  );
};

export default Profile;
