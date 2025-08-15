"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const TooltipProvider = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

const Tooltip = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const TooltipTrigger = React.forwardRef<HTMLSpanElement, TooltipTriggerProps>(
  ({ children, ...props }, ref) => {
    return (
      <span ref={ref} data-tooltip-trigger="" {...props}>
        {children}
      </span>
    );
  }
);
TooltipTrigger.displayName = "TooltipTrigger";

interface TooltipContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  children: React.ReactNode; // renamed from content
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ children, side = "top", sideOffset = 4, className, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);
    const triggerRef = React.useRef<HTMLSpanElement | null>(null);

    React.useEffect(() => {
      const triggerEl = document.querySelector(
        "[data-tooltip-trigger]"
      ) as HTMLSpanElement;
      if (!triggerEl) return;

      triggerRef.current = triggerEl;

      const show = () => setVisible(true);
      const hide = () => setVisible(false);

      triggerEl.addEventListener("mouseenter", show);
      triggerEl.addEventListener("mouseleave", hide);
      triggerEl.addEventListener("focus", show);
      triggerEl.addEventListener("blur", hide);

      return () => {
        triggerEl.removeEventListener("mouseenter", show);
        triggerEl.removeEventListener("mouseleave", hide);
        triggerEl.removeEventListener("focus", show);
        triggerEl.removeEventListener("blur", hide);
      };
    }, []);

    if (!visible) return null;

    const sideClasses = {
      top: `bottom-full left-1/2 -translate-x-1/2 mb-[${sideOffset}px]`,
      bottom: `top-full left-1/2 -translate-x-1/2 mt-[${sideOffset}px]`,
      left: `right-full top-1/2 -translate-y-1/2 mr-[${sideOffset}px]`,
      right: `left-full top-1/2 -translate-y-1/2 ml-[${sideOffset}px]`,
    }[side];

    return (
      <div
        ref={ref}
        role="tooltip"
        className={cn(
          "absolute z-50 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
          sideClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
