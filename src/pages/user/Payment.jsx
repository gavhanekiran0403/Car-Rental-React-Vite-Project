import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaCar,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaCreditCard,
    FaMobileAlt,
    FaWallet
} from "react-icons/fa";

import bookingService from "../../services/bookingService";
import "./Payment.css";

const Payment = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("upi");
    const [upiMethod, setUpiMethod] = useState("upi_id");

    const [upiId, setUpiId] = useState("");

    // Fetch booking details from backend
    useEffect(() => {

        const fetchBooking = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await bookingService.getBookingById(id);

                // Supports both wrapped and unwrapped API responses
                const responseData =
                    response.data?.data ?? response.data;

                const bookingData =
                    responseData?.booking ?? responseData;

                if (!bookingData) {
                    throw new Error("Booking not found");
                }

                setBooking(bookingData);

            } catch (err) {

                console.error("Booking Fetch Error:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to fetch booking details."
                );

            } finally {

                setLoading(false);

            }
        };

        if (id) {
            fetchBooking();
        }

    }, [id]);


    // Get booking properties with common DTO field-name alternatives
    const getBookingDetails = () => {

        if (!booking) return {};

        return {

            bookingId:
                booking.bookingId ?? booking.id,

            carName:
                booking.carName ??
                booking.car?.carName ??
                booking.car?.model ??
                booking.carModel ??
                "Rental Car",

            pickup:
                booking.pickup ??
                booking.pickupLocation,

            drop:
                booking.drop ??
                booking.dropLocation,

            pickupDate:
                booking.pickupDate,

            returnDate:
                booking.returnDate,

            amount:
                booking.totalAmount ??
                booking.amount ??
                booking.total ??
                0,

            image:
                booking.imageUrl ??
                booking.carImage ??
                booking.car?.imageUrl ??
                ""

        };

    };

    const bookingDetails = getBookingDetails();


    // Handle payment
    const handlePayment = async () => {

        if (!booking) return;

        if (booking.bookingStatus !== "APPROVED") {
            alert("Your booking must be approved before payment.");
            return;
        }

        if (paymentMethod === "upi" && upiMethod === "upi_id") {

            if (!upiId.trim()) {
                alert("Please enter your UPI ID");
                return;
            }

            if (!/^[\w.-]+@[\w.-]+$/.test(upiId.trim())) {
                alert("Please enter a valid UPI ID");
                return;
            }

        }

        if (paymentMethod === "cod") {

            alert("Cash on Pickup selected.");

            // TODO: Save COD payment selection through backend.

            return;
        }

        /*
          Online payment integration:

          1. Create Razorpay order using Spring Boot.
          2. Open Razorpay Checkout.
          3. Complete payment.
          4. Verify payment signature on backend.
          5. Update booking payment status.
        */

        alert(
            "Connect your Razorpay payment API to complete online payment."
        );

    };


    // Loading
    if (loading) {

        return (
            <div className="payment-page">
                <div className="payment-container">
                    <h1>Loading Booking Details...</h1>
                </div>
            </div>
        );

    }


    // Error
    if (error || !booking) {

        return (
            <div className="payment-page">
                <div className="payment-container">

                    <h1>Booking Not Found</h1>

                    <p>{error}</p>

                    <button
                        className="cancel-btn"
                        onClick={() => navigate("/my-bookings")}
                    >
                        Back to My Bookings
                    </button>

                </div>
            </div>
        );

    }


    return (

        <div className="payment-page">

            <div className="payment-container">

                <button
                    className="payment-back"
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft /> Back
                </button>

                <h1>Complete Your Payment</h1>


                {/* BOOKING SUMMARY */}

                <div className="booking-summary">

                    {bookingDetails.image && (

                        <img
                            src={bookingDetails.image}
                            alt={bookingDetails.carName}
                        />

                    )}

                    <div className="booking-details">

                        <h2>
                            <FaCar /> {bookingDetails.carName}
                        </h2>

                        <p>
                            <FaCalendarAlt />
                            {bookingDetails.pickupDate} -
                            {bookingDetails.returnDate}
                        </p>

                        <p>
                            <FaMapMarkerAlt />
                            {bookingDetails.pickup} →
                            {bookingDetails.drop}
                        </p>

                        <p>
                            Booking ID:
                            <strong>{bookingDetails.bookingId}</strong>
                        </p>

                    </div>

                </div>


                {/* PRICE DETAILS */}

                <div className="payment-price">

                    <h2>Price Details</h2>

                    <div>
                        <span>Total Rental Amount</span>
                        <span>
                            ₹ {bookingDetails.amount}
                        </span>
                    </div>

                    <div className="payment-total">
                        <span>Total Amount</span>
                        <span>
                            ₹ {bookingDetails.amount}
                        </span>
                    </div>

                </div>


                {/* PAYMENT METHODS */}

                <div className="payment-method">

                    <h2>Select Payment Method</h2>


                    {/* CASH */}

                    <div className="payment-option-wrapper">

                        <label className={
                            paymentMethod === "cod"
                                ? "payment-option active"
                                : "payment-option"
                        }>

                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "cod"}
                                onChange={() => setPaymentMethod("cod")}
                            />

                            <FaMoneyBillWave />

                            <span>
                                <strong>Cash on Delivery</strong>
                                <small>Pay when you collect the car</small>
                            </span>

                        </label>

                        {paymentMethod === "cod" && (

                            <div className="expanded-payment-form">

                                <h3>Cash on Pickup</h3>

                                <p>
                                    Pay ₹ {bookingDetails.amount} when
                                    collecting your rental car.
                                </p>

                                <div className="cod-info">
                                    <FaWallet />
                                    Cash payment at pickup.
                                </div>

                            </div>

                        )}

                    </div>


                    {/* DEBIT CARD */}

                    <div className="payment-option-wrapper">

                        <label className={
                            paymentMethod === "debit"
                                ? "payment-option active"
                                : "payment-option"
                        }>

                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "debit"}
                                onChange={() => setPaymentMethod("debit")}
                            />

                            <FaCreditCard />

                            <span>
                                <strong>Debit Card</strong>
                                <small>Pay using your debit card</small>
                            </span>

                        </label>

                        {paymentMethod === "debit" && (

                            <div className="expanded-payment-form">

                                <h3>Debit Card Payment</h3>

                                <p className="gateway-notice">
                                    Your card details will be collected
                                    securely through Razorpay Checkout.
                                </p>

                            </div>

                        )}

                    </div>


                    {/* CREDIT CARD */}

                    <div className="payment-option-wrapper">

                        <label className={
                            paymentMethod === "credit"
                                ? "payment-option active"
                                : "payment-option"
                        }>

                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "credit"}
                                onChange={() => setPaymentMethod("credit")}
                            />

                            <FaCreditCard />

                            <span>
                                <strong>Credit Card</strong>
                                <small>Pay using your credit card</small>
                            </span>

                        </label>

                        {paymentMethod === "credit" && (

                            <div className="expanded-payment-form">

                                <h3>Credit Card Payment</h3>

                                <p className="gateway-notice">
                                    Your card details will be collected
                                    securely through Razorpay Checkout.
                                </p>

                            </div>

                        )}

                    </div>


                    {/* UPI */}

                    <div className="payment-option-wrapper">

                        <label className={
                            paymentMethod === "upi"
                                ? "payment-option active"
                                : "payment-option"
                        }>

                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "upi"}
                                onChange={() => setPaymentMethod("upi")}
                            />

                            <FaMobileAlt />

                            <span>
                                <strong>UPI</strong>
                                <small>PhonePe, Google Pay and UPI ID</small>
                            </span>

                        </label>

                        {paymentMethod === "upi" && (

                            <div className="expanded-payment-form">

                                <h3>Select UPI Option</h3>

                                <div className="upi-options">

                                    <button
                                        type="button"
                                        className={
                                            upiMethod === "phonepe"
                                                ? "upi-option selected"
                                                : "upi-option"
                                        }
                                        onClick={() => setUpiMethod("phonepe")}
                                    >
                                        <span className="upi-logo phonepe">
                                            P
                                        </span>
                                        PhonePe
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            upiMethod === "googlepay"
                                                ? "upi-option selected"
                                                : "upi-option"
                                        }
                                        onClick={() => setUpiMethod("googlepay")}
                                    >
                                        <span className="upi-logo googlepay">
                                            G
                                        </span>
                                        Google Pay
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            upiMethod === "upi_id"
                                                ? "upi-option selected"
                                                : "upi-option"
                                        }
                                        onClick={() => setUpiMethod("upi_id")}
                                    >
                                        <span className="upi-logo upi-logo-id">
                                            UPI
                                        </span>
                                        UPI ID
                                    </button>

                                </div>


                                {upiMethod === "upi_id" && (

                                    <div className="upi-input-section">

                                        <label>Enter UPI ID</label>

                                        <input
                                            type="text"
                                            placeholder="example@okaxis"
                                            value={upiId}
                                            onChange={(e) =>
                                                setUpiId(e.target.value)
                                            }
                                        />

                                    </div>

                                )}


                                {upiMethod === "phonepe" && (

                                    <div className="upi-selected-info">
                                        <strong>PhonePe Selected</strong>
                                        <p>
                                            Continue to Razorpay Checkout
                                            to complete payment.
                                        </p>
                                    </div>

                                )}


                                {upiMethod === "googlepay" && (

                                    <div className="upi-selected-info">
                                        <strong>Google Pay Selected</strong>
                                        <p>
                                            Continue to Razorpay Checkout
                                            to complete payment.
                                        </p>
                                    </div>

                                )}

                            </div>

                        )}

                    </div>

                </div>


                {/* BUTTONS */}

                <div className="payment-buttons">

                    <button
                        className="cancel-btn"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>

                    <button
                        className="pay-btn"
                        onClick={handlePayment}
                    >
                        {paymentMethod === "cod"
                            ? "Confirm Booking"
                            : `Pay ₹ ${bookingDetails.amount}`}
                    </button>

                </div>

            </div>

        </div>

    );

};

export default Payment;