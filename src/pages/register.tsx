import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
    const router = useRouter();

    const handleRegister = async (username: string, password: string, email: string) => {
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, email }),
            });

            if (response.ok) {
                toast.success("Registration successful! Check your email for verification.", {
                    position: "top-center",
                    autoClose: 5000,
                });

                // Redirect to the login page after a short delay
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
            } else {
                const error = await response.json();
                toast.error(error.error || "Registration failed.", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("An error occurred. Please try again.", {
                position: "top-center",
                autoClose: 5000,
            });
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <RegisterForm onSubmit={handleRegister} />
        </div>
    );
}
