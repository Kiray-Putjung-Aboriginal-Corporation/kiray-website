import {ButtonLink} from "@/components/ui/ButtonLink";
import {Container} from "@/components/ui/Container";

export default function EventNotFound() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-border bg-surface p-8 text-center shadow-[0_20px_60px_rgba(69,47,31,0.08)] sm:p-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-accent">Event unavailable</p>
          <h1 className="mt-3 text-4xl font-black text-textPrimary">We couldn’t find that event</h1>
          <p className="mt-4 leading-7 text-textSecondary">
            It may have been removed, renamed or not published yet.
          </p>
          <div className="mt-7">
            <ButtonLink href="/events">View all events</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
