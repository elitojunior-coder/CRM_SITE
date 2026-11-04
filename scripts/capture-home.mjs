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

  const desktopBrowser = await chromium.launch();
  const desktop = await desktopBrowser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  await primeLazySections(desktop);
  await shot(desktop, "hero-1440x900.png", "#demonstracao");
  await shot(desktop, "caminho-1440x900.png", "#caminho-mensagem");
  await shot(desktop, "painel-1440x900.png", "#painel-exemplo");
  await shot(desktop, "comparativo-1440x900.png", "#comparativo");
  await shot(desktop, "plataforma-1440x900.png", "#plataforma");
  await shot(desktop, "antes-depois-1440x900.png", "#antes-depois");
  await shot(desktop, "como-funciona-1440x900.png", "#como-funciona");
  await shot(desktop, "bento-1440x900.png", "#funcionalidades");
  await desktopBrowser.close();

  const mobileBrowser = await chromium.launch();
  const mobile = await mobileBrowser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true,
  });
  await primeLazySections(mobile);
  await shot(mobile, "hero-375x812.png", "#demonstracao");
  await shot(mobile, "caminho-375x812.png", "#caminho-mensagem");
  await shot(mobile, "painel-375x812.png", "#painel-exemplo");
  await shot(mobile, "comparativo-375x812.png", "#comparativo");
  await shot(mobile, "plataforma-375x812.png", "#plataforma");
  await shot(mobile, "antes-depois-375x812.png", "#antes-depois");
  await shot(mobile, "como-funciona-375x812.png", "#como-funciona");
  await shot(mobile, "bento-375x812.png", "#funcionalidades");
  await mobileBrowser.close();

  const fullSizes = [
    { w: 1440, h: 900, file: "home-full-1440x900.png" },
    { w: 1024, h: 768, file: "home-full-1024x768.png" },
    { w: 800, h: 600, file: "home-full-800x600.png" },
    { w: 375, h: 812, file: "home-full-375x812.png", mobile: true },
  ];

  for (const size of fullSizes) {
    const browser = await chromium.launch();
    const page = await browser.newPage({
      viewport: { width: size.w, height: size.h },
      ...(size.mobile ? { isMobile: true } : {}),
    });
    await primeLazySections(page);
    await shot(page, size.file, null, true);
    await browser.close();
  }

  console.log("Capturas salvas em review/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
