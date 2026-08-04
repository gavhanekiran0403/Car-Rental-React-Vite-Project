import React, { useEffect } from "react";
import "./CarSummaryStep.css";

const CarSummaryStep = ({
    bookingData,
    updateBooking,
    nextStep,
    prevStep,
    car,
}) => {

    const oneDay = 1000 * 60 * 60 * 24;

    const days =
        bookingData.pickupDate && bookingData.returnDate
            ? Math.ceil(
                  (new Date(bookingData.returnDate) -
                      new Date(bookingData.pickupDate)) /
                      oneDay
              ) + 1
            : 1;

    const carRent = car.rent * days;

    const driverCharge =
        bookingData.drivingOption === "WITH_DRIVER"
            ? 1000 * days
            : 0;

    const securityDeposit = 3000;

    const totalAmount =
        carRent + driverCharge + securityDeposit;

    useEffect(() => {
        updateBooking({
            totalAmount,
        });
    }, [totalAmount]);

    return (

        <div className="summary-step">

            <h2>Booking Summary</h2>

            <p className="summary-subtitle">
                Please review your booking details before confirmation.
            </p>

            <div className="summary-card">

                <img
                    src={car.images[0]}
                    alt={car.modelName}
                />

                <div className="summary-details">

                    <h3>{car.modelName}</h3>

                    <p>
                        <b>Fuel :</b> {car.fuelType}
                    </p>

                    <p>
                        <b>Seats :</b> {car.seats}
                    </p>

                    <p>
                        <b>Year :</b> {car.carYearModel}
                    </p>

                    <p>
                        <b>Pickup Date :</b>{" "}
                        {bookingData.pickupDate}
                    </p>

                    <p>
                        <b>Return Date :</b>{" "}
                        {bookingData.returnDate}
                    </p>

                    <p>
                        <b>Pickup Location :</b>{" "}
                        {bookingData.pickupLocation}
                    </p>

                    <p>
                        <b>Drop Location :</b>{" "}
                        {bookingData.dropLocation}
                    </p>

                    <p>
                        <b>Driving Option :</b>{" "}
                        {bookingData.drivingOption === "SELF"
                            ? "Self Drive"
                            : "With Driver"}
                    </p>

                    {bookingData.drivingOption ===
                        "SELF" && (
                        <p>
                            <b>Driving Licence :</b>{" "}
                            {bookingData.drivingLicense}
                        </p>
                    )}

                    {bookingData.drivingOption ===
                        "WITH_DRIVER" && (
                        <p>
                            <b>Driver :</b>{" "}
                            {bookingData.driver}
                        </p>
                    )}

                </div>

            </div>

            <div className="price-card">

                <h3 className="price-title">
                    Price Details
                </h3>

                <div className="price-row">
                    <span>Rent Per Day</span>
                    <span>₹ {car.rent}</span>
                </div>

                <div className="price-row">
                    <span>Total Days</span>
                    <span>{days}</span>
                </div>

                <div className="price-row">
                    <span>Car Rent</span>
                    <span>₹ {carRent}</span>
                </div>
                                {bookingData.drivingOption === "WITH_DRIVER" && (
                    <div className="price-row">
                        <span>Driver Charge</span>
                        <span>₹ {driverCharge}</span>
                    </div>
                )}

                <div className="price-row">
                    <span>Security Deposit</span>
                    <span>₹ {securityDeposit}</span>
                </div>

                <div className="price-total">
                    <span>Total Amount</span>
                    <span>₹ {totalAmount}</span>
                </div>

            </div>

            <div className="summary-buttons">

                <button
                    className="back-btn"
                    onClick={prevStep}
                >
                    ← Back
                </button>

                <button
                    className="next-btn"
                    onClick={nextStep}
                >
                    Proceed to Confirmation →
                </button>

            </div>

        </div>

    );

};

export default CarSummaryStep;