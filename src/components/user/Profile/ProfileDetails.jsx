import React from "react";
import "./ProfileDetails.css";

const ProfileDetails = ({ onEdit, onPassword }) => {

    const user = {
        fullName: "Kiran Gavhane",
        email: "kiran@gmail.com",
        mobile: "9876543210",
        drivingLicense:
            "https://via.placeholder.com/500x280?text=Driving+License"
    };

    return (

        <div className="profile-details-card">

            <h2>My Profile</h2>

            <p className="profile-subtitle">
                View your personal information.
            </p>

            <div className="profile-info">

                <div className="profile-row">
                    <span>Full Name</span>
                    <p>{user.fullName}</p>
                </div>

                <div className="profile-row">
                    <span>Email Address</span>
                    <p>{user.email}</p>
                </div>

                <div className="profile-row">
                    <span>Mobile Number</span>
                    <p>{user.mobile}</p>
                </div>

            </div>

            <div className="license-section">

                <h3>Driving License</h3>

                <img
                    src={user.drivingLicense}
                    alt="Driving License"
                />

            </div>

        </div>

    );

};

export default ProfileDetails;