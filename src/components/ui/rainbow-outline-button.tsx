import React from "react";
import { cn } from "../../lib/utils";

interface RainbowOutlineButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function RainbowOutlineButton({
  children,
  className,
  ...props
}: RainbowOutlineButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        
        // White background with rainbow animated border
        "bg-white text-gray-900 hover:bg-gray-50",
        
        // Static rainbow border using pseudo-element
        "before:absolute before:inset-0 before:-z-10 before:rounded-full before:p-[2px] before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
        
        // Inner content area
        "before:content-[''] after:absolute after:inset-[2px] after:rounded-full after:bg-white after:-z-10",
        
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
