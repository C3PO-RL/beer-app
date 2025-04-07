"use server";

import { getPaidOrders } from "./order-actions";
import type { Order } from "@/types/order";

export async function loadOrdersData(): Promise<{
  inProgress: Order[];
  completed: Order[];
}> {
  try {
    const allOrders = await getPaidOrders();

    return {
      inProgress: allOrders.filter((order) => !order.paid),
      completed: allOrders.filter((order) => order.paid),
    };
  } catch (error) {
    console.error("Error loading orders data:", error);
    throw error;
  }
}
