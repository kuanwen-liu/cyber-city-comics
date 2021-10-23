import React from "react";

import "./header.styles.css";
import Navigation from "./navigation.component";
import logo from "../../assets/logo_transparent.png";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo" />
        <div>
          <h1>Cyber City Comics</h1>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Header;
