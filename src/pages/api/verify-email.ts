import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/firebase";
import { ref, get, update } from "firebase/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed." });
    }

    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: "Verification token is required." });
    }

    try {
        const snapshot = await get(ref(db, "users"));
        const users = snapshot.val() || {};

        // Find user by token
        const userKey = Object.keys(users).find(
            (key) => users[key].verificationToken === token
        );

        if (!userKey) {
            return res.status(400).json({ error: "Invalid or expired token." });
        }

        // Update user as verified
        await update(ref(db, `users/${userKey}`), { verified: true });

        res.status(200).json({ message: "Email verified successfully." });
    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).json({ error: "Failed to verify email." });
    }
}
