import React, { useState } from "react";
import "./BookingModal.css";

import DateStep from "./steps/DateStep";
import LocationStep from "./steps/LocationStep";
import DrivingStep from "./steps/DrivingStep";
import CarSummaryStep from "./steps/CarSummaryStep";
import BookingConfirmationStep from "./steps/BookingConfirmationStep";

const BookingModal = ({ car, onClose }) => {
    const [step, setStep] = useState(1);

    /*
     * Get logged-in user when booking modal opens
     */
    const getLoggedUser = () => {
        try {
            const user = localStorage.getItem("loggedUser");

            if (!user) {
                return null;
            }

            return JSON.parse(user);
        } catch (error) {
            console.error(
                "Error reading loggedUser:",
                error
            );

            return null;
        }
    };

    const loggedUser = getLoggedUser();

    /*
     * IMPORTANT:
     * Store userId directly inside bookingData.
     */
    const [bookingData, setBookingData] = useState({
        userId: loggedUser?.userId || "",

        pickupDate: "",
        pickupTime: "",

        returnDate: "",
        returnTime: "",

        pickupLocation: "",
        dropLocation: "",

        drivingOption: "SELF",

        drivingLicense: null,

        driverId: "",
        driverName: "",

        totalAmount: 0,
    });

    /*
     * Next Step
     */
    const nextStep = () => {
        if (step < 5) {
            setStep((prev) => prev + 1);
        }
    };

    /*
     * Previous Step
     */
    const prevStep = () => {
        if (step > 1) {
            setStep((prev) => prev - 1);
        }
    };

    /*
     * Update Booking Data
     */
    const updateBooking = (data) => {
        setBookingData((prev) => ({
            ...prev,
            ...data,
        }));
    };

    /*
     * Debug
     */
    console.log(
        "Current Booking Data:",
        bookingData
    );

    console.log(
        "Logged User:",
        loggedUser
    );

    return (
        <div className="booking-overlay">

            <div className="booking-drawer">

                {/* =====================================
                    HEADER
                ===================================== */}

                <div className="booking-header">

                    <h2>
                        Book Your Car
                    </h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                {/* =====================================
                    PROGRESS
                ===================================== */}

                <div className="booking-progress">

                    <div
                        className={
                            step >= 1
                                ? "active"
                                : ""
                        }
                    >
                        1
                        <span>
                            Date & Time
                        </span>
                    </div>

                    <div
                        className={
                            step >= 2
                                ? "active"
                                : ""
                        }
                    >
                        2
                        <span>
                            Location
                        </span>
                    </div>

                    <div
                        className={
                            step >= 3
                                ? "active"
                                : ""
                        }
                    >
                        3
                        <span>
                            Driving
                        </span>
                    </div>

                    <div
                        className={
                            step >= 4
                                ? "active"
                                : ""
                        }
                    >
                        4
                        <span>
                            Summary
                        </span>
                    </div>

                    <div
                        className={
                            step >= 5
                                ? "active"
                                : ""
                        }
                    >
                        5
                        <span>
                            Confirmation
                        </span>
                    </div>

                </div>

                {/* =====================================
                    CONTENT
                ===================================== */}

                <div className="booking-content">

                    {/* STEP 1 */}

                    {step === 1 && (
                        <DateStep
                            bookingData={
                                bookingData
                            }
                            updateBooking={
                                updateBooking
                            }
                            nextStep={
                                nextStep
                            }
                            car={car}
                        />
                    )}

                    {/* STEP 2 */}

                    {step === 2 && (
                        <LocationStep
                            bookingData={
                                bookingData
                            }
                            updateBooking={
                                updateBooking
                            }
                            nextStep={
                                nextStep
                            }
                            prevStep={
                                prevStep
                            }
                        />
                    )}

                    {/* STEP 3 */}

                    {step === 3 && (
                        <DrivingStep
                            bookingData={
                                bookingData
                            }
                            updateBooking={
                                updateBooking
                            }
                            nextStep={
                                nextStep
                            }
                            prevStep={
                                prevStep
                            }
                        />
                    )}

                    {/* STEP 4 */}

                    {step === 4 && (
                        <CarSummaryStep
                            bookingData={
                                bookingData
                            }
                            updateBooking={
                                updateBooking
                            }
                            nextStep={
                                nextStep
                            }
                            prevStep={
                                prevStep
                            }
                            car={car}
                        />
                    )}

                    {/* STEP 5 */}

                    {step === 5 && (
                        <BookingConfirmationStep
                            bookingData={
                                bookingData
                            }
                            car={car}
                            prevStep={
                                prevStep
                            }
                            onFinish={
                                onClose
                            }
                        />
                    )}

                </div>

            </div>

        </div>
    );
};

export default BookingModal;