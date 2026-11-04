import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const reviewDir = path.join(root, "review");
const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3200";

async function main() {
  await mkdir(reviewDir, { recursive: true });
  const browser = await chromium.launch();

  for (const vp of [
    { w: 1440, h: 900, file: "hero-1440.png", mobile: false },
    { w: 375, h: 812, file: "hero-375.png", mobile: true },
  ]) {
    const page = await browser.newPage({
      viewport: { width: vp.w, height: vp.h },
      ...(vp.mobile ? { isMobile: true } : {}),
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.waitForTimeout(900);
    await page.locator("section").first().screenshot({
      path: path.join(reviewDir, vp.file),
    });
    await page.close();
  }

  await browser.close();
  console.log("Hero shots saved");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
