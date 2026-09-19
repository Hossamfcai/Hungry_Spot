import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
export async function loginService(body) {
  const response = await axios.post(`${apiUrl}/auth/login`, body);
  if (response.status !== 200 && response.status === 401) {
    throw new Error(`Failed to login ${response.status}`);
  }

  const { token, user } = response.data.data;

  localStorage.setItem("token", token);
  localStorage.setItem("role", user.role);

  return user;
}

export async function signUpService(body) {
  const response = await axios.post(`${apiUrl}/auth/register`, body);
  if (response.status !== 200 && response.status === 409) {
    throw new Error(`Failed to sign ${response.status}`);
  }

  const { token, user } = response.data.data;

  localStorage.setItem("token", token);
  localStorage.setItem("role", user.role);

  return user;
}

export async function getUserService() {
  const token = localStorage.getItem("token");
  if (!token) return [];
  const response = await axios.get(`${apiUrl}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status !== 200)
    throw new Error(`Failed to get users data (${response.status})`);

  return response?.data?.data ?? [];
}
