import { Search, ChefHat } from "lucide-react";
import { motion } from "framer-motion";
import { useOrderList } from "../../Contexts/ListedOrdersContext";
import { useMenuState, useOrdersState } from "../../Contexts/AppContext";
export default function Filter({
  searchQuery,
  handleSearch,
  openDrawer,
  categoryState,
  handleCategoryFilter,
}) {
  const { orderList } = useOrderList();
  const { orders } = useOrdersState();
  const { menu } = useMenuState();
  const hasOrders = Boolean(orderList.length || orders.length);
  const categories = ["All", ...new Set(menu.map((item) => item.category))];
  return (
    <section className="sticky top-16 md:top-20 z-40 w-full bg-surface-dim/95 backdrop-blur-xl py-3 md:py-space-md shadow-[0_16px_36px_-8px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-3 md:gap-space-md">
        {/* Search Input + Tray Button Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 md:gap-space-md">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-3 md:pl-space-md flex items-center pointer-events-none text-on-surface-variant/80 group-focus-within:text-primary transition-colors">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <input
              className="w-full bg-surface-container-lowest pl-9 sm:pl-11 pr-10 sm:pr-12 py-2.5 sm:py-3 text-on-surface placeholder:text-on-surface-variant/60 text-xs sm:text-sm md:text-body-md rounded transition-all outline-none focus:bg-surface-container-low focus:shadow-[0_0_24px_-4px_rgba(255,183,125,0.25)]"
              id="dish-search-input"
              value={searchQuery}
              placeholder="Search dishes..."
              type="text"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-space-sm self-end sm:self-auto w-full sm:w-auto">
            <motion.button
              whileTap={{ scale: 0.96 }}
              disabled={!hasOrders}
              onClick={() => openDrawer()}
              className={
                !hasOrders
                  ? "flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2 px-4 py-2.5 sm:py-3 rounded bg-surface-container transition-colors text-on-surface"
                  : "flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2 px-4 py-2.5 sm:py-3 rounded transition-all text-on-surface bg-primary-container hover:bg-secondary-container cursor-pointer"
              }
              id="order-drawer-toggle"
              type="button"
            >
              <ChefHat
                className={`w-4 h-4 sm:w-5 sm:h-5 ${!hasOrders ? "text-secondary" : "text-on-surface"} shrink-0`}
              />

              <span
                className={`font-label-caps  sm:text-label-caps uppercase ${!hasOrders ? "text-on-surface text-xs" : "text-sm font-semibold"} whitespace-nowrap`}
              >
                Cart & Receipts
              </span>
              <motion.span
                key={orderList.length}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                className={`px-2 py-0.5 rounded-full ${!hasOrders ? "bg-primary text-on-primary font-bold" : "bg-surface text-on-surface font-extrabold"} font-label-caps text-[10px] `}
                id="tray-count-badge"
              >
                {orderList.length}
              </motion.span>
            </motion.button>
          </div>
        </div>

        {/* Category Filter Horizontal Scroll Pills */}
        <div
          className="w-full overflow-x-auto pb-2 -mb-2 flex items-center gap-2 sm:gap-space-xs no-scrollbar touch-pan-x"
          id="category-pills"
        >
          {categories.map((category, i) => {
            return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.95 }}
                className={
                  category.toLowerCase() == categoryState
                    ? "category-btn active-pill px-3 py-1.5 sm:px-4 sm:py-2 rounded font-label-caps text-[11px] sm:text-label-caps uppercase whitespace-nowrap bg-primary-container text-on-primary shadow-sm transition-all shrink-0 cursor-pointer"
                    : "category-btn px-3 py-1.5 sm:px-4 sm:py-2 rounded font-label-caps text-[11px] sm:text-label-caps uppercase whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all shrink-0 cursor-pointer"
                }
                onClick={() => {
                  handleCategoryFilter(category.toLowerCase());
                }}
                data-category="all"
                type="button"
              >
                {category}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
