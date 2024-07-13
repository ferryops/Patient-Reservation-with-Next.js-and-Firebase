// src/pages/api/pasien/index.js
import firebaseApp from "../../../firebase/config";
import { getFirestore, collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
  const { method, query: queryParams, body } = req;

  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const pasienRef = collection(firestore, "pasien");

  if (method === "POST") {
    try {
      const { email, password, ...otherData } = body;

      // Buat user di Firebase Authentication
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Tambahkan dokumen baru ke koleksi "pasien"
        const newBody = { ...otherData, uid: user.uid, nama: otherData.nama.toLowerCase(), email: user.email };

        const docRef = await addDoc(pasienRef, newBody);
        const newPasien = { id: docRef.id, ...newBody };

        res.status(201).json(newPasien);
      } catch (authError) {
        if (authError.code === "auth/email-already-in-use") {
          res.status(400).json({ message: "Email already in use" });
        } else {
          throw authError;
        }
      }
    } catch (error) {
      console.error("Error adding pasien:", error);
      res.status(500).json({ message: "Failed to add pasien", error: error.message });
    }
  } else if (method === "GET") {
    try {
      const { search } = queryParams;

      let pasienQuery;
      if (search) {
        // Jika ada parameter search, buat query dengan filter nama
        const searchLower = search.toLowerCase();
        pasienQuery = query(pasienRef, where("nama", ">=", searchLower), where("nama", "<=", searchLower + "\uf8ff"));
      } else {
        // Jika tidak ada parameter search, ambil semua dokumen dari koleksi "pasien"
        pasienQuery = query(pasienRef);
      }

      const snapshot = await getDocs(pasienQuery);
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
