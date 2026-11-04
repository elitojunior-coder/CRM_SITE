import type { ReactNode } from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";

const bg = "#0B0D0E";
const accent = "#FF5B2E";
const petroleum = "#0E3B43";

function fadeFrame(frame: number, start: number, end: number) {
  return interpolate(frame, [start, start + 10, end - 10, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function SceneShell({
  frame,
  start,
  end,
  title,
  children,
}: {
  frame: number;
  start: number;
  end: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <AbsoluteFill
      style={{
        opacity: fadeFrame(frame, start, end),
        padding: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "94%",
          height: "76%",
          borderRadius: 20,
          border: "1px solid rgba(245,242,235,0.16)",
          background: "linear-gradient(165deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid rgba(245,242,235,0.12)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 2,
            color: accent,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        <div style={{ flex: 1, minHeight: 0, padding: 20 }}>{children}</div>
      </div>
    </AbsoluteFill>
  );
}

function InboxScene() {
  return (
    <div style={{ display: "flex", height: "100%", gap: 14, fontSize: 15 }}>
      <aside
        style={{
          width: "28%",
          background: "#fff",
          borderRadius: 12,
          border: "1px solid rgba(28,25,23,0.08)",
          overflow: "hidden",
        }}
      >
        <p style={{ padding: 12, fontWeight: 700, fontSize: 14, color: "#1c1917" }}>
          Conversas
        </p>
        {["Marina L.", "João P.", "Clínica Sol"].map((name, i) => (
          <div
            key={name}
            style={{
              padding: 12,
              borderTop: "1px solid rgba(28,25,23,0.06)",
              background: i === 0 ? "rgba(255,91,46,0.08)" : "#fff",
            }}
          >
            <p style={{ fontWeight: 600, color: "#1c1917" }}>{name}</p>
            <p style={{ fontSize: 12, color: "#78716c", marginTop: 4 }}>
              {i === 0 ? "Preciso de orçamento hoje" : "Áudio transcrito…"}
            </p>
          </div>
        ))}
      </aside>
      <main
        style={{
          flex: 1,
          background: "#ECE5DD",
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 16,
          gap: 10,
        }}
      >
        <div
          style={{
            alignSelf: "flex-end",
            maxWidth: "72%",
            background: "#DCF8C6",
            borderRadius: 14,
            padding: "12px 14px",
            color: "#111",
            fontSize: 16,
          }}
        >
          “Preciso de orçamento hoje”
        </div>
        <div
          style={{
            alignSelf: "flex-start",
            maxWidth: "78%",
            background: "#fff",
            borderRadius: 14,
            padding: "12px 14px",
            color: "#111",
            fontSize: 16,
          }}
        >
          Atendo sim — residência ou empresa? Já anoto no funil.
        </div>
      </main>
    </div>
  );
}

function AudioScene({ frame }: { frame: number }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 20,
        padding: "0 8%",
      }}
    >
      <div
        style={{
          background: "#075E54",
          color: "#fff",
          borderRadius: 16,
          padding: 20,
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        Marina L. · áudio recebido
      </div>
      <div
        style={{
          background: "#111",
          borderRadius: 20,
          padding: 24,
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <p style={{ color: "#128C7E", fontSize: 16, fontWeight: 600 }}>Áudio · 0:18</p>
        <div
          style={{
            marginTop: 16,
            display: "flex",
            gap: 6,
            alignItems: "flex-end",
            height: 48,
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                maxWidth: 12,
                height: 16 + ((frame + i * 4) % 28),
                background: "#128C7E",
                borderRadius: 999,
              }}
            />
          ))}
        </div>
        <p style={{ color: "#f5f2eb", marginTop: 20, fontSize: 17, lineHeight: 1.45 }}>
          Transcrição: “Quero visita técnica amanhã de manhã.”
        </p>
      </div>
    </div>
  );
}

function FunnelScene({ frame }: { frame: number }) {
  return (
    <div style={{ display: "flex", gap: 14, height: "100%" }}>
      {["Novo", "Qualificado", "Proposta"].map((col, i) => (
        <div
          key={col}
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 12,
            padding: 16,
            border: "1px solid rgba(28,25,23,0.08)",
          }}
        >
          <p style={{ fontSize: 12, fontWeight: 700, color: "#78716c", textTransform: "uppercase" }}>
            {col}
          </p>
          {i === 1 ? (
            <div
              style={{
                marginTop: 14,
                background: accent,
                color: bg,
                borderRadius: 10,
                padding: 14,
                fontSize: 16,
                fontWeight: 600,
                transform: `translateY(${interpolate(frame, [240, 258], [48, 0], { extrapolateRight: "clamp" })}px)`,
              }}
            >
              Marina L. · R$ 8 mil · urgente
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function SummaryScene() {
  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20,
        fontSize: 16,
        color: "#f5f2eb",
      }}
    >
      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
        <p style={{ fontSize: 12, letterSpacing: 2, color: accent, fontWeight: 700 }}>
          RESUMO
        </p>
        <p style={{ marginTop: 12, lineHeight: 1.55, fontSize: 18 }}>
          Quer orçamento hoje · Campinas · prefere 16h · objeção: prazo de instalação.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 16,
        }}
      >
        <span
          style={{
            background: accent,
            color: bg,
            padding: "14px 22px",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 17,
          }}
        >
          Assumir conversa
        </span>
        <p style={{ opacity: 0.85, fontSize: 15 }}>Handoff com contexto completo para o vendedor.</p>
      </div>
    </div>
  );
}

function DashboardScene() {
  const stats = [
    ["47", "Atendimentos"],
    ["8s", "Resposta média"],
    ["19", "Qualificados"],
    ["11", "Agendamentos"],
  ] as const;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, height: "100%" }}>
      {stats.map(([v, l]) => (
        <div
          key={l}
          style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: 42, fontWeight: 800, color: accent, lineHeight: 1 }}>{v}</p>
          <p style={{ marginTop: 10, fontSize: 14, opacity: 0.8 }}>{l}</p>
        </div>
      ))}
    </div>
  );
}

