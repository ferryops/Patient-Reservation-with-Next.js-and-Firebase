// src/pages/api/auth/loginDokter.js
import { auth, firestore } from "../../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = body;

  try {
    // Sign in user with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if the user is part of the "dokter" collection
    const dokterRef = collection(firestore, "dokter");
    const q = query(dokterRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // If user is not found in the "dokter" collection, log out the user and return error
      await auth.signOut();
      return res.status(403).json({ message: "User is not a dokter" });
    }

    // Extract dokter data
    const dokterData = querySnapshot.docs[0].data();

    // Return success response with dokter data
    res.status(200).json({ message: "Dokter signed in successfully", uid: user.uid, dokterData });
  } catch (error) {
    console.error("Error signing in dokter:", error);
    res.status(500).json({ message: error.message });
  }
}
