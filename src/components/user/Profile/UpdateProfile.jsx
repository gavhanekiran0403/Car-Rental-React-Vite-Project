import React, { useState } from "react";
import "./UpdateProfile.css";

const UpdateProfile = ({ user: currentUser, onCancel, onSaved }) => {

    const [user, setUser] = useState({
        fullName: currentUser.fullName,
        email: currentUser.email,
        mobile: currentUser.mobile,
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

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const emailTaken = users.some((storedUser) =>
            storedUser.email.toLowerCase() === user.email.trim().toLowerCase() &&
            storedUser.email !== currentUser.email
        );

        if (emailTaken) {
            alert("Another account already uses this email address.");
            return;
        }

        const updatedUser = {
            ...currentUser,
            fullName: user.fullName.trim(),
            email: user.email.trim().toLowerCase(),
            mobile: user.mobile.trim(),
            drivingLicense: user.drivingLicense || currentUser.drivingLicense || null,
        };
        const updatedUsers = users.map((storedUser) =>
            storedUser.email === currentUser.email ? updatedUser : storedUser
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
        alert("Profile Updated Successfully");
        onSaved(updatedUser);

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
                        required
                    />

                </div>

                <div className="update-group">

                    <label>Email Address</label>

                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="update-group">

                    <label>Mobile Number</label>

                    <input
                        type="text"
                        name="mobile"
                        value={user.mobile}
                        onChange={handleChange}
                        required
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
