import { useState } from "react";

function useLocalStorage(key, initialValue) {
  function readFromStorage() {
    const rawValue = localStorage.getItem(key);

    if (!rawValue) {
      return initialValue;
    }

    try {
      return JSON.parse(rawValue);
    } catch {
      return initialValue;
    }
  }

  const [value, setValue] = useState(readFromStorage);

  function saveData(newValue) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  function readData() {
    return readFromStorage();
  }

  function removeData() {
    localStorage.removeItem(key);
    setValue(initialValue);
  }

  return {
    value,
    saveData,
    readData,
    removeData,
  };
}

export default useLocalStorage;
