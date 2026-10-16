import { cp, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const contentRoot = path.resolve("content");
const outputRoot = path.resolve("public", "content");
const assetExtensions = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".avif", ".bmp", ".pdf"]);

async function copyImages(sourceDir, relativeDir = "") {
  const entries = await readdir(sourceDir, { withFileTypes: true });
  for (const entry of entries) {
    const relativePath = path.join(relativeDir, entry.name);
    const sourcePath = path.join(sourceDir, entry.name);
    if (entry.isDirectory()) {
      await copyImages(sourcePath, relativePath);
    } else if (entry.isFile() && assetExtensions.has(path.extname(entry.name).toLowerCase())) {
      const targetPath = path.join(outputRoot, relativePath);
      await mkdir(path.dirname(targetPath), { recursive: true });
      await cp(sourcePath, targetPath);
    }
  }
}

await mkdir(outputRoot, { recursive: true });
await copyImages(contentRoot);
