import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const PHONE_WIDTH = 433;
const PHONE_HEIGHT = 882;
const SCREEN_X = 21.25;
const SCREEN_Y = 19.25;
const SCREEN_WIDTH = 389.5;
const SCREEN_HEIGHT = 843.5;
const SCREEN_RADIUS = 55.75;

const LEFT_PCT = (SCREEN_X / PHONE_WIDTH) * 100;
const TOP_PCT = (SCREEN_Y / PHONE_HEIGHT) * 100;
const WIDTH_PCT = (SCREEN_WIDTH / PHONE_WIDTH) * 100;
const HEIGHT_PCT = (SCREEN_HEIGHT / PHONE_HEIGHT) * 100;
const RADIUS_H = (SCREEN_RADIUS / SCREEN_WIDTH) * 100;
const RADIUS_V = (SCREEN_RADIUS / SCREEN_HEIGHT) * 100;

export type DeviceFrameProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

/** High-fidelity phone frame (Magic UI–style SVG, MIT). Screen content via children. */
export function DeviceFrame({
  children,
  className,
  style,
  ...props
}: DeviceFrameProps) {
  const hasScreen = !!children;

  return (
    <div
      className={cn(
        "relative inline-block w-full align-middle leading-none",
        "drop-shadow-[0_28px_56px_rgb(0_0_0/0.42),0_8px_20px_rgb(0_0_0/0.28)]",
        className,
      )}
      style={{
        aspectRatio: `${PHONE_WIDTH}/${PHONE_HEIGHT}`,
        ...style,
      }}
      {...props}
    >
      {hasScreen ? (
        <div
          className="absolute z-0 overflow-hidden bg-black"
          style={{
            left: `${LEFT_PCT}%`,
            top: `${TOP_PCT}%`,
            width: `${WIDTH_PCT}%`,
            height: `${HEIGHT_PCT}%`,
            borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
          }}
        >
          {children}
        </div>
      ) : null}

      <svg
        viewBox={`0 0 ${PHONE_WIDTH} ${PHONE_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-0 size-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="deviceFrameMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a4a4f" />
            <stop offset="35%" stopColor="#2a2a2e" />
            <stop offset="55%" stopColor="#1a1a1d" />
            <stop offset="100%" stopColor="#3d3d42" />
          </linearGradient>
          <linearGradient id="deviceFrameHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="deviceButtonMetal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3a3a3f" />
            <stop offset="50%" stopColor="#5c5c62" />
            <stop offset="100%" stopColor="#2e2e32" />
          </linearGradient>
          <mask id="deviceScreenPunch" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width={PHONE_WIDTH} height={PHONE_HEIGHT} fill="white" />
            <rect
              x={SCREEN_X}
              y={SCREEN_Y}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              rx={SCREEN_RADIUS}
              ry={SCREEN_RADIUS}
              fill="black"
            />
          </mask>
        </defs>

        <g mask={hasScreen ? "url(#deviceScreenPunch)" : undefined}>
          <path
            d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
            fill="url(#deviceFrameMetal)"
          />
          <path
            d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z"
            fill="url(#deviceButtonMetal)"
          />
          <path
            d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z"
            fill="url(#deviceButtonMetal)"
          />
          <path
            d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z"
            fill="url(#deviceButtonMetal)"
          />
          <path
            d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z"
            fill="url(#deviceButtonMetal)"
          />
          <path
            d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
            fill="#0a0a0b"
          />
          <path
            d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
            fill="url(#deviceFrameHighlight)"
          />
        </g>

        <path
          opacity="0.45"
          d="M174 5H258V5.5C258 6.60457 257.105 7.5 256 7.5H176C174.895 7.5 174 6.60457 174 5.5V5Z"
          fill="#8a8a90"
        />

        <path
          d={`M${SCREEN_X} 75C${SCREEN_X} 44.2101 46.2101 ${SCREEN_Y} 77 ${SCREEN_Y}H355C385.79 ${SCREEN_Y} 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 ${SCREEN_X} 837.79 ${SCREEN_X} 807V75Z`}
          fill="#050505"
          stroke="#1a1a1a"
          strokeWidth="0.75"
          mask={hasScreen ? "url(#deviceScreenPunch)" : undefined}
        />

        <rect
          x="154"
          y="30"
          width="124"
          height="37"
          rx="18.5"
          fill="#0d0d0d"
        />
        <circle cx="259.5" cy="48.5" r="5" fill="#1c1c1e" />
      </svg>
    </div>
  );
}
