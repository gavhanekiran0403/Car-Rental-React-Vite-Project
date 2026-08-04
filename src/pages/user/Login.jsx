import React, { useState } from "react";
import "./Login.css";
import { FaEnvelope, FaLock, FaCarSide } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            email,
            password,
        });
    };

    return (

        <div className="login-page">

            <div className="login-container">

                {/* Left Side */}

                <div className="login-left">

                    <div className="login-overlay">

                        <FaCarSide className="login-car-icon" />

                        <h1>LuxoDrive</h1>

                        <p>
                            Drive Your Dream Car With
                            Luxury, Comfort & Safety.
                        </p>

                    </div>

                </div>

                {/* Right Side */}

                <div className="login-right">

                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >

                        <h2>Welcome Back</h2>

                        <p>
                            Login to continue your journey.
                        </p>

                        <div className="input-group">

                            <FaEnvelope />

                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />

                        </div>

                        <div className="input-group">

                            <FaLock />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                        </div>

                        <div className="login-options">

                            <label>

                                <input type="checkbox" />

                                Remember Me

                            </label>

                            <a href="/">
                                Forgot Password?
                            </a>

                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                        >
                            Login
                        </button>

                        <div className="divider">
                            OR
                        </div>

                        <button
                            type="button"
                            className="google-btn"
                        >
                            Continue with Google
                        </button>

                        <p className="signup-text">

                            Don't have an account?

                            <Link to="/register">
                                Register
                            </Link>

                        </p>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default Login;