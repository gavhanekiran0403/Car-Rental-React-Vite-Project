import React, { useState } from "react";
import "./Login.css";
import { FaEnvelope, FaLock, FaCarSide } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Login = ({ mode = "user" }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isAdminLogin = mode === "admin";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) {
            return;
        }

        const normalizedUsername = username.trim();

        if (!normalizedUsername) {
            alert("Please enter your email or phone number.");
            return;
        }

        if (!password) {
            alert("Please enter your password.");
            return;
        }

        try {
            setLoading(true);

            // Backend LoginDto expects:
            // username + password
            //
            // username can be EMAIL or PHONE NUMBER
            const loginData = {
                username: normalizedUsername,
                password: password,
            };

            console.log("Login request:", loginData);

            const response = await authService.login(loginData);

            const result = response.data;

            console.log("Login response:", result);

            // Backend response:
            // {
            //   message: "...",
            //   success: true,
            //   data: {
            //      token,
            //      userId,
            //      fullName,
            //      email,
            //      phoneNo,
            //      role
            //   }
            // }

            if (!result.success || !result.data) {
                alert(result.message || "Login failed.");
                return;
            }

            const userData = result.data;

            // Check JWT token
            if (!userData.token) {
                alert("Login successful, but token was not received.");
                return;
            }

            // Normalize role
            const role = String(userData.role || "")
                .replace("ROLE_", "")
                .toUpperCase();

            console.log("Logged-in role:", role);

            /*
             * ADMIN LOGIN
             *
             * Admin login page can only be used by ADMIN.
             */
            if (isAdminLogin) {
                if (role !== "ADMIN") {
                    alert(
                        "Access denied. Only administrators can login here."
                    );
                    return;
                }

                const adminSession = {
                    userId: userData.userId,
                    fullName: userData.fullName,
                    email: userData.email,
                    phoneNo: userData.phoneNo,
                    role: role,
                };

                // Store JWT
                localStorage.setItem("token", userData.token);

                // Store logged user
                localStorage.setItem(
                    "loggedUser",
                    JSON.stringify(adminSession)
                );

                // Store admin session
                localStorage.setItem(
                    "adminSession",
                    JSON.stringify(adminSession)
                );

                alert(result.message || "Admin login successful!");

                navigate(
                    location.state?.from || "/admin/dashboard",
                    {
                        replace: true,
                    }
                );

                return;
            }

            /*
             * USER LOGIN
             *
             * Normal login page can only be used by USER.
             */
            if (role !== "USER") {
                alert(
                    "This account is not a user account. Please use Admin Login."
                );
                return;
            }

            const loggedUser = {
                userId: userData.userId,
                fullName: userData.fullName,
                email: userData.email,
                phoneNo: userData.phoneNo,
                role: role,
            };

            // Store JWT
            localStorage.setItem("token", userData.token);

            // Store logged user
            localStorage.setItem(
                "loggedUser",
                JSON.stringify(loggedUser)
            );

            // Remove admin session
            localStorage.removeItem("adminSession");

            alert(result.message || "Login successful!");

            navigate(
                location.state?.from || "/",
                {
                    replace: true,
                }
            );
        } catch (error) {
            console.error("Login error:", error);

            if (error.response) {
                const status = error.response.status;
                const responseData = error.response.data;

                if (status === 401) {
                    alert("Invalid email/phone number or password.");
                } else if (status === 404) {
                    alert(
                        "Login API not found. Please check the backend URL."
                    );
                } else if (status === 403) {
                    alert(
                        responseData?.message ||
                        "You are not authorized to login."
                    );
                } else {
                    alert(
                        responseData?.message ||
                        responseData?.error ||
                        "Login failed."
                    );
                }
            } else if (error.request) {
                alert(
                    "Unable to connect to server. Please make sure Spring Boot is running on port 5151."
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
        <div className="login-page">
            <div className="login-container">

                {/* LEFT SIDE */}
                <div className="login-left">
                    <div className="login-overlay">

                        <FaCarSide className="login-car-icon" />

                        <h1>CarRental</h1>

                        <p>
                            Drive Your Dream Car With
                            <br />
                            Luxury, Comfort & Safety.
                        </p>

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="login-right">

                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >

                        {/* LOGIN HEADER */}
                        <div className="login-mode-heading">

                            <div>

                                <span
                                    className={
                                        isAdminLogin
                                            ? "mode-badge admin"
                                            : "mode-badge"
                                    }
                                >
                                    {isAdminLogin
                                        ? "ADMIN ACCESS"
                                        : "USER ACCESS"}
                                </span>

                                <h2>
                                    {isAdminLogin
                                        ? "Admin Login"
                                        : "User Login"}
                                </h2>

                            </div>

                            <Link
                                className="login-switch"
                                to={
                                    isAdminLogin
                                        ? "/login"
                                        : "/admin-login"
                                }
                            >
                                {isAdminLogin
                                    ? "User Login"
                                    : "Admin Login"}
                            </Link>

                        </div>

                        <p>
                            {isAdminLogin
                                ? "Sign in with your administrator account."
                                : "Login using your email or phone number."}
                        </p>

                        {/* EMAIL / PHONE */}
                        <div className="input-group">

                            <FaEnvelope />

                            <input
                                type="text"
                                placeholder="Email or Phone Number"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                autoComplete="username"
                                required
                            />

                        </div>

                        {/* PASSWORD */}
                        <div className="input-group">

                            <FaLock />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                autoComplete="current-password"
                                required
                            />

                        </div>

                        {/* OPTIONS */}
                        <div className="login-options">

                            <label>
                                <input type="checkbox" />
                                Remember Me
                            </label>

                            <Link to="/forgot-password">
                                Forgot Password?
                            </Link>

                        </div>

                        {/* LOGIN BUTTON */}
                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"}
                        </button>

                        {/* USER REGISTER */}
                        {!isAdminLogin && (
                            <p className="signup-text">
                                Don't have an account?{" "}
                                <Link to="/register">
                                    Register
                                </Link>
                            </p>
                        )}

                    </form>

                </div>

            </div>
        </div>
    );
};

export default Login;