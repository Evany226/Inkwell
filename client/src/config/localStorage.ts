import { useState, useEffect } from "react";

function getStorageValue(key: string, defaultValue: string | boolean) {
  // getting stored value
  const saved = localStorage.getItem(key);
  if (saved !== null) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error("Parsing error on", saved, "Returning default value.");
      return defaultValue;
    }
  }
  return defaultValue;
}

export const useLocalStorage = (
  key: string,
  defaultValue: string | boolean
) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
