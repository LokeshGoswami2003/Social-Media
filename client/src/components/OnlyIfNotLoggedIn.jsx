import React from "react";
import { KEY_ACCESS_TOKEN, getItem } from "../utils/localStorageManager";
import { Navigate, Outlet } from "react-router-dom";

function OnlyIfNotLoggedIn() {
    const user = getItem(KEY_ACCESS_TOKEN);
    return (
        <div>
            ( user ? <Navigate to="/" /> : <Outlet />)
        </div>
    );
}

export default OnlyIfNotLoggedIn;
