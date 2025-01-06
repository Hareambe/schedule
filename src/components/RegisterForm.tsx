import React, { useState } from "react";
import "../styles/auth.css";

type RegisterFormProps = {
    onSubmit: (username: string, password: string, email: string) => void; // Add email to the props
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(""); // Add state for email

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(username, password, email); // Pass email to the onSubmit callback
    };

    return (
        <form onSubmit={handleSubmit} className="auth-container">
            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="email" // Email input field
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
