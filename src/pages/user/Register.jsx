import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

import {
    FaUser,
    FaEnvelope,
    FaPhoneAlt,
    FaLock,
    FaCarSide
} from "react-icons/fa";

import authService from "../../services/authService";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        terms: false
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) {
            return;
        }

        if (!formData.fullName.trim()) {
            alert("Please enter your full name.");
            return;
        }

        if (!formData.email.trim()) {
            alert("Please enter your email address.");
            return;
        }

        if (!formData.mobile.trim()) {
            alert("Please enter your mobile number.");
            return;
        }

        if (!formData.password) {
            alert("Please enter your password.");
            return;
        }

        if (
            formData.password !==
            formData.confirmPassword
        ) {
            alert("Passwords do not match.");
            return;
        }

        if (!formData.terms) {
            alert(
                "Please accept Terms & Conditions."
            );
            return;
        }

        try {

            setLoading(true);

            const userData = {
                fullName: formData.fullName.trim(),
                email: formData.email.trim().toLowerCase(),
                phoneNo: formData.mobile.trim(),
                password: formData.password
            };

            console.log(
                "Registration data:",
                userData
            );

            const response =
                await authService.register(userData);

            console.log(
                "Registration response:",
                response.data
            );

            const result = response.data;

            if (
                result.success === true ||
                response.status === 200 ||
                response.status === 201
            ) {

                alert(
                    result.message ||
                    "User successfully registered!"
                );

                setFormData({
                    fullName: "",
                    email: "",
                    mobile: "",
                    password: "",
                    confirmPassword: "",
                    terms: false
                });

                navigate("/login");

            } else {

                alert(
                    result.message ||
                    "Registration failed."
                );
            }

        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            if (error.response) {

                const responseData =
                    error.response.data;

                alert(
                    responseData?.message ||
                    responseData?.error ||
                    (
                        typeof responseData === "string"
                            ? responseData
                            : "Registration failed."
                    )
                );

            } else if (error.request) {

                alert(
                    "Unable to connect to server. " +
                    "Please make sure Spring Boot is running."
                );

            } else {

                alert(
                    error.message ||
                    "Something went wrong."
                );
            }

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="register-page">

            <div className="register-container">

                <div className="register-left">

                    <div className="register-overlay">

                        <FaCarSide
                            className="register-icon"
                        />

                        <h1>
                            CarRental
                        </h1>

                        <p>
                            Join today and book your dream car
                            with luxury, comfort and safety.
                        </p>

                    </div>

                </div>

                <div className="register-right">

                    <form
                        className="register-form"
                        onSubmit={handleSubmit}
                    >

                        <h2>
                            Create Account
                        </h2>

                        <p>
                            Register to continue.
                        </p>

                        <div className="input-group">

                            <FaUser />

                            <input
                                type="text"
                                placeholder="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                autoComplete="name"
                                required
                            />

                        </div>

                        <div className="input-group">

                            <FaEnvelope />

                            <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                required
                            />

                        </div>

                        <div className="input-group">

                            <FaPhoneAlt />

                            <input
                                type="tel"
                                placeholder="Mobile Number"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                autoComplete="tel"
                                required
                            />

                        </div>

                        <div className="input-group">

                            <FaLock />

                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                                required
                            />

                        </div>

                        <div className="input-group">

                            <FaLock />

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
                                required
                            />

                        </div>

                        <div className="terms">

                            <label>

                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={
                                        formData.terms
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <span>
                                    I agree to the Terms &
                                    Conditions
                                </span>

                            </label>

                        </div>

                        <button
                            type="submit"
                            className="register-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Registering..."
                                : "Register"}
                        </button>

                        <p className="login-link">

                            Already have an account?

                            {" "}

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
