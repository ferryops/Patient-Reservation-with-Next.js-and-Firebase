import React, { useEffect, useState } from "react";
import { createPasien, fetchPasienById, updatePasien } from "../../services/pasienService";
import { Button, Input } from "@nextui-org/react";

export default function PasienForm({ onClose, onSuccess, id }) {
  const [loadingButton, setLoadingButton] = useState(false);
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
    if (id) {
      const fetchPasien = async () => {
        try {
          const data = await fetchPasienById(id);
          setForm(data);
        } catch (error) {
          console.error("Error fetching pasien:", error);
        }
      };
      fetchPasien();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoadingButton(true);
    if (id) {
      e.preventDefault();
      try {
        await updatePasien(id, form);
        onClose();
        onSuccess(true);
      } catch (error) {
        console.error("Error updating pasien:", error);
        onSuccess(false);
      } finally {
        setLoadingButton(false);
      }
    } else {
      e.preventDefault();
      try {
        await createPasien(form);
        onClose();
        onSuccess(true);
      } catch (error) {
        console.error("Error creating pasien:", error);
        onSuccess(false);
      } finally {
        setLoadingButton(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
        <Input name="nama" label="Nama" type="text" value={form.nama} onChange={handleChange} />

        <Input
          name="tanggal_lahir"
          label="Tanggal Lahir"
          placeholder="isi tanggal lahir"
          type="date"
          value={form.tanggal_lahir}
          onChange={handleChange}
        />

        <Input name="alamat" label="Alamat" type="text" value={form.alamat} onChange={handleChange} />

        <Input
          name="nomor_kontak"
          label="Nomor Kontak"
          placeholder="08..."
          type="text"
          value={form.nomor_kontak}
          onChange={handleChange}
        />

        <Input
          name="riwayat_medis.diagnosis_terakhir"
          label="Diagnosis Terakhir"
          type="text"
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
        />

        <Input
          label="Riwayat Alergi"
          type="text"
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
        />
        <div className="flex justify-end gap-2">
          <Button color="danger" variant="light" type="submit" isLoading={loadingButton}>
            {id ? "Update" : "Simpan"} Pasien
          </Button>
          <Button color="primary" onPress={onClose}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
}
