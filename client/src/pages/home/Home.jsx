import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";

function Home() {
    return (
        <React.Fragment>
            <Navbar />
            <div className="outlet" style={{ marginTop: "60px" }}>
                <Outlet />
            </div>
        </React.Fragment>
    );
}

export default Home;
