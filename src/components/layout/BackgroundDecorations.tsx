type BackgroundDecorationsProps = {
  variant?: "default" | "home";
};

const HOME_DESKTOP_POSITIONS = {
  topLeftArrow: "sm:-left-8 sm:top-[145px]",
  bottomRightStarburst: "sm:top-[770px]",
  topRightDiamond: "sm:top-[60px]",
  midLeftCircle: "sm:top-[600px]",
  bottomLeftCross: "sm:top-[810px]",
  rightMidZigzag: "sm:top-[435px]",
  topCenterSquare: "sm:top-[32px]",
  bottomCenterTriangle: "sm:top-[985px]",
} as const;

export default function BackgroundDecorations({
  variant = "default",
}: BackgroundDecorationsProps) {
  // Home uses fixed desktop offsets so filter/sub-filter transitions do not
  // move ornaments when the section height changes during loading.
  const homeVariant = variant === "home";

  return (
    <div className="pointer-events-none z-0 overflow-hidden absolute inset-0 h-full w-full" aria-hidden="true">
      {/* Grid pattern — light mode */}
      <svg className="absolute inset-0 h-full w-full dark:hidden" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="neo-grid-light" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neo-grid-light)" />
      </svg>

      {/* Grid pattern — dark mode */}
      <svg className="absolute inset-0 h-full w-full hidden dark:block" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="neo-grid-dark" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neo-grid-dark)" />
      </svg>

      {/* Top-left: Arrow/Cursor pointing inward */}
      <svg
        className={`ornament-entrance absolute -left-12 top-[420px] w-[140px] sm:w-[200px] ${
          homeVariant ? HOME_DESKTOP_POSITIONS.topLeftArrow : "sm:-left-8 sm:top-[15%]"
        }`}
        style={{
          "--ornament-rot-start": "-24deg",
          "--ornament-rot-end": "-12deg",
          animationDelay: "100ms",
        } as React.CSSProperties}
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 10 L140 80 L115 80 L115 130 L160 130 L160 105 L190 140 L160 175 L160 150 L115 150 L115 200 L85 200 L85 150 L40 150 L40 175 L10 140 L40 105 L40 130 L85 130 L85 80 L60 80 Z"
          fill="var(--main)"
          stroke="var(--border)"
          strokeWidth="3"
        />
      </svg>

      {/* Bottom-right: Starburst/Explosion */}
      <svg
        className={`ornament-entrance absolute -right-10 top-[850px] w-[180px] sm:w-[220px] ${
          homeVariant ? HOME_DESKTOP_POSITIONS.bottomRightStarburst : "sm:top-auto sm:bottom-[8%]"
        }`}
        style={{
          "--ornament-rot-start": "-10deg",
          "--ornament-rot-end": "6deg",
          animationDelay: "200ms",
        } as React.CSSProperties}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 5 L115 55 L140 15 L135 65 L175 35 L150 78 L195 65 L160 95 L200 100 L160 105 L195 135 L150 122 L175 165 L135 135 L140 185 L115 145 L100 195 L85 145 L60 185 L65 135 L25 165 L50 122 L5 135 L40 105 L0 100 L40 95 L5 65 L50 78 L25 35 L65 65 L60 15 L85 55 Z"
          fill="var(--main)"
          stroke="var(--border)"
          strokeWidth="3"
        />
      </svg>

      {/* Top-right: Small diamond */}
      <svg
        className={`ornament-entrance absolute right-[8%] top-[60px] w-[50px] sm:w-[65px] ${
          homeVariant ? HOME_DESKTOP_POSITIONS.topRightDiamond : "sm:top-[6%]"
        }`}
        style={{
          "--ornament-rot-start": "0deg",
          "--ornament-rot-end": "12deg",
          animationDelay: "150ms",
        } as React.CSSProperties}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="8"
          y="8"
          width="38"
          height="38"
          rx="3"
          transform="rotate(45 27 27)"
          fill="var(--main)"
          stroke="var(--border)"
          strokeWidth="3"
        />
      </svg>

      {/* Mid-left: Small circle (Desktop Only) */}
      <svg
        className={`ornament-entrance hidden sm:block absolute left-[5%] w-[45px] ${
          homeVariant ? HOME_DESKTOP_POSITIONS.midLeftCircle : "top-[55%]"
        }`}
        style={{
          animationDelay: "250ms",
        } as React.CSSProperties}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="var(--secondary-background)"
          stroke="var(--border)"
          strokeWidth="3"
        />
      </svg>

      {/* Bottom-left: Small cross/plus */}
      <svg
        className={`ornament-entrance absolute left-[3%] top-[700px] w-[40px] sm:w-[55px] ${
          homeVariant ? HOME_DESKTOP_POSITIONS.bottomLeftCross : "sm:top-auto sm:bottom-[20%]"
        }`}
        style={{
          "--ornament-rot-start": "-24deg",
          "--ornament-rot-end": "-12deg",
          animationDelay: "300ms",
        } as React.CSSProperties}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 5 L38 5 L38 22 L55 22 L55 38 L38 38 L38 55 L22 55 L22 38 L5 38 L5 22 L22 22 Z"
          fill="var(--main)"
          stroke="var(--border)"
          strokeWidth="3"
        />
      </svg>

      {/* Right mid: Zigzag/Lightning */}
      <svg
        className={`ornament-entrance absolute right-[3%] top-[300px] w-[40px] sm:w-[50px] ${
          homeVariant ? HOME_DESKTOP_POSITIONS.rightMidZigzag : "sm:top-[40%]"
        }`}
        style={{
          "--ornament-rot-start": "-6deg",
          "--ornament-rot-end": "6deg",
          animationDelay: "220ms",
        } as React.CSSProperties}
        viewBox="0 0 50 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 2 L48 30 L32 30 L45 55 L28 55 L40 78 L8 42 L25 42 L12 20 L28 20 Z"
          fill="var(--main)"
          stroke="var(--border)"
          strokeWidth="2.5"
        />
      </svg>

      {/* Top center-left: Small square */}
      <svg
        className={`ornament-entrance absolute left-[20%] top-[30px] w-[28px] sm:w-[35px] ${
          homeVariant ? HOME_DESKTOP_POSITIONS.topCenterSquare : "sm:top-[3%]"
        }`}
        style={{
          "--ornament-rot-start": "0deg",
          "--ornament-rot-end": "6deg",
          animationDelay: "180ms",
        } as React.CSSProperties}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="5"
          width="30"
          height="30"
          rx="3"
          fill="var(--secondary-background)"
          stroke="var(--border)"
          strokeWidth="3"
        />
      </svg>

      {/* Bottom center: Small triangle */}
      <svg
        className={`ornament-entrance absolute left-[35%] top-[950px] w-[40px] sm:w-[50px] ${
          homeVariant ? HOME_DESKTOP_POSITIONS.bottomCenterTriangle : "sm:top-auto sm:bottom-[5%]"
        }`}
        style={{
          "--ornament-rot-start": "12deg",
          "--ornament-rot-end": "-6deg",
          animationDelay: "320ms",
        } as React.CSSProperties}
        viewBox="0 0 60 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 5 L55 48 L5 48 Z"
          fill="var(--main)"
          stroke="var(--border)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
