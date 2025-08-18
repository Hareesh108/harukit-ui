"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipContextProps {
  triggerRef: React.RefObject<HTMLElement | null>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const TooltipContext = React.createContext<TooltipContextProps | null>(null);

// ---------------- Provider ----------------
const TooltipProvider = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = React.useState(false);
  const triggerRef = React.useRef<HTMLElement | null>(null);

  const value = React.useMemo(
    () => ({ triggerRef, visible, setVisible }),
    [visible]
  );

  return (
    <TooltipContext.Provider value={value}>
      <div className="relative inline-block">{children}</div>
    </TooltipContext.Provider>
  );
};

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const TooltipTrigger = React.forwardRef<HTMLSpanElement, TooltipTriggerProps>(
  ({ children, ...props }, ref) => {
    const context = React.useContext(TooltipContext);
    if (!context) throw new Error("TooltipTrigger must be inside Tooltip");

    const { triggerRef, setVisible } = context;

    return (
      <span
        ref={(node) => {
          triggerRef.current = node as HTMLElement;
          if (typeof ref === "function") ref(node as HTMLSpanElement);
          else if (ref)
            (ref as React.MutableRefObject<HTMLSpanElement | null>).current =
              node;
        }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        tabIndex={0} // ✅ keyboard accessibility
        data-tooltip-trigger=""
        {...props}
      >
        {children}
      </span>
    );
  }
);
TooltipTrigger.displayName = "TooltipTrigger";

interface TooltipContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ children, side = "top", sideOffset = 6, className, ...props }, ref) => {
    const context = React.useContext(TooltipContext);
    if (!context) throw new Error("TooltipContent must be inside Tooltip");

    const { triggerRef, visible } = context;
    if (!visible || !triggerRef.current) return null;

    const sideClasses = {
      top: "bottom-full left-1/2 -translate-x-1/2",
      bottom: "top-full left-1/2 -translate-x-1/2",
      left: "right-full top-1/2 -translate-y-1/2",
      right: "left-full top-1/2 -translate-y-1/2",
    }[side];

    const offsetStyle =
      side === "top"
        ? { marginBottom: sideOffset }
        : side === "bottom"
          ? { marginTop: sideOffset }
          : side === "left"
            ? { marginRight: sideOffset }
            : { marginLeft: sideOffset };

    return (
      <div
        ref={ref}
        role="tooltip"
        style={offsetStyle}
        className={cn(
          "absolute z-50 whitespace-nowrap rounded-lg border bg-gray-900 text-white text-xs px-3 py-1.5 shadow-lg",
          visible
            ? "opacity-100 scale-100 transition-all duration-150"
            : "opacity-0 scale-95",
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
