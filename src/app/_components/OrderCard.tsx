import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import type { OrderCardProps } from "@/types/order";
import { JSX } from "react";

export default function OrderCard({ order, isPast = false }: OrderCardProps): JSX.Element {
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  const formattedDate = formatDistanceToNow(new Date(order.created), {
    addSuffix: true,
  });

  const beerTypesCount = order.items.length;

  return (
    <Link href={`/orders/${order.id}`}>
      <div className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors animate-fade-in">
        <div className="flex-shrink-0">
          {order.items.length > 0 && (
            <div className="relative">
              <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                <Image
                  src={
                    order.items[0].image ||
                    "/placeholder.svg?height=200&width=200"
                  }
                  alt={order.items[0].name}
                  fill
                  className="object-cover"
                />
              </div>
              {beerTypesCount > 1 && (
                <div className="absolute -bottom-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  +{beerTypesCount - 1}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex-1 ml-4">
          <h3 className="text-xl font-bold">
            {order.items.length > 0
              ? `${order.items[0].name}${
                  beerTypesCount > 1 ? ` + ${beerTypesCount - 1} more` : ""
                }`
              : "Empty Order"}
          </h3>
          <p className="text-gray-500">
            {totalItems} {totalItems === 1 ? "item" : "items"} • $
            {order.subtotal.toFixed(2)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-500">{formattedDate}</p>
          {isPast && order.paid && (
            <span className="text-green-500 text-sm">Completed</span>
          )}
          {isPast && !order.paid && (
            <span className="text-red-500 text-sm">Cancelled</span>
          )}
        </div>
      </div>
    </Link>
  );
}
