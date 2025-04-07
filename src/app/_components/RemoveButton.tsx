"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeFromOrder } from "../actions/order-actions";

interface RemoveItemButtonProps {
  itemName: string;
}

export default function RemoveItemButton({ itemName }: RemoveItemButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      const updatedOrder = await removeFromOrder(itemName);

      if (!updatedOrder) {
        router.push("/");
      } else {
        router.refresh();
      }
    });
  };

  return (
    <button
      onClick={handleRemove}
      disabled={isPending}
      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
      aria-label={`Remove ${itemName} from order`}
    >
      <Trash2 size={20} />
    </button>
  );
}
