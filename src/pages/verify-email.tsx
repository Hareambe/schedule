import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
    const router = useRouter();
    const { token } = router.query;

    const [status, setStatus] = useState("Verifying...");

    useEffect(() => {
        if (!token) return;

        const verifyToken = async () => {
            try {
                const response = await fetch(`/api/verify-email`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });

                if (response.ok) {
                    setStatus("Email verified! You can now log in.");
                } else {
                    const error = await response.json();
                    setStatus(error.error || "Invalid or expired verification link.");
                }
            } catch (error) {
                setStatus("An error occurred. Please try again.");
            }
        };

        verifyToken();
    }, [token]);

    return (
        <div className="auth-container">
            <h1>{status}</h1>
            {status === "Email verified! You can now log in." && (
                <a href="/login" className="button">
                    Go to Login
                </a>
            )}
        </div>
    );
}
