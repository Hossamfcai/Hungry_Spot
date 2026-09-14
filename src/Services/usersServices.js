import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export async function getAllUsersService() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("You must be logged in to view users.");
  }

  const response = await axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error(`Failed to fetch users (${response.status})`);
  }

  return response?.data?.data || [];
}

export async function createUserService(body) {
  const response = await axios.post(`${API_URL}/register`, {
    name: body.name,
    email: body.email,
    password: body.password,
  });

  if (response.status !== 201) {
    throw new Error(`Failed to create user (${response.status})`);
  }

  return response?.data?.data?.user;
}
