interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex max-w-3xl flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <p className={`text-xs font-extrabold uppercase tracking-[0.2em] ${inverse ? "text-ochre-light" : "text-accent"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-balance text-3xl font-extrabold leading-tight sm:text-4xl ${inverse ? "text-textLight" : "text-textPrimary"}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-pretty text-base leading-7 sm:text-lg ${inverse ? "text-teal-50" : "text-textSecondary"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
