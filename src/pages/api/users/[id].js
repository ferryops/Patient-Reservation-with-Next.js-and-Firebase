// src/pages/api/users/[id].js
import { getUserById, updateUser, deleteUser } from "@/utils/mockData";

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const user = getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else if (req.method === "PUT") {
    const updatedUser = updateUser(id, req.body);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else if (req.method === "DELETE") {
    deleteUser(id);
    res.status(204).end();
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
