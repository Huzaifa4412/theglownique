import { readFileSync, writeFileSync } from "node:fs";

const all = JSON.parse(readFileSync("scratch/new-posts-payload.json", "utf8"));
const halloween = all[0].content;

const mutation = {
  mutations: [
    {
      createOrReplace: halloween,
    },
  ],
};

writeFileSync("scratch/halloween-mutation.json", JSON.stringify(mutation), "utf8");
console.log("Wrote scratch/halloween-mutation.json");
