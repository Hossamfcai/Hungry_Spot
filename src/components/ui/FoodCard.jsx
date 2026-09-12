import { ArrowUpRight } from "lucide-react";

export default function FoodCard({
  image,
  category,
  title,
  description,
  price,
}) {
  return (
    <article className="group overflow-hidden rounded-md border border-outline-variant/35 bg-surface-container-low transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">

      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden">

        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="absolute left-3 top-3 rounded-sm border border-white/10 bg-surface/85 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-primary backdrop-blur">
          {category}
        </span>

      </div>

      {/* CONTENT */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-4">

          <h3 className="font-serif text-xl leading-tight text-on-surface">
            {title}
          </h3>

          <span className="whitespace-nowrap text-sm font-semibold text-primary">
            {price}
          </span>

        </div>

        <p className="mt-2 line-clamp-2 text-xs leading-6 text-on-surface-variant">
          {description}
        </p>

        <button
          type="button"
          className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-on-surface transition-colors hover:text-primary"
        >
          Discover dish

          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>

      </div>

    </article>
  );
}