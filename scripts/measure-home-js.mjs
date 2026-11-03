import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3200";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(800);

  const report = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const windowEnd = nav ? nav.domContentLoadedEventEnd + 2500 : 8000;
    const seen = new Set();
    const rows = [];

    for (const entry of performance.getEntriesByType("resource")) {
      const url = entry.name;
      if (!url.includes("/_next/static/") || !url.endsWith(".js")) continue;
      if (entry.startTime > windowEnd) continue;
      if (seen.has(url)) continue;
      seen.add(url);

      const transfer =
        typeof entry.transferSize === "number" && entry.transferSize > 0
          ? entry.transferSize
          : typeof entry.encodedBodySize === "number"
            ? entry.encodedBodySize
            : 0;

      rows.push({ url: url.split("/").slice(-2).join("/"), bytes: transfer });
    }

    rows.sort((a, b) => b.bytes - a.bytes);
    const totalBytes = rows.reduce((a, r) => a + r.bytes, 0);
    return {
      totalBytes,
      totalKiB: Math.round(totalBytes / 1024),
      method:
        "PerformanceResourceTiming.transferSize (deduped, initial load window)",
      windowMs: Math.round(windowEnd),
      scripts: rows.slice(0, 20),
    };
  });

  await mkdir(path.join(root, "review"), { recursive: true });
  await writeFile(
    path.join(root, "review", "home-js.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(
    JSON.stringify({ totalKiB: report.totalKiB, files: report.scripts.length }),
  );
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
