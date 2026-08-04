import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDownload,
  FaPrint,
  FaArrowLeft
} from "react-icons/fa";
import "./Invoice.css";

const Invoice = () => {

  const navigate = useNavigate();

  const invoice = {

    invoiceNo: "INV-100001",
    bookingId: "CR100001",
    customer: "Kiran Gavhane",
    email: "kiran@gmail.com",
    phone: "+91 9876543210",

    carName: "BMW X5",

    pickup: "Pune",
    drop: "Mumbai",

    pickupDate: "05 Aug 2026",
    returnDate: "07 Aug 2026",

    paymentMethod: "UPI",

    transactionId: "TXN458965214",

    rent: 8000,

    insurance: 500,

    gst: 500,

    total: 9000

  };

  return (

    <div className="invoice-page">

      <div className="invoice-container">

        <div className="invoice-top">

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
            Back
          </button>

          <div>

            <button
              className="print-btn"
              onClick={() => window.print()}
            >
              <FaPrint />
              Print
            </button>

            <button
              className="download-btn"
            >
              <FaDownload />
              Download PDF
            </button>

          </div>

        </div>

        <div className="invoice-header">

          <div>

            <h1>
              <span>Car</span>Rental
            </h1>

            <p>
              Premium Car Rental Services
            </p>

          </div>

          <div className="invoice-number">

            <h2>INVOICE</h2>

            <p>{invoice.invoiceNo}</p>

          </div>

        </div>

        <div className="invoice-grid">

          <div>

            <h3>Customer Details</h3>

            <p><strong>Name :</strong> {invoice.customer}</p>

            <p><strong>Email :</strong> {invoice.email}</p>

            <p><strong>Phone :</strong> {invoice.phone}</p>

          </div>

          <div>

            <h3>Booking Details</h3>

            <p><strong>Booking ID :</strong> {invoice.bookingId}</p>

            <p><strong>Pickup :</strong> {invoice.pickup}</p>

            <p><strong>Drop :</strong> {invoice.drop}</p>

            <p><strong>Pickup Date :</strong> {invoice.pickupDate}</p>

            <p><strong>Return Date :</strong> {invoice.returnDate}</p>

          </div>

        </div>

        <table className="invoice-table">

          <thead>

            <tr>

              <th>Description</th>

              <th>Amount</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>Car Rent ({invoice.carName})</td>

              <td>₹ {invoice.rent}</td>

            </tr>

            <tr>

              <td>Insurance</td>

              <td>₹ {invoice.insurance}</td>

            </tr>

            <tr>

              <td>GST</td>

              <td>₹ {invoice.gst}</td>

            </tr>

            <tr className="total-row">

              <td>Total</td>

              <td>₹ {invoice.total}</td>

            </tr>

          </tbody>

        </table>

        <div className="payment-info">

          <h3>Payment Details</h3>

          <p>

            <strong>Payment Method :</strong>

            {invoice.paymentMethod}

          </p>

          <p>

            <strong>Transaction ID :</strong>

            {invoice.transactionId}

          </p>

          <p>

            <strong>Status :</strong>

            <span className="paid">

              PAID

            </span>

          </p>

        </div>

      </div>

    </div>

  );

};

export default Invoice;