import axios from "axios";

export async function getMenuService() {
  const response = await axios.get("http://localhost:5000/api/menu");
  if (response.status !== 200)
    throw new Error(`Failed to fetch menu (${response.status})`);
  return response?.data?.data;
}
