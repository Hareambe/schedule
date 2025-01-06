import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { verifyPassword } from "@/utils/hash";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const usersRef = collection(db, "users");

        // Find user by username or email
        const usernameQuery = query(usersRef, where("username", "==", identifier));
        const emailQuery = query(usersRef, where("email", "==", identifier));

        const [usernameSnapshot, emailSnapshot] = await Promise.all([
            getDocs(usernameQuery),
            getDocs(emailQuery),
        ]);

        const userDoc = !usernameSnapshot.empty
            ? usernameSnapshot.docs[0]
            : !emailSnapshot.empty
                ? emailSnapshot.docs[0]
                : null;

        if (!userDoc) {
            return res.status(401).json({ error: "Invalid username/email or password." });
        }

        const user = userDoc.data();

        // Verify password
        const isPasswordValid = await verifyPassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid username/email or password." });
        }

        res.status(200).json({
            message: "Login successful!",
            user: {
                username: user.username,
                email: user.email,
                admin: user.admin,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}
