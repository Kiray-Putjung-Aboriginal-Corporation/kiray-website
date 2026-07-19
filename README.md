# Kiray Putjung website

The public website for Kiray Putjung Aboriginal Corporation. It uses Next.js, TypeScript and Tailwind CSS, with Sanity managing events and sponsors.

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

## Sponsors

Sponsor records are reused across the public Sponsors page and individual event acknowledgements.

1. Create **Sponsor tiers** first, such as Principal Partner, Major Sponsor or Community Partner.
2. Set each tier's order using spaced numbers such as 10, 20 and 30. Lower numbers appear first.
3. Create each **Sponsor** once, adding its logo, alternative text, website link, tier and order within that tier.
4. Keep **Show on Sponsors page** enabled for current sponsors. Turning it off removes the sponsor from the directory without removing its acknowledgement from historical events.
5. In an Event, open **Sponsor acknowledgement** and turn on **Show sponsor acknowledgement** only when the section should appear.
6. Leave **Automatically use current sponsors** on to use the live Sponsors-page list and order.
7. For a fixed historical list or a different order, add sponsors to **Sponsor list and order override** and drag them into the desired order. The override list takes priority.
8. Optionally add an event-specific **Acknowledgement message** above the logos.

The order within a tier is controlled by the sponsor's numeric **Order within tier** value. This overrides alphabetical ordering; names are only used as a tie-breaker when two sponsors have the same number.

An event's manual sponsor list keeps its drag-and-drop order. Previous events should normally use this fixed list so their acknowledgements do not change when the current Sponsors page changes.

## Registration and reminders

The event schema supports multiple registration buttons, but the website only displays them when **Show registration buttons** is enabled.

Email and member SMS reminders are currently interface placeholders. The website does not collect subscriber information yet. Subscriber contact details will be stored separately from Sanity when reminders are implemented.

## Branch workflow

Feature branches are reviewed through pull requests into `dev`. After testing and approval, `dev` is merged into `main` for production.
