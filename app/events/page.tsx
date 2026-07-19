import type {Metadata} from "next";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {Container} from "@/components/ui/Container";
import {PageHero} from "@/components/ui/PageHero";

export const metadata: Metadata = {title: "Events"};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Come together with community"
        description="Find upcoming Kiray Putjung activities, cultural programs and community events in one place."
      />
      <section className="bg-background py-16 sm:py-20">
        <Container>
          <div className="rounded-[2rem] border border-border bg-surface p-8 text-center shadow-[0_16px_45px_rgba(69,47,31,0.06)] sm:p-12">
            <div className="mx-auto grid size-20 place-items-center rounded-full border-4 border-dotted border-ochre text-2xl font-black text-accent" aria-hidden="true">K</div>
            <h2 className="mt-6 text-3xl font-extrabold text-textPrimary">New events will appear here soon</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-textSecondary">
              We are preparing the event system so the Kiray Putjung team can publish and update events. Email and SMS reminder options will be added in a later stage.
            </p>
            <div className="mt-7">
              <ButtonLink href="/contact" variant="outline">Ask about upcoming events</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
