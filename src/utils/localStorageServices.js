export const setLocalStorageItem = (key, value) => {
  try {
    const serializedValue =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

// 2. Get item by key from localStorage (auto-parses JSON)
export const getLocalStorageItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return null;

    // Attempt to parse JSON; fallback to raw string if parsing fails
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return null;
  }
};

// 3. Delete item by key from localStorage
export const removeLocalStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
};
