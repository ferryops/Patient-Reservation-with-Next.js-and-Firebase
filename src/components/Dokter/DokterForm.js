import React, { useEffect, useState } from "react";
import { createDokter, fetchDokterById, updateDokter } from "../../services/dokterService";
import { Button, Input } from "@nextui-org/react";

const daysOfWeek = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];

export default function DokterForm({ onClose, onSuccess, id }) {
  const [form, setForm] = useState({
    nama: "",
    spesialisasi: "",
    jadwal: {
      senin: { jam_mulai: "19:00", jam_selesai: "" },
      selasa: { jam_mulai: "", jam_selesai: "" },
      rabu: { jam_mulai: "", jam_selesai: "" },
      kamis: { jam_mulai: "", jam_selesai: "" },
      jumat: { jam_mulai: "", jam_selesai: "" },
      sabtu: { jam_mulai: "", jam_selesai: "" },
      minggu: { jam_mulai: "", jam_selesai: "" },
    },
  });
  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        try {
          const data = await fetchDokterById(id);
          setForm(data);
        } catch (error) {
          console.error("Error fetching dokter:", error);
        }
      };
      fetch();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    setLoadingButton(true);
    e.preventDefault();

    try {
      if (id) {
        await updateDokter(id, form);
      } else {
        await createDokter(form);
      }
      onClose();
      onSuccess(true);
    } catch (error) {
      console.error(`Error ${id ? "updating" : "creating"} dokter:`, error);
      onSuccess(false);
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
        <Input
          name="nama"
          label="Nama"
          type="text"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
        />
        <Input
          name="spesialisasi"
          label="Spesialisasi"
          type="text"
          value={form.spesialisasi}
          onChange={(e) => setForm({ ...form, spesialisasi: e.target.value })}
        />

        {daysOfWeek.map((day) => (
          <div key={day} className="flex flex-col gap-4">
            <label>Jadwal {day.charAt(0).toUpperCase() + day.slice(1)}</label>
            <Input
              name={`${day}_jam_mulai`}
              label="Jam Mulai"
              type="time"
              value={form?.jadwal[day]?.jam_mulai}
              onChange={(e) =>
                setForm({ ...form, jadwal: { ...form.jadwal, [day]: { ...form.jadwal[day], jam_mulai: e.target.value } } })
              }
            />
            <Input
              name={`${day}_jam_selesai`}
              label="Jam Selesai"
              type="time"
              value={form?.jadwal[day]?.jam_selesai}
              onChange={(e) =>
                setForm({ ...form, jadwal: { ...form.jadwal, [day]: { ...form.jadwal[day], jam_selesai: e.target.value } } })
              }
            />
          </div>
        ))}

        <div className="flex justify-end gap-2">
          <Button color="danger" variant="light" type="submit" isLoading={loadingButton}>
            {id ? "Update" : "Simpan"} Dokter
          </Button>
          <Button color="primary" onPress={onClose}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
}
