import { UtensilsCrossed, X } from "lucide-react";
import OrderedDish from "./OrderedDish";
import Logo from "./Logo";
import DrawerFooter from "./DrawerFooter";
import Receipt from "./Receipt";
import { useOrdersState } from "../../Contexts/AppContext";
import { useOrderList } from "../../Contexts/ListedOrdersContext";

export default function Drawer({ isDrawerOpen, closeDrawer, updateOrder }) {
  const { orderList } = useOrderList();
  const { orders } = useOrdersState();
  const filteredOrders = orders.filter((receipt) => {
    return receipt.status === "pending" || receipt.status === "preparing";
  });
  const groupedOrders = orderList.reduce((acc, dish) => {
    const existing = acc.find((item) => item.id === dish.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ ...dish, quantity: 1 });
    }
    return acc;
  }, []);

  const totalAmount = orderList.reduce(
    (sum, dish) => sum + (dish.price || 0),
    0,
  );

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[450px] bg-surface-dim shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
        isDrawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-surface-container-high bg-surface-container-lowest">
        <Logo />
        <button
          onClick={() => closeDrawer()}
          className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Order Items Body */}

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="space-y-4 pt-4">
          {" "}
          <h2 className="text-2xl font-bold border-b border-surface-container-high pb-2">
            Cart
          </h2>
          {groupedOrders.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 text-on-surface-variant">
              <UtensilsCrossed className="w-10 h-10 stroke-1" />
              <p className="text-sm">Your order selection is empty.</p>
            </div>
          ) : (
            groupedOrders.map((dish) => (
              <OrderedDish
                key={dish.id}
                dish={dish}
                updateOrder={updateOrder}
              />
            ))
          )}
        </div>
        <div className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold border-b border-surface-container-high pb-2">
            Receipts
          </h2>

          {filteredOrders && filteredOrders.length > 0 ? (
            filteredOrders.map((receipt) => {
              return <Receipt key={receipt.id} receipt={receipt} />;
            })
          ) : (
            <p className="text-sm text-on-surface-variant text-center py-4">
              No receipts available.
            </p>
          )}
        </div>
      </div>
      {/* Receipts Section */}

      {/*Receipt*/}
      {/* Drawer Footer */}
      <DrawerFooter totalAmount={totalAmount} groupedOrders={groupedOrders} />
    </aside>
  );
}