export function ProductFilm() {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: bg, fontFamily: "system-ui, sans-serif" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 70% 20%, ${accent}33, transparent 45%), radial-gradient(circle at 20% 80%, ${petroleum}55, transparent 50%)`,
        }}
      />
      <Sequence from={0} durationInFrames={140}>
        <SceneShell frame={frame} start={0} end={140} title="01 · Inbox unificado">
          <InboxScene />
        </SceneShell>
      </Sequence>

      <Sequence from={120} durationInFrames={120}>
        <SceneShell frame={frame} start={120} end={240} title="02 · Áudio transcrito">
          <AudioScene frame={frame} />
        </SceneShell>
      </Sequence>

      <Sequence from={230} durationInFrames={110}>
        <SceneShell frame={frame} start={230} end={340} title="03 · Funil comercial">
          <FunnelScene frame={frame} />
        </SceneShell>
      </Sequence>

      <Sequence from={330} durationInFrames={110}>
        <SceneShell frame={frame} start={330} end={440} title="04 · Resumo para o vendedor">
          <SummaryScene />
        </SceneShell>
      </Sequence>

      <Sequence from={430} durationInFrames={140}>
        <SceneShell frame={frame} start={430} end={570} title="05 · Painel · dados de exemplo">
          <DashboardScene />
        </SceneShell>
      </Sequence>

      <Sequence from={560} durationInFrames={160}>
        <AbsoluteFill
          style={{
            opacity: fadeFrame(frame, 560, 720),
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "#f5f2eb",
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 20,
              background: "rgba(255,91,46,0.15)",
              border: "1px solid rgba(255,91,46,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 18V6l6 4.5L18 6v12"
                stroke={accent}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p style={{ marginTop: 28, fontSize: 28, fontWeight: 600, maxWidth: 720 }}>
            Quem responde primeiro,{" "}
            <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: accent }}>
              vende.
            </span>
          </p>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}
