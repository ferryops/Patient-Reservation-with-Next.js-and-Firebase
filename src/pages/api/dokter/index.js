// src/pages/api/dokter/index.js
import firebaseApp from "../../../firebase/config";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === "POST") {
    try {
      const firestore = getFirestore(firebaseApp);
      const dokterRef = collection(firestore, "dokter");

      // Tambahkan dokumen baru ke koleksi "dokter"
      const docRef = await addDoc(dokterRef, body);
      const newDokter = { id: docRef.id, ...body };

      res.status(201).json(newDokter);
    } catch (error) {
      console.error("Error adding dokter:", error);
      res.status(500).json({ message: "Failed to add dokter" });
    }
  } else if (method === "GET") {
    try {
      const firestore = getFirestore(firebaseApp);
      const dokterRef = collection(firestore, "dokter");

      // Ambil semua dokumen dari koleksi "dokter"
      const snapshot = await getDocs(dokterRef);
      const dokterList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      res.status(200).json(dokterList);
    } catch (error) {
      console.error("Error fetching dokter list:", error);
      res.status(500).json({ message: "Failed to fetch dokter list" });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
}
