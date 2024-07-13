"use client";
import { useContext, useEffect, useState } from "react";
import JadwalPraktek from "../../components/JadwalPraktek/JadwalPraktek";
import PasienReservasi from "@/components/Pasien/PasienReservasi";
import { H5, P } from "@/components/Font";
import LoginPasien from "@/components/Pasien/LoginPasien";
import { AuthContext } from "@/context/AuthContext";

export default function ReservasiPage() {
  const [clickMenu, setClickMenu] = useState("Reservasi");
  const menu = ["Reservasi", "Jadwal Praktek"];
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const menu = localStorage.getItem("menu") || "Reservasi";
    setClickMenu(menu);
  }, []);

  useEffect(() => {
    if (user) {
      setClickMenu("Reservasi");
    }
  }, [user]);

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-4">
          <H5>Selamat Datang</H5>
          <P>{user?.email}</P>
        </div>
        <ul>
          {menu.map((item, index) => (
            <li
              key={index}
              className={`mb-2 ${clickMenu === item ? "bg-gray-700" : "hover:bg-gray-700"} p-2 cursor-pointer rounded`}
              onClick={() => {
                setClickMenu(item);
                localStorage.setItem("menu", item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 pr-0">
        {clickMenu === "Reservasi" ? <PasienReservasi /> : null}
        {clickMenu === "Jadwal Praktek" ? <JadwalPraktek /> : null}
      </main>

      {user === null ? <LoginPasien /> : null}
    </div>
  );
}
