import { useEffect, useState } from "react";
import { useOrdersDispatch, useOrdersState } from "../../Contexts/AppContext";

export default function Orders() {
  const { orders, loadingOrders, ordersError } = useOrdersState();
  const { getOrdersData } = useOrdersDispatch();

  const [activeFilter, setActiveFilter] = useState("ALL");

  useEffect(() => {
    getOrdersData();
  }, [getOrdersData]);

  const pendingOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "pending",
  );

  const preparingOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "preparing",
  );

  const completedOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "completed",
  );

  const cancelledOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "cancelled",
  );

  const totalVolume = orders.reduce(
    (total, order) => total + Number(order.total || 0),
    0,
  );

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === "ALL") return true;

    return order.status?.toUpperCase() === activeFilter;
  });

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="min-h-screen bg-[#111113] px-5 py-8 text-[#f4f0e8] md:px-8 lg:px-10">
      {/* Header */}
      <div className="mb-6 flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <span className="text-[9px] font-bold tracking-[1px] text-[#e88600]">
            DEGUSTATION THEATER LOGISTICS
          </span>

          <h1 className="mt-2 font-serif text-3xl font-normal text-[#eee8dc] md:text-4xl">
            Manage Orders
          </h1>
        </div>

        <div className="flex w-full gap-2 lg:w-auto">
          {/* Sync Button */}
          <button
            onClick={getOrdersData}
            disabled={loadingOrders}
            className="flex-1 bg-[#242426] px-3 py-3 text-[8px] font-bold tracking-[0.7px] text-[#ddd7cc] transition hover:bg-[#2d2d30] disabled:cursor-not-allowed disabled:opacity-50 lg:flex-none"
          >
            {loadingOrders ? "↻ SYNCING..." : "↻ SYNC REALTIME PIPELINE"}
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-10 grid grid-cols-1 gap-3 md:grid-cols-3">
        {/* Total Orders */}
        <div className="flex min-h-[80px] items-center justify-between bg-[#1a1a1d] px-5 py-4">
          <div>
            <span className="text-[8px] font-bold tracking-[0.8px] text-[#aaa49a]">
              TOTAL ORDERS
            </span>

            <h2 className="mt-1 font-serif text-2xl font-normal text-[#eee8df]">
              {orders.length}
            </h2>
          </div>

          <div className="flex h-8 w-8 items-center justify-center bg-[#252527] text-lg text-[#e98500]">
            ♙
          </div>
        </div>

        {/* Preparing Orders */}
        <div className="flex min-h-[80px] items-center justify-between bg-[#1a1a1d] px-5 py-4">
          <div>
            <span className="text-[8px] font-bold tracking-[0.8px] text-[#aaa49a]">
              PREPARING ORDERS
            </span>

            <h2 className="mt-1 font-serif text-2xl font-normal text-[#eee8df]">
              {preparingOrders.length}
            </h2>
          </div>

          <div className="flex h-8 w-8 items-center justify-center bg-[#252527] text-lg text-[#e98500]">
            ▤
          </div>
        </div>

        {/* Gross Volume */}
        <div className="flex min-h-[80px] items-center justify-between bg-[#1a1a1d] px-5 py-4">
          <div>
            <span className="text-[8px] font-bold tracking-[0.8px] text-[#aaa49a]">
              GROSS SERVICE VOLUME
            </span>

            <h2 className="mt-1 font-serif text-2xl font-normal text-[#eee8df]">
              ${totalVolume.toFixed(2)}
            </h2>
          </div>

          <div className="flex h-8 w-8 items-center justify-center bg-[#252527] text-lg text-[#e98500]">
            ▣
          </div>
        </div>
      </div>

      {/* Orders Card */}
      <div className="bg-[#1a1a1d] px-5 pt-6">
        {/* Card Header */}
        <div className="mb-5 flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
          <div>
            <h2 className="font-serif text-xl font-normal leading-[1.1] text-[#f0e9dd]">
              Live Orders &
              <br />
              Degustation Dispatch
            </h2>

            <p className="mt-1 text-[8px] text-[#aaa49b]">
              Direct kitchen service conduit and vintage pairing preparation
              line.
            </p>
          </div>

          {/* Filters */}
          <div className="flex max-w-full flex-wrap justify-start gap-1.5 xl:max-w-[500px] xl:justify-end">
            {/* All */}
            <button
              onClick={() => handleFilterChange("ALL")}
              className={`px-2 py-1.5 text-[8px] font-bold transition ${
                activeFilter === "ALL"
                  ? "bg-[#e98500] text-[#111]"
                  : "text-[#a8a39a] hover:bg-[#252527] hover:text-[#eee9df]"
              }`}
            >
              ALL ({orders.length})
            </button>

            {/* Pending */}
            <button
              onClick={() => handleFilterChange("PENDING")}
              className={`px-2 py-1.5 text-[8px] font-bold transition ${
                activeFilter === "PENDING"
                  ? "bg-[#e98500] text-[#111]"
                  : "text-[#a8a39a] hover:bg-[#252527] hover:text-[#eee9df]"
              }`}
            >
              PENDING ({pendingOrders.length})
            </button>

            {/* Preparing */}
            <button
              onClick={() => handleFilterChange("PREPARING")}
              className={`px-2 py-1.5 text-[8px] font-bold transition ${
                activeFilter === "PREPARING"
                  ? "bg-[#e98500] text-[#111]"
                  : "text-[#a8a39a] hover:bg-[#252527] hover:text-[#eee9df]"
              }`}
            >
              PREPARING ({preparingOrders.length})
            </button>

            {/* Completed */}
            <button
              onClick={() => handleFilterChange("COMPLETED")}
              className={`px-2 py-1.5 text-[8px] font-bold transition ${
                activeFilter === "COMPLETED"
                  ? "bg-[#e98500] text-[#111]"
                  : "text-[#a8a39a] hover:bg-[#252527] hover:text-[#eee9df]"
              }`}
            >
              COMPLETED ({completedOrders.length})
            </button>

            {/* Cancelled */}
            <button
              onClick={() => handleFilterChange("CANCELLED")}
              className={`px-2 py-1.5 text-[8px] font-bold transition ${
                activeFilter === "CANCELLED"
                  ? "bg-[#e98500] text-[#111]"
                  : "text-[#a8a39a] hover:bg-[#252527] hover:text-[#eee9df]"
              }`}
            >
              CANCELLED ({cancelledOrders.length})
            </button>
          </div>
        </div>

        {/* Loading */}
        {loadingOrders && (
          <div className="bg-[#19191b] px-4 py-10 text-center text-[10px] text-[#aaa49a]">
            Loading orders...
          </div>
        )}

        {/* Error */}
        {ordersError.isError && !loadingOrders && (
          <div className="bg-[#19191b] px-4 py-10 text-center text-[10px] text-red-400">
            {ordersError.message}
          </div>
        )}

        {/* Empty */}
        {!loadingOrders &&
          !ordersError.isError &&
          filteredOrders.length === 0 && (
            <div className="bg-[#19191b] px-4 py-10 text-center text-[10px] text-[#aaa49a]">
              No orders found.
            </div>
          )}

        {/* Table Header */}
        {!loadingOrders &&
          !ordersError.isError &&
          filteredOrders.length > 0 && (
            <div className="hidden grid-cols-[0.8fr_1fr_3fr_0.8fr_1.1fr] bg-[#111113] px-2.5 py-2.5 text-[7px] font-bold text-[#b9b3aa] md:grid">
              <span>
                ORDER
                <br />
                ID
              </span>

              <span>USER NAME</span>

              <span>ORDER ITEMS</span>

              <span>AMOUNT</span>

              <span>ORDER STATUS</span>
            </div>
          )}

        {/* Orders */}
        {!loadingOrders && !ordersError.isError && (
          <div className="bg-[#19191b]">
            {filteredOrders.map((order) => {
              const status = order.status?.toUpperCase();

              return (
                <div
                  key={order.id}
                  className="grid grid-cols-1 gap-4 border-b border-[#28282a] px-2.5 py-5 md:grid-cols-[0.8fr_1fr_3fr_0.8fr_1.1fr] md:items-center md:gap-0 md:py-3"
                >
                  {/* Order ID */}
                  <div className="text-[10px] font-bold text-[#e98500]">
                    #{order.id}
                  </div>

                  {/* User Name */}
                  <div className="flex flex-col gap-1">
                    <strong className="text-[10px] font-semibold text-[#eee9df]">
                      {order.userId}
                    </strong>

                    <small className="text-[8px] leading-[1.4] text-[#99938a]">
                      User Name
                    </small>
                  </div>

                  {/* Order Items */}
                  <div className="flex flex-col gap-2">
                    {order.items?.map((item) => (
                      <div
                        key={item.menuItemId}
                        className="flex items-center gap-2.5"
                      >
                        <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center bg-[#252527] text-[8px] font-bold text-[#e98500]">
                          {item.quantity}x
                        </div>

                        <div className="flex flex-col gap-1">
                          <strong className="text-[10px] font-semibold text-[#eee9df]">
                            {item.name}
                          </strong>

                          <small className="text-[8px] leading-[1.4] text-[#99938a]">
                            ${item.price} × {item.quantity} = ${item.lineTotal}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Amount */}
                  <div className="font-serif text-sm text-[#e9e2d7]">
                    ${Number(order.total || 0).toFixed(2)}
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className={`text-[7px] font-bold tracking-[0.7px] ${
                        status === "PENDING"
                          ? "text-[#e98500]"
                          : status === "PREPARING"
                            ? "text-[#f0b35d]"
                            : status === "COMPLETED"
                              ? "text-[#8fbd8f]"
                              : status === "CANCELLED"
                                ? "text-red-400"
                                : "text-[#aaa49a]"
                      }`}
                    >
                      ● {status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
