import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3200";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
  });

  await page.addInitScript(() => {
    window.__clsScore = 0;
    window.__clsEntries = 0;
    try {
      const po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            window.__clsScore += entry.value;
            window.__clsEntries += 1;
          }
        }
      });
      po.observe({ type: "layout-shift", buffered: true });
    } catch {
      /* unsupported */
    }
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const steps = 24;
  const height = await page.evaluate(() => document.body.scrollHeight);
  const viewport = 812;
  const maxScroll = Math.max(0, height - viewport);

  for (let i = 0; i <= steps; i++) {
    const y = Math.round((maxScroll * i) / steps);
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(350);
  }

  await page.waitForTimeout(600);

  const result = await page.evaluate(() => ({
    cls: window.__clsScore ?? 0,
    shifts: window.__clsEntries ?? 0,
  }));

  const out = {
    viewport: "375x812",
    cls: Number(result.cls.toFixed(4)),
    layoutShiftEvents: result.shifts,
    pass: result.cls < 0.05,
    testedAt: new Date().toISOString(),
  };

  await mkdir(path.join(root, "review"), { recursive: true });
  await writeFile(
    path.join(root, "review", "home-cls-mobile.json"),
    JSON.stringify(out, null, 2),
  );
  console.log(JSON.stringify(out));
  await browser.close();
  if (!out.pass) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
