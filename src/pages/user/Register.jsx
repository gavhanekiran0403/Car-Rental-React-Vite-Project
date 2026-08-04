import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

import {
    FaUser,
    FaEnvelope,
    FaPhoneAlt,
    FaLock,
    FaCarSide,
    FaUpload
} from "react-icons/fa";

const Register = () => {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        licensePhoto: null,
        terms: false,
    });

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

    };

    const handleFile = (e) => {

        setFormData({
            ...formData,
            licensePhoto: e.target.files[0],
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(formData);

    };

    return (

        <div className="register-page">

            <div className="register-container">

                {/* LEFT */}

                <div className="register-left">

                    <div className="register-overlay">

                        <FaCarSide className="register-icon"/>

                        <h1>CarRental</h1>

                        <p>

                            Join today and book your dream car
                            with luxury, comfort and safety.

                        </p>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="register-right">

                    <form
                        className="register-form"
                        onSubmit={handleSubmit}
                    >

                        <h2>Create Account</h2>

                        <p>
                            Register to continue.
                        </p>

                        <div className="input-group">

                            <FaUser/>

                            <input
                                type="text"
                                placeholder="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="input-group">

                            <FaEnvelope/>

                            <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="input-group">

                            <FaPhoneAlt/>

                            <input
                                type="tel"
                                placeholder="Mobile Number"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="input-group">

                            <FaLock/>

                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="input-group">

                            <FaLock/>

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="upload-box">

                            <label>

                                <FaUpload/>

                                Upload Driving License

                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFile}
                                required
                            />

                        </div>

                        <div className="terms">

                            <label>

                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    required
                                />

                                I agree to the Terms &
                                Conditions

                            </label>

                        </div>

                        <button
                            type="submit"
                            className="register-btn"
                        >

                            Register

                        </button>

                        <p className="login-link">

                            Already have an account?

                            <Link to="/login">

                                Login

                            </Link>

                        </p>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default Register;