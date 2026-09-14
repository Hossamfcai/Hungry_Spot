export default function Receipt({ receipt }) {
  return (
    <div
      key={receipt.id}
      className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high/50 shadow-sm space-y-3"
    >
      {/* Items inside this Receipt */}
      <div className="space-y-2">
        {receipt.items.map((dish) => (
          <div
            key={dish.id}
            className="flex items-center gap-3 p-2 rounded-lg bg-surface-container/50"
          >
            {dish.image && (
              <img
                src={dish.image}
                alt={dish.name}
                className="w-12 h-12 rounded object-cover shrink-0"
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
            {/* Item Quantity Badge */}
            <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2 py-1 rounded">
              x{dish.quantity}
            </span>
          </div>
        ))}
      </div>

      {/* Receipt Summary Footer */}
      <div className="pt-3 border-t border-surface-container-high/40 flex items-center justify-between text-xs">
        <div className="flex flex-col gap-1">
          <span className="text-on-surface-variant">{receipt.createdAt}</span>
          <span className="font-semibold capitalize text-primary">
            Status: {receipt.status}
          </span>
        </div>
        <div className="text-right">
          <span className="text-on-surface-variant block">Total</span>
          <span className="text-base font-bold text-on-surface">
            ${receipt.total}
          </span>
        </div>
      </div>
    </div>
  );
}
