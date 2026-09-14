import { Trash2, Plus, Minus } from "lucide-react";

export default function OrderedDish({ dish, updateOrder }) {
  return (
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
          onClick={() => {
            updateOrder("minus", dish);
          }}
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
  );
}
