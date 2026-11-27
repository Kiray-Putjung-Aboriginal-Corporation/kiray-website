import type {Metadata} from "next";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {Container} from "@/components/ui/Container";
import {PageHero} from "@/components/ui/PageHero";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getVisiblePrograms} from "@/sanity/lib/programs";

export const metadata: Metadata = {title: "Our services"};

export const revalidate = 60;

export default async function ServicesPage() {
  const programs = await getVisiblePrograms();

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Programs shaped by community"
        description="Our services and activities support culture, connection, participation and opportunity. Program details will continue to grow as new work is confirmed."
      />

      <section className="bg-background py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="How we help"
            title="Supporting strong communities"
            description="These areas reflect the focus of our work. Contact us if you would like to discuss a program, partnership or community need."
          />
          {programs && programs.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {programs.map((program, index) => (
                <article key={program._id} className="min-w-0 rounded-[2rem] border border-border bg-surface p-8 shadow-[0_16px_45px_rgba(69,47,31,0.06)]">
                  <span aria-hidden="true" className="inline-grid size-12 place-items-center rounded-full bg-primary-button font-black text-textLight">{index + 1}</span>
                  <h2 className="mt-6 break-words text-2xl font-extrabold text-primary-button">{program.name}</h2>
                  <p className="mt-3 whitespace-pre-line break-words leading-7 text-textSecondary">{program.description}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-10 rounded-[2rem] border border-border bg-surface p-8 leading-7 text-textSecondary">
              {programs === null
                ? "Program details are temporarily unavailable. Please try again later or contact us."
                : "There are no programs listed at the moment. Please contact us for information."}
            </p>
          )}
        </Container>
      </section>

      <section className="bg-primary-button py-16 text-textLight">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <SectionHeading
            eyebrow="Work with us"
            title="Have a community project or partnership in mind?"
            description="We welcome conversations about opportunities that align with community priorities and the purpose of Kiray Putjung."
            inverse
          />
          <ButtonLink href="/contact" variant="light" className="shrink-0">Start a conversation</ButtonLink>
        </Container>
      </section>
    </>
  );
}
