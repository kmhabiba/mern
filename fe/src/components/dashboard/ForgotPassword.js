import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5001/api/auth/forgot-password", { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || "Error sending reset email.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="auth-input"
                    required
                />
                <button type="submit" className="auth-button">Send Reset Link</button>
            </form>
            {message && <p className="auth-message">{message}</p>}
        </div>
    );
};

export default ForgotPassword;