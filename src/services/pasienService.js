const API_URL = "/api/pasien";

export const fetchPasien = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch pasien");
  return response.json();
};

export const fetchPasienById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch pasien by id");
  return response.json();
};

export const createPasien = async (data) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create pasien");
  return response.json();
};

export const updatePasien = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update pasien");
  return response.json();
};

export const deletePasien = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete pasien");
  return response.json();
};
