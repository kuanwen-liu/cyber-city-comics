import React from "react";
import { Link } from "react-router-dom";

import "./button.styles.css";

const Button = (props) => {
  return (
    <Link onClick={props.onClick} to={props.to} className="btn">
      {props.children}
    </Link>
  );
};

export default Button;
