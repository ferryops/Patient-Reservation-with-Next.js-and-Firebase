// src/pages/api/dokter/index.js
import firebaseApp from "../../../firebase/config";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import XLSX from "xlsx";

export default async function handler(req, res) {
  const { method, body, query: queryParams } = req;

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

      const { exportToExcel } = queryParams;

      if (exportToExcel === "true") {
        // Process data to include jadwal
        const dokterData = dokterList.map((dokter) => {
          const jadwalEntries = Object.entries(dokter.jadwal || {}).reduce((acc, [day, times]) => {
            acc[`${day}_mulai`] = times.jam_mulai;
            acc[`${day}_selesai`] = times.jam_selesai;
            return acc;
          }, {});
          return { ...dokter, ...jadwalEntries };
        });

        // Convert data to Excel format
        const ws = XLSX.utils.json_to_sheet(dokterData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Dokter");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

        // Set headers for file download
        res.setHeader("Content-Disposition", "attachment; filename=dokter.xlsx");
        res.setHeader("Content-Type", "application/octet-stream");
        res.status(200).send(excelBuffer);
      } else {
        res.status(200).json(dokterList);
      }
    } catch (error) {
      console.error("Error fetching dokter list:", error);
      res.status(500).json({ message: "Failed to fetch dokter list" });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
}
