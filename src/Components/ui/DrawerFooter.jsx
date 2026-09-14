import { useOrdersDispatch, useOrdersState } from "../../Contexts/AppContext";
import { useOrderList } from "../../Contexts/ListedOrdersContext";
import { setLocalStorageItem } from "../../utils/localStorageServices";
import { Notification } from "../../utils/sweetAlertNotification";

export default function DrawerFooter({ totalAmount, groupedOrders }) {
  const { loadingOrders } = useOrdersState();
  const { addOrderAction } = useOrdersDispatch();
  const { orderList, setOrderList } = useOrderList();
  function confirmOrder() {
    const orderBody = groupedOrders.map((dish) => {
      return { menuItemId: dish.id, quantity: dish.quantity };
    });
    addOrderAction(orderBody);
    Notification(
      "Order Confirmed!",
      "Thanks for ordering! We're processing the order now and will let you know as soon as your items are pn the way",
      "success",
    );
    setOrderList([]);
    setLocalStorageItem("orders", []);
  }
  return (
    <div className="p-6 border-t border-surface-container-high bg-surface-container-lowest flex items-center justify-between gap-4">
      <div className="flex flex-col">
        <span className="text-xs text-on-surface-variant uppercase tracking-wider">
          Total items in Cart ({orderList.length})
        </span>
        <span className="text-xl font-bold text-primary">
          ${totalAmount.toFixed(2)}
        </span>
      </div>

      <button
        onClick={() => {
          confirmOrder();
        }}
        disabled={orderList.length == 0}
        className={
          orderList.length == 0
            ? "max-w-[200px]  py-2 px-4   rounded transition-all duration-300 flex items-center justify-center   bg-surface-container  text-on-surface"
            : "max-w-[200px]  py-2 px-4 bg-primary-container hover:bg-secondary-container  rounded transition-all duration-300 flex items-center justify-center cursor-pointer"
        }
        type="button"
      >
        {loadingOrders ? (
          <div
            className="w-6 h-6 rounded-full animate-spin border-2 border-on-primary/25 border-t-on-primary"
            aria-label="Loading indicator"
          />
        ) : (
          <span
            className={
              orderList.length == 0 ? "text-on-surface" : "text-on-primary"
            }
          >
            ConfirmOrder
          </span>
        )}
      </button>
    </div>
  );
}
