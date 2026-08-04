import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaDownload, FaHome } from "react-icons/fa";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {

    const navigate = useNavigate();

    return (

        <div className="payment-success-page">

            <div className="success-card">

                <FaCheckCircle className="success-icon" />

                <h1>Payment Successful</h1>

                <p>
                    Your booking payment has been completed successfully.
                </p>

                <div className="success-info">

                    <div>
                        <span>Transaction ID</span>
                        <strong>TXN458965214</strong>
                    </div>

                    <div>
                        <span>Booking ID</span>
                        <strong>CR100001</strong>
                    </div>

                    <div>
                        <span>Amount Paid</span>
                        <strong>₹ 9,000</strong>
                    </div>

                </div>

                <div className="success-buttons">

                    <button
                        className="invoice-btn"
                        onClick={() => navigate("/invoice")}
                    >
                        <FaDownload />
                        Download Invoice
                    </button>

                    <button
                        className="home-btn"
                        onClick={() => navigate("/")}
                    >
                        <FaHome />
                        Back To Home
                    </button>

                </div>

            </div>

        </div>

    );

};

export default PaymentSuccess;