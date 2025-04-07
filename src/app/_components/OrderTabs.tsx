"use client";

import { JSX, useState } from "react";
import Link from "next/link";
import OrderCard from "./OrderCard";
import type { Order } from "@/types/order";

interface OrderTabsProps {
  paidOrders: Order[];
  unpaidOrders: Order[];
}

export default function OrderTabs({
  paidOrders,
  unpaidOrders,
}: OrderTabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<"inProgress" | "pastOrders">(
    "inProgress"
  );

  return (
    <>
      <div className="flex border-b">
        <button
          className={`flex-1 py-4 text-center font-medium ${
            activeTab === "inProgress" ? "tab-active" : "tab-inactive"
          }`}
          onClick={() => setActiveTab("inProgress")}
        >
          In Progress
        </button>
        <button
          className={`flex-1 py-4 text-center font-medium ${
            activeTab === "pastOrders" ? "tab-active" : "tab-inactive"
          }`}
          onClick={() => setActiveTab("pastOrders")}
        >
          Past Orders
        </button>
      </div>

      <main className="pb-8">
        {activeTab === "inProgress" ? (
          unpaidOrders.length > 0 ? (
            unpaidOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-gray-500 mb-4">No orders in progress</p>
              <Link href="/" className="text-red-600 font-medium">
                Start ordering
              </Link>
            </div>
          )
        ) : paidOrders.length > 0 ? (
          paidOrders.map((order) => (
            <OrderCard key={order.id} order={order} isPast />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-500 mb-4">No past orders</p>
            <Link href="/" className="text-red-600 font-medium">
              Start ordering
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
