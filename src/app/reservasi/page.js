"use client";
import { useContext, useEffect, useState } from "react";
import JadwalPraktek from "../../components/JadwalPraktek/JadwalPraktek";
import PasienReservasi from "@/components/Pasien/PasienReservasi";
import { H5, P } from "@/components/Font";
import LoginPasien from "@/components/Pasien/LoginPasien";
import { AuthContext } from "@/context/AuthContext";

export default function ReservasiPage() {
  const [clickMenu, setClickMenu] = useState("Reservasi");
  const [menuOpen, setMenuOpen] = useState(false);
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
      {/* Burger Menu Button */}
      <div className="md:hidden p-4">
        <button className="text-black" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={`fixed inset-0 bg-gray-800 text-white p-4 z-50 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64 md:flex-shrink-0`}
      >
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
                setMenuOpen(false); // Close the menu after selecting an item
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-0 md:p-4">
        {clickMenu === "Reservasi" ? <PasienReservasi /> : null}
        {clickMenu === "Jadwal Praktek" ? <JadwalPraktek /> : null}
      </main>

      {user === null ? <LoginPasien /> : null}
    </div>
  );
}
