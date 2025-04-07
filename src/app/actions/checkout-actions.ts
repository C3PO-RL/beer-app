"use server";

import { saveOrder, getCurrentOrder } from "./order-actions";
import { redirect } from "next/navigation";

export async function processCheckout() {
  // Get the current order
  const currentOrder = await getCurrentOrder();

  if (!currentOrder || currentOrder.items.length === 0) {
    throw new Error("No items in order");
  }

  // Use default customer data since we're not collecting it from a form
  const customer = {
    name: "Guest Customer",
    phone: "555-555-5555",
    address: "123 Main St",
    houseNumber: "Apt 1",
    city: "Beer City",
  };

  // Save the order
  const orderId = await saveOrder(currentOrder, customer);

  // Redirect to the order details page
  redirect(`/orders/${orderId}`);
}
