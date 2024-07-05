// src/pages/api/users/index.js
import { getUsers, createUser } from "@/utils/mockData";

export default function handler(req, res) {
  if (req.method === "GET") {
    const users = getUsers();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const newUser = createUser(req.body);
    res.status(201).json(newUser);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
