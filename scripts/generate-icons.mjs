import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const src = path.join(root, "public", "brand", "logo", "zawios-mark-v2.svg");
const app = path.join(root, "public", "brand", "logo", "zawios-app-icon-v2.svg");
const outDir = path.join(root, "public", "icons");

fs.mkdirSync(outDir, { recursive: true });

const exports = [
  { input: src, out: "favicon-16.png", size: 16 },
  { input: src, out: "favicon-32.png", size: 32 },
  { input: src, out: "favicon-48.png", size: 48 },
  { input: app, out: "apple-touch-180.png", size: 180 },
  { input: app, out: "pwa-192.png", size: 192 },
  { input: app, out: "pwa-512.png", size: 512 },
];

for (const e of exports) {
  try {
    const buf = fs.readFileSync(e.input);
    await sharp(buf, { density: 300 })
      .resize(e.size, e.size, { fit: "contain" })
      .png({ compressionLevel: 9 })
      .toFile(path.join(outDir, e.out));
    console.log("✓", e.out);
  } catch (err) {
    console.error(`✗ Failed to generate ${e.out} from ${e.input}:`, err.message);
    process.exit(1);
  }
}

console.log("\nDone. Update metadata/manifest to use /icons/*.png");
