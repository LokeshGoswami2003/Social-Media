import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

function Home() {
    return (
        <React.Fragment>
            <Navbar />
            <Outlet />
        </React.Fragment>
    );
}

export default Home;
