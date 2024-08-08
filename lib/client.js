import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-08-06",
  useCdn: true,
  token: process.env.SANITY_TOKEN,
});
