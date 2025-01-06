import React from "react";
import LoginForm from "../components/LoginForm";

export default function Login() {
    const handleLogin = async (identifier: string, password: string) => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Login successful!");
                console.log("User data:", data.user);
                // Redirect to dashboard
                window.location.href = "/dashboard";
            } else {
                const error = await response.json();
                alert(error.error || "Login failed.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={handleLogin} />
        </div>
    );
}
