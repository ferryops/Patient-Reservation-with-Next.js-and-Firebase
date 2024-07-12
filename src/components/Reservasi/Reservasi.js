import React, { useState, useEffect } from "react";
import { fetchReservasi } from "@/services/reservasiService";
import ReservasiCells from "./ReservasiCells";

export default function Reservasi() {
  const [reservations, serReservations] = useState([]);
  const [onUpdate, setOnUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReservasi();
        serReservations(data);
      } catch (error) {
        console.error("Error fetching reservasi:", error);
      }
    };
    fetchData();
  }, [onUpdate]);

  const columns = [
    { name: "NAMA", uid: "name" },
    { name: "TANGGAL", uid: "tanggal" },
    { name: "JAM", uid: "jam" },
    { name: "AKSI", uid: "actions" },
  ];

  return (
    <div className="container mx-auto p-4 overflow-y-auto h-screen">
      <h1 className="text-2xl font-bold mb-4">Reservasi</h1>
      <ReservasiCells users={reservations} columns={columns} onUpdate={() => setOnUpdate(!onUpdate)} />
    </div>
  );
}
