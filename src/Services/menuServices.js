import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export async function getMenuService() {
  const response = await axios.get(`${apiUrl}/menu`);

  if (response.status !== 200) {
    throw new Error(`Failed to fetch menu (${response.status})`);
  }

  return response?.data?.data;
}

export async function addMenuService(productData) {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${apiUrl}/menu`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Failed to add menu item (${response.status})`);
  }

  return response?.data?.data;
}

export async function updateMenuService(id, productData) {
  console.log(apiUrl);
  const token = localStorage.getItem("token");

  const response = await axios.put(`${apiUrl}/menu/${id}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Failed to update menu item (${response.status})`);
  }

  return response?.data?.data;
}

export async function updateMenuAvailabilityService(id, available) {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${apiUrl}/menu/${id}`,
    {
      available,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Failed to update availability (${response.status})`);
  }

  return response?.data?.data;
}

export async function searchMenuService(search, category) {
  const token = localStorage.getItem("token");
  if (!token) return;
  const response = await axios.get(
    `${apiUrl}/menu?search=${search}&category=${category}`,
  );

  if (response.status !== 200) {
    throw new Error(`Failed to search (${response.status})`);
  }

  return response?.data?.data;
}

export async function deleteMenuService(id) {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${apiUrl}/menu/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Failed to delete menu item (${response.status})`);
  }

  return response?.data?.data;
}
