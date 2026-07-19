import type {Metadata} from "next";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {Container} from "@/components/ui/Container";
import {PageHero} from "@/components/ui/PageHero";
import {SectionHeading} from "@/components/ui/SectionHeading";

export const metadata: Metadata = {title: "About us"};

const values = [
  {title: "Community", body: "We listen, work together and create space for community voices to guide our direction."},
  {title: "Culture", body: "We recognise culture as a source of strength, identity, belonging and connection."},
  {title: "Opportunity", body: "We support pathways that help people participate, learn, connect and grow."},
  {title: "Future generations", body: "We work to build strong foundations that can be carried forward by future generations."},
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Kiray Putjung"
        title="Community, culture and connection"
        description="Kiray Putjung Aboriginal Corporation works with community to strengthen culture, build connections and create opportunities."
      />

      <section className="bg-background py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Who we are"
            title="Working alongside our community"
            description="Our work is grounded in community, shaped by culture and focused on building capacity and opportunity. As the organisation grows, this page will share more about our history, leadership and the people guiding our work."
          />
          <div className="rounded-[2rem] bg-primary-button p-8 text-textLight sm:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ochre-light">Acknowledgement of Country</p>
            <p className="mt-5 text-lg leading-8 text-teal-50">
              We acknowledge the Wonnarua people who are the Traditional Custodians of the lands on which we work and live, and pay our respects to Elders past and present. We extend that respect to all Aboriginal and Torres Strait Islander peoples.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="What guides us" title="Our values" align="center" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <article key={value.title} className="rounded-3xl border border-border bg-background p-6">
                <span className="text-sm font-black text-accent">0{index + 1}</span>
                <h2 className="mt-4 text-xl font-extrabold text-primary-button">{value.title}</h2>
                <p className="mt-3 text-sm leading-6 text-textSecondary">{value.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background py-16">
        <Container className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-border bg-surface p-8 sm:p-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-textPrimary">Want to know more?</h2>
            <p className="mt-2 text-textSecondary">Get in touch with the Kiray Putjung team.</p>
          </div>
          <ButtonLink href="/contact">Contact us</ButtonLink>
        </Container>
      </section>
    </>
  );
}
