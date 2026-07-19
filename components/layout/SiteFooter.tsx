import Image from "next/image";
import Link from "next/link";
import {Container} from "@/components/ui/Container";

const footerLinks = [
  {label: "About us", href: "/about"},
  {label: "Our services", href: "/our-services"},
  {label: "Events", href: "/events"},
  {label: "Sponsors", href: "/sponsors"},
  {label: "Contact", href: "/contact"},
  {label: "Donate", href: "/donate"},
];

export default function SiteFooter() {
  return (
    <footer className="border-t-8 border-accent bg-surface">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.3fr_0.7fr_1fr]">
        <div>
          <div className="relative h-24 w-64">
            <Image
              src="/images/logos/kiray/KirayLogoPlaceholder.png"
              alt="Kiray Putjung Aboriginal Corporation"
              fill
              sizes="256px"
              className="object-contain object-left"
            />
          </div>
          <p className="mt-4 max-w-sm font-bold italic text-primary-button">Strong Culture. Strong People. Strong Future.</p>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-primary-button">Quick links</h2>
          <ul className="mt-4 space-y-2">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link className="text-sm text-textSecondary underline-offset-4 hover:text-primary-button hover:underline" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-primary-button">Contact us</h2>
          <a href="mailto:contact@kiray.org" className="mt-4 inline-block font-semibold text-textSecondary underline-offset-4 hover:text-primary-button hover:underline">
            contact@kiray.org
          </a>
          <div className="mt-5 flex gap-3">
            <a className="social-link" href="https://www.facebook.com/KirayPutjungAboriginalCorporation93" target="_blank" rel="noopener noreferrer" aria-label="Kiray Putjung on Facebook">f</a>
            <a className="social-link" href="https://www.instagram.com/kirayputjung" target="_blank" rel="noopener noreferrer" aria-label="Kiray Putjung on Instagram">ig</a>
          </div>
        </div>
      </Container>

      <div className="bg-primary-button py-5 text-textLight">
        <Container className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kiray Putjung Aboriginal Corporation</p>
          <p>ABN 46 494 381 610</p>
        </Container>
      </div>
    </footer>
  );
}
