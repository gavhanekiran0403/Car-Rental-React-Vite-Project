import React, { useState } from "react";
import "./UpdateProfile.css";

const UpdateProfile = ({ onCancel }) => {

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    const [user, setUser] = useState({
        fullName: loggedUser.fullName,
        email: loggedUser.email,
        mobile: loggedUser.mobile,
        drivingLicense: null
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });

    };

    const handleImage = (e) => {

        if (e.target.files[0]) {

            setUser({
                ...user,
                drivingLicense: URL.createObjectURL(e.target.files[0])
            });

        }

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        alert("Profile Updated Successfully");

        onCancel();

    };

    return (

        <div className="update-profile-card">

            <h2>Update Profile</h2>

            <p className="update-subtitle">
                Update your personal information.
            </p>

            <form onSubmit={handleSubmit}>

                <div className="update-group">

                    <label>Full Name</label>

                    <input
                        type="text"
                        name="fullName"
                        value={user.fullName}
                        onChange={handleChange}
                    />

                </div>

                <div className="update-group">

                    <label>Email Address</label>

                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />

                </div>

                <div className="update-group">

                    <label>Mobile Number</label>

                    <input
                        type="text"
                        name="mobile"
                        value={user.mobile}
                        onChange={handleChange}
                    />

                </div>

                <div className="update-group">

                    <label>Driving License Photo</label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                    />

                </div>

                {user.drivingLicense && (

                    <div className="update-license-preview">

                        <img
                            src={user.drivingLicense}
                            alt="Driving License"
                        />

                    </div>

                )}

                <div className="update-buttons">

                    <button
                        type="submit"
                        className="save-profile-btn"
                    >
                        Save Changes
                    </button>

                    <button
                        type="button"
                        className="cancel-profile-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );

};

export default UpdateProfile;