import {visionTool} from "@sanity/vision";
import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {dataset, projectId} from "./sanity/env";
import {schemaTypes} from "./sanity/schemaTypes";
import {eventStructure} from "./sanity/structure";

export default defineConfig({
  name: "default",
  title: "Kiray Website",
  projectId,
  dataset,
  plugins: [
    structureTool({structure: eventStructure}),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
