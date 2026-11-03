import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3200";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const bytes = new Map();

  page.on("response", async (res) => {
    try {
      const buf = await res.body();
      bytes.set(res.url(), buf.length);
    } catch {
      /* aborted */
    }
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let i = 1; i <= 10; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round((height * i) / 10));
    await page.waitForTimeout(350);
  }
  await page.waitForTimeout(1200);

  const total = [...bytes.values()].reduce((a, b) => a + b, 0);
  const report = {
    totalBytes: total,
    totalMiB: Number((total / (1024 * 1024)).toFixed(2)),
    resourceCount: bytes.size,
    testedAt: new Date().toISOString(),
  };

  await writeFile(
    path.join(root, "review", "home-total-weight.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report));
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
