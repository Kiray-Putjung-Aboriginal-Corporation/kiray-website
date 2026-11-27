# Kiray Putjung website

The public website for Kiray Putjung Aboriginal Corporation. It uses Next.js, TypeScript and Tailwind CSS, with Sanity managing events, programs and sponsors.

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

### Event photos

In **After the event**, add photos to **Event gallery**, give each photo alternative text and an optional caption, then drag them into the desired order. The first photo opens by default on the website. The gallery displays whenever it contains published photos; the editor tab does not delay publication until the event ends.

Visitors can use Previous/Next, select a thumbnail or swipe across the photo. Photos keep their full proportions, including portrait images. Selecting the main photo opens a larger viewer; Close or Escape returns to the gallery. Arrow keys and Home/End work while a gallery control has focus. Photos never advance automatically. A single photo has no navigation controls, and an empty gallery is hidden.

When reviewing a gallery change, check a mix of portrait and landscape photos on mobile and desktop, photo order and captions, keyboard navigation, Escape and focus returning after closing the larger viewer. Also check an event with one photo and one with no photos.

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

## Programs

Open **Programs** in Sanity Studio to manage the cards on **Our services** (`/our-services`). The existing page layout and introductory wording are retained.

1. Choose **Create** and enter the **Program name** and plain-text **Description**.
2. Set **Display order** using spaced numbers such as 10, 20 and 30. Lower numbers appear first; equal numbers are sorted by name.
3. Keep **Show on website** on and publish when the content is approved. Saving a draft alone does not change the website.
4. To edit a program, change its details and publish the changes.
5. To remove a program from the list, turn **Show on website** off and **publish**. The record stays in Studio.
6. To restore a program, turn the switch on and publish again. Unpublished documents also stay off the website. Permanent deletion is not needed for routine removal.

The website reads published, visible programs only. It caches the list for 60 seconds and refreshes it as visitors request the page. After publishing, allow a minute, then reload; the first request after the cache expires may still show the previous version while it refreshes. No website deployment is needed for routine content changes. If every program is hidden, the page shows an empty-list message; it does not restore the old hard-coded cards. A failed Sanity request has a separate temporary-unavailability message.

### First-time rollout

Complete this sequence before promoting the website change to production:

1. Build and deploy the updated Studio using the existing Sanity administrator account. This adds the **Programs** editor; it does not publish program content.
2. Confirm the intended project and dataset in `sanity.cli.ts` and its environment configuration. Preview and Production may use different datasets; verify both rather than assuming they match.
3. In a terminal already signed in with `npx sanity login`, preview the one-time import:

   ```bash
   npm run programs:seed -- --dry-run
   ```

4. After checking the target shown by the dry run, run `npm run programs:seed`. It copies the four original cards, unchanged, into **unpublished drafts**. Stable IDs and an existing-document check preserve both published records and existing drafts when rerun. This is an initial import only; do not use it to restore intentionally deleted records.
5. Review and publish the four programs in Studio. The public read client never needs a write token; do not copy a Sanity login token into the website environment.
6. In the website preview, verify the four cards and their order. Test adding a program, publishing an edit, hiding it and restoring it. Use a separate test dataset where available; changes to the shared production dataset can affect any site using it.
7. Check the empty list and temporary-error displays, long text, mobile and desktop widths, keyboard navigation and contrast. Only then review the feature PR into `dev` and the separately approved production release.

## Registration and reminders

The event schema supports multiple registration buttons, but the website only displays them when **Show registration buttons** is enabled.

Email and member SMS reminders are currently interface placeholders. The website does not collect subscriber information yet. Subscriber contact details will be stored separately from Sanity when reminders are implemented.

## Branch workflow

Feature branches are reviewed through pull requests into `dev`. After testing and approval, `dev` is merged into `main` for production.
