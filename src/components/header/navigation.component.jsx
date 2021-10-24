import React from "react";
import { Link } from "react-router-dom";

import "./navigation.styles.css";

const Navigation = () => {
  const closeTheNavigation = () => {
    document.getElementById("navi-toggle").checked = false;
  };

  return (
    <div className="navigation">
      <input
        type="checkbox"
        className="navigation__checkbox"
        id="navi-toggle"
      />
      {/* Label is to link the input field when click label will check or uncheck the input */}
      <label htmlFor="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>
      <div className="navigation__background"></div>
      <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link
              to="/"
              className="navigation__link"
              onClick={closeTheNavigation}
            >
              Home
            </Link>
          </li>
          <li className="navigation__item">
            <Link
              to="/about"
              className="navigation__link"
              onClick={closeTheNavigation}
            >
              About Us
            </Link>
          </li>
          <li className="navigation__item">
            <Link
              to="/"
              className="navigation__link"
              onClick={closeTheNavigation}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
