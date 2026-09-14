import { Star, Search, UtensilsCrossed, ChefHat } from "lucide-react";
import Navbar from "../../Components/ui/Navbar";
import Footer from "../../Components/ui/Footer";
import FoodCard from "../../Components/ui/FoodCard";
import { useMenuDispatch, useMenuState } from "../../Contexts/AppContext";
import { useEffect, useState } from "react";
import heroPhoto from "../../assets/images/resturantHero.jpeg";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/localStorageServices";
import Drawer from "../../Components/ui/Drawer";

export default function ResturantPage() {
  const { menu, loadingMenu, menuError, searchInMenu } = useMenuState();
  const { getMenuData, getSearchMenuData } = useMenuDispatch();
  const [orderList, setOrderList] = useState([]);
  const [categoryState, setCategoryState] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const categories = ["All", ...new Set(menu.map((item) => item.category))];

  function updateOrder(calc, dish) {
    if (calc === "plus") {
      const updatedList = [...orderList, dish];
      setOrderList(updatedList);
      setLocalStorageItem("orders", updatedList);
    }

    if (calc === "minus") {
      const index = orderList.findIndex((item) => item.id === dish.id);
      if (index !== -1) {
        const updatedList = [...orderList];
        updatedList.splice(index, 1);
        setOrderList(updatedList);
        setLocalStorageItem("orders", updatedList);
      }
    }
  }
  function closeDrawer() {
    setIsDrawerOpen(false);
  }

  // Aggregate duplicate items for display in the drawer

  useEffect(() => {
    getMenuData();
  }, []);

  useEffect(() => {
    const orders = getLocalStorageItem("orders");
    if (orders !== null) {
      setOrderList([...orders]);
    }
  }, []);

  useEffect(() => {
    getSearchMenuData(
      searchQuery,
      categoryState === "all" ? "" : categoryState,
    );
  }, [searchQuery, categoryState]);

  return (
    <div>
      <Navbar />
      <main className="w-full bg-background min-h-screen">
        <div className="flex flex-col w-full">
          {/* Hero Section */}
          <section
            className="relative w-full -mt-16 md:-mt-20 overflow-hidden bg-surface-container-lowest  bg-cover bg-right bg-no-repeat "
            style={{ backgroundImage: `url(${heroPhoto})` }}
          >
            <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />

            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-44 md:pb-24 flex flex-col gap-4 sm:gap-6 md:gap-space-lg">
              {/* Michelin Star Badge */}
              <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-surface-container-high/90 text-primary shadow-xl backdrop-blur-md max-w-full">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary fill-secondary shrink-0" />
                <span className="font-label-caps text-[10px] sm:text-xs md:text-label-caps tracking-widest uppercase truncate">
                  Autumn Degustation &amp; À La Carte · 2 Michelin Stars
                </span>
              </div>

              {/* Headline & Description */}
              <div className="max-w-4xl flex flex-col gap-2 sm:gap-3 md:gap-space-sm">
                <h1 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight md:leading-[64px] text-on-surface tracking-tight">
                  The Atelier{" "}
                  <span className="text-primary italic font-serif block sm:inline">
                    Culinary Collection
                  </span>
                </h1>
                <p className="font-body-xl text-sm sm:text-base md:text-body-xl text-on-surface-variant max-w-2xl font-light leading-relaxed">
                  Each culinary creation honors the sacred tension between
                  classical French heritage technique and untamed seasonal
                  nature, choreographed daily from early morning market
                  harvests.
                </p>
              </div>
            </div>
          </section>

          {/* Sticky Filters & Search Header */}
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
                      setSearchQuery(() => {
                        return e.target.value;
                      });
                    }}
                  />
                </div>

                <div className="flex items-center gap-2 sm:gap-space-sm self-end sm:self-auto w-full sm:w-auto">
                  <button
                    disabled={orderList.length === 0}
                    onClick={() => setIsDrawerOpen(true)}
                    className={
                      orderList.length === 0
                        ? "flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2 px-4 py-2.5 sm:py-3 rounded bg-surface-containe transition-colors text-on-surface"
                        : "flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2 px-4 py-2.5 sm:py-3 rounded transition-all text-on-surface bg-primary-container hover:bg-secondary-container"
                    }
                    id="order-drawer-toggle"
                    type="button"
                  >
                    <ChefHat
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${orderList.length == 0 ? "text-secondary" : "text-on-surface"} shrink-0`}
                    />
                    <span
                      className={`font-label-caps  sm:text-label-caps uppercase ${orderList.length == 0 ? "text-on-surface text-xs" : "text-sm font-semibold"} whitespace-nowrap`}
                    >
                      Confirm
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full ${orderList.length === 0 ? "bg-primary text-on-primary font-bold" : "bg-surface text-on-surface font-extrabold"} font-label-caps text-[10px] `}
                      id="tray-count-badge"
                    >
                      {orderList.length}
                    </span>
                  </button>
                </div>
              </div>

              {/* Category Filter Horizontal Scroll Pills */}
              <div
                className="w-full overflow-x-auto pb-2 -mb-2 flex items-center gap-2 sm:gap-space-xs no-scrollbar touch-pan-x"
                id="category-pills"
              >
                {categories.map((category, i) => {
                  return (
                    <button
                      key={i}
                      className={
                        category.toLowerCase() == categoryState
                          ? "category-btn active-pill px-3 py-1.5 sm:px-4 sm:py-2 rounded font-label-caps text-[11px] sm:text-label-caps uppercase whitespace-nowrap bg-primary-container text-on-primary shadow-sm transition-all shrink-0"
                          : "category-btn px-3 py-1.5 sm:px-4 sm:py-2 rounded font-label-caps text-[11px] sm:text-label-caps uppercase whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all shrink-0"
                      }
                      onClick={() => {
                        setCategoryState(() => {
                          return category.toLowerCase();
                        });
                      }}
                      data-category="all"
                      type="button"
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Item Counter */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-space-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <p
                className="font-label-caps text-[11px] sm:text-xs md:text-label-caps text-on-surface-variant uppercase tracking-widest"
                id="items-count-label"
              >
                Showing {searchInMenu.length} of {menu.length} Masterpieces
              </p>
            </div>
          </div>

          {/* Menu Items Responsive Grid */}
          <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-space-lg">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-space-lg"
              id="menu-grid"
            >
              {searchInMenu.map((dish) => (
                <FoodCard
                  key={dish.id}
                  dish={dish}
                  updateOrderList={updateOrder}
                />
              ))}
            </div>

            {/* Empty State Container */}
            <div
              className="hidden w-full py-8 sm:py-12 md:py-space-xl text-center flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-space-md bg-surface-container-low rounded p-6 sm:p-8 md:p-space-xl my-4 sm:my-6 md:my-space-lg"
              id="no-results-state"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                <UtensilsCrossed className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="max-w-md space-y-1 sm:space-y-2">
                <h4 className="font-headline-sm text-base sm:text-lg md:text-headline-sm text-on-surface">
                  No Epicurean Masterpieces Match
                </h4>
                <p className="font-body-md text-xs sm:text-sm md:text-body-md text-on-surface-variant">
                  We could not find any courses matching your sensory criteria
                  or search keywords. Please reset your filters or request our
                  Head Sommelier's secret reserve.
                </p>
              </div>
              <button
                className="bg-primary text-on-primary font-label-md text-xs sm:text-sm px-4 py-2 sm:px-6 sm:py-2.5 rounded uppercase tracking-wider hover:bg-primary-fixed transition-colors"
                id="empty-reset-btn"
                type="button"
              >
                View All 10 Masterpieces
              </button>
            </div>
          </section>
        </div>
      </main>
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isDrawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Slide-over Drawer Panel */}
      <Drawer
        isDrawerOpen={isDrawerOpen}
        updateOrder={updateOrder}
        closeDrawer={closeDrawer}
      />
      <Footer />
    </div>
  );
}
