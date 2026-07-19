import Link from "next/link";
import type {ReactNode} from "react";
import {getButtonClasses, type ButtonVariant} from "@/components/ui/buttonStyles";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonLinkProps) {
  const styles = getButtonClasses(variant, className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
        {children}
      </a>
    );
  }

  return <Link href={href} className={styles}>{children}</Link>;
}
