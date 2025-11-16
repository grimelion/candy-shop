interface WavyDividerProps {
  position: "top" | "bottom"
  color: string
}

export function WavyDivider({ position, color }: WavyDividerProps) {
  return (
    <div
      className={`absolute left-0 right-0 h-20 ${
        position === "top" ? "top-0 -translate-y-1/2" : "bottom-0 translate-y-1/2 rotate-180"
      }`}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}
