"use client";

import Image from "next/image";
import { JSX, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { addToOrder } from "../actions/order-actions";
import type { Beer } from "@/types/beer";
import { useRouter } from "next/navigation";

interface BeerCardProps {
  beer: Beer;
}

export default function BeerCard({ beer }: BeerCardProps): JSX.Element {
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToOrder = async () => {
    try {
      setIsSubmitting(true);
      await addToOrder(beer, quantity);

      router.refresh();

      setQuantity(1);
    } catch (error) {
      console.error("Error adding to order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-slide-in">
      <div className="relative h-40 w-full">
        <Image
          src={beer.image || "/placeholder.svg?height=300&width=500"}
          alt={beer.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="text-2xl font-bold text-black">{beer.name}</h3>
        <div className="flex items-center mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-5 h-5 ${
                star <= 4 ? "text-red-500" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-gray-500">4.5</span>
        </div>
        <p className="mt-2 text-gray-500">
          Premium imported beer with a smooth taste and refreshing flavor.
        </p>
        <div className="mt-4">
          <p className="font-bold text-black">Ingredients:</p>
          <p className="text-gray-500">Water, barley malt, rice, hops.</p>
        </div>
        <div className="flex items-center justify-end mt-6">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300"
            onClick={handleDecrement}
            disabled={isSubmitting}
          >
            <Minus size={16} />
          </button>
          <span className="mx-4 text-xl">{quantity}</span>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300"
            onClick={handleIncrement}
            disabled={isSubmitting}
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex flex-col w-1/2">
            <p className=" ">Total Price:</p>
            <p className="text-xl text-[#020202]">${beer.price.toFixed(2)}</p>
          </div>
          <button
            className="w-1/2 py-3 mt-4 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors disabled:bg-red-400"
            onClick={handleAddToOrder}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Order Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
