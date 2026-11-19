import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyBookings.css";

import bookingService from "../../../services/bookingService";
import carService from "../../../services/carService"; 

const MyBookings = () => {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch bookings
    useEffect(() => {

        fetchBookings();

    }, []);

 const fetchBookings = async () => {
    try {
        setLoading(true);
        setError("");

        const storedUser = localStorage.getItem("loggedUser");

        if (!storedUser) {
            setError("Please login to view bookings.");
            return;
        }

        const user = JSON.parse(storedUser);
        const userId = user.userId || user.id;

        if (!userId) {
            setError("User ID not found.");
            return;
        }

        // Fetch user bookings
        const response =
            await bookingService.getBookingsByUserId(userId);

        const responseData = response.data?.data ?? response.data;

        const bookingList = Array.isArray(responseData)
            ? responseData
            : responseData?.content ?? [];

        // Fetch car details using carId
        const updatedBookings = await Promise.all(
    bookingList.map(async (booking) => {
        try {
            const carData = await carService.getCarById(booking.carId);

            return {
                ...booking,
                carName: carData.modelName,
                carNumber: carData.carNo,
            };

        } catch (error) {
            console.error("Unable to fetch car:", booking.carId, error);

            return {
                ...booking,
                carName: "Car not found",
                carNumber: "N/A",
            };
        }
    })
);

setBookings(updatedBookings);

    } catch (error) {
        console.error("Booking fetch error:", error);
        setError("Unable to load bookings.");
    } finally {
        setLoading(false);
    }
};


    // Navigate to payment
    const handlePayment = (booking) => {

        navigate(`/payment/${booking.id ?? booking.bookingId}`);

    };


    // Cancel booking
    const cancelBooking = async (booking) => {

        if (!window.confirm("Are you sure you want to cancel this booking?")) {
            return;
        }

        try {

            const bookingId = booking.id ?? booking.bookingId;

            await bookingService.cancelBooking(bookingId);

            alert("Booking cancelled successfully.");

            fetchBookings();

        } catch (err) {

            console.error("Cancel Booking Error:", err);

            alert(
                err.response?.data?.message ||
                "Unable to cancel booking."
            );

        }

    };


    // Loading
    if (loading) {

        return (
            <div className="my-bookings">
                <h2>Loading Bookings...</h2>
            </div>
        );

    }


    // Error
    if (error) {

        return (
            <div className="my-bookings">
                <h2>{error}</h2>

                <button onClick={fetchBookings}>
                    Retry
                </button>
            </div>
        );

    }


    return (

        <div className="my-bookings">

            <h2>My Bookings</h2>

            <div className="booking-table">

                <table>

                    <thead>

                        <tr>
                            <th>Booking ID</th>
                            <th>Car</th>
                            <th>Pickup</th>
                            <th>Drop</th>
                            <th>Pickup Date</th>
                            <th>Return Date</th>
                            <th>Amount</th>
                            <th>Booking</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {bookings.length > 0 ? (

                            bookings.map((booking) => {

                                const bookingId =
                                    booking.id ?? booking.bookingId;

                                const bookingStatus =
                                    booking.bookingStatus?.toUpperCase();

                                const paymentStatus =
                                    booking.paymentStatus?.toUpperCase();

                                return (

                                    <tr key={bookingId}>

                                        <td>
                                            {booking.bookingId}
                                        </td>

                                        <td>
                                            {booking.modelName ??
                                                booking.car?.modelName ??
                                                "N/A"}
                                        </td>

                                        <td>
                                            {booking.pickupLocation ??
                                                booking.pickup ??
                                                "N/A"}
                                        </td>

                                        <td>
                                            {booking.dropLocation ??
                                                booking.drop ??
                                                "N/A"}
                                        </td>

                                        <td>
                                            {booking.pickupDate}
                                        </td>

                                        <td>
                                            {booking.returnDate}
                                        </td>

                                        <td>
                                            ₹ {booking.totalAmount ??
                                                booking.amount ??
                                                0}
                                        </td>

                                        <td>
                                            <span className={
                                                bookingStatus?.toLowerCase()
                                            }>
                                                {bookingStatus}
                                            </span>
                                        </td>

                                        <td>
                                            <span className={
                                                paymentStatus?.toLowerCase()
                                            }>
                                                {paymentStatus}
                                            </span>
                                        </td>

                                        <td>

                                            <div className="action-buttons">

                                                {/* VIEW */}

                                                <button
                                                    className="view-btn"
                                                    onClick={() =>
                                                        navigate(
                                                            `/booking-details/${bookingId}`
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>


                                                {/* PAY */}

                                                {bookingStatus === "APPROVED" &&
                                                    paymentStatus === "PENDING" && (

                                                        <button
                                                            className="pay-btn"
                                                            onClick={() =>
                                                                handlePayment(booking)
                                                            }
                                                        >
                                                            Pay
                                                        </button>

                                                    )}


                                                {/* INVOICE */}

                                                {paymentStatus === "PAID" && (

                                                    <button
                                                        className="invoice-btn"
                                                        onClick={() =>
                                                            navigate("/invoice", {
                                                                state: { booking }
                                                            })
                                                        }
                                                    >
                                                        Invoice
                                                    </button>

                                                )}


                                                {/* CANCEL */}

                                                {(bookingStatus === "PENDING" ||
                                                    bookingStatus === "APPROVED") && (

                                                        <button
                                                            className="cancel-btn"
                                                            onClick={() =>
                                                                cancelBooking(booking)
                                                            }
                                                        >
                                                            Cancel
                                                        </button>

                                                    )}

                                            </div>

                                        </td>

                                    </tr>

                                );

                            })

                        ) : (

                            <tr>
                                <td colSpan="10">
                                    No bookings found.
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default MyBookings;