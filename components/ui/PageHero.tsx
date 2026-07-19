import {Container} from "@/components/ui/Container";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export function PageHero({eyebrow, title, description}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface py-16 sm:py-20">
      <div aria-hidden="true" className="dot-ring dot-ring-page" />
      <Container className="relative">
        <div className="max-w-3xl">
          {eyebrow && <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
          <h1 className="text-balance text-4xl font-black leading-tight text-textPrimary sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-textSecondary">{description}</p>
        </div>
      </Container>
    </section>
  );
}
