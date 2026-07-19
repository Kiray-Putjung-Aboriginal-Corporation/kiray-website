import Image from "next/image";
import {PurposeCard} from "@/components/home/PurposeCard";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {Container} from "@/components/ui/Container";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {WaveBand} from "@/components/ui/WaveBand";

const purposeItems = [
  {
    marker: "C",
    title: "Community",
    description: "Strengthening connections and creating space for community to come together.",
    tone: "teal" as const,
  },
  {
    marker: "C",
    title: "Culture",
    description: "Celebrating, preserving and sharing culture, knowledge and identity.",
    tone: "rust" as const,
  },
  {
    marker: "O",
    title: "Opportunity",
    description: "Creating pathways through learning, participation and capacity building.",
    tone: "blue" as const,
  },
  {
    marker: "S",
    title: "Sustainability",
    description: "Building strong foundations that support community now and into the future.",
    tone: "ochre" as const,
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-background pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-16">
        <Container className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-primary-button">Kiray Putjung Aboriginal Corporation</p>
            <h1 className="text-balance text-5xl font-black leading-[1.05] text-textPrimary sm:text-6xl lg:text-7xl">
              <span className="block">Strong Culture.</span>
              <span className="block">Strong People.</span>
              <span className="block text-accent">Strong Future.</span>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-textSecondary">
              Kiray Putjung Aboriginal Corporation is committed to empowering our community through culture, connection, capacity building and opportunity.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/about">Learn more about us</ButtonLink>
              <ButtonLink href="/events" variant="outline">View events</ButtonLink>
            </div>
          </div>

          <div className="hero-art">
            <Image
              src="/images/logos/kiray/KirayLogoNoTextPlaceholder.png"
              alt="Kiray Putjung artwork"
              width={560}
              height={560}
              priority
              className="relative z-10 h-auto w-[min(31rem,78vw)] object-contain drop-shadow-[0_18px_28px_rgba(58,36,22,0.18)]"
            />
          </div>
        </Container>
      </section>

      <WaveBand />

      <section className="bg-surface py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_2.25fr] lg:gap-6">
            <SectionHeading
              eyebrow="Our purpose"
              title="Working together for a stronger future"
              description="We work alongside community to strengthen culture, create opportunities and build lasting connections for future generations."
            />
            <div className="grid overflow-hidden rounded-3xl border border-border bg-background md:grid-cols-2 xl:grid-cols-4">
              {purposeItems.map((item) => <PurposeCard key={item.title} {...item} />)}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-primary-button py-16 sm:py-20">
        <div aria-hidden="true" className="dot-ring -left-16 top-10 size-72 opacity-40" />
        <Container className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <SectionHeading
              eyebrow="On Wonnarua Country"
              title="We acknowledge"
              description="We acknowledge the Wonnarua people who are the Traditional Custodians of the lands on which we work and live, and pay our respects to Elders past and present. We extend that respect to all Aboriginal and Torres Strait Islander peoples."
              inverse
            />
            <div className="mt-8">
              <ButtonLink href="/about" variant="light">Our story</ButtonLink>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/20 bg-white/10 p-8 text-textLight shadow-xl backdrop-blur-sm">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ochre-light">Community led</p>
            <p className="mt-4 text-2xl font-extrabold leading-snug">Culture, connection and opportunity remain at the heart of everything we do.</p>
          </div>
        </Container>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <Container className="flex flex-col items-start justify-between gap-8 rounded-[2rem] border border-border bg-surface p-8 shadow-[0_20px_60px_rgba(69,47,31,0.08)] sm:p-12 lg:flex-row lg:items-center">
          <SectionHeading
            eyebrow="Support our work"
            title="Help create opportunities for community"
            description="Donations support cultural programs, community events and the work we do with community. Donations of $2 or more are tax deductible in Australia."
          />
          <ButtonLink href="/donate" variant="secondary" className="shrink-0">Donate to Kiray</ButtonLink>
        </Container>
      </section>
    </>
  );
}
