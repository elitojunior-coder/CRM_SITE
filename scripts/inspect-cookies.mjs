import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3200";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outPath = path.join(root, "review", "cookies-audit.json");

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const scriptUrls = [];
  page.on("request", (req) => {
    const url = req.url();
    if (req.resourceType() === "script" && !url.startsWith("data:")) {
      scriptUrls.push(url);
    }
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const documentCookie = await page.evaluate(() => document.cookie);
  const cookies = await context.cookies();
  const thirdPartyScripts = [...new Set(scriptUrls)].filter(
    (u) => !u.includes("127.0.0.1") && !u.includes("localhost"),
  );

  const report = {
    testedAt: new Date().toISOString(),
    baseUrl,
    documentCookie: documentCookie || null,
    cookies,
    scriptUrls: [...new Set(scriptUrls)],
    thirdPartyScripts,
  };

  await writeFile(outPath, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ ok: true, outPath, cookieCount: cookies.length }));
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
