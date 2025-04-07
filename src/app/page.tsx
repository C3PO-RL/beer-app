import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBeerStock, getCurrentOrder } from "./actions/beer-actions";
import BeerList from "./_components/BeerList";

export default async function Home() {
  const [stock, currentOrder] = await Promise.all([
    getBeerStock(),
    getCurrentOrder(),
  ]);

  const hasItems = currentOrder && currentOrder.items.length > 0;

  return (
    <>
      <header className="bg-white">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#020202]">Beer Bar</h1>
          <p className="text-gray-500 mt-1">Order your favorite beers</p>
        </div>
      </header>

      <main className="p-4 pb-8">
        {hasItems && (
          <div className="mb-6 bg-red-50 p-4 rounded-lg animate-fade-in">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Current Order</p>
                <p className="text-gray-500">
                  {currentOrder.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}{" "}
                  items
                </p>
              </div>
              <Link
                href="/checkout"
                className="flex items-center text-red-600 font-medium"
              >
                Review <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        )}

        <BeerList beers={stock.beers} />
      </main>
    </>
  );
}
