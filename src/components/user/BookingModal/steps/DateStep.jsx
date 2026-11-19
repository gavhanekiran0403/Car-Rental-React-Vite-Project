import React, { useState } from "react";
import "./DateStep.css";

const DateStep = ({
    bookingData,
    updateBooking,
    nextStep,
    car,
}) => {

    const [error, setError] =
        useState("");

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    const handleNext = () => {

        if (!bookingData.pickupDate) {
            setError(
                "Please select pickup date."
            );
            return;
        }

        if (!bookingData.pickupTime) {
            setError(
                "Please select pickup time."
            );
            return;
        }

        if (!bookingData.returnDate) {
            setError(
                "Please select return date."
            );
            return;
        }

        if (!bookingData.returnTime) {
            setError(
                "Please select return time."
            );
            return;
        }

        if (
            bookingData.returnDate <
            bookingData.pickupDate
        ) {
            setError(
                "Return date must be after pickup date."
            );
            return;
        }

        if (
            bookingData.returnDate ===
                bookingData.pickupDate &&
            bookingData.returnTime <=
                bookingData.pickupTime
        ) {
            setError(
                "Return time must be later than pickup time."
            );
            return;
        }

        setError("");

        nextStep();
    };

    return (
        <div className="date-step">

            <h2>
                Select Booking Date & Time
            </h2>

            <p className="date-subtitle">
                {car?.modelName}
            </p>

            {/* Pickup Date */}

            <div className="date-group">

                <label>
                    Pickup Date
                </label>

                <input
                    type="date"
                    min={today}
                    value={
                        bookingData.pickupDate
                    }
                    onChange={(e) =>
                        updateBooking({
                            pickupDate:
                                e.target.value,
                        })
                    }
                />

            </div>

            {/* Pickup Time */}

            <div className="date-group">

                <label>
                    Pickup Time
                </label>

                <input
                    type="time"
                    value={
                        bookingData.pickupTime
                    }
                    onChange={(e) =>
                        updateBooking({
                            pickupTime:
                                e.target.value,
                        })
                    }
                />

            </div>

            {/* Return Date */}

            <div className="date-group">

                <label>
                    Return Date
                </label>

                <input
                    type="date"
                    min={
                        bookingData.pickupDate ||
                        today
                    }
                    value={
                        bookingData.returnDate
                    }
                    onChange={(e) =>
                        updateBooking({
                            returnDate:
                                e.target.value,
                        })
                    }
                />

            </div>

            {/* Return Time */}

            <div className="date-group">

                <label>
                    Return Time
                </label>

                <input
                    type="time"
                    value={
                        bookingData.returnTime
                    }
                    onChange={(e) =>
                        updateBooking({
                            returnTime:
                                e.target.value,
                        })
                    }
                />

            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="step-buttons">

                <button
                    className="next-btn"
                    onClick={handleNext}
                >
                    Next →
                </button>

            </div>

        </div>
    );
};

export default DateStep;