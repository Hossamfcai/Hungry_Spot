import { UtensilsCrossed, ChefHat, X, Trash2, Plus, Minus } from "lucide-react";
import { getLocalStorageItem } from "../../utils/localStorageServices";

export default function Drawer({ isDrawerOpen, closeDrawer, updateOrder }) {
  const orderList = getLocalStorageItem("orders");

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
        <div className="flex items-center gap-3">
          <ChefHat className="w-6 h-6 text-primary" />
          <h2 className="font-headline-sm text-lg text-on-surface font-semibold tracking-wide">
            Your Atelier Order
          </h2>
        </div>
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
        {groupedOrders.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center gap-3 text-on-surface-variant">
            <UtensilsCrossed className="w-10 h-10 stroke-1" />
            <p className="text-sm">Your order selection is empty.</p>
          </div>
        ) : (
          groupedOrders.map((dish) => (
            <div
              key={dish.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-surface-container-lowest border border-surface-container-high/50 shadow-sm"
            >
              {dish.image && (
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-16 h-16 rounded object-cover shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-on-surface truncate">
                  {dish.name}
                </h4>
                {dish.price && (
                  <p className="text-xs text-primary font-semibold mt-0.5">
                    ${dish.price}
                  </p>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 bg-surface-container px-2 py-1 rounded">
                <button
                  onClick={() => updateOrder("minus", dish)}
                  className="p-1 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                  type="button"
                >
                  {dish.quantity === 1 ? (
                    <Trash2 className="w-3.5 h-3.5 text-error" />
                  ) : (
                    <Minus className="w-3.5 h-3.5" />
                  )}
                </button>
                <span className="text-xs font-bold text-on-surface w-4 text-center">
                  {dish.quantity}
                </span>
                <button
                  onClick={() => updateOrder("plus", dish)}
                  className="p-1 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                  type="button"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Drawer Footer */}
      <div className="p-6 border-t border-surface-container-high bg-surface-container-lowest flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">
            Total items ({orderList.length})
          </span>
          <span className="text-xl font-bold text-primary">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
        <button
          disabled={orderList.length === 0}
          className="flex-1 max-w-[200px] bg-primary text-on-primary hover:bg-primary-fixed transition-colors py-3 px-4 rounded font-label-caps text-xs tracking-wider uppercase font-semibold text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          Confirm &amp; Pay
        </button>
      </div>
    </aside>
  );
}
