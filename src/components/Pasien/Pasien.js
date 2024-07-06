// src/pages/pasien.js
import React, { useState, useEffect } from "react";
import { fetchPasien, createPasien, updatePasien, deletePasien } from "../../services/pasienService";
import PasienCells from "./PasienCells";

export default function Pasien() {
  const [users, setUsers] = useState([]);
  const [onUpdate, setOnUpdate] = useState(false);

  useEffect(() => {
    const loadPasiens = async () => {
      try {
        const data = await fetchPasien();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching pasiens:", error);
      }
    };
    loadPasiens();
  }, [onUpdate]);

  const columns = [
    { name: "NAMA", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "AKSI", uid: "actions" },
  ];

  return (
    <div className="container mx-auto p-4 overflow-y-auto h-screen">
      <h1 className="text-2xl font-bold mb-4">Daftar Pasien</h1>
      <PasienCells columns={columns} users={users} onUpdate={() => setOnUpdate(!onUpdate)} />
    </div>
  );
}
