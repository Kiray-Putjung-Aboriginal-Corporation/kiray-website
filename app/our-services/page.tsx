import type {Metadata} from "next";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {Container} from "@/components/ui/Container";
import {PageHero} from "@/components/ui/PageHero";
import {SectionHeading} from "@/components/ui/SectionHeading";

export const metadata: Metadata = {title: "Our services"};

const services = [
  {title: "Cultural programs", description: "Community-led activities that support cultural connection, knowledge sharing and identity."},
  {title: "Community events", description: "Opportunities for community to gather, participate, celebrate and strengthen connections."},
  {title: "Capacity building", description: "Supporting skills, confidence and pathways that help people and community organisations grow."},
  {title: "Community partnerships", description: "Working with community, services and supporters to create meaningful, sustainable outcomes."},
];

export default function ServicesPage() {
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
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <article key={service.title} className="rounded-[2rem] border border-border bg-surface p-8 shadow-[0_16px_45px_rgba(69,47,31,0.06)]">
                <span className="inline-grid size-12 place-items-center rounded-full bg-primary-button font-black text-textLight">{index + 1}</span>
                <h2 className="mt-6 text-2xl font-extrabold text-primary-button">{service.title}</h2>
                <p className="mt-3 leading-7 text-textSecondary">{service.description}</p>
              </article>
            ))}
          </div>
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
