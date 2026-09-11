import axios from "axios";

export async function getOrdersService() {
  const token = localStorage.getItem("token");
  if (!token) return;
  const response = await axios.get("http://localhost:5000/api/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status !== 200)
    throw new Error(`Failed to fetch orders (${response.status})`);
  return response?.data?.data;
}
