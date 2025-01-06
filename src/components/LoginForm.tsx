import React, { useState } from "react";
import "../styles/auth.css";

type LoginFormProps = {
    onSubmit: (identifier: string, password: string) => void; // Identifier can be username or email
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [identifier, setIdentifier] = useState(""); // Single field for username or email
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(identifier, password); // Pass identifier and password
    };

    return (
        <form onSubmit={handleSubmit} className="auth-container">
            <input
                type="text"
                placeholder="Enter username or email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
