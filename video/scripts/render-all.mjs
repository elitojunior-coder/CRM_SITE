import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import {
  renderMedia,
  renderStill,
  selectComposition,
} from "@remotion/renderer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const videoRoot = path.join(__dirname, "..");
const siteRoot = path.join(videoRoot, "..");
const entry = path.join(videoRoot, "src", "index.ts");
const publicDir = path.join(siteRoot, "public", "video");
const reviewDir = path.join(siteRoot, "review");

async function renderOne(bundleLocation, composition, outPath, codec) {
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec,
    outputLocation: outPath,
    ...(codec === "vp9"
      ? { videoBitrate: "750k" }
      : { crf: 28 }),
    muted: true,
  });
}

async function main() {
  await mkdir(publicDir, { recursive: true });
  await mkdir(reviewDir, { recursive: true });

  const bundled = await bundle({ entryPoint: entry });

  const composition = await selectComposition({
    serveUrl: bundled,
    id: "ProductFilm",
  });

  const webmOut = path.join(publicDir, "product.webm");
  const mp4Out = path.join(publicDir, "product.mp4");
  const posterOut = path.join(publicDir, "product-poster.jpg");

  await renderOne(bundled, composition, webmOut, "vp9");
  await renderOne(bundled, composition, mp4Out, "h264");

  await renderStill({
    composition,
    serveUrl: bundled,
    output: posterOut,
    frame: 680,
    imageFormat: "jpeg",
    jpegQuality: 82,
  });

  for (const file of ["product.webm", "product.mp4", "product-poster.jpg"]) {
    await copyFile(path.join(publicDir, file), path.join(reviewDir, file));
  }

  console.log("Vídeo renderizado em public/video/ e review/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
