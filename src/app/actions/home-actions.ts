"use server";

import { getBeerStock } from "./beer-actions";

export async function loadHomeData() {
  try {
    const stock = await getBeerStock();
    return { stock };
  } catch (error) {
    console.error("Error loading home data:", error);
    throw error;
  }
}
