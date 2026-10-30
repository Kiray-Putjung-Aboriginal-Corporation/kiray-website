import type {ButtonHTMLAttributes} from "react";
import {getButtonClasses, type ButtonVariant} from "@/components/ui/buttonStyles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({variant = "primary", className = "", ...props}: ButtonProps) {
  return <button className={getButtonClasses(variant, className)} {...props} />;
}
