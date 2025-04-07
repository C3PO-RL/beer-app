import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getOrderById } from "../../actions/order-actions";
import { notFound } from "next/navigation";

interface OrderDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetails({ params }: OrderDetailsPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <>
      <header className="bg-white">
        <div className="p-6 flex items-center">
          <Link href="/orders" className="mr-4">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#020202]">Order Details</h1>
            <p className="text-gray-500 mt-1">Order #{order.id?.slice(-6)}</p>
          </div>
        </div>
      </header>

      <main className="p-6 pb-8">
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4">Items Ordered</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
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
                <div className="text-right">
                  <p className="text-lg font-medium">
                    {item.quantity} × ${item.price_per_unit.toFixed(2)}
                  </p>
                  <p className="text-gray-500">${item.total.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4">Details Transaction</h2>
          <div className="space-y-3 animate-fade-in">
            <div className="flex justify-between">
              <p className="text-gray-500">Beer Total</p>
              <p>${order.subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Service Fee</p>
              <p>$5.00</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Tax 10%</p>
              <p>${order.taxes.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold text-green-600">
              <p>Total Price</p>
              <p>${(order.subtotal + order.taxes + 5).toFixed(2)}</p>
            </div>
          </div>
        </section>

        {order.customer && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-4">Deliver to:</h2>
            <div className="space-y-3 animate-fade-in">
              <div className="flex justify-between">
                <p className="text-gray-500">Name</p>
                <p>{order.customer.name}</p>
              </div>
            </div>
          </section>
        )}

        {order.paid ? (
          <div className="bg-green-100 p-4 rounded-lg text-center animate-fade-in">
            <p className="text-green-700 font-medium">
              This order has been paid
            </p>
          </div>
        ) : (
          <div className="bg-yellow-100 p-4 rounded-lg text-center animate-fade-in">
            <p className="text-yellow-700 font-medium">
              This order is pending payment
            </p>
          </div>
        )}
      </main>
    </>
  );
}
