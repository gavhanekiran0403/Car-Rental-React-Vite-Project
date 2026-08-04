import React from "react";
import "./ServicesCard.css";

import {
    FaCarSide,
    FaUserTie,
    FaMapMarkedAlt,
    FaShieldAlt,
    FaTools,
    FaHeadset
} from "react-icons/fa";

const ServicesCard = () => {

    return (

        <section className="services-container">

            <div className="service-card">

                <FaCarSide className="icon" />

                <h3>Self Drive Cars</h3>

                <p>
                    Choose from hatchbacks, sedans, SUVs and luxury cars
                    at affordable prices.
                </p>

            </div>

            <div className="service-card">

                <FaUserTie className="icon" />

                <h3>Car With Driver</h3>

                <p>
                    Professional chauffeurs for business meetings,
                    weddings and family trips.
                </p>

            </div>

            <div className="service-card">

                <FaMapMarkedAlt className="icon" />

                <h3>Outstation Trips</h3>

                <p>
                    Unlimited kilometres with flexible packages
                    for long-distance travel.
                </p>

            </div>

            <div className="service-card">

                <FaShieldAlt className="icon" />

                <h3>Fully Insured</h3>

                <p>
                    Every vehicle is insured and regularly inspected
                    for maximum safety.
                </p>

            </div>

            <div className="service-card">

                <FaTools className="icon" />

                <h3>24×7 Road Assistance</h3>

                <p>
                    Emergency roadside support whenever and wherever
                    you need help.
                </p>

            </div>

            <div className="service-card">

                <FaHeadset className="icon" />

                <h3>Customer Support</h3>

                <p>
                    Dedicated customer service available anytime
                    to assist your booking.
                </p>

            </div>

        </section>

    );

};

export default ServicesCard;