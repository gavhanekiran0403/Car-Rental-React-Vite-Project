import React, {
    useEffect,
    useState,
} from "react";

import "./BookingConfirmationStep.css";

import bookingService from "../../../../services/bookingService";

const BookingConfirmationStep = ({
    bookingData,
    car,
    prevStep,
    onFinish,
}) => {
    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [booking, setBooking] =
        useState(null);

    const [submitted, setSubmitted] =
        useState(false);

    // =========================================================
    // GET LOGGED USER
    // =========================================================

    const getLoggedUser = () => {
        try {
            const storedUser =
                localStorage.getItem(
                    "loggedUser"
                );

            console.log(
                "Stored loggedUser:",
                storedUser
            );

            if (!storedUser) {
                return null;
            }

            const user =
                JSON.parse(storedUser);

            console.log(
                "Parsed loggedUser:",
                user
            );

            return user;
        } catch (err) {
            console.error(
                "Unable to parse loggedUser:",
                err
            );

            return null;
        }
    };

    // =========================================================
    // CONFIRM BOOKING
    // =========================================================

    const confirmBooking = async () => {
        try {
            setLoading(true);
            setError("");

            // -------------------------------------------------
            // GET LOGGED USER
            // -------------------------------------------------

            const loggedUser =
                getLoggedUser();

            console.log(
                "LOGGED USER:",
                loggedUser
            );

            // -------------------------------------------------
            // USER ID
            // -------------------------------------------------

            const userId =
                loggedUser?.userId;

            console.log(
                "USER ID:",
                userId
            );

            // -------------------------------------------------
            // TOKEN
            // -------------------------------------------------

            const token =
                localStorage.getItem(
                    "token"
                );

            console.log(
                "TOKEN EXISTS:",
                !!token
            );

            // -------------------------------------------------
            // USER VALIDATION
            // -------------------------------------------------

            if (!loggedUser) {
                setError(
                    "User details not found. Please login again."
                );
                return;
            }

            if (!userId) {
                console.error(
                    "loggedUser does not contain userId:",
                    loggedUser
                );

                setError(
                    "User ID not found. Please logout and login again."
                );
                return;
            }

            if (!token) {
                setError(
                    "Login session expired. Please login again."
                );
                return;
            }

            // -------------------------------------------------
            // CAR VALIDATION
            // -------------------------------------------------

            if (!car?.carId) {
                console.error(
                    "Car object:",
                    car
                );

                setError(
                    "Car ID not found."
                );

                return;
            }

            // -------------------------------------------------
            // DRIVING OPTION VALIDATION
            // -------------------------------------------------

            if (
                bookingData.drivingOption !==
                    "SELF_DRIVE" &&
                bookingData.drivingOption !==
                    "WITH_DRIVER"
            ) {
                setError(
                    "Please select a driving option."
                );

                return;
            }

            // -------------------------------------------------
            // DRIVER VALIDATION
            // -------------------------------------------------

            if (
                bookingData.drivingOption ===
                "WITH_DRIVER"
            ) {
                if (
                    !bookingData.driverId
                ) {
                    setError(
                        "Driver ID not found. Please go back and select a driver."
                    );

                    return;
                }

                console.log(
                    "SELECTED DRIVER ID:",
                    bookingData.driverId
                );

                console.log(
                    "SELECTED DRIVER NAME:",
                    bookingData.driverName
                );
            }

            // -------------------------------------------------
            // LICENCE VALIDATION
            // -------------------------------------------------

            if (
                bookingData.drivingOption ===
                "SELF_DRIVE"
            ) {
                if (
                    !bookingData.drivingLicense
                ) {
                    setError(
                        "Driving Licence is required for Self Drive."
                    );

                    return;
                }

                console.log(
                    "DRIVING LICENCE:",
                    bookingData.drivingLicense
                );
            }

            // =================================================
            // CREATE BOOKING DTO
            // =================================================

            const bookingDto = {
                bookingId: null,

                pickupLocation:
                    bookingData.pickupLocation || "",

                dropLocation:
                    bookingData.dropLocation || "",

                pickupDate:
                    bookingData.pickupDate || "",

                pickupTime:
                    bookingData.pickupTime || "",

                returnDate:
                    bookingData.returnDate || "",

                returnTime:
                    bookingData.returnTime || "",

                drivingOption:
                    bookingData.drivingOption,

                /*
                 * Driving licence is NOT sent here as File.
                 *
                 * The file is sent separately as multipart
                 * "image" through bookingService.
                 */
                drivingLicense: null,

                totalAmount:
                    Number(
                        bookingData.totalAmount || 0
                    ),

                status: "PENDING",

                createdAt: null,

                // IMPORTANT
                userId: String(userId),

                // IMPORTANT
                carId: String(car.carId),

                // IMPORTANT
                driverId:
                    bookingData.drivingOption ===
                    "WITH_DRIVER"
                        ? String(
                              bookingData.driverId
                          )
                        : null,
            };

            // =================================================
            // COMPLETE REQUEST LOG
            // =================================================

            console.log(
                "======================================"
            );

            console.log(
                "FINAL BOOKING REQUEST"
            );

            console.log(
                "USER ID:",
                userId
            );

            console.log(
                "CAR ID:",
                car.carId
            );

            console.log(
                "DRIVING OPTION:",
                bookingData.drivingOption
            );

            console.log(
                "DRIVER ID:",
                bookingData.driverId
            );

            console.log(
                "DRIVER NAME:",
                bookingData.driverName
            );

            console.log(
                "LICENCE FILE:",
                bookingData.drivingLicense
            );

            console.log(
                "BOOKING DTO:",
                bookingDto
            );

            console.log(
                "======================================"
            );

            // =================================================
            // API CALL
            // =================================================

            const response =
                await bookingService.createBooking(
                    bookingDto,
                    bookingData.drivingLicense
                );

            console.log(
                "BOOKING API RESPONSE:",
                response
            );

            console.log(
                "BOOKING RESPONSE DATA:",
                response?.data
            );

            // =================================================
            // API RESULT
            // =================================================

            const result =
                response?.data;

            if (!result) {
                setError(
                    "Empty response received from server."
                );

                return;
            }

            // -------------------------------------------------
            // BACKEND SUCCESS = FALSE
            // -------------------------------------------------

            if (
                result.success === false
            ) {
                setError(
                    result.message ||
                    "Booking failed."
                );

                return;
            }

            // -------------------------------------------------
            // GET SAVED BOOKING
            // -------------------------------------------------

            const savedBooking =
                result?.data ||
                result;

            console.log(
                "SAVED BOOKING:",
                savedBooking
            );

            // -------------------------------------------------
            // CHECK BOOKING ID
            // -------------------------------------------------

            if (
                !savedBooking?.bookingId
            ) {
                console.warn(
                    "Booking created but bookingId was not returned:",
                    savedBooking
                );
            }

            // -------------------------------------------------
            // SUCCESS
            // -------------------------------------------------

            setBooking(
                savedBooking
            );

            setSubmitted(true);
        } catch (err) {
            console.error(
                "======================================"
            );

            console.error(
                "BOOKING ERROR:",
                err
            );

            console.error(
                "SERVER RESPONSE:",
                err?.response?.data
            );

            console.error(
                "STATUS:",
                err?.response?.status
            );

            console.error(
                "REQUEST:",
                err?.config
            );

            console.error(
                "======================================"
            );

            const serverMessage =
                err?.response?.data
                    ?.message;

            setError(
                serverMessage ||
                "Failed to create booking. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================================================
    // SUBMIT WHEN STEP OPENS
    // =========================================================

    useEffect(() => {
        if (
            !submitted
        ) {
            confirmBooking();
        }

        // Intentionally run once when this step opens.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {
        return (
            <div className="confirmation-step">

                <div className="confirmation-loading">

                    <div className="loader">
                        ⏳
                    </div>

                    <h2>
                        Confirming Booking...
                    </h2>

                    <p>
                        Please wait while we
                        submit your booking.
                    </p>

                </div>

            </div>
        );
    }

    // =========================================================
    // ERROR
    // =========================================================

    if (error) {
        return (
            <div className="confirmation-step">

                <div className="confirmation-error">

                    <div className="error-icon">
                        ❌
                    </div>

                    <h2>
                        Booking Failed
                    </h2>

                    <p>
                        {error}
                    </p>

                    <div className="confirm-buttons">

                        <button
                            type="button"
                            className="confirm-back-btn"
                            onClick={prevStep}
                        >
                            ← Back
                        </button>

                    </div>

                </div>

            </div>
        );
    }

    // =========================================================
    // USER FOR DISPLAY
    // =========================================================

    const loggedUser =
        getLoggedUser();

    // =========================================================
    // SUCCESS
    // =========================================================

    return (
        <div className="confirmation-step">

            {/* =================================================
                SUCCESS
            ================================================= */}

            <div className="success-icon">
                ✅
            </div>

            <h2>
                Booking Request Submitted
            </h2>

            <p className="confirmation-text">
                Your booking request has
                been submitted successfully.

                <br />

                It is waiting for Admin approval.
            </p>

            {/* =================================================
                STATUS
            ================================================= */}

            <div className="confirm-status-card">

                <div className="confirm-status-row">

                    <span>
                        Booking ID
                    </span>

                    <span>
                        {
                            booking?.bookingId ||
                            "N/A"
                        }
                    </span>

                </div>

                <div className="confirm-status-row">

                    <span>
                        Status
                    </span>

                    <span className="confirm-pending">
                        {
                            booking?.status ||
                            "PENDING"
                        }
                    </span>

                </div>

            </div>

            {/* =================================================
                CUSTOMER DETAILS
            ================================================= */}

            <div className="confirm-booking-card">

                <h3>
                    Customer Details
                </h3>

                <div className="confirm-detail-row">

                    <span>
                        User ID
                    </span>

                    <span>
                        {
                            loggedUser?.userId ||
                            booking?.userId ||
                            "N/A"
                        }
                    </span>

                </div>

                <div className="confirm-detail-row">

                    <span>
                        Full Name
                    </span>

                    <span>
                        {
                            loggedUser?.fullName ||
                            loggedUser?.name ||
                            "N/A"
                        }
                    </span>

                </div>

                <div className="confirm-detail-row">

                    <span>
                        Email
                    </span>

                    <span>
                        {
                            loggedUser?.email ||
                            "N/A"
                        }
                    </span>

                </div>

                <div className="confirm-detail-row">

                    <span>
                        Phone
                    </span>

                    <span>
                        {
                            loggedUser?.phoneNo ||
                            loggedUser?.phone ||
                            "N/A"
                        }
                    </span>

                </div>

            </div>

            {/* =================================================
                BOOKING DETAILS
            ================================================= */}

            <div className="confirm-booking-card">

                <h3>
                    Booking Details
                </h3>

                <div className="confirm-detail-row">

                    <span>
                        Car
                    </span>

                    <span>
                        {
                            car?.modelName ||
                            car?.carName ||
                            "N/A"
                        }
                    </span>

                </div>

                <div className="confirm-detail-row">

                    <span>
                        Car ID
                    </span>

                    <span>
                        {
                            car?.carId ||
                            booking?.carId ||
                            "N/A"
                        }
                    </span>

                </div>

                <div className="confirm-detail-row">

                    <span>
                        Pickup Date
                    </span>

                    <span>
                        {
                            bookingData.pickupDate ||
                            "N/A"
                        }
                    </span>

                </div>

                <div className="confirm-detail-row">

                    <span>
                        Pickup Time
                    </span>

                    <span>
                        {
                            bookingData.pickupTime ||
                            "N/A"
                        }
                    </span>

                </div>

                <div className="confirm-detail-row">

                    <span>
                        Return Date
                    </span>

                    <span>
                        {
                            bookingData.returnDate ||
                            "N/A"
                        }
                    </span>

                </div>

                <div className="confirm-detail-row">

                    <span>
                        Return Time
                    </span>

                    <span>
                        {
                            bookingData.returnTime ||
                            "N/A"
                        }
                    </span>

                </div>

                <div className="confirm-detail-row">

                    <span>
                        Pickup Location
                    </span>

                    <span>
                        {
                            bookingData.pickupLocation ||
                            "N/A"
                        }
                    </span>

                </div>

                <div className="confirm-detail-row">

                    <span>
                        Drop Location
                    </span>

                    <span>
                        {
                            bookingData.dropLocation ||
                            "N/A"
                        }
                    </span>

                </div>

                <div className="confirm-detail-row">

                    <span>
                        Driving Option
                    </span>

                    <span>
                        {
                            bookingData.drivingOption ===
                            "SELF_DRIVE"
                                ? "Self Drive"
                                : "With Driver"
                        }
                    </span>

                </div>

                {/* =================================================
                    DRIVER DETAILS
                ================================================= */}

                {bookingData.drivingOption ===
                    "WITH_DRIVER" && (

                    <>

                        <div className="confirm-detail-row">

                            <span>
                                Driver
                            </span>

                            <span>
                                {
                                    bookingData.driverName ||
                                    booking?.driverName ||
                                    "N/A"
                                }
                            </span>

                        </div>

                        <div className="confirm-detail-row">

                            <span>
                                Driver ID
                            </span>

                            <span>
                                {
                                    bookingData.driverId ||
                                    booking?.driverId ||
                                    "N/A"
                                }
                            </span>

                        </div>

                    </>
                )}

                {/* =================================================
                    SELF DRIVE LICENCE
                ================================================= */}

                {bookingData.drivingOption ===
                    "SELF_DRIVE" && (

                    <div
                        style={{
                            marginTop: "20px",
                        }}
                    >

                        <p
                            style={{
                                fontWeight: "600",
                            }}
                        >
                            Driving Licence
                        </p>

                        {bookingData.drivingLicense ? (

                            bookingData.drivingLicense.type?.startsWith(
                                "image/"
                            ) ? (

                                <img
                                    src={URL.createObjectURL(
                                        bookingData.drivingLicense
                                    )}
                                    alt="Driving Licence"
                                    style={{
                                        width: "260px",
                                        maxWidth: "100%",
                                        height: "170px",
                                        objectFit: "cover",
                                        border: "1px solid #ddd",
                                        borderRadius: "10px",
                                    }}
                                />

                            ) : (

                                <p>
                                    {
                                        bookingData
                                            .drivingLicense
                                            .name
                                    }
                                </p>

                            )

                        ) : (

                            <p>
                                Not Uploaded
                            </p>

                        )}

                    </div>
                )}

                {/* =================================================
                    TOTAL
                ================================================= */}

                <div className="confirm-detail-row confirm-total">

                    <span>
                        Total Amount
                    </span>

                    <span>
                        ₹{" "}
                        {Number(
                            bookingData.totalAmount ||
                            0
                        ).toFixed(2)}
                    </span>

                </div>

            </div>

            {/* =================================================
                NOTE
            ================================================= */}

            <div className="confirm-note-box">

                <strong>
                    Note
                </strong>

                <p>
                    After the Admin approves
                    your booking, a notification
                    will appear in your dashboard.
                </p>

            </div>

            {/* =================================================
                FINISH
            ================================================= */}

            <div className="confirm-buttons">

                <button
                    type="button"
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