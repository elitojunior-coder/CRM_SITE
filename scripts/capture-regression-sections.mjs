import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outArg = process.argv[2] ?? "before";
const outDir = path.join(root, "review", outArg);
const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3200";

const sections = [
  { name: "antes-depois", selector: "#antes-depois" },
  { name: "plataforma", selector: "#plataforma" },
  { name: "caminho-mensagem", selector: "#caminho-mensagem" },
  { name: "segmentos", selector: "#segmentos" },
  { name: "calculadora", selector: "#calculadora" },
  { name: "funcionalidades", selector: "#funcionalidades" },
  { name: "faq", selector: "#faq" },
  {
    name: "cta-final",
    selector: '#agendamento, section:has(h2:text("Mostre seu WhatsApp"))',
  },
  { name: "footer", selector: "footer" },
];

const viewports = [
  { w: 1440, h: 900, suffix: "1440" },
  { w: 375, h: 812, suffix: "375", mobile: true },
];

async function prime(page) {
  await page.addStyleTag({
    content:
      "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}",
  });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let i = 1; i <= 12; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round((height * i) / 12));
    await page.waitForTimeout(450);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.w, height: vp.h },
      ...(vp.mobile ? { isMobile: true } : {}),
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await prime(page);

    for (const sec of sections) {
      await page.evaluate(() => window.scrollTo(0, 0));
      const loc = page.locator(sec.selector).first();
      await loc.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1200);
      await loc.screenshot({
        path: path.join(outDir, `${sec.name}-${vp.suffix}.png`),
        animations: "disabled",
      });
    }
    await context.close();
  }

  await browser.close();
  console.log(`Saved section shots to ${outDir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
