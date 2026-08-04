import React, { useState } from "react";
import "./ChangePassword.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = ({ onCancel }) => {

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setPassword({
            ...password,
            [name]: value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (password.newPassword !== password.confirmPassword) {

            alert("New Password and Confirm Password do not match.");

            return;

        }

        alert("Password Changed Successfully");

        onCancel();

    };

    return (

        <div className="change-password-card">

            <h2>Change Password</h2>

            <p className="change-password-subtitle">
                Update your account password securely.
            </p>

            <form onSubmit={handleSubmit}>

                {/* Current Password */}

                <div className="password-group">

                    <label>Current Password</label>

                    <div className="password-input">

                        <input
                            type={showCurrent ? "text" : "password"}
                            name="currentPassword"
                            value={password.currentPassword}
                            onChange={handleChange}
                            required
                        />

                        <span
                            onClick={() => setShowCurrent(!showCurrent)}
                        >
                            {showCurrent ? <FaEyeSlash /> : <FaEye />}
                        </span>

                    </div>

                </div>

                {/* New Password */}

                <div className="password-group">

                    <label>New Password</label>

                    <div className="password-input">

                        <input
                            type={showNew ? "text" : "password"}
                            name="newPassword"
                            value={password.newPassword}
                            onChange={handleChange}
                            required
                        />

                        <span
                            onClick={() => setShowNew(!showNew)}
                        >
                            {showNew ? <FaEyeSlash /> : <FaEye />}
                        </span>

                    </div>

                </div>

                {/* Confirm Password */}

                <div className="password-group">

                    <label>Confirm Password</label>

                    <div className="password-input">

                        <input
                            type={showConfirm ? "text" : "password"}
                            name="confirmPassword"
                            value={password.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                        <span
                            onClick={() => setShowConfirm(!showConfirm)}
                        >
                            {showConfirm ? <FaEyeSlash /> : <FaEye />}
                        </span>

                    </div>

                </div>

                <div className="password-buttons">

                    <button
                        type="submit"
                        className="change-btn"
                    >
                        Change Password
                    </button>

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );

};

export default ChangePassword;