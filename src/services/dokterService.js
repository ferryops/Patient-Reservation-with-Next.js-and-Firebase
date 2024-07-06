const API_URL = "/api/dokter";

export const fetchDokter = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch dokter");
  return response.json();
};

export const fetchDokterById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch dokter by id");
  return response.json();
};

export const createDokter = async (data) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create dokter");
  return response.json();
};

export const updateDokter = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update dokter");
  return response.json();
};

export const deleteDokter = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete dokter");
  return response.json();
};
