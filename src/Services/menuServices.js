import axios from "axios";

const MENU_URL = "http://localhost:5000/api/menu";

export async function getMenuService() {
  const response = await axios.get(MENU_URL);

  if (response.status !== 200) {
    throw new Error(`Failed to fetch menu (${response.status})`);
  }

  return response?.data?.data;
}

export async function addMenuService(productData) {
  const token = localStorage.getItem("token");

  const response = await axios.post(MENU_URL, productData, {
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
  const token = localStorage.getItem("token");

  const response = await axios.put(`${MENU_URL}/${id}`, productData, {
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
    `${MENU_URL}/${id}`,
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
    `${MENU_URL}?search=${search}&category=${category}`,
  );

  if (response.status !== 200) {
    throw new Error(`Failed to search (${response.status})`);
  }

  return response?.data?.data;
}
