import type {Metadata} from "next";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {Container} from "@/components/ui/Container";

export const metadata: Metadata = {title: "Thank you"};

export default function ThankYouPage() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-border bg-surface p-8 text-center shadow-[0_20px_60px_rgba(69,47,31,0.08)] sm:p-12">
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-primary-button text-3xl font-black text-textLight" aria-hidden="true">✓</div>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-accent">Donation received</p>
          <h1 className="mt-3 text-4xl font-black text-textPrimary sm:text-5xl">Thank you for your support</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-textSecondary">Your donation helps Kiray Putjung continue supporting community, culture and future generations. You should receive a donation receipt by email shortly.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/">Return home</ButtonLink>
            <ButtonLink href="/contact" variant="outline">Contact us</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
