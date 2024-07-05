// src/pages/api/jadwal_praktek/[id].js
import firebaseApp from "../../../firebase/config";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { id } = query;

  const firestore = getFirestore(firebaseApp);
  const jadwalPraktekDoc = doc(firestore, "jadwal_praktek", id);

  switch (method) {
    case "GET":
      try {
        const jadwalPraktekSnap = await getDoc(jadwalPraktekDoc);
        if (jadwalPraktekSnap.exists()) {
          const jadwalPraktekData = { id: jadwalPraktekSnap.id, ...jadwalPraktekSnap.data() };
          res.status(200).json(jadwalPraktekData);
        } else {
          res.status(404).json({ message: "Jadwal Praktek not found" });
        }
      } catch (error) {
        console.error("Error fetching jadwal_praktek:", error);
        res.status(500).json({ message: "Failed to fetch jadwal_praktek" });
      }
      break;

    case "PUT":
      try {
        await updateDoc(jadwalPraktekDoc, body);
        const updatedJadwalPraktek = { id, ...body };
        res.status(200).json(updatedJadwalPraktek);
      } catch (error) {
        console.error("Error updating jadwal_praktek:", error);
        res.status(500).json({ message: "Failed to update jadwal_praktek" });
      }
      break;

    case "DELETE":
      try {
        await deleteDoc(jadwalPraktekDoc);
        res.status(204).end();
      } catch (error) {
        console.error("Error deleting jadwal_praktek:", error);
        res.status(500).json({ message: "Failed to delete jadwal_praktek" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
