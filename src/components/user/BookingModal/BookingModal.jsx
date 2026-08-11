import React, { useState } from "react";
import "./BookingModal.css";

import DateStep from "./steps/DateStep";
import LocationStep from "./steps/LocationStep";
import DrivingStep from "./steps/DrivingStep";
import CarSummaryStep from "./steps/CarSummaryStep";
import BookingConfirmationStep from "./steps/BookingConfirmationStep";

const BookingModal = ({ car, onClose }) => {

    const [step, setStep] = useState(1);

    const [bookingData, setBookingData] = useState({
        pickupDate: "",
        returnDate: "",
        pickupLocation: "",
        dropLocation: "",
        drivingOption: "SELF",
        drivingLicense: null,
        driver: "",
        totalAmount: 0,
    });

    const nextStep = () => {
        if (step < 5) {
            setStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep((prev) => prev - 1);
        }
    };

    const updateBooking = (data) => {
        setBookingData((prev) => ({
            ...prev,
            ...data,
        }));
    };

    return (
        <div className="booking-overlay">

            <div className="booking-drawer">

                <div className="booking-header">

                    <h2>Book Your Car</h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="booking-progress">

                    <div className={step >= 1 ? "active" : ""}>
                        1
                        <span>Date</span>
                    </div>

                    <div className={step >= 2 ? "active" : ""}>
                        2
                        <span>Location</span>
                    </div>

                    <div className={step >= 3 ? "active" : ""}>
                        3
                        <span>Driving</span>
                    </div>

                    <div className={step >= 4 ? "active" : ""}>
                        4
                        <span>Summary</span>
                    </div>

                    <div className={step >= 5 ? "active" : ""}>
                        5
                        <span>Confirmation</span>
                    </div>

                </div>

                <div className="booking-content">

                    {step === 1 && (
                        <DateStep
                            bookingData={bookingData}
                            updateBooking={updateBooking}
                            nextStep={nextStep}
                            car={car}
                        />
                    )}

                    {step === 2 && (
                        <LocationStep
                            bookingData={bookingData}
                            updateBooking={updateBooking}
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}

                    {step === 3 && (
                        <DrivingStep
                            bookingData={bookingData}
                            updateBooking={updateBooking}
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}

                    {step === 4 && (
                        <CarSummaryStep
                            bookingData={bookingData}
                            updateBooking={updateBooking}
                            nextStep={nextStep}
                            prevStep={prevStep}
                            car={car}
                        />
                    )}

                    {step === 5 && (
                        <BookingConfirmationStep
                            bookingData={bookingData}
                            car={car}
                            prevStep={prevStep}
                            onFinish={onClose}
                        />
                    )}

                </div>

            </div>

        </div>
    );
};

export default BookingModal;