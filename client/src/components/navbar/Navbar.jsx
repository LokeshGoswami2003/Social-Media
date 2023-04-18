import React from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router";
import Avatar from "../avatar/Avatar";
function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="Navbar">
            <div className="container">
                <h2 className="banner hover-link" onClick={() => navigate("/")}>
                    Social Media
                </h2>
                <div className="right-side">
                    <div
                        className="profile hover-link"
                        onClick={() => navigate("/profile/dummy")}
                    >
                        <Avatar />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
