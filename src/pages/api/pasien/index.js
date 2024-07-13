// src/pages/api/pasien/index.js
import firebaseApp from "../../../firebase/config";
import { getFirestore, collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import transporter from "../../../utils/nodemailer";

export default async function handler(req, res) {
  const { method, query: queryParams, body } = req;

  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const pasienRef = collection(firestore, "pasien");

  if (method === "POST") {
    try {
      const { email, password, alamat, ...otherData } = body;

      // Create a new user in Firebase Authentication
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Add the new user to the "pasien"
        const newBody = { ...otherData, uid: user.uid, nama: otherData.nama.toLowerCase(), email: user.email };

        const docRef = await addDoc(pasienRef, newBody);
        const newPasien = { id: docRef.id, ...newBody };

        // send email notifikasi
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email, // Email pasien
          subject: "Berhasil Registrasi",
          text: `Registrasi Anda telah berhasil.\n\nNama: ${
            body.nama
          }\nEmail: ${email}\nAlamat:${alamat}\nTanggal Registrasi: ${new Date().toLocaleDateString()}\n\nAkses Sistem Reservasi Pasien hanya di ${
            process.env.NEXT_PUBLIC_WEBSITE_URL
          }\n\nTerima kasih telah menggunakan layanan kami.`,
        };

        await transporter.sendMail(mailOptions);

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
        // If there is a search query, search for the query in the "pasien" collection
        const searchLower = search.toLowerCase();
        pasienQuery = query(pasienRef, where("nama", ">=", searchLower), where("nama", "<=", searchLower + "\uf8ff"));
      } else {
        // If there is no search query, fetch all the pasien from the "pasien" collection
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
