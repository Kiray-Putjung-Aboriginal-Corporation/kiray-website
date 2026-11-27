import {getCliClient} from "sanity/cli";
import {apiVersion} from "../sanity/env";
import {initialPrograms} from "../sanity/seed/programs";

async function seedPrograms() {
  const client = getCliClient({apiVersion}).withConfig({useCdn: false, perspective: "raw"});
  const ids = initialPrograms.flatMap((program) => [program._id, `drafts.${program._id}`]);
  const existing = await client.getDocuments(ids);
  const existingIds = new Set(existing.flatMap((document) => document ? [document._id] : []));
  const missing = initialPrograms.filter((program) =>
    !existingIds.has(program._id) && !existingIds.has(`drafts.${program._id}`),
  );
  const {projectId, dataset} = client.config();
  console.info(`Program import target: ${projectId}/${dataset}.`);
  console.info(`${missing.length} missing programs; ${initialPrograms.length - missing.length} existing programs will be left unchanged.`);

  if (process.argv.includes("--dry-run")) {
    console.info("Dry run only. No documents were created.");
    return;
  }

  if (missing.length === 0) return;

  let transaction = client.transaction();
  for (const program of missing) {
    transaction = transaction.createIfNotExists({...program, _id: `drafts.${program._id}`});
  }
  await transaction.commit();
  console.info("Created unpublished program drafts. Review and publish them in Studio before releasing the website change.");
}

seedPrograms().catch(() => {
  console.error("Program import failed. Check your Sanity login, project, dataset and permissions. No credentials or response bodies have been logged.");
  process.exitCode = 1;
});
