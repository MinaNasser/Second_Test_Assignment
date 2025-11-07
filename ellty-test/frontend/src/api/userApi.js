const API_URL = "http://localhost:5000/api/users";

export const getUsers = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`API Response status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error in getUsers:", err);
    return [];
  }
};

export const createUser = async (user) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!res.ok)
      throw new Error(`Failed to create user, status: ${res.status}`);
  } catch (err) {
    console.error("Error in createUser:", err);
  }
};

export const updateUser = async (id, data) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok)
      throw new Error(`Failed to update user, status: ${res.status}`);
  } catch (err) {
    console.error("Error in updateUser:", err);
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok)
      throw new Error(`Failed to delete user, status: ${res.status}`);
  } catch (err) {
    console.error("Error in deleteUser:", err);
  }
};
