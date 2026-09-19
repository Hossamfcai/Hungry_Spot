export default function Stat({ value, label }) {
  return (
    <div className="border-l border-outline-variant/50 pl-4">
      <p className="font-serif text-xl text-primary">{value}</p>

      <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-on-surface-variant">
        {label}
      </p>
    </div>
  );
}
