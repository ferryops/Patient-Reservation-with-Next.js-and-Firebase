// src/pages/pasien.js
import React, { useState, useEffect } from "react";
import { fetchPasien, createPasien, updatePasien, deletePasien } from "../services/pasienService";

export default function Pasien() {
  const [pasiens, setPasiens] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    tanggal_lahir: "",
    alamat: "",
    nomor_kontak: "",
    riwayat_medis: {
      diagnosis_terakhir: "",
      riwayat_alergi: [],
    },
  });

  useEffect(() => {
    const loadPasiens = async () => {
      try {
        const data = await fetchPasien();
        setPasiens(data);
      } catch (error) {
        console.error("Error fetching pasiens:", error);
      }
    };
    loadPasiens();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPasien(form);
      const data = await fetchPasien();
      setPasiens(data);
      setForm({
        nama: "",
        tanggal_lahir: "",
        alamat: "",
        nomor_kontak: "",
        riwayat_medis: {
          diagnosis_terakhir: "",
          riwayat_alergi: [],
        },
      });
    } catch (error) {
      console.error("Error creating pasien:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePasien(id);
      const data = await fetchPasien();
      setPasiens(data);
    } catch (error) {
      console.error("Error deleting pasien:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Pasien</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block">Nama:</label>
          <input type="text" name="nama" value={form.nama} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div className="mb-2">
          <label className="block">Tanggal Lahir:</label>
          <input
            type="date"
            name="tanggal_lahir"
            value={form.tanggal_lahir}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Alamat:</label>
          <input type="text" name="alamat" value={form.alamat} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div className="mb-2">
          <label className="block">Nomor Kontak:</label>
          <input
            type="text"
            name="nomor_kontak"
            value={form.nomor_kontak}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Diagnosis Terakhir:</label>
          <input
            type="text"
            name="riwayat_medis.diagnosis_terakhir"
            value={form.riwayat_medis.diagnosis_terakhir}
            onChange={(e) =>
              setForm((prevForm) => ({
                ...prevForm,
                riwayat_medis: {
                  ...prevForm.riwayat_medis,
                  diagnosis_terakhir: e.target.value,
                },
              }))
            }
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Riwayat Alergi:</label>
          <input
            type="text"
            name="riwayat_medis.riwayat_alergi"
            value={form.riwayat_medis.riwayat_alergi.join(", ")}
            onChange={(e) =>
              setForm((prevForm) => ({
                ...prevForm,
                riwayat_medis: {
                  ...prevForm.riwayat_medis,
                  riwayat_alergi: e.target.value.split(", "),
                },
              }))
            }
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Tambah Pasien
        </button>
      </form>

      <ul>
        {pasiens.map((pasien) => (
          <li key={pasien.id} className="mb-2 p-2 border rounded">
            <p>
              <strong>Nama:</strong> {pasien.nama}
            </p>
            <p>
              <strong>Alamat:</strong> {pasien.alamat}
            </p>
            <p>
              <strong>Nomor Kontak:</strong> {pasien.nomor_kontak}
            </p>
            <p>
              <strong>Diagnosis Terakhir:</strong> {pasien.riwayat_medis.diagnosis_terakhir}
            </p>
            <p>
              <strong>Riwayat Alergi:</strong> {pasien.riwayat_medis.riwayat_alergi.join(", ")}
            </p>
            <button onClick={() => handleDelete(pasien.id)} className="bg-red-500 text-white p-2 rounded mt-2">
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
