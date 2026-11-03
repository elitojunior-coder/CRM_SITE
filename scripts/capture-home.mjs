import { mkdir, rename } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, devices } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const reviewDir = path.join(root, "review");
const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3200";

async function scrollPage(page, steps = 14) {
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const height = await page.evaluate(() => document.body.scrollHeight);
  const viewport = page.viewportSize()?.height ?? 800;
  const maxScroll = Math.max(0, height - viewport);
  for (let i = 0; i <= steps; i++) {
    const y = Math.round((maxScroll * i) / steps);
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(i === 0 ? 1200 : 900);
  }
  await page.waitForTimeout(500);
}

async function main() {
  await mkdir(reviewDir, { recursive: true });

  const desktopBrowser = await chromium.launch();
  const desktopContext = await desktopBrowser.newContext({
    recordVideo: {
      dir: reviewDir,
      size: { width: 1280, height: 720 },
    },
    viewport: { width: 1280, height: 720 },
  });
  const desktopPage = await desktopContext.newPage();
  await scrollPage(desktopPage, 14);
  const desktopVideoPath = await desktopPage.video()?.path();
  await desktopContext.close();
  await desktopBrowser.close();
  if (desktopVideoPath) {
    await rename(desktopVideoPath, path.join(reviewDir, "home-desktop.webm"));
  }

  const mobileBrowser = await chromium.launch();
  const iphone = devices["iPhone 13"];
  const mobileContext = await mobileBrowser.newContext({
    ...iphone,
    recordVideo: {
      dir: reviewDir,
      size: { width: 390, height: 844 },
    },
  });
  const mobilePage = await mobileContext.newPage();
  await scrollPage(mobilePage, 10);
  const mobileVideoPath = await mobilePage.video()?.path();
  await mobileContext.close();
  await mobileBrowser.close();
  if (mobileVideoPath) {
    await rename(mobileVideoPath, path.join(reviewDir, "home-mobile.webm"));
  }

  const shotBrowser = await chromium.launch();
  const shotContext = await shotBrowser.newContext({
    viewport: { width: 1280, height: 720 },
  });
  const shotPage = await shotContext.newPage();
  await shotPage.goto(baseUrl, { waitUntil: "networkidle" });
  await shotPage.screenshot({
    path: path.join(reviewDir, "hero-desktop.png"),
    fullPage: false,
  });
  await shotPage.waitForSelector("#calculadora", { timeout: 60_000 });
  await shotPage.locator("#calculadora").scrollIntoViewIfNeeded();
  await shotPage.waitForTimeout(600);
  await shotPage.screenshot({
    path: path.join(reviewDir, "calculadora-desktop.png"),
  });
  await shotContext.close();
  await shotBrowser.close();

  console.log("Capturas salvas em review/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
