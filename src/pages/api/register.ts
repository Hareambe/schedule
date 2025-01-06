import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { hashPassword } from "@/utils/hash";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const usersRef = collection(db, "users");

        // Check if username or email already exists
        const usernameQuery = query(usersRef, where("username", "==", username));
        const emailQuery = query(usersRef, where("email", "==", email));

        const [usernameSnapshot, emailSnapshot] = await Promise.all([
            getDocs(usernameQuery),
            getDocs(emailQuery),
        ]);

        if (!usernameSnapshot.empty) {
            return res.status(400).json({ error: "Username already exists." });
        }

        if (!emailSnapshot.empty) {
            return res.status(400).json({ error: "Email already exists." });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Add new user to Firestore
        await addDoc(usersRef, {
            username,
            email,
            password: hashedPassword,
            admin: false,
            createdAt: serverTimestamp(),
        });

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}
