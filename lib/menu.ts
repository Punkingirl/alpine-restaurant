import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

export interface MenuItem {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  allergens?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

export interface MenuCategory {
  id?: string;
  name: string;
  description: string;
  image?: string;
  order: number;
}

// Get all menu items
export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'menuItems'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as MenuItem[];
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
}

// Get menu items by category
export async function getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
  try {
    const q = query(collection(db, 'menuItems'), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as MenuItem[];
  } catch (error) {
    console.error('Error fetching menu items by category:', error);
    return [];
  }
}

// Add new menu item
export async function addMenuItem(item: Omit<MenuItem, 'id'>): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, 'menuItems'), item);
    return docRef.id;
  } catch (error) {
    console.error('Error adding menu item:', error);
    return null;
  }
}

// Create menu item (alias for addMenuItem)
export async function createMenuItem(item: Omit<MenuItem, 'id'>): Promise<string | null> {
  return addMenuItem(item);
}

// Update menu item
export async function updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<boolean> {
  try {
    const docRef = doc(db, 'menuItems', id);
    await updateDoc(docRef, updates);
    return true;
  } catch (error) {
    console.error('Error updating menu item:', error);
    return false;
  }
}

// Delete menu item
export async function deleteMenuItem(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, 'menuItems', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return false;
  }
}

// Get all categories
export async function getMenuCategories(): Promise<MenuCategory[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'menuCategories'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as MenuCategory[];
  } catch (error) {
    console.error('Error fetching menu categories:', error);
    return [];
  }
}

// Add new category
export async function addMenuCategory(category: Omit<MenuCategory, 'id'>): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, 'menuCategories'), category);
    return docRef.id;
  } catch (error) {
    console.error('Error adding menu category:', error);
    return null;
  }
} 