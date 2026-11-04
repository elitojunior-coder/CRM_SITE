import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const reviewDir = path.join(root, "review");
const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3200";

const viewports = [
  { w: 1440, h: 900, file: "hero-1440.png", mobile: false },
  { w: 768, h: 900, file: "hero-768.png", mobile: false },
  { w: 375, h: 812, file: "hero-375.png", mobile: true },
];

async function main() {
  await mkdir(reviewDir, { recursive: true });
  const browser = await chromium.launch();

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.w, height: vp.h },
      ...(vp.mobile ? { isMobile: true } : {}),
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addStyleTag({
      content:
        "*,*::before,*::after{animation:none!important;transition:none!important}",
    });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(900);
    await page.locator("#demonstracao").screenshot({
      path: path.join(reviewDir, vp.file),
      animations: "disabled",
    });
    await context.close();
  }

  await browser.close();
  console.log("Hero shots saved");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
