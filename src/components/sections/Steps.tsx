type Step = {
  title: string;
  description: string;
};

type StepsProps = {
  steps: Step[];
};

export function Steps({ steps }: StepsProps) {
  return (
    <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
      {steps.map((step, index) => (
        <li key={step.title} className="relative md:pt-2">
          <span
            className="font-mono text-3xl font-medium tabular-nums text-accent/80"
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 font-display text-xl text-ink">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
