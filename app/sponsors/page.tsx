import type {Metadata} from "next";
import {SponsorDirectory} from "@/components/sponsors/SponsorDirectory";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {Container} from "@/components/ui/Container";
import {PageHero} from "@/components/ui/PageHero";
import {getActiveSponsors} from "@/sanity/lib/sponsors";

export const metadata: Metadata = {
  title: "Sponsors",
  description: "Meet the organisations supporting Kiray Putjung and our work with community.",
};

export const dynamic = "force-dynamic";

export default async function SponsorsPage() {
  const sponsors = await getActiveSponsors();

  return (
    <>
      <PageHero
        eyebrow="Sponsors and partners"
        title="Working together for community"
        description="We acknowledge the organisations whose support helps Kiray Putjung strengthen culture, connection and opportunity across our community."
      />

      <section className="bg-background py-16 sm:py-20">
        <Container>
          {sponsors.length > 0 ? (
            <SponsorDirectory sponsors={sponsors} />
          ) : (
            <div className="rounded-[2rem] border border-border bg-surface p-8 text-center shadow-[0_16px_45px_rgba(69,47,31,0.06)] sm:p-12">
              <div className="mx-auto grid size-20 place-items-center rounded-full border-4 border-dotted border-ochre text-2xl font-black text-accent" aria-hidden="true">
                K
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-textPrimary">
                Our sponsor directory is being prepared
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-7 text-textSecondary">
                Kiray Putjung appreciates every organisation and community partner who contributes to our work. Their acknowledgements will appear here soon.
              </p>
            </div>
          )}
        </Container>
      </section>

      <section className="bg-primary-button py-14 text-textLight sm:py-16">
        <Container className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ochre-light">
              Partner with Kiray
            </p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Help create lasting community impact
            </h2>
            <p className="mt-4 leading-7 text-teal-50">
              Contact our team to talk about sponsorship, partnership and support opportunities.
            </p>
          </div>
          <ButtonLink href="/contact" variant="light">Contact Kiray</ButtonLink>
        </Container>
      </section>
    </>
  );
}
