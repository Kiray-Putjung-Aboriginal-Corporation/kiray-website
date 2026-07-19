interface ReminderSignupPanelProps {
  eventTitle: string;
}

export function ReminderSignupPanel({eventTitle}: ReminderSignupPanelProps) {
  return (
    <section className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-[0_16px_45px_rgba(69,47,31,0.06)] sm:p-8" aria-labelledby="event-reminders-heading">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-accent">Coming soon</p>
      <h2 id="event-reminders-heading" className="mt-2 text-2xl font-extrabold text-textPrimary">
        Get a reminder for {eventTitle}
      </h2>
      <p className="mt-3 leading-7 text-textSecondary">
        Email reminders will be available to everyone. Kiray members will also be able to choose text-message reminders after member accounts are introduced.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-background p-4">
          <p className="font-extrabold text-primary-button">Email reminder</p>
          <p className="mt-1 text-sm leading-6 text-textMuted">Available to community members and visitors.</p>
        </div>
        <div className="rounded-2xl bg-background p-4">
          <p className="font-extrabold text-accent">Member text reminder</p>
          <p className="mt-1 text-sm leading-6 text-textMuted">Planned for signed-in Kiray members.</p>
        </div>
      </div>

      <p className="mt-5 text-sm font-semibold text-textMuted">
        No email addresses or phone numbers are being collected yet.
      </p>
    </section>
  );
}
