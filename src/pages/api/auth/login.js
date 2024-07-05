// src/pages/api/auth/login.js
import { auth } from "../../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    res.status(200).json({ message: "User signed in successfully", uid: user.uid });
  } catch (error) {
    console.error("Error signing in user:", error);
    res.status(500).json({ message: error.message });
  }
}
