export default function ThankYou() {
    return (
        <main className="min-h-screen bg-background px-6 text-textPrimary">
            <section className="mx-auto max-w-3xl text-center space-y-8">
                <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-textSecondary">
                        Donation received
                    </p>

                    <h1 className="text-4xl text-secondary-button font-bold sm:text-5xl">
                        Thank you for your support
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg text-textPrimary">
                        Thank you for supporting Kiray Putjung Aboriginal Corporation.
                        Your donation helps us continue our work supporting community,
                        culture, and future generations.
                    </p>
                </div>

                <div className="rounded-2xl border border-primary-button bg-white/5 p-6 text-left shadow-sm">
                    <h2 className="text-2xl text-center font-semibold text-textPrimary">
                        What happens next?
                    </h2>

                    <ul className="mt-4 space-y-3 text-textPrimary">
                        <li>
                            You should receive a donation receipt by email shortly.
                        </li>
                        <li>
                            If your donation was made on behalf of a business or organisation,
                            we may contact you about sponsor recognition.
                        </li>
                        <li>
                            You can return to the website to learn more about our programs,
                            events, and community work.
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <a
                        href="/"
                        className="rounded-full bg-primary-button px-6 py-3 font-semibold text-textLight transition hover:opacity-50"
                    >
                        Return Home
                    </a>

                    <a
                        href="/events"
                        className="rounded-full border border-primary-button px-6 py-3 font-semibold text-textPrimary transition hover:bg-secondary-button hover:text-textLight"
                    >
                        View Events
                    </a>

                    <a
                        href="/contact"
                        className="rounded-full border border-primary-button px-6 py-3 font-semibold text-textPrimary transition hover:bg-secondary-button hover:text-textLight"
                    >
                        Contact Us
                    </a>
                </div>
            </section>
        </main>
    );
}