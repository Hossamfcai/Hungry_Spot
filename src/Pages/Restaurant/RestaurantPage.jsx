import { Star, Search, X, UtensilsCrossed, ChefHat } from "lucide-react";
import Navbar from "../../Components/ui/Navbar";
import Footer from "../../Components/ui/Footer";
import FoodCard from "../../Components/ui/FoodCard";
export default function ResturantPage() {
  const dishes = [
    {
      category: "Signature",
      title: "Crisp Garden Tart",
      description:
        "Seasonal vegetables, whipped chèvre, herbs and a delicate citrus glaze.",
      price: "$18",
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80",
    },
    {
      category: "Chef's Pick",
      title: "Truffle Gnocchi",
      description:
        "Hand-rolled potato gnocchi with wild mushroom, parmesan and black truffle.",
      price: "$28",
      image:
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=80",
    },
    {
      category: "Main",
      title: "Herb-Roasted Tenderloin",
      description:
        "Prime beef, roasted roots, charred shallot and our house jus.",
      price: "$42",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    },
    {
      category: "Sea",
      title: "Citrus Seared Scallops",
      description:
        "Day-boat scallops, cauliflower silk, fennel and preserved lemon.",
      price: "$34",
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80",
    },
    {
      category: "Dessert",
      title: "Golden Pear Pavlova",
      description:
        "Crisp meringue, vanilla cream, poached pear and toasted hazelnut.",
      price: "$15",
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=80",
    },
    {
      category: "Sweet",
      title: "Chocolate & Salt",
      description:
        "Dark chocolate crémeux, cacao nib, sea salt caramel and malt crumble.",
      price: "$16",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80",
    },
  ];
  return (
    <div>
      <Navbar />
      <main className="w-full bg-background min-h-screen">
        <div className="flex flex-col w-full">
          {/* Hero Section */}
          <section className="relative w-full -mt-16 md:-mt-20 overflow-hidden bg-surface-container-lowest">
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
                    placeholder="Search dishes, ingredients (e.g., Truffle, Wagyu, Caviar)..."
                    type="text"
                  />
                  <button
                    className="hidden absolute inset-y-0 right-0 pr-3 sm:pr-space-md flex items-center text-on-surface-variant hover:text-primary transition-colors"
                    id="clear-search-btn"
                    title="Clear search"
                    type="button"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 sm:gap-space-sm self-end sm:self-auto w-full sm:w-auto">
                  <button
                    className="flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2 px-4 py-2.5 sm:py-3 rounded bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface"
                    id="order-drawer-toggle"
                    type="button"
                  >
                    <ChefHat className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0" />
                    <span className="font-label-caps text-xs sm:text-label-caps uppercase text-on-surface whitespace-nowrap">
                      Curated Tray
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-caps text-[10px] font-bold"
                      id="tray-count-badge"
                    >
                      0
                    </span>
                  </button>
                </div>
              </div>

              {/* Category Filter Horizontal Scroll Pills */}
              <div
                className="w-full overflow-x-auto pb-2 -mb-2 flex items-center gap-2 sm:gap-space-xs no-scrollbar touch-pan-x"
                id="category-pills"
              >
                <button
                  className="category-btn active-pill px-3 py-1.5 sm:px-4 sm:py-2 rounded font-label-caps text-[11px] sm:text-label-caps uppercase whitespace-nowrap bg-primary text-on-primary shadow-sm transition-all shrink-0"
                  data-category="all"
                  type="button"
                >
                  All Courses (10)
                </button>
                <button
                  className="category-btn px-3 py-1.5 sm:px-4 sm:py-2 rounded font-label-caps text-[11px] sm:text-label-caps uppercase whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all shrink-0"
                  data-category="tasting"
                  type="button"
                >
                  Chef's Tasting Specials (2)
                </button>
                <button
                  className="category-btn px-3 py-1.5 sm:px-4 sm:py-2 rounded font-label-caps text-[11px] sm:text-label-caps uppercase whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all shrink-0"
                  data-category="starters"
                  type="button"
                >
                  Starters &amp; Crudo (2)
                </button>
                <button
                  className="category-btn px-3 py-1.5 sm:px-4 sm:py-2 rounded font-label-caps text-[11px] sm:text-label-caps uppercase whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all shrink-0"
                  data-category="fish"
                  type="button"
                >
                  Fish &amp; Seafood (2)
                </button>
                <button
                  className="category-btn px-3 py-1.5 sm:px-4 sm:py-2 rounded font-label-caps text-[11px] sm:text-label-caps uppercase whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all shrink-0"
                  data-category="meats"
                  type="button"
                >
                  Prime Meats &amp; Game (2)
                </button>
                <button
                  className="category-btn px-3 py-1.5 sm:px-4 sm:py-2 rounded font-label-caps text-[11px] sm:text-label-caps uppercase whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all shrink-0"
                  data-category="pastas"
                  type="button"
                >
                  Artisan Pastas (1)
                </button>
                <button
                  className="category-btn px-3 py-1.5 sm:px-4 sm:py-2 rounded font-label-caps text-[11px] sm:text-label-caps uppercase whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all shrink-0"
                  data-category="desserts"
                  type="button"
                >
                  Decadent Desserts (1)
                </button>
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
                Showing 10 of 10 Masterpieces
              </p>
            </div>
          </div>

          {/* Menu Items Responsive Grid */}
          <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-space-lg">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-space-lg"
              id="menu-grid"
            >
              {dishes.map((dish) => (
                <FoodCard key={dish.title} {...dish} />
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
      <Footer />
    </div>
  );
}
