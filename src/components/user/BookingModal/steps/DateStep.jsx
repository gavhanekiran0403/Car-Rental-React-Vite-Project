import React, { useState } from "react";
import "./DateStep.css";

const DateStep = ({ bookingData, updateBooking, nextStep, car }) => {

    const [error, setError] = useState("");

    // Dummy booked dates
    const bookedDates = [
        "2026-08-05",
        "2026-08-06",
        "2026-08-12",
        "2026-08-18",
        "2026-08-20",
        "2026-08-25"
    ];

    // Pickup Date
    const handlePickupChange = (e) => {

        const selectedDate = e.target.value;

        if (bookedDates.includes(selectedDate)) {

            alert("🚫 This car is already booked on this date.");

            return;
        }

        updateBooking({
            pickupDate: selectedDate
        });

        setError("");

    };

    // Return Date
    const handleReturnChange = (e) => {

        const selectedDate = e.target.value;

        if (bookedDates.includes(selectedDate)) {

            alert("🚫 This car is already booked on this date.");

            return;
        }

        updateBooking({
            returnDate: selectedDate
        });

        setError("");

    };

    // Next Button
    const handleNext = () => {

        if (!bookingData.pickupDate) {

            setError("Please select pickup date.");

            return;

        }

        if (!bookingData.returnDate) {

            setError("Please select return date.");

            return;

        }

        if (bookingData.returnDate < bookingData.pickupDate) {

            setError("Return date must be after pickup date.");

            return;

        }

        nextStep();

    };

    return (

        <div className="date-step">

            <h2>Select Booking Dates</h2>

            <p className="date-subtitle">
                {car.modelName}
            </p>

            <div className="date-group">

                <label>Pickup Date</label>

                <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={bookingData.pickupDate}
                    onChange={handlePickupChange}
                />

            </div>

            <div className="date-group">

                <label>Return Date</label>

                <input
                    type="date"
                    min={
                        bookingData.pickupDate ||
                        new Date().toISOString().split("T")[0]
                    }
                    value={bookingData.returnDate}
                    onChange={handleReturnChange}
                />

            </div>

            {error && (

                <div className="error-message">
                    {error}
                </div>

            )}

            {/* <div className="booked-box">

                <h4>Booked Dates (Demo)</h4>

                <ul className="booked-list">

                    {bookedDates.map((date, index) => (

                        <li key={index}>
                            {date}
                        </li>

                    ))}

                </ul>

            </div> */}

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