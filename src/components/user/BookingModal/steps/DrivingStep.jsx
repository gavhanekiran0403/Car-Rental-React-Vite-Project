import React, { useState } from "react";
import "./DrivingStep.css";

const DrivingStep = ({
  bookingData,
  updateBooking,
  nextStep,
  prevStep,
}) => {
  const [error, setError] = useState("");

  const drivers = [
    {
      id: 1,
      name: "Rahul Sharma",
      experience: "5 Years",
    },
    {
      id: 2,
      name: "Amit Patil",
      experience: "7 Years",
    },
    {
      id: 3,
      name: "Rohit Jadhav",
      experience: "4 Years",
    },
  ];

  const handleNext = () => {
    if (
      bookingData.drivingOption === "SELF" &&
      bookingData.drivingLicense.trim() === ""
    ) {
      setError("Please enter your Driving Licence Number.");
      return;
    }

    if (
      bookingData.drivingOption === "WITH_DRIVER" &&
      bookingData.driver === ""
    ) {
      setError("Please select a driver.");
      return;
    }

    setError("");
    nextStep();
  };

  return (
    <div className="driving-step">

      <h2>Choose Driving Option</h2>

      <p className="driving-subtitle">
        Select how you want to travel.
      </p>

      <div className="driving-options">

        <div
          className={
            bookingData.drivingOption === "SELF"
              ? "option-card active"
              : "option-card"
          }
          onClick={() =>
            updateBooking({
              drivingOption: "SELF",
              driver: "",
            })
          }
        >
          <h3>🚗 Self Drive</h3>

          <p>
            Drive the vehicle yourself.
          </p>
        </div>

        <div
          className={
            bookingData.drivingOption === "WITH_DRIVER"
              ? "option-card active"
              : "option-card"
          }
          onClick={() =>
            updateBooking({
              drivingOption: "WITH_DRIVER",
              drivingLicense: "",
            })
          }
        >
          <h3>👨‍✈️ With Driver</h3>

          <p>
            Professional driver will drive for you.
          </p>
        </div>

      </div>

      {bookingData.drivingOption === "SELF" && (

        <div className="driver-select">

          <label>Driving Licence Number</label>

          <input
            type="text"
            placeholder="Enter Driving Licence Number"
            value={bookingData.drivingLicense}
            onChange={(e) =>
              updateBooking({
                drivingLicense: e.target.value.toUpperCase(),
              })
            }
          />

        </div>

      )}

      {bookingData.drivingOption === "WITH_DRIVER" && (

        <div className="driver-select">

          <label>Select Driver</label>

          <select
            value={bookingData.driver}
            onChange={(e) =>
              updateBooking({
                driver: e.target.value,
              })
            }
          >

            <option value="">
              Select Driver
            </option>

            {drivers.map((driver) => (
              <option
                key={driver.id}
                value={driver.name}
              >
                {driver.name} ({driver.experience})
              </option>
            ))}

          </select>

        </div>

      )}

      {error && (
        <div className="driver-error">
          {error}
        </div>
      )}

      <div className="driving-buttons">

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

export default DrivingStep;