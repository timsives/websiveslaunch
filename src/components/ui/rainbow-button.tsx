import React from "react";
import { cn } from "../../lib/utils";

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-12 w-fit animate-rainbow items-center justify-center rounded-full border-0 px-6 py-3 text-primary-foreground font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",

        // animated border-glow background
        "bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent]",

        // rainbow glow on both top & bottom
        "before:absolute before:inset-0 before:-z-10 before:rounded-full before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(12px)]",

        // color layers
        "bg-[linear-gradient(#121213,#121213),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
        
        // Ensure white text is visible
        "text-white",

        className,
      )}
      {...props}
    >
      <span className="relative z-10 text-white font-semibold">{children}</span>
    </button>
  );
}
