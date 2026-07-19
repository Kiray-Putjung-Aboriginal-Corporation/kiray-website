"use client";

import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {Container} from "@/components/ui/Container";

const navigationItems = [
  {label: "Home", href: "/"},
  {label: "Events", href: "/events"},
  {label: "About us", href: "/about"},
  {label: "Our services", href: "/our-services"},
  {label: "Sponsors", href: "/sponsors"},
  {label: "Contact", href: "/contact"},
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 shadow-[0_8px_30px_rgba(59,43,32,0.06)] backdrop-blur">
      <Container>
        <div className="flex min-h-24 items-center justify-between gap-5 lg:min-h-28">
          <Link href="/" aria-label="Kiray Putjung Aboriginal Corporation home" className="relative h-20 w-48 shrink-0 sm:w-56">
            <Image
              src="/images/logos/kiray/KirayLogoPlaceholder.png"
              alt="Kiray Putjung Aboriginal Corporation"
              fill
              sizes="(max-width: 640px) 192px, 224px"
              className="object-contain object-left"
              priority
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-4 lg:flex xl:gap-6">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`nav-link ${isActive ? "nav-link--active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <ButtonLink href="/donate" variant="secondary">Donate</ButtonLink>
          </div>

          <button
            type="button"
            className="inline-flex size-12 items-center justify-center rounded-full border-2 border-primary-button text-primary-button lg:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span aria-hidden="true" className="text-2xl leading-none">{isOpen ? "×" : "☰"}</span>
          </button>
        </div>

        {isOpen && (
          <nav aria-label="Mobile navigation" className="border-t border-border py-5 lg:hidden">
            <div className="flex flex-col gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 font-bold text-textPrimary transition hover:bg-background"
                >
                  {item.label}
                </Link>
              ))}
              <ButtonLink href="/donate" variant="secondary" className="mt-3 w-full">Donate</ButtonLink>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
