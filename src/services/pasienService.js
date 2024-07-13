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

export const fetchPasienBySearch = async (search) => {
  const response = await fetch(`${API_URL}?search=${search}`);
  if (!response.ok) throw new Error("Failed to fetch pasien by search");
  return response.json();
};

export const loginPasienWithEmailAndPassword = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Failed to login pasien");
  return response.json();
};

export const resetPasswordPasien = async ({ email }) => {
  const response = await fetch(`${API_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error("Failed to reset password pasien");
  return response.json();
};
