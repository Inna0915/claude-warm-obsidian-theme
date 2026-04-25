import fs from "node:fs";

const requiredFiles = [
  "manifest.json",
  "theme.css",
  "README.md",
  "LICENSE",
  "versions.json",
  ".github/workflows/release.yml"
];

const errors = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) errors.push(`Missing required file: ${file}`);
}

const manifest = readJson("manifest.json");
if (manifest) {
  for (const field of ["name", "version", "minAppVersion", "author"]) {
    if (!manifest[field]) errors.push(`manifest.json is missing "${field}"`);
  }

  if (manifest.version && !/^\d+\.\d+\.\d+$/.test(manifest.version)) {
    errors.push("manifest.json version must use x.y.z Semantic Versioning");
  }
}

const versions = readJson("versions.json");
if (manifest && versions && versions[manifest.version] !== manifest.minAppVersion) {
  errors.push("versions.json must map the manifest version to minAppVersion");
}

if (fs.existsSync("theme.css")) {
  const css = fs.readFileSync("theme.css", "utf8");

  for (const selector of [".theme-light", ".theme-dark"]) {
    if (!css.includes(selector)) errors.push(`theme.css must define ${selector}`);
  }

  if (/!important\b/.test(css)) {
    errors.push("Avoid !important so users can override the theme with snippets");
  }

  if (/@import\s+url|https?:\/\//i.test(css)) {
    errors.push("Community themes must not load remote CSS or assets");
  }

  if (css.includes(":has(")) {
    errors.push("Avoid :has() for performance-sensitive Obsidian views");
  }

  const open = (css.match(/{/g) || []).length;
  const close = (css.match(/}/g) || []).length;
  if (open !== close) errors.push(`CSS brace mismatch: ${open} open, ${close} close`);
}

if (fs.existsSync("screenshot.png")) {
  const screenshot = fs.readFileSync("screenshot.png");
  const width = screenshot.readUInt32BE(16);
  const height = screenshot.readUInt32BE(20);
  if (width !== 512 || height !== 288) {
    errors.push(`screenshot.png should be 512x288, found ${width}x${height}`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log("Theme validation passed.");

function readJson(file) {
  if (!fs.existsSync(file)) return null;

  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    errors.push(`${file} is not valid JSON: ${error.message}`);
    return null;
  }
}
