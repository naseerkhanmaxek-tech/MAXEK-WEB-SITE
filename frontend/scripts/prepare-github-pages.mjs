import { copyFile, readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const buildDirectory = fileURLToPath(new URL("../build/", import.meta.url));
const publicPath = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
const textExtensions = new Set([".css", ".html", ".js", ".json", ".map", ".txt", ".xml"]);

if (!publicPath.startsWith("/")) {
  throw new Error("PUBLIC_URL must be a root-relative path such as /MAXEK-WEB-SITE");
}

async function prepareDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const filePath = join(directory, entry.name);
      if (entry.isDirectory()) return prepareDirectory(filePath);
      if (!textExtensions.has(extname(entry.name))) return;

      const original = await readFile(filePath, "utf8");
      const prepared = original
        .replaceAll('"/assets/', `"${publicPath}/assets/`)
        .replaceAll("'/assets/", `'${publicPath}/assets/`)
        .replaceAll("(/assets/", `(${publicPath}/assets/`)
        .replaceAll("=/assets/", `=${publicPath}/assets/`);

      if (prepared !== original) await writeFile(filePath, prepared);
    }),
  );
}

await prepareDirectory(buildDirectory);
await copyFile(join(buildDirectory, "index.html"), join(buildDirectory, "404.html"));
await writeFile(join(buildDirectory, ".nojekyll"), "");

console.log(`Prepared GitHub Pages build for ${publicPath}`);
