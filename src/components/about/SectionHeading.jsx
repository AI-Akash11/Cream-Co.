export default function SectionHeading({ eyebrow, title, align = "left" }) {
  const alignment =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      {eyebrow && (
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary">
        {title}
      </h2>
    </div>
  );
}

