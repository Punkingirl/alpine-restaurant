import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, limit, getDoc } from 'firebase/firestore';

export interface OrderItem {
  id?: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id?: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  createdAt: Date;
  updatedAt: Date;
  estimatedReadyTime?: Date;
  specialInstructions?: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod?: 'cash' | 'card' | 'online';
}

// Get all orders
export async function getOrders(): Promise<Order[]> {
  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      estimatedReadyTime: doc.data().estimatedReadyTime?.toDate(),
    })) as Order[];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

// Get orders by status
export async function getOrdersByStatus(status: Order['status']): Promise<Order[]> {
  try {
    const q = query(
      collection(db, 'orders'), 
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      estimatedReadyTime: doc.data().estimatedReadyTime?.toDate(),
    })) as Order[];
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    return [];
  }
}

// Get order by ID
export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const docRef = doc(db, 'orders', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        estimatedReadyTime: data.estimatedReadyTime?.toDate(),
      } as Order;
    }
    return null;
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    return null;
  }
}

// Get order (alias for getOrderById)
export async function getOrder(id: string): Promise<Order | null> {
  return getOrderById(id);
}

// Create new order
export async function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
  try {
    const orderData = {
      ...order,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const docRef = await addDoc(collection(db, 'orders'), orderData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
}

// Update order status
export async function updateOrderStatus(id: string, status: Order['status']): Promise<boolean> {
  try {
    const docRef = doc(db, 'orders', id);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
}

// Update order
export async function updateOrder(id: string, updates: Partial<Order>): Promise<boolean> {
  try {
    const docRef = doc(db, 'orders', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error('Error updating order:', error);
    return false;
  }
}

// Delete order
export async function deleteOrder(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, 'orders', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    return false;
  }
}

// Get recent orders (last 24 hours)
export async function getRecentOrders(): Promise<Order[]> {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const q = query(
      collection(db, 'orders'),
      where('createdAt', '>=', yesterday),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      estimatedReadyTime: doc.data().estimatedReadyTime?.toDate(),
    })) as Order[];
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    return [];
  }
}

// Get orders by customer
export async function getOrdersByCustomer(customerId: string): Promise<Order[]> {
  try {
    const q = query(
      collection(db, 'orders'),
      where('customerId', '==', customerId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      estimatedReadyTime: doc.data().estimatedReadyTime?.toDate(),
    })) as Order[];
  } catch (error) {
    console.error('Error fetching orders by customer:', error);
    return [];
  }
} 