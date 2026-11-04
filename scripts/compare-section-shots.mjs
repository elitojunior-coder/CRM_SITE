import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch").default ?? require("pixelmatch");

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const beforeDir = path.join(root, "review", "before");
const afterDir = path.join(root, "review", "after");
const threshold = 0.001;
const HEIGHT_ROUND_PX = 2;

function cropHeight(png, height) {
  if (png.height === height) return png;
  const out = new PNG({ width: png.width, height });
  for (let y = 0; y < height; y++) {
    const srcStart = y * png.width * 4;
    const dstStart = y * png.width * 4;
    png.data.copy(out.data, dstStart, srcStart, srcStart + png.width * 4);
  }
  return out;
}

async function main() {
  const files = (await readdir(beforeDir)).filter((f) => f.endsWith(".png"));
  const results = [];
  let failed = false;

  for (const file of files) {
    const beforeBuf = await readFile(path.join(beforeDir, file));
    const afterBuf = await readFile(path.join(afterDir, file));
    if (beforeBuf.equals(afterBuf)) {
      results.push({ file, diffRatio: 0, mismatchedPixels: 0 });
      continue;
    }
    let img1 = PNG.sync.read(beforeBuf);
    let img2 = PNG.sync.read(afterBuf);

    if (img1.width !== img2.width) {
      results.push({
        file,
        diffRatio: 1,
        note: `width ${img1.width} vs ${img2.width}`,
      });
      failed = true;
      continue;
    }

    let heightMeta = null;
    if (img1.height !== img2.height) {
      const hDiff = Math.abs(img1.height - img2.height);
      if (hDiff <= HEIGHT_ROUND_PX) {
        const h = Math.min(img1.height, img2.height);
        img1 = cropHeight(img1, h);
        img2 = cropHeight(img2, h);
        heightMeta = { heightTrimmedTo: h, heightDelta: hDiff };
      } else {
        results.push({
          file,
          diffRatio: 1,
          note: `size ${img1.width}x${img1.height} vs ${img2.width}x${img2.height}`,
        });
        failed = true;
        continue;
      }
    }

    const diff = new PNG({ width: img1.width, height: img1.height });
    const mismatched = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {
      threshold: 0.1,
    });
    const ratio = mismatched / (img1.width * img1.height);
    results.push({
      file,
      diffRatio: ratio,
      mismatchedPixels: mismatched,
      ...(heightMeta ?? {}),
    });
    if (ratio > threshold) failed = true;
  }

  await writeFile(
    path.join(root, "review", "section-compare.json"),
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results, null, 2));
  if (failed) {
    console.error("Some sections exceeded 0.1% pixel diff");
    process.exit(1);
  }
  console.log("All sections within 0.1% threshold.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
