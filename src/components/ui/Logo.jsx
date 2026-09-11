export default function Logo() {
  return (
    <a
      href="/"
      className="group inline-flex items-center gap-3"
      aria-label="Hungry Spot home"
    >
      <span className="grid size-9 place-items-center rounded-full border border-primary/40 bg-primary/10 font-serif text-sm text-primary transition group-hover:border-primary">
        H
      </span>

      <span className="font-serif text-xl tracking-wide text-on-surface">
        Hungry<span className="text-primary">Spot</span>
      </span>
    </a>
  );
}