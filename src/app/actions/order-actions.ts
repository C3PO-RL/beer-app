"use server";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { cookies } from "next/headers";
import { db } from "@/lib/firebase";
import type { Order } from "@/types/order";
import type { Customer } from "@/types/customer";
import type { Beer } from "@/types/beer";
import { revalidatePath } from "next/cache";

const CURRENT_ORDER_COOKIE = "current_order";

/**
 * Gets the current order from cookies
 */
export async function getCurrentOrder(): Promise<Order | null> {
  const cookieStore = await cookies();
  const orderCookie = cookieStore.get(CURRENT_ORDER_COOKIE);

  if (!orderCookie?.value) {
    // Initialize a new order if none exists
    const newOrder: Order = {
      created: new Date().toISOString(),
      paid: false,
      subtotal: 0,
      taxes: 0,
      discounts: 0,
      items: [],
      rounds: [],
    };

    return newOrder;
  }

  try {
    return JSON.parse(orderCookie.value) as Order;
  } catch (error) {
    console.error("Error parsing order cookie:", error);
    return null;
  }
}

/**
 * Saves the current order to cookies
 */
export async function saveCurrentOrder(order: Order): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set({
    name: CURRENT_ORDER_COOKIE,
    value: JSON.stringify(order),
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
  });
}

/**
 * Adds a beer to the current order
 */
export async function addToOrder(beer: Beer, quantity: number): Promise<Order> {
  const currentOrder = (await getCurrentOrder()) || {
    created: new Date().toISOString(),
    paid: false,
    subtotal: 0,
    taxes: 0,
    discounts: 0,
    items: [],
    rounds: [],
  };

  const existingItemIndex = currentOrder.items.findIndex(
    (item) => item.name === beer.name
  );
  const updatedItems = [...currentOrder.items];

  if (existingItemIndex >= 0) {
    const existingItem = updatedItems[existingItemIndex];
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + quantity,
      total: (existingItem.quantity + quantity) * existingItem.price_per_unit,
    };
    updatedItems[existingItemIndex] = updatedItem;
  } else {
    updatedItems.push({
      name: beer.name,
      price_per_unit: beer.price,
      quantity: quantity,
      total: quantity * beer.price,
      image: beer.image,
    });
  }

  const newRound = {
    created: new Date().toISOString(),
    items: [
      {
        name: beer.name,
        quantity: quantity,
      },
    ],
  };

  const subtotal = updatedItems.reduce((total, item) => total + item.total, 0);
  const taxes = subtotal * 0.1;

  const updatedOrder = {
    ...currentOrder,
    items: updatedItems,
    rounds: [...currentOrder.rounds, newRound],
    subtotal,
    taxes,
    discounts: 0,
  };

  await saveCurrentOrder(updatedOrder);
  return updatedOrder;
}

/**
 * Removes an item from the current order
 */
export async function removeFromOrder(itemName: string): Promise<Order | null> {
  const currentOrder = await getCurrentOrder();

  if (!currentOrder) {
    return null;
  }

  const updatedItems = currentOrder.items.filter(
    (item) => item.name !== itemName
  );

  if (updatedItems.length === 0) {
    await clearCurrentOrder();
    return null;
  }

  const subtotal = updatedItems.reduce((total, item) => total + item.total, 0);
  const taxes = subtotal * 0.1;

  const updatedOrder = {
    ...currentOrder,
    items: updatedItems,
    subtotal,
    taxes,
    discounts: 0,
  };

  await saveCurrentOrder(updatedOrder);
  return updatedOrder;
}

/**
 * Clears the current order
 */
export async function clearCurrentOrder(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set({
    name: CURRENT_ORDER_COOKIE,
    value: "",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
}

/**
 * Saves an order to Firestore
 */
export async function saveOrder(
  order: Order,
  customer: Customer
): Promise<string> {
  const orderToSave = {
    ...order,
    paid: true,
    customer,
  };

  try {
    const docRef = await addDoc(collection(db, "orders"), orderToSave);

    await clearCurrentOrder();
    revalidatePath("/orders");
    return docRef.id;
  } catch (error) {
    console.error("Error saving order:", error);
    throw error;
  }
}

/**
 * Fetches all paid orders
 */
export async function getPaidOrders(): Promise<Order[]> {
  try {
    const ordersQuery = query(
      collection(db, "orders"),
      where("paid", "==", true),
      orderBy("created", "desc")
    );

    const querySnapshot = await getDocs(ordersQuery);
    const fetchedOrders: Order[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Order;
      fetchedOrders.push({
        ...data,
        id: doc.id,
      });
    });

    return fetchedOrders;
  } catch (error) {
    console.error("Error loading orders:", error);
    throw error;
  }
}

/**
 * Fetches all unpaid orders
 */
export async function getUnpaidOrders(): Promise<Order[]> {
  try {
    const ordersQuery = query(
      collection(db, "orders"),
      where("paid", "==", false),
      orderBy("created", "desc")
    );

    const querySnapshot = await getDocs(ordersQuery);
    const fetchedOrders: Order[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Order;
      fetchedOrders.push({
        ...data,
        id: doc.id,
      });
    });

    return fetchedOrders;
  } catch (error) {
    console.error("Error loading orders:", error);
    throw error;
  }
}

/**
 * Fetches a single order by ID
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const orderDoc = await getDoc(doc(db, "orders", orderId));

    if (orderDoc.exists()) {
      return {
        ...(orderDoc.data() as Order),
        id: orderDoc.id,
      };
    }

    return null;
  } catch (error) {
    console.error("Error loading order:", error);
    throw error;
  }
}
