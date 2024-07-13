import firebaseApp from "../../../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === "POST") {
    const { email, password } = body;

    const auth = getAuth(firebaseApp);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      res.status(200).json({ uid: user.uid, email: user.email });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(401).json({ message: "Invalid email or password" });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
}
