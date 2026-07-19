import Link from "next/link";
import type {ReactNode} from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "light";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary-button text-textLight hover:bg-primary-button-hover focus-visible:outline-primary-button",
  secondary: "bg-accent text-textLight hover:bg-accent-hover focus-visible:outline-accent",
  outline: "border-2 border-primary-button text-primary-button hover:bg-primary-button hover:text-textLight focus-visible:outline-primary-button",
  light: "bg-surface text-primary-button hover:bg-surface-muted focus-visible:outline-surface",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonLinkProps) {
  const styles = `inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-3 focus-visible:outline-offset-3 ${variantStyles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
        {children}
      </a>
    );
  }

  return <Link href={href} className={styles}>{children}</Link>;
}
