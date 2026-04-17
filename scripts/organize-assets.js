#!/usr/bin/env node

/**
 * ZAWIOS — Automatic Asset Organizer
 *
 * Scans ./incoming-assets and distributes files into the correct
 * public/ sub-folders based on naming conventions and file type.
 *
 * Naming conventions:
 *   avatar-*   → /public/avatars/
 *   icon-*     → /public/icons/
 *   favicon-*  → /public/favicons/
 *   app-icon-* → /public/app-icons/
 *   social-*   → /public/social-cards/
 *   texture-*  → /public/textures/
 *   (default)  → /public/avatars/ (images) or skipped (other)
 *
 * Usage:  node scripts/organize-assets.js
 */

const fs = require("fs");
const path = require("path");

const SOURCE = path.resolve(__dirname, "..", "incoming-assets");
const TARGET = path.resolve(__dirname, "..", "public");

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".ico"]);

const PREFIX_MAP = {
  "avatar-": "avatars",
  "icon-": "icons",
  "favicon-": "favicons",
  "app-icon-": "app-icons",
  "social-": "social-cards",
  "texture-": "textures",
};

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function resolveDestFolder(filename) {
  const lower = filename.toLowerCase();
  for (const [prefix, folder] of Object.entries(PREFIX_MAP)) {
    if (lower.startsWith(prefix)) return folder;
  }
  return "avatars"; // default bucket for unmatched images
}

function organize() {
  if (!fs.existsSync(SOURCE)) {
    console.log(`[organize-assets] Source folder not found: ${SOURCE}`);
    console.log("[organize-assets] Creating it — drop files there and re-run.");
    ensureDir(SOURCE);
    return;
  }

  const files = fs.readdirSync(SOURCE).filter((f) => !f.startsWith("."));

  if (files.length === 0) {
    console.log("[organize-assets] No files to organize in incoming-assets/");
    return;
  }

  let moved = 0;
  let skipped = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    if (!IMAGE_EXTS.has(ext)) {
      console.log(`  SKIP  ${file} (not an image)`);
      skipped++;
      continue;
    }

    const destFolder = resolveDestFolder(file);
    const destDir = path.join(TARGET, destFolder);
    ensureDir(destDir);

    const destPath = path.join(destDir, file.toLowerCase());

    if (fs.existsSync(destPath)) {
      console.log(`  SKIP  ${file} (already exists in public/${destFolder}/)`);
      skipped++;
      continue;
    }

    fs.renameSync(path.join(SOURCE, file), destPath);
    console.log(`  MOVE  ${file} → public/${destFolder}/${file.toLowerCase()}`);
    moved++;
  }

  console.log(`\n[organize-assets] Done — ${moved} moved, ${skipped} skipped.`);
}

organize();
