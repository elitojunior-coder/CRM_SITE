import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const reviewDir = path.join(root, "review");
const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3200";

async function shot(page, file, selector, fullPage = false) {
  if (selector) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
  }
  await page.screenshot({
    path: path.join(reviewDir, file),
    fullPage,
  });
}

async function primeLazySections(page) {
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const height = await page.evaluate(() => document.body.scrollHeight);
  const steps = 8;
  for (let i = 1; i <= steps; i++) {
    await page.evaluate(
      (y) => window.scrollTo(0, y),
      Math.round((height * i) / steps),
    );
    await page.waitForTimeout(400);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

async function main() {
  await mkdir(reviewDir, { recursive: true });

  const fullSizes = [
    { w: 1440, h: 900, file: "home-full-1440x900.png" },
    { w: 1024, h: 768, file: "home-full-1024x768.png" },
    { w: 375, h: 812, file: "home-full-375x812.png", mobile: true },
  ];

  for (const size of fullSizes) {
    const browser = await chromium.launch();
    const page = await browser.newPage({
      viewport: { width: size.w, height: size.h },
      ...(size.mobile ? { isMobile: true } : {}),
    });
    await primeLazySections(page);
    if (size.mobile) {
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      console.log(`Mobile total height: ${height}px`);
    }
    await shot(page, size.file, null, true);
    await browser.close();
  }

  console.log("Capturas salvas em review/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
