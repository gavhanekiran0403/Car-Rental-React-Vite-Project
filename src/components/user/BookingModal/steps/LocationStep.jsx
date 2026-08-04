import React, { useState } from "react";
import "./LocationStep.css";

const LocationStep = ({
    bookingData,
    updateBooking,
    nextStep,
    prevStep
}) => {

    const [error, setError] = useState("");

    const handleNext = () => {

        if (
            bookingData.pickupLocation.trim() === "" ||
            bookingData.dropLocation.trim() === ""
        ) {

            setError("Please enter pickup and drop locations.");

            return;
        }

        if (
            bookingData.pickupLocation ===
            bookingData.dropLocation
        ) {

            setError(
                "Pickup and Drop locations cannot be the same."
            );

            return;
        }

        setError("");

        nextStep();

    };

    return (

        <div className="location-step">

            <h2>Select Locations</h2>

            <p className="location-subtitle">
                Choose your pickup and drop locations.
            </p>

            <div className="location-group">

                <label>Pickup Location</label>

                <input
                    type="text"
                    placeholder="Enter Pickup Location"
                    value={bookingData.pickupLocation}
                    onChange={(e) =>
                        updateBooking({
                            pickupLocation: e.target.value
                        })
                    }
                />

            </div>

            <div className="location-group">

                <label>Drop Location</label>

                <input
                    type="text"
                    placeholder="Enter Drop Location"
                    value={bookingData.dropLocation}
                    onChange={(e) =>
                        updateBooking({
                            dropLocation: e.target.value
                        })
                    }
                />

            </div>

            {error &&

                <div className="location-error">
                    {error}
                </div>

            }

            <div className="location-buttons">

                <button
                    className="back-btn"
                    onClick={prevStep}
                >
                    ← Back
                </button>

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

export default LocationStep;