import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/filter-status";

const STORAGE_KEY = "@comprar:items";

export type ItemStorage = {
  id: string;
  status: FilterStatus;
  description: string;
};

export async function saveItems(items: ItemStorage[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Error saving items:", error);
  }
}

export async function loadItems() {
  try {
    const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error("Error loading items:", error);
    return [];
  }
}

export async function getByStatus(status: FilterStatus) {
  const items = await loadItems();
  return items.filter((item: ItemStorage) => item.status === status);
}

export async function addItem(item: ItemStorage) {
  try {
    const items = await loadItems();
    const updatedItems = [...items, item];
    await saveItems(updatedItems);
  } catch (error) {
    console.error("Error adding item:", error);
  }
}

export async function removeItem(id: string) {
  try {
    const items = await loadItems();
    const updatedItems = items.filter((item: ItemStorage) => item.id !== id);
    await saveItems(updatedItems);
  } catch (error) {
    console.error("Error removing item:", error);
  }
}

export async function clearItems() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing items:", error);
  }
}

export async function updateItemStatus(id: string) {
  try {
    const items = await loadItems();
    const updatedItems = items.map((item: ItemStorage) =>
      item.id === id
        ? {
            ...item,
            status:
              item.status === FilterStatus.PENDING
                ? FilterStatus.DONE
                : FilterStatus.PENDING,
          }
        : item,
    );
    await saveItems(updatedItems);
  } catch (error) {
    console.error("Error updating item status:", error);
  }
}

export const itemsStorage = {
  getByStatus,
  addItem,
  removeItem,
  clearItems,
  updateItemStatus,
};
