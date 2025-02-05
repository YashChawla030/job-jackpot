import React, { ComponentPropsWithoutRef, CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 525,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
  ...props
}: RippleProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none",
        className
      )}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70; // Increase circle size progressively
        const opacity = Math.max(mainCircleOpacity - i * 0.03, 0.05); // Prevent opacity from going negative
        const animationDelay = `${i * 0.06}s`; // Stagger animation for a ripple effect
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid"; // Last circle dashed for visual variety
        const borderOpacity = 40 - i * 3; // Ensure border color becomes lighter for outer circles
        const tealColor = `hsl(174, 65%, ${borderOpacity}%)`; // Teal shade for the border

        return (
          <div
            key={i}
            className={`absolute animate-ripple rounded-full border shadow-xl`}
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                borderStyle,
                borderWidth: "2px",
                borderColor: tealColor,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
                backgroundColor: `rgba(15, 118, 110, ${opacity})`, // Tailwind's teal-700 as fallback background
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";
