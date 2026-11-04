import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3200";

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

function isDuplicatedPhrase(text) {
  const s = normalize(text);
  if (s.length < 12) return false;
  for (let i = Math.floor(s.length / 3); i <= Math.floor(s.length / 2); i++) {
    if (s.slice(0, i) === s.slice(i, i * 2)) return true;
  }
  return false;
}

async function primeLazySections(page) {
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let i = 1; i <= 10; i++) {
    await page.evaluate(
      (y) => window.scrollTo(0, y),
      Math.round((height * i) / 10),
    );
    await page.waitForTimeout(350);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await primeLazySections(page);

  const headings = await page.evaluate(() => {
    const nodes = [...document.querySelectorAll("h1, h2")];
    return nodes.map((el) => ({
      tag: el.tagName.toLowerCase(),
      text: el.textContent ?? "",
    }));
  });

  const failures = [];

  for (const row of headings) {
    const normalized = normalize(row.text);
    if (!normalized) {
      failures.push(`${row.tag}: empty textContent`);
      continue;
    }
    if (isDuplicatedPhrase(normalized)) {
      failures.push(`${row.tag}: duplicated phrase "${normalized}"`);
    }
    if (!/\s/.test(normalized) && normalized.length > 24) {
      failures.push(`${row.tag}: long heading without spaces "${normalized}"`);
    }
  }

  const h1 = headings.find((h) => h.tag === "h1");
  const wantH1 = "Quem responde primeiro, vende.";
  if (!h1 || normalize(h1.text) !== wantH1) {
    failures.push(`h1 expected "${wantH1}" got "${h1 ? normalize(h1.text) : "missing"}"`);
  }

  const titled = [
    ["#antes-depois h2", "Mesma mensagem. Dois destinos."],
    ["#plataforma h2", "A plataforma por trás do WhatsApp."],
    ["#caminho-mensagem h2", "O caminho da mensagem."],
    ["#segmentos h2", "O fluxo muda por segmento. A lógica é a mesma."],
    ["#calculadora h2", "Quanto você perde sem responder?"],
    ["#funcionalidades h2", "Tudo que sustenta venda — não enfeite."],
  ];

  for (const [selector, want] of titled) {
    const text = await page.locator(selector).first().textContent();
    if (normalize(text ?? "") !== want) {
      failures.push(`${selector} expected "${want}" got "${normalize(text ?? "")}"`);
    }
  }

  const wordGaps = await page.evaluate(() => {
    const out = [];
    for (const heading of document.querySelectorAll("h1, h2")) {
      const blocks = [...heading.querySelectorAll("span.inline-block")];
      if (blocks.length < 2) continue;
      for (let i = 0; i < blocks.length - 1; i++) {
        const a = blocks[i].getBoundingClientRect();
        const b = blocks[i + 1].getBoundingClientRect();
        if (Math.abs(a.top - b.top) > 6) continue;
        const gap = b.left - a.right;
        if (gap <= 0) {
          out.push(
            `${heading.tagName.toLowerCase()} "${(heading.textContent ?? "").slice(0, 48)}" gap ${gap.toFixed(2)}px between words ${i + 1}-${i + 2}`,
          );
        }
      }
    }
    return out;
  });
  failures.push(...wordGaps);

  const mobile = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true,
  });
  await primeLazySections(mobile);
  const mobileHeight = await mobile.evaluate(() => document.documentElement.scrollHeight);
  console.log(JSON.stringify({ mobileScrollHeight: mobileHeight, headingCount: headings.length }));

  if (mobileHeight > 12000) {
    failures.push(`mobile height ${mobileHeight}px exceeds 12000px cap`);
  }

  await browser.close();

  if (failures.length) {
    console.error("Heading checks failed:\n" + failures.map((f) => `- ${f}`).join("\n"));
    process.exit(1);
  }

  console.log("All heading checks passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
