import { MMKV } from "react-native-mmkv";
import { type StateStorage } from "zustand/middleware";

export const storage = new MMKV();

export function getItem<T>(key: string): T | null {
  const value = storage.getString(key);
  return value ? (JSON.parse(value) as T) : null;
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  storage.delete(key);
}

// Configure Zustand to use MMKV for state persistence
export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    storage.delete(name);
  },
};
