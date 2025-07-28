import { db } from "./fbConfig";
import { collection, addDoc, getDocs, query, where, doc, getDoc, serverTimestamp, orderBy } from "firebase/firestore";
import type { Order } from "../types/order";

const ordersCollection = collection(db, 'orders');

export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>) => {
  const newOrder = {
    ...orderData,
    createdAt: serverTimestamp()
  };
  const docRef = await addDoc(ordersCollection, newOrder);
  return docRef.id;
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const q = query(ordersCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  console.log("Fetched user orders:", snapshot.docs.map((doc) => doc.data())); 
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate()
  })) as Order[];
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const docRef = doc(db, 'orders', orderId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toDate()
    } as Order;
  }
  return null;
};
