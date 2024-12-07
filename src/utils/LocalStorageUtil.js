// LocalStorageUtil.ts
export const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
  }
};

export const getItem = (key) => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return (serializedValue && JSON.parse(serializedValue)) || null;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return null;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
  }
};

export const clear = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error(`Error clearing localStorage:`, error);
  }
};
