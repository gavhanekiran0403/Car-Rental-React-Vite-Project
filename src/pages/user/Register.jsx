import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        terms: false,
    });

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        // Check password match
        if(formData.password !== formData.confirmPassword){
            alert("Passwords do not match");
            return;
        }

        // Get existing users
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // check if email already exists
        const userExists = users.find(
            (user) => user.email === formData.email
        );

        if(userExists){
            alert("User already registered with this email.");
            return;
        }

        // Create new user object
        const newUser = {
            fullName : formData.fullName,
            email : formData.email,
            mobile : formData.mobile,
            password : formData.password,
        };

        //save user
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("User successfully registered");

        setFormData({
            fullName : "",
            email : "",
            mobile : "",
            password : "",
            confirmPassword : "",
            terms : false,
        });

        console.log(users);

        // Redirect to Login page
        navigate("/login");

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