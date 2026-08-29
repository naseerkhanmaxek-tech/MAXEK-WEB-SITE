import { copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const buildDirectory = fileURLToPath(new URL("../build/", import.meta.url));

await copyFile(
  `${buildDirectory}index.html`,
  `${buildDirectory}404.html`,
);

console.log("Prepared SPA fallback at build/404.html");
