import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserNotifications.css";

import {
    FaBell,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaMoneyBillWave,
    FaCar,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaFileInvoice
} from "react-icons/fa";

const notifications = [

    {
        id: 1,
        carName: "BMW X5",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
        pickup: "Pune",
        drop: "Mumbai",
        pickupDate: "05 Aug 2026",
        returnDate: "07 Aug 2026",
        amount: 9000,
        status: "PENDING",
        message: "Your booking request has been sent to the admin."
    },

    {
        id: 2,
        carName: "Mercedes C-Class",
        image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800",
        pickup: "Pune",
        drop: "Nashik",
        pickupDate: "12 Aug 2026",
        returnDate: "15 Aug 2026",
        amount: 15000,
        status: "APPROVED",
        message: "Your booking has been approved. Complete payment to confirm."
    },

    {
        id: 3,
        carName: "Toyota Fortuner",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
        pickup: "Pune",
        drop: "Goa",
        pickupDate: "18 Aug 2026",
        returnDate: "22 Aug 2026",
        amount: 22000,
        status: "PAID",
        message: "Payment completed successfully."
    },

    {
        id: 4,
        carName: "Audi A6",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800",
        pickup: "Mumbai",
        drop: "Pune",
        pickupDate: "25 Aug 2026",
        returnDate: "27 Aug 2026",
        amount: 11000,
        status: "REJECTED",
        message: "Unfortunately your booking request has been rejected."
    },

    {
        id: 5,
        carName: "Hyundai Creta",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
        pickup: "Pune",
        drop: "Satara",
        pickupDate: "28 Aug 2026",
        returnDate: "30 Aug 2026",
        amount: 6000,
        status: "CANCELLED",
        message: "You cancelled this booking."
    }

];

const UserNotifications = () => {

    const navigate = useNavigate();

    const cancelBooking = (id) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (confirmCancel) {

            alert("Booking Cancelled Successfully");

            // Backend API
            // axios.put(`/api/bookings/${id}/cancel`);

        }

    };

    const getIcon = (status) => {

        switch (status) {

            case "APPROVED":
                return <FaCheckCircle className="status-icon approved"/>;

            case "PENDING":
                return <FaClock className="status-icon pending"/>;

            case "PAID":
                return <FaMoneyBillWave className="status-icon paid"/>;

            case "REJECTED":
                return <FaTimesCircle className="status-icon rejected"/>;

            case "CANCELLED":
                return <FaBell className="status-icon cancelled"/>;

            default:
                return <FaBell className="status-icon"/>;
        }

    };

    return (

        <div className="user-notification-page">

            <div className="user-notification-header">

                <h1>My Notifications</h1>

                <p>
                    View all your booking requests and latest updates.
                </p>

            </div>

            <div className="notification-list">

                {notifications.map((booking) => (

                    <div
                        className="notification-card"
                        key={booking.id}
                    >

                        <img
                            src={booking.image}
                            alt={booking.carName}
                            className="notification-car-image"
                        />

                        <div className="notification-content">

                            <div className="notification-top">

                                <h2>{booking.carName}</h2>

                                {getIcon(booking.status)}

                            </div>

                            <p className="notification-message">

                                {booking.message}

                            </p>

                            <div className="booking-details">

                                <div>

                                    <FaMapMarkerAlt/>

                                    <span>
                                        {booking.pickup} → {booking.drop}
                                    </span>

                                </div>

                                <div>

                                    <FaCalendarAlt/>

                                    <span>
                                        {booking.pickupDate} - {booking.returnDate}
                                    </span>

                                </div>

                                <div>

                                    <FaCar/>

                                    <span>
                                        ₹ {booking.amount}
                                    </span>

                                </div>

                            </div>

                            <div className="notification-status">

                                Status :

                                <strong>

                                    {booking.status}

                                </strong>

                            </div>

                            {/* Buttons Start Here */}
                                                        <div className="notification-buttons">

                                {/* View Details */}

                                <button
                                    className="details-btn"
                                    onClick={() =>
                                        navigate(`/booking-details/${booking.id}`)
                                    }
                                >
                                    View Details
                                </button>

                                {/* Pay Now */}

                                {booking.status === "APPROVED" && (

                                    <button
                                        className="pay-btn"
                                        onClick={() =>
                                            navigate(`/payment/${booking.id}`)
                                        }
                                    >
                                        Pay Now
                                    </button>

                                )}

                                {/* Invoice */}

                                {booking.status === "PAID" && (

                                    <button
                                        className="invoice-btn"
                                        onClick={() =>
                                            navigate("/invoice")
                                        }
                                    >
                                        <FaFileInvoice />

                                        Invoice
                                    </button>

                                )}

                                {/* Cancel Booking */}

                                {(booking.status === "PENDING" ||
                                    booking.status === "APPROVED") && (

                                    <button
                                        className="cancel-btn"
                                        onClick={() =>
                                            cancelBooking(booking.id)
                                        }
                                    >
                                        Cancel Booking
                                    </button>

                                )}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default UserNotifications;