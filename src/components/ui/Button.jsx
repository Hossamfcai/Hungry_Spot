import { ArrowRight } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50";

  const variants = {
    primary:
      "bg-primary-container text-white hover:bg-secondary-container hover:-translate-y-0.5",

    outline:
      "border border-outline-variant bg-transparent text-on-surface hover:border-primary hover:text-primary",

    ghost:
      "text-on-surface-variant hover:text-primary",
  };

  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}

      {variant !== "ghost" && (
        <ArrowRight
          size={16}
          strokeWidth={1.8}
        />
      )}
    </button>
  );
}