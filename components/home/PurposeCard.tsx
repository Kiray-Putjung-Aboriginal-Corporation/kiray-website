interface PurposeCardProps {
  marker: string;
  title: string;
  description: string;
  tone: "teal" | "rust" | "blue" | "ochre";
}

export function PurposeCard({marker, title, description, tone}: PurposeCardProps) {
  return (
    <article className="purpose-card">
      <div className={`purpose-card__marker purpose-card__marker--${tone}`} aria-hidden="true">{marker}</div>
      <h3 className={`purpose-card__title purpose-card__title--${tone}`}>{title}</h3>
      <p className="mt-3 text-sm leading-6 text-textSecondary">{description}</p>
    </article>
  );
}
