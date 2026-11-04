import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const reviewDir = path.join(root, "review");

async function main() {
  await mkdir(reviewDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("https://datacrazy.io", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(reviewDir, "ref-datacrazy-hero-1440.png"),
    clip: { x: 0, y: 0, width: 1440, height: 820 },
  });
  await browser.close();
  console.log("Saved ref-datacrazy-hero-1440.png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
