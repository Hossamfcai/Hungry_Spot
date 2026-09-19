import { UtensilsCrossed } from "lucide-react";
import Navbar from "../../Components/ui/Navbar";
import Footer from "../../Components/ui/Footer";
import FoodCard from "../../Components/ui/FoodCard";
import {
  useAuthDispatch,
  useMenuDispatch,
  useMenuState,
  useOrdersDispatch,
} from "../../Contexts/AppContext";
import { useEffect, useState } from "react";

import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/localStorageServices";
import Drawer from "../../Components/ui/Drawer";
import ListedOrderProvider from "../../Contexts/ListedOrdersContext";
import { DishCardSkeleton } from "../../Components/ui/DishSkeleton";
import ErrorState from "../../Components/ui/ErrorState";
import Filter from "../../Components/ui/Filters";
import ResturantHero from "../../Components/ui/ResturantHero";

export default function ResturantPage() {
  const { menu, loadingMenu, menuError, searchInMenu } = useMenuState();
  const { getMenuData, getSearchMenuData } = useMenuDispatch();
  const { getUserOrdersData } = useOrdersDispatch();
  const { getUserData } = useAuthDispatch();
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
  function openDrawer() {
    setIsDrawerOpen(true);
  }
  function handleSearch(searchValue) {
    setSearchQuery(searchValue);
  }
  function handleCategoryFilter(value) {
    setCategoryState(value);
  }

  // Aggregate duplicate items for display in the drawer

  useEffect(() => {
    getMenuData();
    getUserOrdersData();
    getUserData();
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
    <ListedOrderProvider value={{ orderList, setOrderList }}>
      <div>
        <Navbar />
        <main className="w-full bg-background min-h-screen">
          <div className="flex flex-col w-full">
            {/* Hero Section */}
            <ResturantHero />
            {/* Sticky Filters & Search Header */}
            <Filter
              handleSearch={handleSearch}
              searchQuery={searchQuery}
              openDrawer={openDrawer}
              categoryState={categoryState}
              handleCategoryFilter={handleCategoryFilter}
            />

            {/* Item counter */}
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
              <div className="flex flex-col gap-10">
                {searchQuery.length == 0 && categoryState == "all" ? (
                  categories.map((category) => {
                    return category !== "All" ? (
                      <div
                        className="flex flex-col gap-10"
                        id={category.toLowerCase()}
                      >
                        <h2 className="max-w-xl font-serif text-4xl leading-[0.95] sm:text-5xl lg:text-6xl  italic text-primary">
                          {category}
                        </h2>
                        <div
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-space-lg"
                          id="menu"
                        >
                          {!loadingMenu
                            ? menu.map((dish) => {
                                return dish.category.toLowerCase() ==
                                  category.toLowerCase() ? (
                                  <FoodCard
                                    key={dish.id}
                                    dish={dish}
                                    updateOrderList={updateOrder}
                                  />
                                ) : (
                                  ""
                                );
                              })
                            : Array.from({ length: 3 }).map(() => {
                                return <DishCardSkeleton />;
                              })}
                          {menuError.isError && (
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                              <ErrorState />
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      ""
                    );
                  })
                ) : (
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-space-lg"
                    id="menu"
                  >
                    {!loadingMenu
                      ? searchInMenu.map((dish) => {
                          return (
                            <FoodCard
                              key={dish.id}
                              dish={dish}
                              updateOrderList={updateOrder}
                            />
                          );
                        })
                      : Array.from({ length: 3 }).map(() => {
                          return <DishCardSkeleton />;
                        })}
                    {menuError.isError && (
                      <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                        <ErrorState />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Empty State Container */}
              <div
                className={`${!searchInMenu.length && searchQuery.length ? "block" : "hidden"} w-full py-8 sm:py-12 md:py-space-xl text-center flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-space-md bg-surface-container-low rounded p-6 sm:p-8 md:p-space-xl my-4 sm:my-6 md:my-space-lg`}
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
                  onClick={() => {
                    setSearchQuery("");
                  }}
                >
                  {`View All ${menu.length} Masterpieces`}
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
    </ListedOrderProvider>
  );
}
