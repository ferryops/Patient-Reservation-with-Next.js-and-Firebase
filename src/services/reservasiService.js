const API_URL = "/api/reservasi";

export const fetchReservasi = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch reservasi");
  return response.json();
};

export const fetchReservasiById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch reservasi by id");
  return response.json();
};

export const createReservasi = async (data) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create reservasi");
  return response.json();
};

export const updateReservasi = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update reservasi");
  return response.json();
};

export const deleteReservasi = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete reservasi");
  return response.json();
};
