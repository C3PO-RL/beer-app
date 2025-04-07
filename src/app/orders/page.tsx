import { getPaidOrders, getUnpaidOrders } from "../actions/order-actions";
import OrderTabs from "../_components/OrderTabs";

export default async function OrdersPage() {
  const [paidOrders, unpaidOrders] = await Promise.all([
    getPaidOrders(),
    getUnpaidOrders(),
  ]);

  return (
    <>
      <header className="bg-white">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#020202]">Your Orders</h1>
          <p className="text-gray-500 mt-1">Wait for the best beer</p>
        </div>
      </header>

      <OrderTabs paidOrders={paidOrders} unpaidOrders={unpaidOrders} />
    </>
  );
}
