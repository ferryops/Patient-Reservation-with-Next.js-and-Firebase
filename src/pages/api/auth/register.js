// src/pages/api/auth/register.js
import { auth } from "../../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    res.status(201).json({ message: "User created successfully", uid: user.uid });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: error.message });
  }
}
