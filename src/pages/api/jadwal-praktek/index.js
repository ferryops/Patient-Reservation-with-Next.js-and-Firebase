// src/pages/api/jadwal_praktek/index.js
import firebaseApp from "../../../firebase/config";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { method, body } = req;

  const firestore = getFirestore(firebaseApp);
  const jadwalPraktekRef = collection(firestore, "jadwal_praktek");

  if (method === "POST") {
    try {
      // Tambahkan dokumen baru ke koleksi "jadwal_praktek"
      const docRef = await addDoc(jadwalPraktekRef, body);
      const newJadwalPraktek = { id: docRef.id, ...body };

      res.status(201).json(newJadwalPraktek);
    } catch (error) {
      console.error("Error adding jadwal_praktek:", error);
      res.status(500).json({ message: "Failed to add jadwal_praktek" });
    }
  } else if (method === "GET") {
    try {
      // Ambil semua dokumen dari koleksi "jadwal_praktek"
      const snapshot = await getDocs(jadwalPraktekRef);
      const jadwalPraktekList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      res.status(200).json(jadwalPraktekList);
    } catch (error) {
      console.error("Error fetching jadwal_praktek list:", error);
      res.status(500).json({ message: "Failed to fetch jadwal_praktek list" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
