import React from "react";
import "./ProfileDetails.css";

const ProfileDetails = ({ user }) => {
    const profile = {
        fullName: user.fullName,
        email: user.email,
        mobile: user.phoneNo,
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
                    <p>{profile.fullName}</p>
                </div>

                <div className="profile-row">
                    <span>Email Address</span>
                    <p>{profile.email}</p>
                </div>

                <div className="profile-row">
                    <span>Mobile Number</span>
                    <p>{profile.mobile}</p>
                </div>

            </div>

            <div className="license-section">

                <h3>Driving License</h3>

                <img
                    src={profile.drivingLicense}
                    alt="Driving License"
                />

            </div>

        </div>

    );

};

export default ProfileDetails;
