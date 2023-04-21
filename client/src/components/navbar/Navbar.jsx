import React, { useRef, useState } from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router";
import Avatar from "../avatar/Avatar";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";
function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function toggleLoadingBar() {
        dispatch(setLoading(true));
    }
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
                    <div
                        className="logout hover-link"
                        onClick={toggleLoadingBar}
                    >
                        <AiOutlineLogout />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
