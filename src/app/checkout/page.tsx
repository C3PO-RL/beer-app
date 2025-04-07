import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getCurrentOrder } from "../actions/order-actions";
import { processCheckout } from "../actions/checkout-actions";
import { redirect } from "next/navigation";
import CheckoutItems from "../_components/CheckoutItems";

export default async function CheckoutPage() {
  const currentOrder = await getCurrentOrder();

  if (!currentOrder || currentOrder.items.length === 0) {
    redirect("/");
  }

  const totalPrice = currentOrder.subtotal + currentOrder.taxes + 5;

  return (
    <>
      <header className="bg-white">
        <div className="p-6 flex items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#020202]">Payment</h1>
            <p className="text-gray-500 mt-1">You deserve better beer</p>
          </div>
        </div>
      </header>

      <main className="p-6 pb-8">
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4">Items Ordered</h2>
          <CheckoutItems items={currentOrder.items} />
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4">Details Transaction</h2>
          <div className="space-y-3 animate-fade-in">
            <div className="flex justify-between">
              <p className="text-gray-500">Beer Total</p>
              <p>${currentOrder.subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Service Fee</p>
              <p>$5.00</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Tax 10%</p>
              <p>${currentOrder.taxes.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold text-green-600">
              <p>Total Price</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </section>

        <form action={processCheckout}>
          <button
            type="submit"
            className="w-full py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors animate-fade-in"
          >
            Checkout Now
          </button>
        </form>
      </main>
    </>
  );
}
