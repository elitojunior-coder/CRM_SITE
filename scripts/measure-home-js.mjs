import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3200";

async function main() {
  const browser = await chromium.launch();
  const page = await (await browser.newContext()).newPage();
  const scripts = [];
  page.on("response", async (res) => {
    const url = res.url();
    if (url.includes("/_next/static/chunks") && url.endsWith(".js")) {
      const headers = await res.allHeaders();
      const len = Number(headers["content-length"] ?? 0);
      scripts.push({ url, bytes: len || (await res.body()).byteLength });
    }
  });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await browser.close();

  const total = scripts.reduce((a, s) => a + s.bytes, 0);
  const report = {
    totalBytes: total,
    totalKiB: Math.round(total / 1024),
    scripts: scripts.sort((a, b) => b.bytes - a.bytes).slice(0, 15),
  };
  await import("node:fs/promises").then((fs) =>
    fs.writeFile(
      path.join(root, "review", "home-js.json"),
      JSON.stringify(report, null, 2),
    ),
  );
  console.log(JSON.stringify({ totalKiB: report.totalKiB, files: report.scripts.length }));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
