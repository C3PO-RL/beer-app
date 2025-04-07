"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { removeFromOrder } from "../actions/order-actions";
import type { OrderItem } from "@/types/order";

interface CheckoutItemsProps {
  items: OrderItem[];
}

export default function CheckoutItems({ items }: CheckoutItemsProps) {
  const router = useRouter();
  const [removingItem, setRemovingItem] = useState<string | null>(null);

  const handleRemoveItem = async (itemName: string) => {
    try {
      setRemovingItem(itemName);
      const updatedOrder = await removeFromOrder(itemName);

      if (!updatedOrder) {
        router.push("/");
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setRemovingItem(null);
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center bg-white rounded-lg shadow-sm p-4 animate-fade-in"
        >
          {item.image ? (
            <div className="w-20 h-20 relative rounded-lg overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
          )}
          <div className="ml-4 flex-1">
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="text-gray-500">
              ${item.price_per_unit.toFixed(2)} per unit
            </p>
          </div>
          <div className="text-right mr-4">
            <p className="text-lg font-medium">
              {item.quantity} × ${item.price_per_unit.toFixed(2)}
            </p>
            <p className="text-gray-500">${item.total.toFixed(2)}</p>
          </div>
          <button
            onClick={() => handleRemoveItem(item.name)}
            disabled={removingItem === item.name}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50 cursor-pointer"
            aria-label={`Remove ${item.name} from order`}
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}
