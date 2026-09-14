import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/localStorageServices";
export default function FoodCard({ dish, updateOrderList }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [count, setCount] = useState(0);
  function minusItem() {
    if (count <= 0) return;

    const newCount = count - 1;
    setCount(newCount);
    updateOrderList("minus", dish);

    if (newCount === 0) {
      removeLocalStorageItem(dish.name);
    } else {
      setLocalStorageItem(dish.name, newCount);
    }
  }

  function plusItem() {
    const newCount = count + 1;
    setCount(newCount);
    updateOrderList("plus", dish);
    setLocalStorageItem(dish.name, newCount);
  }

  useEffect(() => {
    const countsOfItem = getLocalStorageItem(dish.name);
    if (countsOfItem !== null) {
      setCount(countsOfItem);
    }
  }, [dish.name]);
  return (
    <article className="group overflow-hidden rounded-md border border-outline-variant/35 bg-surface-container-low transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="absolute left-3 top-3 rounded-sm border border-white/10 bg-surface/85 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-primary backdrop-blur">
          {dish.category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-xl leading-tight text-on-surface">
            {dish.name}
          </h3>

          <span className="whitespace-nowrap text-sm font-semibold text-primary">
            {dish.price}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-xs leading-6 text-on-surface-variant">
          {dish.description}
        </p>

        {!token && (
          <button
            type="button"
            onClick={() => [navigate("/Authentication/Login")]}
            className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-on-surface transition-colors hover:text-primary"
          >
            Discover dish
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        )}
        {token && (
          <div className="mt-5 flex items-center justify-between border-t border-outline-variant/20 pt-4">
            <div className="flex items-center gap-1 rounded-sm border border-outline-variant/40 bg-surface-container px-1 py-0.5">
              <button
                type="button"
                disabled={count === 0}
                onClick={() => {
                  minusItem();
                }}
                aria-label="Decrease quantity"
                className="flex h-7 w-7 items-center justify-center rounded-xs text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary active:scale-95"
              >
                <Minus size={14} />
              </button>

              <span className="min-w-[2rem] text-center text-xs font-semibold text-on-surface">
                {count}
              </span>

              <button
                type="button"
                onClick={() => {
                  plusItem();
                }}
                aria-label="Increase quantity"
                className="flex h-7 w-7 items-center justify-center rounded-xs text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary active:scale-95"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
