const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3200";

const requiredHeadings = [
  { tag: "h1", text: "Quem responde primeiro, vende." },
  { tag: "h2", text: "Mesma mensagem. Dois destinos.", id: "antes-depois" },
  { tag: "h2", text: "A plataforma por trás do WhatsApp.", id: "plataforma" },
  { tag: "h2", text: "O caminho da mensagem.", id: "caminho-mensagem" },
  {
    tag: "h2",
    text: "O fluxo muda por segmento. A lógica é a mesma.",
    id: "segmentos",
  },
  { tag: "h2", text: "Quanto você perde sem responder?", id: "calculadora" },
  { tag: "h2", text: "Tudo que sustenta venda — não enfeite.", id: "funcionalidades" },
  { tag: "h2", text: "Segurança e LGPD" },
  {
    tag: "h2",
    text: "Perguntas que travam a decisão — respondidas de frente.",
  },
];

const legalPaths = [
  "/termos",
  "/privacidade",
  "/cookies",
  "/lgpd",
  "/exclusao-de-dados",
  "/suboperadores",
  "/seguranca",
];

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function collectHashHrefs(html) {
  const hrefs = [];
  const re = /href=(["'])#([^"'?\s]+)\1/gi;
  let m;
  while ((m = re.exec(html))) {
    hrefs.push(m[2]);
  }
  return [...new Set(hrefs)];
}

function collectInternalPaths(html) {
  const paths = new Set();
  const re = /href=(["'])\/(?!\/)([^"'#?\s]*)\1/gi;
  let m;
  while ((m = re.exec(html))) {
    paths.add(`/${m[2]}`.replace(/\/$/, "") || "/");
  }
  return [...paths];
}

function hasId(html, id) {
  const re = new RegExp(`\\bid=(["'])${id}\\1`, "i");
  return re.test(html);
}

function hasNoindex(html) {
  return /name=(["'])robots\1[^>]*content=(["'])[^"']*noindex/i.test(html);
}

async function fetchHtml(path) {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: { Accept: "text/html", "User-Agent": "crm-site-test-ssr/1.0" },
  });
  return { res, html: res.ok ? await res.text() : "" };
}

async function main() {
  const failures = [];
  const { res: homeRes, html } = await fetchHtml("/");
  if (!homeRes.ok) {
    console.error(`Fetch failed: ${homeRes.status} ${homeRes.statusText}`);
    process.exit(1);
  }

  const plain = stripTags(html);

  for (const row of requiredHeadings) {
    if (!plain.includes(row.text)) {
      failures.push(`missing ${row.tag}: "${row.text}"`);
    }
    if (row.id && !hasId(html, row.id)) {
      failures.push(`missing id="${row.id}" for "${row.text}"`);
    }
  }

  const hashHrefs = collectHashHrefs(html);
  for (const fragment of hashHrefs) {
    if (!hasId(html, fragment)) {
      failures.push(`href="#${fragment}" has no matching id="${fragment}"`);
    }
  }

  for (const path of legalPaths) {
    const { res, html: legalHtml } = await fetchHtml(path);
    if (!res.ok) {
      failures.push(`${path}: HTTP ${res.status}`);
      continue;
    }
    if (!/<h1[\s>]/i.test(legalHtml)) {
      failures.push(`${path}: missing h1`);
    }
    if (!hasNoindex(legalHtml)) {
      failures.push(`${path}: expected noindex while legal draft placeholders exist`);
    }
  }

  const footerPaths = collectInternalPaths(html).filter((p) =>
    legalPaths.includes(p),
  );
  for (const path of footerPaths) {
    const { res } = await fetchHtml(path);
    if (!res.ok) failures.push(`footer link ${path}: HTTP ${res.status}`);
  }

  console.log(
    JSON.stringify({
      ok: failures.length === 0,
      headingChecks: requiredHeadings.length,
      hashLinksChecked: hashHrefs.length,
      legalPagesChecked: legalPaths.length,
      hashLinks: hashHrefs,
    }),
  );

  if (failures.length) {
    console.error("SSR checks failed:\n" + failures.map((f) => `- ${f}`).join("\n"));
    process.exit(1);
  }

  console.log("All SSR checks passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
