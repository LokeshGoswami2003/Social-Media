import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";

function Home() {
    return (
        <React.Fragment>
            <Navbar />
            <Outlet />
        </React.Fragment>
    );
}

export default Home;
