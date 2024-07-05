import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "../css/Navbar.css";

const Navbar = ({ role }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          Book Store
        </Link>
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      <div className={`navbar-right ${isMobileMenuOpen ? "open" : ""}`}>
        <Link to="/books" className="navbar-link">
          Books
        </Link>
        {role === "admin" && (
          <>
            <Link to="/addbook" className="navbar-link">
              Add Book
            </Link>
            <Link to="/addstudent" className="navbar-link">
              Add Student
            </Link>
            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>
          </>
        )}
        {role === "" ? (
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        ) : (
          <Link to="/logout" className="navbar-link">
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
