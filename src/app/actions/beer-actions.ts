"use server";

import type { Stock } from "@/types/beer";
import type { Order } from "@/types/order";
import { cookies } from "next/headers";

/**
 * Fetches beer stock
 */
export async function getBeerStock(): Promise<Stock> {
  const mockStock: Stock = {
    last_updated: new Date().toISOString(),
    beers: [
      {
        name: "Corona",
        price: 115,
        quantity: 20,
        image: "/images/corona.jpg",
      },
      {
        name: "Quilmes",
        price: 120,
        quantity: 15,
        image: "/images/quilmes.png",
      },
      {
        name: "Club Colombia",
        price: 110,
        quantity: 25,
        image: "/images/club-colombia.png",
      },
    ],
  };

  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockStock;
}

/**
 * Updates beer stock quantity
 */
export async function updateBeerQuantity(
  beerName: string,
  newQuantity: number
): Promise<void> {
  console.log(`Updating ${beerName} stock to ${newQuantity}`);

  await new Promise((resolve) => setTimeout(resolve, 500));
}

const CURRENT_ORDER_COOKIE = "current_order";

/**
 * Gets the current order from cookies
 */
export async function getCurrentOrder(): Promise<Order | null> {
  const cookieStore = await cookies();
  const orderCookie = cookieStore.get(CURRENT_ORDER_COOKIE);

  if (!orderCookie?.value) {
    return null;
  }

  try {
    return JSON.parse(orderCookie.value) as Order;
  } catch (error) {
    console.error("Error parsing order cookie:", error);
    return null;
  }
}
