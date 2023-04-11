import React from "react";
import "./Login.scss";

function Login() {
    return (
        <div className="Login">
            <div className="login-box">
                <h2 className="heading">Login</h2>
                <form action="">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="email" id="email" />

                    <label htmlFor="password">password</label>
                    <input type="password" className="password" id="password" />

                    <input type="submit" className="submit" />
                </form>
                <p>Do not have an account? sign Up</p>
            </div>
        </div>
    );
}

export default Login;
