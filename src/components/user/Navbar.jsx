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
          className="nav-logo"
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

        <NavLink
    to="/favorites"
    className="icon-btn"
    title="Favorites"
    onClick={closeMenu}
>
    <FaHeart />
</NavLink>

        <NavLink
          to="/user-notifications"
          className="icon-btn nav-notification-btn"
          onClick={closeMenu}
        >
        
          <FaBell />
          <span className="nav-notification-dot"></span>
        </NavLink>

        {/* Profile */}

        <NavLink
          to="/profile"
          className="icon-btn"
          onClick={closeMenu}
          title="Profile"
        >
          <FaUserCircle />
        </NavLink>

        {/* Login */}

        <NavLink
          to="/login"
          className="nav-login-btn"
          onClick={closeMenu}
        >
          Login
        </NavLink>

      </div>

    </nav>
  );
};

export default Navbar;