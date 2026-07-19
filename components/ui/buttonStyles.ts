export type ButtonVariant = "primary" | "secondary" | "outline" | "light";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary-button text-textLight hover:bg-primary-button-hover focus-visible:outline-primary-button",
  secondary: "bg-accent text-textLight hover:bg-accent-hover focus-visible:outline-accent",
  outline: "border-2 border-primary-button text-primary-button hover:bg-primary-button hover:text-textLight focus-visible:outline-primary-button",
  light: "bg-surface text-primary-button hover:bg-surface-muted focus-visible:outline-surface",
};

export function getButtonClasses(variant: ButtonVariant = "primary", className = "") {
  return [
    "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-3 focus-visible:outline-offset-3 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0",
    variantStyles[variant],
    className,
  ].filter(Boolean).join(" ");
}
