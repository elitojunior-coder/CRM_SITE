/** Feixes de luz em CSS — laranja-brasa e petróleo sobre o hero escuro. */
export function HeroSpotlight() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden motion-reduce:opacity-60"
      aria-hidden
    >
      <div className="hero-beam hero-beam--left" />
      <div className="hero-beam hero-beam--center" />
      <div className="hero-beam hero-beam--right" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgb(14_59_67/0.45),transparent_55%)]" />
    </div>
  );
}
