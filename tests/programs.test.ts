import assert from "node:assert/strict";
import {test} from "node:test";
import {evaluate, parse} from "groq-js";
import {renderToStaticMarkup} from "react-dom/server";
import ServicesPage from "../app/our-services/page";
import {sanityClient} from "../sanity/lib/client";
import {getVisiblePrograms} from "../sanity/lib/programs";
import {visibleProgramsQuery} from "../sanity/lib/queries";
import {initialPrograms} from "../sanity/seed/programs";

const query = parse(visibleProgramsQuery);

async function queryPrograms(dataset: unknown[]) {
  return (await evaluate(query, {dataset})).get();
}

test("only published, explicitly visible programs reach the public list", async () => {
  const program = initialPrograms[0];
  const results = await queryPrograms([
    program,
    {...program, _id: "hidden", showOnWebsite: false},
    {...program, _id: "missing-visibility", showOnWebsite: undefined},
    {...program, _id: `drafts.${program._id}`, name: "Unapproved edit"},
    {...program, _id: `versions.release.${program._id}`, name: "Future release"},
    {...program, _id: "other-type", _type: "event"},
    {...program, _id: "missing-name", name: undefined},
    {...program, _id: "missing-description", description: null},
  ]);
  assert.deepEqual(results.map((item: {_id: string}) => item._id), [program._id]);
});

test("display order takes precedence over names, with deterministic ties", async () => {
  const program = initialPrograms[0];
  const results = await queryPrograms([
    {...program, _id: "later", name: "Aardvark", sortOrder: 30},
    {...program, _id: "same-b", name: "Beta", sortOrder: 20},
    {...program, _id: "same-a", name: "Beta", sortOrder: 20},
    {...program, _id: "earlier", name: "Zebra", sortOrder: 10},
    {...program, _id: "alpha", name: "Alpha", sortOrder: 20},
  ]);
  assert.deepEqual(results.map((item: {_id: string}) => item._id), ["earlier", "alpha", "same-a", "same-b", "later"]);
});

test("published add, edit, hide and restore operations change the query result", async () => {
  const dataset = [{...initialPrograms[0]}];
  const added = {...initialPrograms[1]};
  dataset.push(added);
  assert.equal((await queryPrograms(dataset)).length, 2);

  added.description = "Updated approved program description.";
  assert.equal((await queryPrograms(dataset))[1].description, added.description);

  added.showOnWebsite = false;
  assert.equal((await queryPrograms(dataset)).length, 1);

  added.showOnWebsite = true;
  assert.equal((await queryPrograms(dataset)).length, 2);

  for (const program of dataset) program.showOnWebsite = false;
  assert.deepEqual(await queryPrograms(dataset), []);
});

test("an empty published list stays empty instead of restoring the original cards", async (t) => {
  t.mock.method(sanityClient, "fetch", async () => []);
  assert.deepEqual(await getVisiblePrograms(), []);
});

test("reads published content with time-based revalidation and no second CDN cache", async (t) => {
  const fetch = t.mock.method(sanityClient, "fetch", async () => []);
  await getVisiblePrograms();
  assert.deepEqual(fetch.mock.calls[0].arguments, [
    visibleProgramsQuery,
    {},
    {useCdn: false, perspective: "published", next: {revalidate: 60}},
  ]);
});

test("a failed request is distinct from an empty list and does not log its response", async (t) => {
  t.mock.method(sanityClient, "fetch", async () => {throw new Error("Private response body");});
  const log = t.mock.method(console, "error", () => {});
  assert.equal(await getVisiblePrograms(), null);
  assert.deepEqual(log.mock.calls[0].arguments, ["Unable to load programs from Sanity."]);
});

test("program cards render plain text safely and retain the contact link", async (t) => {
  t.mock.method(sanityClient, "fetch", async () => [
    {...initialPrograms[0], name: "Culture & community", description: "<script>alert('test')</script>\nA second line."},
  ]);
  const html = renderToStaticMarkup(await ServicesPage());
  assert.equal((html.match(/<article /g) || []).length, 1);
  assert.match(html, /Culture &amp; community/);
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /href="\/contact"/);
});

test("the page explains an empty list without claiming the service has failed", async (t) => {
  t.mock.method(sanityClient, "fetch", async () => []);
  const html = renderToStaticMarkup(await ServicesPage());
  assert.match(html, /There are no programs listed at the moment/);
  assert.doesNotMatch(html, /<article |temporarily unavailable/);
});

test("the page explains a failed request without claiming there are no programs", async (t) => {
  t.mock.method(sanityClient, "fetch", async () => {throw new Error("Service unavailable");});
  t.mock.method(console, "error", () => {});
  const html = renderToStaticMarkup(await ServicesPage());
  assert.match(html, /Program details are temporarily unavailable/);
  assert.doesNotMatch(html, /<article |There are no programs listed/);
});
