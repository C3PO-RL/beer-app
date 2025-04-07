"use server";

import { saveOrder, getCurrentOrder } from "./order-actions";
import { redirect } from "next/navigation";

export async function processCheckout() {
  const currentOrder = await getCurrentOrder();

  if (!currentOrder || currentOrder.items.length === 0) {
    throw new Error("No items in order");
  }

  const customer = {
    name: "Guest Customer",
    phone: "555-555-5555",
    address: "123 Main St",
    houseNumber: "Apt 1",
    city: "Beer City",
  };

  const orderId = await saveOrder(currentOrder, customer);

  redirect(`/orders/${orderId}`);
}
