import { CalendarDays, Clock3, MapPin, Quote, ArrowDown } from "lucide-react";

import Button from "../../Components/ui/Button";
import FoodCard from "../../Components/ui/FoodCard";
import Footer from "../../Components/ui/Footer";
import Navbar from "../../Components/ui/Navbar";
import SectionHeading from "../../Components/ui/SectionHeading";
import Stat from "../../Components/ui/Stat";
import { useNavigate } from "react-router-dom";
import HeroPhoto from "../../assets/images/HeroPhoto.png";

import "./LandingPage.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMenuDispatch, useMenuState } from "../../Contexts/AppContext";
import { DishCardSkeleton } from "../../Components/ui/DishSkeleton";

export default function LandingPage() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const { menu, loadingMenu } = useMenuState();
  const { getMenuData } = useMenuDispatch();
  useEffect(() => {
    if (hash) {
      // Remove the '#' to get the target ID
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);
  useEffect(() => {
    getMenuData();
  }, []);

  return (
    <div className="landing-page min-h-screen overflow-x-hidden bg-background text-on-background">
      <Navbar />

      <main>
        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden border-b border-outline-variant/25">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-20">
            {/* HERO CONTENT */}
            <div className="relative z-10">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                Fine dining · seasonal craft
              </p>

              <h1 className="max-w-xl font-serif text-5xl leading-[0.95] text-on-surface sm:text-6xl lg:text-7xl">
                Elevate Your Palate with{" "}
                <span className="italic text-primary">Artisanal</span>{" "}
                Gastronomy
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-on-surface-variant">
                Discover a dining experience where seasonal ingredients, elegant
                technique, and intimate hospitality come together on every
                plate.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  onClick={() =>
                    document
                      .getElementById("menu")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore the menu
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate("/Authentication/Login")}
                >
                  Order Now
                </Button>
              </div>

              <div className="mt-10 grid max-w-md grid-cols-3 gap-5">
                <Stat value="12+" label="Years of craft" />

                <Stat value="4.9/5" label="Guest rating" />

                <Stat value="38" label="Seasonal dishes" />
              </div>
            </div>

            {/* HERO IMAGE */}
            <div className="relative">
              <div className="absolute -inset-5 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-md border border-outline-variant/40 bg-surface-container">
                <img
                  src={HeroPhoto}
                  alt="Signature dish served at Hungry Spot"
                  className="aspect-[1.2/1] w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/95 via-black/50 to-transparent px-5 pb-5 pt-24">
                  <div>
                    <p className="font-serif text-lg text-white">
                      Chef's signature
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-widest text-primary">
                      A study in seasonal flavor
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-primary">
                    $42
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden pb-6 text-center lg:block">
            <ArrowDown
              size={16}
              className="mx-auto animate-bounce text-primary/70"
            />
          </div>
        </section>

        {/* =====================================================
            RESERVATION
        ====================================================== */}
        <section
          id="reservation"
          className="border-b border-outline-variant/25 bg-surface-container-low px-5 py-8 lg:px-10"
        >
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.1fr_1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-primary">
                Reservations
              </p>

              <h2 className="mt-2 font-serif text-2xl text-on-surface">
                Reserve Your Table
              </h2>

              <p className="mt-1 text-xs text-on-surface-variant">
                Your evening begins the moment you arrive.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                className="flex items-center gap-2 border border-outline-variant/40 bg-surface px-3 py-3 text-xs text-on-surface-variant transition hover:border-primary"
              >
                <CalendarDays size={14} className="shrink-0 text-primary" />
                <span>Date</span>
              </button>

              <button
                type="button"
                className="flex items-center gap-2 border border-outline-variant/40 bg-surface px-3 py-3 text-xs text-on-surface-variant transition hover:border-primary"
              >
                <Clock3 size={14} className="shrink-0 text-primary" />
                <span>Time</span>
              </button>

              <button
                type="button"
                className="flex items-center gap-2 border border-outline-variant/40 bg-surface px-3 py-3 text-xs text-on-surface-variant transition hover:border-primary"
              >
                <MapPin size={14} className="shrink-0 text-primary" />
                <span>Guests</span>
              </button>
            </div>

            <Button className="w-full">Check availability</Button>
          </div>
        </section>

        {/* =====================================================
            MENU
        ====================================================== */}
        <section
          id="menu"
          className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28"
        >
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Curated menu"
              title="The Autumn Tasting Collection"
              description="A rotating selection inspired by the market, refined by our kitchen, and designed to be enjoyed slowly."
            />

            <Button
              variant="outline"
              onClick={() => navigate("/Authentication/Login")}
              className="self-start md:self-auto"
            >
              View full menu
            </Button>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {loadingMenu
              ? Array.from({ length: 6 }).map(() => {
                  return <DishCardSkeleton />;
                })
              : menu.map((dish, i) => {
                  return i <= 5 ? <FoodCard key={dish.id} dish={dish} /> : "";
                })}
          </div>
        </section>

        {/* =====================================================
            ABOUT
        ====================================================== */}
        <section
          id="about"
          className="border-y border-outline-variant/25 bg-surface-container-lowest"
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-28">
            {/* IMAGE COLLAGE */}
            <div className="grid grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80"
                alt="Chef preparing food"
                className="mt-12 h-[360px] w-full rounded-md object-cover"
              />

              <img
                src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80"
                alt="Artisan plated dish"
                className="h-[360px] w-full rounded-md object-cover"
              />
            </div>

            {/* STORY */}
            <div className="flex flex-col justify-center">
              <SectionHeading
                eyebrow="The Atelier Ethos"
                title="Where ingredients become stories."
                description="We believe memorable food starts with respect: respect for the ingredient, the season, the producer, and the person sitting across the table."
              />

              <blockquote className="mt-8 border-l border-primary pl-5">
                <Quote size={20} className="mb-3 text-primary" />

                <p className="font-serif text-lg italic leading-8 text-on-surface">
                  “The finest luxury is not excess. It is intention.”
                </p>

                <footer className="mt-3 text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                  — Executive Chef, Hungry Spot
                </footer>
              </blockquote>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Button>Discover our story</Button>

                <span className="text-xs text-on-surface-variant">
                  Farm-to-table · Small batch · Made daily
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            DELIVERY / CONTACT
        ====================================================== */}
        <section id="contact" className="px-5 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-md border border-outline-variant/40 bg-surface-container-low p-8 md:flex-row md:items-center lg:p-12">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
                At your table
              </p>

              <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight text-on-surface sm:text-4xl">
                Seamless Gastronomic Delivery
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-on-surface-variant">
                Bring the Hungry Spot experience home with carefully packed
                signatures, prepared fresh and delivered with the same care.
              </p>
            </div>

            <Button onClick={() => navigate("/Authentication/Login")}>
              Order from us
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
