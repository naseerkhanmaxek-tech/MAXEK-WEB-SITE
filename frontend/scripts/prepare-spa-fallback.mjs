import { copyFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const buildDirectory = fileURLToPath(new URL("../build/", import.meta.url));

await copyFile(
  `${buildDirectory}index.html`,
  `${buildDirectory}404.html`,
);

await writeFile(
  `${buildDirectory}.htaccess`,
  `<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
</IfModule>
`,
);

console.log("Prepared SPA fallbacks at build/404.html and build/.htaccess");
