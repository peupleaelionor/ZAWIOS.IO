#!/usr/bin/env node
/**
 * generate-assets.mjs — Creates all ZAWIOS brand assets (PWA icons, favicons,
 * social cards, brand SVGs) from the canonical butterfly-mark pattern.
 *
 * Run:  node scripts/generate-assets.mjs
 */

import sharp from 'sharp';
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── Brand colours ──────────────────────────────────────────────
const BG      = '#0C0D10';
const LEFT_C  = '#F2F2F7';
const RIGHT_C = '#4169E1';

// ─── Helpers ────────────────────────────────────────────────────
function ensureDir(p) {
  mkdirSync(dirname(p), { recursive: true });
}

function removeGitkeep(dir) {
  const gk = resolve(dir, '.gitkeep');
  if (existsSync(gk)) rmSync(gk);
}

// ─── SVG generators ─────────────────────────────────────────────

/** Raw butterfly mark (no background) — viewBox 0 0 56 34 */
function butterflyMarkSvg() {
  const n = 11;
  const lines = [];
  for (let i = 0; i < n; i++) {
    const y = ((i / (n - 1)) * 34).toFixed(2);
    lines.push(`<line x1="28" y1="17" x2="0" y2="${y}" stroke="${LEFT_C}" stroke-width="0.9" stroke-linecap="round"/>`);
  }
  for (let i = 0; i < n; i++) {
    const y = ((i / (n - 1)) * 34).toFixed(2);
    lines.push(`<line x1="28" y1="17" x2="56" y2="${y}" stroke="${RIGHT_C}" stroke-width="0.9" stroke-linecap="round"/>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="34" viewBox="0 0 56 34" fill="none">\n${lines.join('\n')}\n</svg>`;
}

/** Square app-icon SVG (dark bg + mark) at arbitrary `size` */
function appIconSvg(size) {
  const n = 11;
  const pad = size * 0.23;
  const cx = size / 2;
  const cy = size / 2;
  const xL = size * 0.06;
  const xR = size * 0.94;
  const sw = (size * 0.026).toFixed(2);
  const rx = (size * 0.22).toFixed(2);
  const lines = [];
  for (let i = 0; i < n; i++) {
    const y = (pad + (i / (n - 1)) * (size - 2 * pad)).toFixed(2);
    lines.push(`<line x1="${cx}" y1="${cy}" x2="${xL}" y2="${y}" stroke="${LEFT_C}" stroke-width="${sw}" stroke-linecap="round"/>`);
  }
  for (let i = 0; i < n; i++) {
    const y = (pad + (i / (n - 1)) * (size - 2 * pad)).toFixed(2);
    lines.push(`<line x1="${cx}" y1="${cy}" x2="${xR}" y2="${y}" stroke="${RIGHT_C}" stroke-width="${sw}" stroke-linecap="round"/>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
<rect width="${size}" height="${size}" rx="${rx}" fill="${BG}"/>
${lines.join('\n')}
</svg>`;
}

/** Social-card SVG — dark bg, centred mark, "ZAWIOS" + tagline */
function socialCardSvg(w, h) {
  // Mark: place it centred, 280px wide (aspect 56:34 → h≈170)
  const mW = 280;
  const mH = Math.round(mW * 34 / 56);
  const mX = (w - mW) / 2;
  const mY = h * 0.22;

  const n = 11;
  const markLines = [];
  for (let i = 0; i < n; i++) {
    const y = ((i / (n - 1)) * mH).toFixed(2);
    markLines.push(`<line x1="${mW / 2}" y1="${mH / 2}" x2="0" y2="${y}" stroke="${LEFT_C}" stroke-width="4.5" stroke-linecap="round"/>`);
  }
  for (let i = 0; i < n; i++) {
    const y = ((i / (n - 1)) * mH).toFixed(2);
    markLines.push(`<line x1="${mW / 2}" y1="${mH / 2}" x2="${mW}" y2="${y}" stroke="${RIGHT_C}" stroke-width="4.5" stroke-linecap="round"/>`);
  }

  const textY = mY + mH + 60;
  const tagY = textY + 40;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<rect width="${w}" height="${h}" fill="${BG}"/>
<g transform="translate(${mX},${mY})">
${markLines.join('\n')}
</g>
<text x="${w / 2}" y="${textY}" fill="${LEFT_C}" font-family="'Sora','Inter','Helvetica Neue',Arial,sans-serif" font-size="56" font-weight="700" text-anchor="middle" letter-spacing="6">ZAWIOS</text>
<text x="${w / 2}" y="${tagY}" fill="${RIGHT_C}" font-family="'Sora','Inter','Helvetica Neue',Arial,sans-serif" font-size="22" font-weight="400" text-anchor="middle" letter-spacing="2">Intelligence Collective</text>
</svg>`;
}

/** Logo wordmark SVG — "ZAWIOS" text */
function logoWordSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="40" viewBox="0 0 200 40" fill="none">
<text x="100" y="30" fill="${LEFT_C}" font-family="'Sora','Inter','Helvetica Neue',Arial,sans-serif" font-size="32" font-weight="700" text-anchor="middle" letter-spacing="4">ZAWIOS</text>
</svg>`;
}

// ─── ICO helper ─────────────────────────────────────────────────
// Builds a minimal ICO file wrapping a single PNG image.
// ICO spec: https://en.wikipedia.org/wiki/ICO_(file_format)
// Layout: ICONDIR (6 bytes) + ICONDIRENTRY (16 bytes) + PNG payload
function buildIco(pngBuffer) {
  // ICONDIR header: reserved(2) + type(2) + image count(2)
  const iconDir = Buffer.alloc(6);
  iconDir.writeUInt16LE(0, 0);     // reserved — must be 0
  iconDir.writeUInt16LE(1, 2);     // type: 1 = ICO
  iconDir.writeUInt16LE(1, 4);     // count: 1 image

  // ICONDIRENTRY: describes the single 32×32 image
  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);         // width in px (0 means 256)
  entry.writeUInt8(32, 1);         // height in px (0 means 256)
  entry.writeUInt8(0, 2);          // color palette size (0 = no palette)
  entry.writeUInt8(0, 3);          // reserved — must be 0
  entry.writeUInt16LE(1, 4);       // color planes
  entry.writeUInt16LE(32, 6);      // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8);  // size of PNG data in bytes
  entry.writeUInt32LE(6 + 16, 12); // byte offset to PNG data (after header + entry)

  return Buffer.concat([iconDir, entry, pngBuffer]);
}

// ─── Main ───────────────────────────────────────────────────────
async function main() {
  console.log('🦋 Generating ZAWIOS brand assets…\n');

  // 1. Brand SVGs
  const brandIconsDir = resolve(ROOT, 'public/assets/brand/icons');
  const logoMarkPath = resolve(brandIconsDir, 'logo-mark.svg');
  const logoWordPath = resolve(brandIconsDir, 'logo-word.svg');
  ensureDir(logoMarkPath);
  writeFileSync(logoMarkPath, butterflyMarkSvg());
  writeFileSync(logoWordPath, logoWordSvg());
  removeGitkeep(brandIconsDir);
  console.log('  ✓ logo-mark.svg');
  console.log('  ✓ logo-word.svg');

  // 2. PWA Icons (192 & 512)
  const appIconsDir = resolve(ROOT, 'public/app-icons');
  for (const size of [192, 512]) {
    const svg = appIconSvg(size);
    const outPath = resolve(appIconsDir, `icon-${size}.png`);
    ensureDir(outPath);
    await sharp(Buffer.from(svg)).png().toFile(outPath);
    console.log(`  ✓ icon-${size}.png`);
  }
  removeGitkeep(appIconsDir);

  // 3. Favicons
  const faviconsDir = resolve(ROOT, 'public/favicons');

  // apple-touch-icon (180×180)
  const atSvg = appIconSvg(180);
  const atPath = resolve(faviconsDir, 'apple-touch-icon.png');
  ensureDir(atPath);
  await sharp(Buffer.from(atSvg)).png().toFile(atPath);
  console.log('  ✓ apple-touch-icon.png');

  // favicon.ico (32×32 PNG wrapped in ICO)
  const fav32Svg = appIconSvg(32);
  const fav32Png = await sharp(Buffer.from(fav32Svg)).resize(32, 32).png().toBuffer();
  const icoPath = resolve(faviconsDir, 'favicon.ico');
  writeFileSync(icoPath, buildIco(fav32Png));
  console.log('  ✓ favicon.ico');
  removeGitkeep(faviconsDir);

  // 4. Social cards
  const socialDir = resolve(ROOT, 'public/social-cards');

  // OG image (1200×630)
  const ogSvg = socialCardSvg(1200, 630);
  const ogPath = resolve(socialDir, 'og-image.png');
  ensureDir(ogPath);
  await sharp(Buffer.from(ogSvg)).png().toFile(ogPath);
  console.log('  ✓ og-image.png (1200×630)');

  // Twitter card (1200×600)
  const twSvg = socialCardSvg(1200, 600);
  const twPath = resolve(socialDir, 'twitter-image.png');
  await sharp(Buffer.from(twSvg)).png().toFile(twPath);
  console.log('  ✓ twitter-image.png (1200×600)');
  removeGitkeep(socialDir);

  console.log('\n🎉 All assets generated!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
