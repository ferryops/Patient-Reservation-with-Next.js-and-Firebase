const API_URL = "/api/chart/distribusi-pasien-berdasarkan-usia";

export const fetchPasienBerdasarkanUsia = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch pasien berdasarkan usia");
  return response.json();
};
