import React from "react";
import logo from "../../assets/logo.png"; // Correct import of the image
import { Link } from "react-router-dom";

const Logo = () => {
    return(
        <Link to="/">
            <img src={logo} alt="Logo"
            className="w-40"/>
        </Link>
    );
}

export default Logo;
