import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    FaArrowLeft,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaCar,
    FaMoneyBillWave,
    FaCheckCircle,
    FaClock,
    FaTimesCircle
} from "react-icons/fa";

import "./BookingDetails.css";

const bookings = [

    {
        id: 1,
        bookingId: "CR100001",
        carName: "BMW X5",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200",
        pickup: "Pune",
        drop: "Mumbai",
        pickupDate: "05 Aug 2026",
        returnDate: "07 Aug 2026",
        drivingOption: "Self Drive",
        bookingDate: "03 Aug 2026",
        rent: 8000,
        insurance: 500,
        gst: 500,
        total: 9000,
        bookingStatus: "PENDING",
        paymentStatus: "PENDING"
    },

    {
        id: 2,
        bookingId: "CR100002",
        carName: "Mercedes C-Class",
        image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200",
        pickup: "Pune",
        drop: "Nashik",
        pickupDate: "12 Aug 2026",
        returnDate: "15 Aug 2026",
        drivingOption: "With Driver",
        bookingDate: "08 Aug 2026",
        rent: 13000,
        insurance: 1000,
        gst: 1000,
        total: 15000,
        bookingStatus: "APPROVED",
        paymentStatus: "PENDING"
    },

    {
        id: 3,
        bookingId: "CR100003",
        carName: "Toyota Fortuner",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200",
        pickup: "Pune",
        drop: "Goa",
        pickupDate: "18 Aug 2026",
        returnDate: "22 Aug 2026",
        drivingOption: "Self Drive",
        bookingDate: "15 Aug 2026",
        rent: 20000,
        insurance: 1000,
        gst: 1000,
        total: 22000,
        bookingStatus: "APPROVED",
        paymentStatus: "PAID"
    },

    {
        id: 4,
        bookingId: "CR100004",
        carName: "Audi A6",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200",
        pickup: "Mumbai",
        drop: "Pune",
        pickupDate: "25 Aug 2026",
        returnDate: "27 Aug 2026",
        drivingOption: "With Driver",
        bookingDate: "20 Aug 2026",
        rent: 10000,
        insurance: 500,
        gst: 500,
        total: 11000,
        bookingStatus: "REJECTED",
        paymentStatus: "PENDING"
    },

    {
        id: 5,
        bookingId: "CR100005",
        carName: "Hyundai Creta",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200",
        pickup: "Pune",
        drop: "Satara",
        pickupDate: "28 Aug 2026",
        returnDate: "30 Aug 2026",
        drivingOption: "Self Drive",
        bookingDate: "25 Aug 2026",
        rent: 5000,
        insurance: 500,
        gst: 500,
        total: 6000,
        bookingStatus: "CANCELLED",
        paymentStatus: "PENDING"
    }

];

const BookingDetails = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const booking = bookings.find(
        b => b.id === Number(id)
    );

    if (!booking) {

        return (
            <div className="booking-details-page">

                <h2>Booking Not Found</h2>

            </div>
        );

    }

    const getStatusIcon = () => {

        switch (booking.bookingStatus) {

            case "APPROVED":
                return (
                    <FaCheckCircle className="approved-icon"/>
                );

            case "PENDING":
                return (
                    <FaClock className="pending-icon"/>
                );

            case "REJECTED":
                return (
                    <FaTimesCircle className="rejected-icon"/>
                );

            default:
                return null;

        }

    };

    return (

        <div className="booking-details-page">

            <div className="booking-container">

                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft />
                    Back
                </button>

                <div className="booking-image">

                    <img
                        src={booking.image}
                        alt={booking.carName}
                    />

                </div>

                <div className="booking-header">

                    <div>

                        <h1>{booking.carName}</h1>

                        <p>{booking.bookingId}</p>

                    </div>

                    {getStatusIcon()}

                </div>

                <div className="booking-info">

                    <div>
                        <FaCalendarAlt />
                        <span>
                            Booking Date
                        </span>
                        <strong>
                            {booking.bookingDate}
                        </strong>
                    </div>

                    <div>
                        <FaCalendarAlt />
                        <span>
                            Pickup Date
                        </span>
                        <strong>
                            {booking.pickupDate}
                        </strong>
                    </div>

                    <div>
                        <FaCalendarAlt />
                        <span>
                            Return Date
                        </span>
                        <strong>
                            {booking.returnDate}
                        </strong>
                    </div>

                    <div>
                        <FaMapMarkerAlt />
                        <span>
                            Pickup
                        </span>
                        <strong>
                            {booking.pickup}
                        </strong>
                    </div>

                    <div>
                        <FaMapMarkerAlt />
                        <span>
                            Drop
                        </span>
                        <strong>
                            {booking.drop}
                        </strong>
                    </div>

                    <div>
                        <FaCar />
                        <span>
                            Driving Option
                        </span>
                        <strong>
                            {booking.drivingOption}
                        </strong>
                    </div>

                </div>
                                {/* Price Details */}

                <div className="price-card">

                    <h2>Price Details</h2>

                    <div className="price-row">
                        <span>Car Rent</span>
                        <span>₹ {booking.rent}</span>
                    </div>

                    <div className="price-row">
                        <span>Insurance</span>
                        <span>₹ {booking.insurance}</span>
                    </div>

                    <div className="price-row">
                        <span>GST</span>
                        <span>₹ {booking.gst}</span>
                    </div>

                    <div className="price-row total">
                        <span>Total Amount</span>
                        <span>₹ {booking.total}</span>
                    </div>

                </div>

                {/* Booking Status */}

                <div className="status-card">

                    <h2>Booking Status</h2>

                    <div className="status-row">
                        <span>Booking Status</span>

                        <strong
                            className={
                                booking.bookingStatus.toLowerCase()
                            }
                        >
                            {booking.bookingStatus}
                        </strong>
                    </div>

                    <div className="status-row">
                        <span>Payment Status</span>

                        <strong
                            className={
                                booking.paymentStatus.toLowerCase()
                            }
                        >
                            {booking.paymentStatus}
                        </strong>
                    </div>

                </div>

                {/* Action Buttons */}

                <div className="booking-actions">

                    <button
                        className="back-button"
                        onClick={() => navigate("/user-notifications")}
                    >
                        Back
                    </button>

                    {(booking.bookingStatus === "PENDING" ||
                        booking.bookingStatus === "APPROVED") && (

                        <button
                            className="cancel-button"
                            onClick={() =>
                                alert("Booking Cancelled Successfully")
                            }
                        >
                            Cancel Booking
                        </button>

                    )}

                    {booking.bookingStatus === "APPROVED" &&
                        booking.paymentStatus === "PENDING" && (

                        <button
                            className="pay-button"
                            onClick={() =>
                                alert("Redirecting to Payment Page...")
                            }
                        >
                            Pay Now
                        </button>

                    )}

                    {booking.paymentStatus === "PAID" && (

                        <button
                            className="invoice-button"
                        >
                            Download Invoice
                        </button>

                    )}

                </div>

            </div>

        </div>

    );

};

export default BookingDetails;