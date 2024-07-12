import React, { useEffect, useState } from "react";
import { createPasien, fetchPasienById, fetchPasienBySearch, updatePasien } from "../../services/pasienService";
import { Autocomplete, AutocompleteItem, Button, Input } from "@nextui-org/react";

export default function ReservasiForm({ onClose, onSuccess, id }) {
  const [loadingButton, setLoadingButton] = useState(false);
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
  const [search, setSearch] = useState({
    pasien: "",
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

  useEffect(() => {
    const fetchPasiens = async () => {
      try {
        const data = await fetchPasienBySearch(search.pasien);
        setPasiens(data);
      } catch (error) {
        console.error("Error fetching pasien:", error);
      }
    };
    fetchPasiens();
  }, [search.pasien]);

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
        <Autocomplete
          value={form?.nama}
          defaultItems={pasiens}
          label="Pasien"
          placeholder="Cari pasien"
          className="max-w-xs"
          onInputChange={(e) => setSearch({ ...search, pasien: e })}
        >
          {(pasiens) => <AutocompleteItem key={pasiens?.id}>{pasiens?.nama}</AutocompleteItem>}
        </Autocomplete>
        <pre>{JSON.stringify(search, null, 2)}</pre>
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
