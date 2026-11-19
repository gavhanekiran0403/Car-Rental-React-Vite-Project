import React, { useEffect, useState } from "react";
import "./DrivingStep.css";
import driverService from "../../../../services/driverService";

const DrivingStep = ({
    bookingData,
    updateBooking,
    nextStep,
    prevStep,
}) => {

    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // =========================================================
    // LOAD DRIVERS
    // =========================================================

    useEffect(() => {
        loadDrivers();
    }, []);

    const loadDrivers = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await driverService.getAllDrivers();

            console.log(
                "FULL DRIVER RESPONSE:",
                response
            );

            console.log(
                "DRIVER RESPONSE DATA:",
                response?.data
            );

            /*
             * Possible backend responses:
             *
             * {
             *   success: true,
             *   data: [...]
             * }
             *
             * OR
             *
             * {
             *   data: [...]
             * }
             *
             * OR
             *
             * [...]
             */

            const responseData = response?.data;

            let driverList = [];

            if (Array.isArray(responseData)) {

                // Backend directly returns array
                driverList = responseData;

            } else if (
                Array.isArray(responseData?.data)
            ) {

                // ApiResponse format
                driverList = responseData.data;

            } else if (
                Array.isArray(responseData?.content)
            ) {

                // Spring pagination format
                driverList = responseData.content;

            } else if (
                Array.isArray(responseData?.drivers)
            ) {

                driverList = responseData.drivers;
            }

            console.log(
                "FINAL DRIVER LIST:",
                driverList
            );

            setDrivers(driverList);

            if (driverList.length === 0) {

                setError(
                    "No drivers available."
                );
            }

        } catch (err) {

            console.error(
                "DRIVER API ERROR:",
                err
            );

            console.error(
                "DRIVER API ERROR RESPONSE:",
                err?.response?.data
            );

            setDrivers([]);

            setError(
                err?.response?.data?.message ||
                "Unable to load drivers."
            );

        } finally {

            setLoading(false);
        }
    };


    // =========================================================
    // GET DRIVER ID
    // =========================================================

    const getDriverId = (driver) => {

        return (
            driver?.driverId ??
            driver?.id ??
            driver?._id ??
            ""
        );
    };


    // =========================================================
    // GET DRIVER NAME
    // =========================================================

    const getDriverName = (driver) => {

        return (
            driver?.name ??
            driver?.fullName
        );
    };


    // =========================================================
    // GET EXPERIENCE
    // =========================================================

    const getExperience = (driver) => {

        return (
            driver?.experience ??
            driver?.experienceYears ??
            ""
        );
    };


    // =========================================================
    // DRIVER CHANGE
    // =========================================================

    const handleDriverChange = (e) => {

        const selectedId =
            e.target.value;

        console.log(
            "Selected Driver ID:",
            selectedId
        );

        const selectedDriver =
            drivers.find(
                (driver) =>
                    String(
                        getDriverId(driver)
                    ) ===
                    String(selectedId)
            );

        console.log(
            "Selected Driver:",
            selectedDriver
        );

        updateBooking({

            driverId: selectedId,

            driverName:
                selectedDriver
                    ? getDriverName(selectedDriver)
                    : "",
        });

        setError("");
    };


    // =========================================================
    // DRIVING LICENSE CHANGE
    // =========================================================

    const handleLicenseChange = (e) => {

        const file =
            e.target.files?.[0] || null;

        console.log(
            "Driving Licence File:",
            file
        );

        updateBooking({

            drivingLicense: file,
        });

        setError("");
    };


    // =========================================================
    // SELF DRIVE
    // =========================================================

    const handleSelfDrive = () => {

        updateBooking({

            drivingOption: "SELF_DRIVE",

            driverId: "",
            driverName: "",
        });

        setError("");
    };


    // =========================================================
    // WITH DRIVER
    // =========================================================

    const handleWithDriver = () => {

        updateBooking({

            drivingOption: "WITH_DRIVER",

            drivingLicense: null,
        });

        setError("");
    };


    // =========================================================
    // NEXT
    // =========================================================

    const handleNext = () => {

        // -----------------------------------------------------
        // SELF DRIVE
        // -----------------------------------------------------

        if (
            bookingData.drivingOption === "SELF_DRIVE"
        ) {

            if (
                !bookingData.drivingLicense
            ) {

                setError(
                    "Please upload your Driving Licence."
                );

                return;
            }

            console.log(
                "Licence before next:",
                bookingData.drivingLicense
            );
        }


        // -----------------------------------------------------
        // WITH DRIVER
        // -----------------------------------------------------

        if (
            bookingData.drivingOption ===
            "WITH_DRIVER"
        ) {

            if (!bookingData.driverId) {

                setError(
                    "Please select a driver."
                );

                return;
            }

            console.log(
                "Driver ID before next:",
                bookingData.driverId
            );
        }


        setError("");

        nextStep();
    };


    return (
        <div className="driving-step">

            <h2>
                Choose Driving Option
            </h2>

            <p className="driving-subtitle">
                Select how you want to travel.
            </p>


            {/* =================================================
                OPTIONS
            ================================================= */}

            <div className="driving-options">

                {/* SELF DRIVE */}

                <div
                    className={
                        bookingData.drivingOption ===
                        "SELF_DRIVE"
                            ? "option-card active"
                            : "option-card"
                    }
                    onClick={handleSelfDrive}
                >

                    <h3>
                        🚗 Self Drive
                    </h3>

                    <p>
                        Drive the vehicle
                        yourself.
                    </p>

                </div>


                {/* WITH DRIVER */}

                <div
                    className={
                        bookingData.drivingOption ===
                        "WITH_DRIVER"
                            ? "option-card active"
                            : "option-card"
                    }
                    onClick={handleWithDriver}
                >

                    <h3>
                        👨‍✈️ With Driver
                    </h3>

                    <p>
                        Professional driver
                        will drive for you.
                    </p>

                </div>

            </div>


            {/* =================================================
                SELF DRIVE
            ================================================= */}

            {bookingData.drivingOption ===
                "SELF" && (

                <div className="driver-select">

                    <label>
                        Upload Driving Licence
                    </label>

                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,.pdf"
                        onChange={
                            handleLicenseChange
                        }
                    />


                    {bookingData.drivingLicense && (

                        <p className="file-name">

                            Selected File:{" "}

                            {
                                bookingData
                                    .drivingLicense
                                    .name
                            }

                        </p>
                    )}

                </div>
            )}


            {/* =================================================
                WITH DRIVER
            ================================================= */}

            {bookingData.drivingOption ===
                "WITH_DRIVER" && (

                <div className="driver-select">

                    <label>
                        Select Driver
                    </label>


                    {loading && (
                        <p>
                            Loading drivers...
                        </p>
                    )}


                    {!loading &&
                        drivers.length === 0 && (

                        <p className="driver-error">
                            {error ||
                                "No drivers available."}
                        </p>
                    )}


                    {!loading &&
                        drivers.length > 0 && (

                        <select
                            value={
                                bookingData.driverId ||
                                ""
                            }
                            onChange={
                                handleDriverChange
                            }
                        >

                            <option value="">
                                Select Driver
                            </option>


                            {drivers.map(
                                (driver) => {

                                    const id =
                                        getDriverId(
                                            driver
                                        );

                                    const name =
                                        getDriverName(
                                            driver
                                        );

                                    const experience =
                                        getExperience(
                                            driver
                                        );

                                    return (
                                        <option
                                            key={String(id)}
                                            value={String(id)}
                                        >

                                            {name}

                                            {experience
                                                ? ` (${experience})`
                                                : ""
                                            }

                                        </option>
                                    );
                                }
                            )}

                        </select>
                    )}

                </div>
            )}


            {/* =================================================
                ERROR
            ================================================= */}

            {error &&
                !loading &&
                drivers.length > 0 && (

                <div className="driver-error">
                    {error}
                </div>
            )}


            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="driving-buttons">

                <button
                    type="button"
                    className="back-btn"
                    onClick={prevStep}
                >
                    ← Back
                </button>


                <button
                    type="button"
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