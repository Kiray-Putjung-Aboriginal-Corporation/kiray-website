# Kiray Putjung website

The public website for Kiray Putjung Aboriginal Corporation. It uses Next.js, TypeScript and Tailwind CSS, with Sanity managing event content.

## Local website

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Run `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000).

The Sanity project ID and dataset name are public configuration. Never commit a Sanity token, Resend key or other secret.

## Event Studio

The event Studio is connected to:

- Project: `m98cm2h5`
- Dataset: `production`
- Timezone: `Australia/Sydney`

Run the Studio locally with:

```bash
npm run studio:dev
```

Deploy the Studio to a stable Sanity-hosted address with:

```bash
npm run studio:deploy
```

The first deployment asks the signed-in Sanity administrator to choose the Studio hostname.

## Publishing an event

1. Open the Sanity Studio and choose **Upcoming events** or **All events**.
2. Create an Event and complete the required title, summary, description, dates and location fields.
3. Generate the Website address from the event title.
4. Add alternative text to every image.
5. Leave **Show registration buttons** off until registration is ready.
6. Preview the entry, then publish it.

Events automatically move from Upcoming to Previous after their end time. A previous event can be updated with an event recap and gallery.

## Registration and reminders

The event schema supports multiple registration buttons, but the website only displays them when **Show registration buttons** is enabled.

Email and member SMS reminders are currently interface placeholders. The website does not collect subscriber information yet. Subscriber contact details will be stored separately from Sanity when reminders are implemented.

## Branch workflow

Feature branches are reviewed through pull requests into `dev`. After testing and approval, `dev` is merged into `main` for production.
