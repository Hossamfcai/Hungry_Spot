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

export async function updateOrderStatusService(orderId, status) {
  const token = localStorage.getItem("token");

  if (!token) return;

  const response = await axios.patch(
    `http://localhost:5000/api/orders/${orderId}/status`,
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
    "http://localhost:5000/api/orders",
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
  const response = await axios.get("http://localhost:5000/api/orders/my", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status !== 200)
    throw new Error(`Failed to get user orders (${response.status})`);
  return response?.data?.data;
}
