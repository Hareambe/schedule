import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend("re_RKUpbGqT_fJtVyN1Mmj8vd2vjHqzh6hGW");

// Function to send an email
export const sendVerificationEmail = async (to: string, verificationLink: string) => {
    try {
        const response = await resend.emails.send({
            from: "onboarding@resend.dev", // Use your verified sender email
            to,
            subject: "Verify Your Email",
            html: `
        <p>Thank you for signing up!</p>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationLink}" target="_blank">Verify Email</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
        });

        console.log("Email sent successfully:", response);
        return response; // Return the response for logging or further processing
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Failed to send verification email");
    }
};
