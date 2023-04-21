import React, { useRef, useState } from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router";
import LoadingBar from "react-top-loading-bar";
import Avatar from "../avatar/Avatar";
import { AiOutlineLogout } from "react-icons/ai";
function Navbar() {
    const navigate = useNavigate();
    const loadingRef = useRef();
    const [loading, setLoading] = useState(false);

    function toggleLoadingBar() {
        if (loading) {
            setLoading(false);
            loadingRef.current.complete();
            return;
        }
        setLoading(true);
        loadingRef.current.continuousStart();
    }
    return (
        <div className="Navbar">
            <LoadingBar color="#5f9fff" ref={loadingRef} />
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
