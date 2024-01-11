"use client"
import { useEffect, useRef, useState } from "react";

/**
 * Handle component state using local storage
 *
 * @param key The name of the key. If the passed key is updated, the local storage item with the old key will be removed.
 * @param defaultValue The initial value to be used if no local storage item is found.
 * Values that are not JSON compatible such as undefined, Function and Symbol, cannot be used.
 * If any of these values are found during conversion, they will be omitted (when found in an object)
 * Or changed to null (when found in an array)
 * @param [overWrite = false] Use the default value to overwrite a pre-existing local storage value.
 * @return Returns two values: the current value stored in local storage and a function to set/update value in the local storage.
 */

export const useLocalStorage = <T,>(
  key: string,
  defaultValue: T,
  overWrite = false
) => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined")
      throw new Error("localStorage can be used only in client side");
    if (overWrite) return defaultValue;
    else {
      try {
        const currentValue = window.localStorage.getItem(key);
        if (currentValue) return JSON.parse(currentValue) as T;
      } catch (error) {
        console.error(
          `Error while reading localStorage item with key=${key}:`,
          error
        );
        return defaultValue;
      }
      return defaultValue;
    }
  });

  const previousKeyRef = useRef<string>("");

  useEffect(() => {
    const previousKey = previousKeyRef.current;

    if (previousKey !== key && previousKey) {
      try {
        window.localStorage.removeItem(previousKey);
      } catch (error) {
        console.error(
          `Error while removing localStorage item with key=${previousKey}:`,
          error
        );
      }
    }
    previousKeyRef.current = key;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(
        `Error while setting localStorage item with key=${key}:`,
        error
      );
    }
  }, [value, key, defaultValue]);

  return [value, setValue] as const;
};