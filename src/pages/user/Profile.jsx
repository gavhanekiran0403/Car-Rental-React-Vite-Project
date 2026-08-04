import React, { useState } from "react";

import ProfileDetails from "../../components/user/Profile/ProfileDetails";
import UpdateProfile from "../../components/user/Profile/UpdateProfile";
import ChangePassword from "../../components/user/Profile/ChangePassword";
import MyBookings from "../../components/user/Profile/MyBookings";

import {
    FaUser,
    FaEdit,
    FaKey,
    FaCar
} from "react-icons/fa";

import "./Profile.css";

const Profile = () => {

    const [page, setPage] = useState("details");

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

                </div>

                {/* Right Content */}

                <div className="profile-content">

                    {page === "details" && <ProfileDetails />}

                    {page === "bookings" && <MyBookings />}

                    {page === "edit" && (
                        <UpdateProfile
                            onCancel={() => setPage("details")}
                        />
                    )}

                    {page === "password" && (
                        <ChangePassword
                            onCancel={() => setPage("details")}
                        />
                    )}

                </div>

            </div>

        </div>

    );

};

export default Profile;