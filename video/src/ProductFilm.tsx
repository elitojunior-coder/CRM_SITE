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

function Panel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        flex: 1,
        borderRadius: 16,
        border: "1px solid rgba(245,242,235,0.14)",
        background: "rgba(255,255,255,0.04)",
        padding: 20,
        color: "#f5f2eb",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <p style={{ fontSize: 12, letterSpacing: 2, color: accent }}>{title}</p>
      <div style={{ marginTop: 12 }}>{children}</div>
    </div>
  );
}

export function ProductFilm() {
  const frame = useCurrentFrame();
  const fade = (start: number, end: number) =>
    interpolate(frame, [start, start + 12, end - 12, end], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

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
        <AbsoluteFill style={{ opacity: fade(0, 140), padding: 48, display: "flex", gap: 24 }}>
          <Panel title="01 · INBOX">
            <div style={{ background: "#ECE5DD", borderRadius: 12, padding: 12 }}>
              <div style={{ marginLeft: "auto", maxWidth: "80%", background: "#DCF8C6", borderRadius: 10, padding: 10, color: "#111", fontSize: 14 }}>
                “Preciso de orçamento hoje”
              </div>
              <div style={{ marginTop: 8, maxWidth: "80%", background: "#fff", borderRadius: 10, padding: 10, color: "#111", fontSize: 14 }}>
                Atendo sim — residência ou empresa?
              </div>
            </div>
          </Panel>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={120} durationInFrames={120}>
        <AbsoluteFill style={{ opacity: fade(120, 240), padding: 48, justifyContent: "center", alignItems: "center" }}>
          <div style={{ width: 420, background: "#111", borderRadius: 32, padding: 16, border: "1px solid rgba(255,255,255,0.1)" }}>
            <p style={{ color: "#128C7E", fontSize: 14 }}>Áudio · 0:18</p>
            <div style={{ marginTop: 12, display: "flex", gap: 4, alignItems: "flex-end", height: 32 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 6,
                    height: 12 + ((frame + i * 3) % 20),
                    background: "#128C7E",
                    borderRadius: 999,
                  }}
                />
              ))}
            </div>
            <p style={{ color: "#f5f2eb", marginTop: 16, fontSize: 14 }}>
              Transcrição: “Quero visita técnica amanhã.”
            </p>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={230} durationInFrames={110}>
        <AbsoluteFill style={{ opacity: fade(230, 340), padding: 48 }}>
          <Panel title="03 · FUNIL">
            <div style={{ display: "flex", gap: 12 }}>
              {["Novo", "Qualificado", "Proposta"].map((c, i) => (
                <div key={c} style={{ flex: 1, border: "1px dashed rgba(245,242,235,0.2)", borderRadius: 8, padding: 8, fontSize: 12 }}>
                  {c}
                  {i === 1 ? (
                    <div style={{ marginTop: 8, background: accent, color: bg, borderRadius: 8, padding: 8, transform: `translateY(${interpolate(frame, [240, 260], [40, 0], { extrapolateRight: "clamp" })}px)` }}>
                      Lead · R$ 8 mil
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </Panel>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={330} durationInFrames={110}>
        <AbsoluteFill style={{ opacity: fade(330, 440), padding: 48 }}>
          <Panel title="04 · RESUMO VENDEDOR">
            <p style={{ fontSize: 16, lineHeight: 1.5 }}>
              Quer orçamento hoje · Campinas · prefere 16h · objeção: prazo.
            </p>
            <span style={{ display: "inline-block", marginTop: 16, background: accent, color: bg, padding: "8px 14px", borderRadius: 8, fontWeight: 600 }}>
              Assumir conversa
            </span>
          </Panel>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={430} durationInFrames={140}>
        <AbsoluteFill style={{ opacity: fade(430, 570), padding: 48 }}>
          <Panel title="05 · PAINEL · dados de exemplo">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {[
                ["47", "Atendimentos"],
                ["8s", "Resposta"],
                ["19", "Qualificados"],
                ["11", "Agendamentos"],
              ].map(([v, l]) => (
                <div key={l} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: 12 }}>
                  <p style={{ fontSize: 28, fontWeight: 700, color: accent }}>{v}</p>
                  <p style={{ fontSize: 11, opacity: 0.75 }}>{l}</p>
                </div>
              ))}
            </div>
          </Panel>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={560} durationInFrames={160}>
        <AbsoluteFill style={{ opacity: fade(560, 720), justifyContent: "center", alignItems: "center", textAlign: "center", color: "#f5f2eb" }}>
          <p style={{ fontSize: 56, fontFamily: "Georgia, serif", fontStyle: "italic", color: accent }}>[PREENCHER]</p>
          <p style={{ marginTop: 16, fontSize: 22, maxWidth: 640 }}>
            Quem responde primeiro, vende.
          </p>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}
