import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
export async function getOrdersService() {
  const token = localStorage.getItem("token");
  if (!token) return [];
  const response = await axios.get(`${apiUrl}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status !== 200)
    throw new Error(`Failed to fetch orders (${response.status})`);
  return response?.data?.data ?? [];
}

export async function updateOrderStatusService(orderId, status) {
  const token = localStorage.getItem("token");

  if (!token) return;

  const response = await axios.patch(
    `${apiUrl}/orders/${orderId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== 200)
    throw new Error(`Failed to update order status (${response.status})`);

  return response?.data?.data;
}

export async function addOrderServices(body) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  const response = await axios.post(
    `${apiUrl}/orders`,
    Array.isArray(body) ? { items: body } : body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Failed to add orders (Status: ${response.status})`);
  }
  return response?.data?.data;
}

export async function getUserOrderService() {
  const token = localStorage.getItem("token");
  if (!token) return;
  const response = await axios.get(`${apiUrl}/orders/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status !== 200)
    throw new Error(`Failed to get user orders (${response.status})`);
  return response?.data?.data;
}
