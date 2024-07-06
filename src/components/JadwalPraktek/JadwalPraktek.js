import React, { useState, useEffect } from "react";
import { fetchJadwalPraktek } from "../../services/jadwalPraktekService";
import JadwalPraktekCells from "./JadwalPraktekCells";

export default function JadwalPraktek() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJadwalPraktek();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching pasiens:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 overflow-y-auto h-screen">
      <h1 className="text-2xl font-bold mb-4">Jadwal Praktek</h1>
      <JadwalPraktekCells jadwal={users} />
    </div>
  );
}
