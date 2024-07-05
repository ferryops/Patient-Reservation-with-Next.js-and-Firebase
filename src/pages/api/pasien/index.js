// src/pages/api/pasien/index.js
import firebaseApp from "../../../firebase/config";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === "POST") {
    try {
      const firestore = getFirestore(firebaseApp);
      const pasienRef = collection(firestore, "pasien");

      // Tambahkan dokumen baru ke koleksi "pasien"
      const docRef = await addDoc(pasienRef, body);
      const newPasien = { id: docRef.id, ...body };

      res.status(201).json(newPasien);
    } catch (error) {
      console.error("Error adding pasien:", error);
      res.status(500).json({ message: "Failed to add pasien" });
    }
  } else if (method === "GET") {
    try {
      const firestore = getFirestore(firebaseApp);
      const pasienRef = collection(firestore, "pasien");

      // Ambil semua dokumen dari koleksi "pasien"
      const snapshot = await getDocs(pasienRef);
      const pasienList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      res.status(200).json(pasienList);
    } catch (error) {
      console.error("Error fetching pasien list:", error);
      res.status(500).json({ message: "Failed to fetch pasien list" });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
}
