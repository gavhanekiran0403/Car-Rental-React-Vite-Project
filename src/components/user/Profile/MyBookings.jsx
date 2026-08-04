import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyBookings.css";

const bookings = [
  {
    id: 1,
    bookingId: "CR100001",
    carName: "BMW X5",
    pickup: "Pune",
    drop: "Mumbai",
    pickupDate: "05 Aug 2026",
    returnDate: "07 Aug 2026",
    amount: 9000,
    bookingStatus: "PENDING",
    paymentStatus: "PENDING",
  },
  {
    id: 2,
    bookingId: "CR100002",
    carName: "Mercedes C-Class",
    pickup: "Pune",
    drop: "Nashik",
    pickupDate: "12 Aug 2026",
    returnDate: "15 Aug 2026",
    amount: 15000,
    bookingStatus: "APPROVED",
    paymentStatus: "PENDING",
  },
  {
    id: 3,
    bookingId: "CR100003",
    carName: "Toyota Fortuner",
    pickup: "Pune",
    drop: "Goa",
    pickupDate: "18 Aug 2026",
    returnDate: "22 Aug 2026",
    amount: 22000,
    bookingStatus: "APPROVED",
    paymentStatus: "PAID",
  },
  {
    id: 4,
    bookingId: "CR100004",
    carName: "Audi A6",
    pickup: "Mumbai",
    drop: "Pune",
    pickupDate: "25 Aug 2026",
    returnDate: "27 Aug 2026",
    amount: 11000,
    bookingStatus: "REJECTED",
    paymentStatus: "PENDING",
  },
  {
    id: 5,
    bookingId: "CR100005",
    carName: "Hyundai Creta",
    pickup: "Pune",
    drop: "Satara",
    pickupDate: "28 Aug 2026",
    returnDate: "30 Aug 2026",
    amount: 6000,
    bookingStatus: "CANCELLED",
    paymentStatus: "PENDING",
  },
];

const MyBookings = () => {

  const navigate = useNavigate();

  const cancelBooking = (id) => {

    if (window.confirm("Cancel this booking?")) {

      alert("Booking Cancelled Successfully");

      // Backend API

    }

  };

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

            {bookings.map((booking) => (

              <tr key={booking.id}>

                <td>{booking.bookingId}</td>

                <td>{booking.carName}</td>

                <td>{booking.pickup}</td>

                <td>{booking.drop}</td>

                <td>{booking.pickupDate}</td>

                <td>{booking.returnDate}</td>

                <td>₹ {booking.amount}</td>

                <td>

                  <span className={booking.bookingStatus.toLowerCase()}>

                    {booking.bookingStatus}

                  </span>

                </td>

                <td>

                  <span className={booking.paymentStatus.toLowerCase()}>

                    {booking.paymentStatus}

                  </span>

                </td>

                <td>

                  <div className="action-buttons">

                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(`/booking-details/${booking.id}`)
                      }
                    >
                      View
                    </button>

                    {booking.bookingStatus === "APPROVED" &&
                      booking.paymentStatus === "PENDING" && (

                        <button
                          className="pay-btn"
                          onClick={() =>
                            navigate(`/payment/${booking.id}`)
                          }
                        >
                          Pay
                        </button>

                      )}

                    {booking.paymentStatus === "PAID" && (

                      <button
                        className="invoice-btn"
                        onClick={() =>
                          navigate("/invoice")
                        }
                      >
                        Invoice
                      </button>

                    )}

                    {(booking.bookingStatus === "PENDING" ||
                      booking.bookingStatus === "APPROVED") && (

                        <button
                          className="cancel-btn"
                          onClick={() =>
                            cancelBooking(booking.id)
                          }
                        >
                          Cancel
                        </button>

                      )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default MyBookings;