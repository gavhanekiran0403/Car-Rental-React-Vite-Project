import React, { useState } from "react";
import "./PaymentStep.css";

const PaymentStep = ({ bookingData, prevStep, car }) => {

    const [paymentMethod, setPaymentMethod] = useState("UPI");

    const [success, setSuccess] = useState(false);

    const oneDay = 1000 * 60 * 60 * 24;

    const totalDays =
        Math.ceil(
            (new Date(bookingData.returnDate) -
                new Date(bookingData.pickupDate)) /
                oneDay
        ) + 1;

    const rent = car.rent * totalDays;

    const driverCharge =
        bookingData.drivingOption === "WITH_DRIVER"
            ? totalDays * 1000
            : 0;

    const insurance = 500;

    const securityDeposit = 3000;

    const gst = Math.round((rent + driverCharge) * 0.18);

    const grandTotal =
        rent +
        driverCharge +
        insurance +
        securityDeposit +
        gst;

    const confirmBooking = () => {

        setSuccess(true);

    };

    return (

        <div className="payment-step">

            <h2>Payment Summary</h2>

            <p className="payment-subtitle">
                Review your booking and confirm payment.
            </p>

            <div className="payment-card">

                <div className="payment-row">
                    <span>Car Rent</span>
                    <span>₹ {rent}</span>
                </div>

                <div className="payment-row">
                    <span>Driver Charge</span>
                    <span>₹ {driverCharge}</span>
                </div>

                <div className="payment-row">
                    <span>Insurance</span>
                    <span>₹ {insurance}</span>
                </div>

                <div className="payment-row">
                    <span>Security Deposit</span>
                    <span>₹ {securityDeposit}</span>
                </div>

                <div className="payment-row">
                    <span>GST (18%)</span>
                    <span>₹ {gst}</span>
                </div>

                <div className="payment-total">
                    <span>Total Amount</span>
                    <span>₹ {grandTotal}</span>
                </div>

            </div>

            <div className="payment-method">

                <h3>Select Payment Method</h3>

                <select
                    value={paymentMethod}
                    onChange={(e) =>
                        setPaymentMethod(e.target.value)
                    }
                >

                    <option>UPI</option>

                    <option>Credit Card</option>

                    <option>Debit Card</option>

                    <option>Cash</option>

                </select>

            </div>

            <div className="payment-buttons">

                <button
                    className="back-btn"
                    onClick={prevStep}
                >
                    ← Back
                </button>

                <button
                    className="confirm-btn"
                    onClick={confirmBooking}
                >
                    Confirm Booking
                </button>

            </div>

            {

                success &&

                <div className="success-popup">

                    <div className="popup-card">

                        <div className="success-icon">
                            ✓
                        </div>

                        <h2>Booking Successful</h2>

                        <p>

                            Your booking has been confirmed.

                        </p>

                        <p>

                            Payment Method :
                            <b> {paymentMethod}</b>

                        </p>

                        <p>

                            Total Paid :
                            <b> ₹ {grandTotal}</b>

                        </p>

                    </div>

                </div>

            }

        </div>

    );

};

export default PaymentStep;