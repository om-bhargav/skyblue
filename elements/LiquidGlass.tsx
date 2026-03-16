import React from "react"

interface LiquidGlassProps {
  children: React.ReactNode
  className?: string
}

export default function LiquidGlass({ children, className = "" }: Readonly<LiquidGlassProps>) {
  return (
    <div
      className={`
      relative overflow-hidden
      bg-white/10 rounded-full
      backdrop-blur-sm backdrop-saturate-150
      shadow-[0_10px_40px_rgba(0,0,0,0.25)]
      border border-gray-100/50
      ${className}
      `}
    >
      {/* light reflection */}
      <div
        className="
        pointer-events-none absolute inset-0
        bg-[linear-gradient(120deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.15)_35%,rgba(255,255,255,0.05)_55%,transparent_60%)]
        opacity-60
        stroke-3 stroke-red-500

        "
      />

      {/* inner glow */}
      <div
        className="
        pointer-events-none absolute inset-0 rounded-3xl
        shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]

        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}