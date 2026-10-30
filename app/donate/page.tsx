import type {Metadata} from "next";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {Container} from "@/components/ui/Container";
import {PageHero} from "@/components/ui/PageHero";

export const metadata: Metadata = {title: "Donate"};

const donationLinks = [
  {label: "$10", href: process.env.NEXT_PUBLIC_STRIPE_DONATE_10 ?? "#"},
  {label: "$25", href: process.env.NEXT_PUBLIC_STRIPE_DONATE_25 ?? "#"},
  {label: "$50", href: process.env.NEXT_PUBLIC_STRIPE_DONATE_50 ?? "#"},
  {label: "$100", href: process.env.NEXT_PUBLIC_STRIPE_DONATE_100 ?? "#"},
  {label: "Custom amount", href: process.env.NEXT_PUBLIC_STRIPE_DONATE_CUSTOM ?? "#"},
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Support Kiray Putjung"
        description="Your donation helps support cultural programs, community events and opportunities for community."
      />
      <section className="bg-background py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-border bg-surface p-8 shadow-[0_20px_60px_rgba(69,47,31,0.08)] sm:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-accent">One-time donation</p>
            <h2 className="mt-3 text-3xl font-extrabold text-textPrimary">Choose an amount</h2>
            <p className="mt-3 text-textSecondary">The secure payment page will open in a new tab.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {donationLinks.map((option) => (
                <ButtonLink key={option.label} href={option.href} external variant={option.label === "Custom amount" ? "secondary" : "primary"} className="w-full">
                  {option.label}
                </ButtonLink>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] bg-primary-button p-8 text-textLight sm:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ochre-light">Tax deductible</p>
            <h2 className="mt-4 text-2xl font-extrabold">Donation information</h2>
            <ul className="mt-6 space-y-4 leading-7 text-teal-50">
              <li>Kiray Putjung Aboriginal Corporation is endorsed as a Deductible Gift Recipient.</li>
              <li>Donations of $2 or more are tax deductible in Australia.</li>
              <li>No goods or services are provided in exchange for donations.</li>
              <li>A donation receipt will be issued by email.</li>
            </ul>
          </aside>
        </Container>
      </section>
    </>
  );
}
