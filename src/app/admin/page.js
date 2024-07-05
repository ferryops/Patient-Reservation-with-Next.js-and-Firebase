"use client";
import { useState } from "react";
import Dashboard from "../../components/Dashboard";
import Reservasi from "../../components/Reservasi";
import Pasien from "../../components/Pasien";
import Dokter from "../../components/Dokter";
import JadwalPraktek from "../../components/JadwalPraktek";

export default function AdminPage() {
  const [clickMenu, setClickMenu] = useState("Dashboard");
  const menu = ["Dashboard", "Reservasi", "Pasien", "Dokter", "Jadwal Praktek"];
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white p-4">
        <div className="text-lg font-bold mb-4">Admin Menu</div>
        <ul>
          {menu.map((item, index) => (
            <li
              key={index}
              className={`mb-2 ${clickMenu === item ? "bg-gray-700" : "hover:bg-gray-700"} p-2 cursor-pointer rounded`}
              onClick={() => setClickMenu(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {clickMenu === "Dashboard" ? <Dashboard /> : null}
        {clickMenu === "Reservasi" ? <Reservasi /> : null}
        {clickMenu === "Pasien" ? <Pasien /> : null}
        {clickMenu === "Dokter" ? <Dokter /> : null}
        {clickMenu === "Jadwal Praktek" ? <JadwalPraktek /> : null}
      </main>
    </div>
  );
}
