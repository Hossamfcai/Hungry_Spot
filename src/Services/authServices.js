import axios from "axios";
export async function loginService(body) {
  const response = await axios.post(
    `http://localhost:5000/api/auth/login`,
    body,
  );
  if (response.status !== 200)
    throw new Error(`Failed to login (${response.status})`);
  const { token, user } = response.data.data;

  localStorage.setItem("token", token);
  localStorage.setItem("role", user.role);

  return user;
}

export async function getUserService() {
  const token = localStorage.getItem("token");
  if (!token) return;
  const response = await axios.get("http://localhost:5000/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status !== 200)
    throw new Error(`Failed to get users data (${response.status})`);

  return response?.data?.data;
}
