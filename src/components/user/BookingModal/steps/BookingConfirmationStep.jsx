import React from "react";
import "./BookingConfirmationStep.css";

const BookingConfirmationStep = ({
    bookingData,
    car,
    prevStep,
    onFinish,
}) => {

    const bookingId =
        "CR" + Math.floor(100000 + Math.random() * 900000);

    return (

        <div className="confirmation-step">

            <div className="success-icon">
                ✅
            </div>

            <h2>Booking Request Submitted</h2>

            <p className="confirmation-text">
                Your booking request has been submitted successfully.
                <br />
                It is waiting for Admin approval.
            </p>

            <div className="confirm-status-card">

                <div className="confirm-status-row">
                    <span>Booking ID</span>
                    <span>{bookingId}</span>
                </div>

                <div className="confirm-status-row">
                    <span>Status</span>
                    <span className="confirm-pending">
                        Pending Approval
                    </span>
                </div>

            </div>

            <div className="confirm-booking-card">

                <h3>Booking Details</h3>

                <div className="confirm-detail-row">
                    <span>Car</span>
                    <span>{car.modelName}</span>
                </div>

                <div className="confirm-detail-row">
                    <span>Pickup Date</span>
                    <span>{bookingData.pickupDate}</span>
                </div>

                <div className="confirm-detail-row">
                    <span>Return Date</span>
                    <span>{bookingData.returnDate}</span>
                </div>

                <div className="confirm-detail-row">
                    <span>Pickup Location</span>
                    <span>{bookingData.pickupLocation}</span>
                </div>

                <div className="confirm-detail-row">
                    <span>Drop Location</span>
                    <span>{bookingData.dropLocation}</span>
                </div>

                <div className="confirm-detail-row">
                    <span>Driving Option</span>
                    <span>
                        {bookingData.drivingOption === "SELF"
                            ? "Self Drive"
                            : "With Driver"}
                    </span>
                </div>

                {bookingData.drivingOption === "SELF" && (
                    <div className="confirm-detail-row">
                        <span>Licence</span>
                        <span>{bookingData.drivingLicense}</span>
                    </div>
                )}

                {bookingData.drivingOption === "WITH_DRIVER" && (
                    <div className="confirm-detail-row">
                        <span>Driver</span>
                        <span>{bookingData.driver}</span>
                    </div>
                )}

                <div className="confirm-detail-row confirm-total">
                    <span>Total Amount</span>
                    <span>₹ {bookingData.totalAmount}</span>
                </div>

            </div>

            <div className="confirm-note-box">

                <strong>Note</strong>

                <p>
                    After the Admin approves your booking,
                    a notification will appear in your dashboard.
                    Then you can complete the payment.
                </p>

            </div>

            <div className="confirm-buttons">

                <button
                    className="confirm-back-btn"
                    onClick={prevStep}
                >
                    ← Back
                </button>

                <button
                    className="confirm-finish-btn"
                    onClick={onFinish}
                >
                    Go To Dashboard
                </button>

            </div>

        </div>

    );

};

export default BookingConfirmationStep;