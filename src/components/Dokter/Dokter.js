import React, { useState, useEffect } from "react";
import { fetchDokter } from "../../services/dokterService";
import DokterCells from "./DokterCells";
import { H4 } from "../Font";

export default function Pasien() {
  const [users, setUsers] = useState([]);
  const [onUpdate, setOnUpdate] = useState(false);

  useEffect(() => {
    const loadPasiens = async () => {
      try {
        const data = await fetchDokter();
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
      <H4>Daftar Dokter</H4>
      <DokterCells columns={columns} users={users} onUpdate={() => setOnUpdate(!onUpdate)} />
    </div>
  );
}
