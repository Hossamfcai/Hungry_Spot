export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}) {
  const alignment =
    align === "center"
      ? "mx-auto max-w-2xl text-center"
      : "max-w-2xl text-left";

  return (
    <div className={alignment}>
      {eyebrow && (
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
          {eyebrow}
        </p>
      )}

      <h2 className="font-serif text-3xl leading-tight text-on-surface sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-sm leading-7 text-on-surface-variant">
          {description}
        </p>
      )}
    </div>
  );
}
