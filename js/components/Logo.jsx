export const Logo = ({
  className = "",
  variant = "dark",
  showSubtitle = true,
  size = "md"
}) => {
  const isDark = variant === "dark";
  const mainStroke = isDark ? "#ffffff" : "#18181b";
  const greyStroke = isDark ? "#9ca3af" : "#6b7280";
  const yellowAccent = "#fbbf24";
  const dimensions = {
    sm: { icon: "w-8 h-8", text: "text-sm", sub: "text-[9px]" },
    md: { icon: "w-10 h-10 md:w-11 md:h-11", text: "text-base md:text-lg", sub: "text-[10px] md:text-xs" },
    lg: { icon: "w-14 h-14 md:w-16 md:h-16", text: "text-xl md:text-2xl", sub: "text-xs md:text-sm" }
  }[size];
  return <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {
    /* Clean Monogram Camera Emblem matching original image layout */
  }
      <div className={`relative ${dimensions.icon} flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
        <svg
    viewBox="0 0 200 200"
    className="w-full h-full drop-shadow-sm"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
          {
    /* Top Viewfinder & B Loop */
  }
          <path
    d="M 78 58 
               C 74 46, 88 32, 102 32 
               C 118 32, 128 42, 126 56 
               C 124 70, 106 74, 96 76
               C 128 78, 142 94, 138 116
               C 134 134, 114 142, 92 140"
    stroke={mainStroke}
    strokeWidth="11"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

          {
    /* Left Camera Body Corner Bracket */
  }
          <path
    d="M 68 84 
               L 68 132 
               C 68 142, 76 148, 88 148 
               L 112 148"
    stroke={mainStroke}
    strokeWidth="11"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

          {
    /* Right Camera Body Side Bracket */
  }
          <path
    d="M 124 82 
               L 146 82 
               C 156 82, 162 88, 162 98 
               L 162 132 
               C 162 142, 154 148, 144 148
               L 136 148"
    stroke={greyStroke}
    strokeWidth="10"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

          {
    /* Center Lens Ring */
  }
          <path
    d="M 82 110 
               A 26 26 0 1 0 118 102"
    stroke={greyStroke}
    strokeWidth="9"
    strokeLinecap="round"
  />

          {
    /* Golden Yellow Accent Arc */
  }
          <path
    d="M 82 110 
               A 26 26 0 0 1 100 78"
    stroke={yellowAccent}
    strokeWidth="11"
    strokeLinecap="round"
  />
        </svg>
      </div>

      {
    /* Typography: JB Szende PHOTOGRAPHY */
  }
      <div className="flex flex-col justify-center leading-tight">
        <span className={`font-bold tracking-tight ${dimensions.text} ${isDark ? "text-zinc-100" : "text-zinc-900"} font-sans`}>
          JB Szende
        </span>
        {showSubtitle && <span className={`font-bold tracking-[0.25em] uppercase ${dimensions.sub} ${isDark ? "text-amber-400" : "text-amber-600"}`}>
            PHOTOGRAPHY
          </span>}
      </div>
    </div>;
};
