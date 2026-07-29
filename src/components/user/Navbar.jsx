import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHeart,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">

      {/* Left */}

      <div className="nav-left">

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <NavLink
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          <span>Car</span>Rental
        </NavLink>

      </div>

      {/* Center */}

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>

        <li>
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/cars" onClick={closeMenu}>
            Cars
          </NavLink>
        </li>

        <li>
          <NavLink to="/offers" onClick={closeMenu}>
            Offers
          </NavLink>
        </li>

        <li>
          <NavLink to="/services" onClick={closeMenu}>
            Services
          </NavLink>
        </li>

        <li>
          <NavLink to="/contactUs" onClick={closeMenu}>
            Contact Us
          </NavLink>
        </li>

        <li>
          <NavLink to="/aboutUs" onClick={closeMenu}>
            About Us
          </NavLink>
        </li>

      </ul>

      {/* Right */}

      <div className="nav-right">

        <button className="icon-btn">
          <FaHeart />
        </button>

        <button className="icon-btn notification-btn">
          <FaBell />
          <span className="notification-dot"></span>
        </button>

        <button className="icon-btn">
          <FaUserCircle />
        </button>

        <button className="login-btn">
          Login
        </button>

      </div>

    </nav>
  );
};

export default Navbar;