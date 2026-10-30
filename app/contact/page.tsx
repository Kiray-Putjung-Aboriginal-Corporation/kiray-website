"use client";

import {useState} from "react";
import {Container} from "@/components/ui/Container";
import {PageHero} from "@/components/ui/PageHero";

const fieldStyles = "mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-4 py-3 text-textPrimary outline-none transition placeholder:text-textMuted focus:border-primary-button focus:ring-3 focus:ring-primary-button/15";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [wasSuccessful, setWasSuccessful] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    setIsSubmitting(true);
    setStatusMessage(null);
    setWasSuccessful(false);

    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setStatusMessage("Sorry, something went wrong. Please check your details and try again.");
        return;
      }

      setWasSuccessful(true);
      setStatusMessage("Thank you. Your message has been sent.");
      form.reset();
    } catch {
      setStatusMessage("Sorry, something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        description="Send the Kiray Putjung team a message about programs, events, partnerships, donations or general enquiries."
      />

      <section className="bg-background py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <aside className="rounded-[2rem] bg-primary-button p-8 text-textLight sm:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ochre-light">Contact Kiray Putjung</p>
            <h2 className="mt-4 text-3xl font-extrabold">We would like to hear from you</h2>
            <p className="mt-4 leading-7 text-teal-50">Complete the form and a member of the team will respond when they can.</p>
            <div className="mt-8 border-t border-white/20 pt-6">
              <p className="text-sm font-bold uppercase tracking-wider text-ochre-light">Email</p>
              <a href="mailto:contact@kiray.org" className="mt-2 inline-block text-lg font-semibold underline underline-offset-4">contact@kiray.org</a>
            </div>
          </aside>

          <form onSubmit={onSubmit} className="rounded-[2rem] border border-border bg-surface p-6 shadow-[0_20px_60px_rgba(69,47,31,0.08)] sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="font-bold text-textPrimary">
                Name
                <input className={fieldStyles} required autoComplete="name" name="name" placeholder="Your name" maxLength={100} />
              </label>
              <label className="font-bold text-textPrimary">
                Email
                <input className={fieldStyles} required autoComplete="email" name="email" type="email" placeholder="you@example.com" maxLength={254} />
              </label>
            </div>

            <label className="mt-6 block font-bold text-textPrimary">
              Subject
              <input className={fieldStyles} required name="subject" placeholder="How can we help?" maxLength={150} />
            </label>

            <label className="mt-6 block font-bold text-textPrimary">
              Message
              <textarea className={`${fieldStyles} min-h-40 resize-y`} required name="message" placeholder="Write your message" maxLength={5000} />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-primary-button px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-textLight shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-button-hover hover:shadow-md focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-primary-button disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting ? "Sending…" : "Send message"}
            </button>

            <div aria-live="polite">
              {statusMessage && (
                <p className={`mt-5 rounded-xl px-4 py-3 font-semibold ${wasSuccessful ? "bg-primary-button/10 text-primary-button" : "bg-accent/10 text-accent"}`}>
                  {statusMessage}
                </p>
              )}
            </div>
          </form>
        </Container>
      </section>
    </>
  );
}
