import React, { useState, useRef, useEffect, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

const tooltipVariants = cva(
  "absolute z-50 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all duration-200 ease-out pointer-events-auto shadow-lg",
  {
    variants: {
      variant: {
        dark: "bg-slate-900 text-white border border-slate-800",
        light: "bg-white text-gray-900 border border-gray-200 shadow-md",
        primary: "bg-indigo-600 text-white border border-indigo-500",
        destructive: "bg-red-600 text-white border border-red-500",
        outline: "bg-white/95 text-gray-800 border border-gray-300 backdrop-blur-sm",
      },
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2.5",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2.5",
        left: "right-full top-1/2 -translate-y-1/2 mr-2.5",
        right: "left-full top-1/2 -translate-y-1/2 ml-2.5",
      },
    },
    defaultVariants: {
      variant: "dark",
      position: "top",
    },
  }
);

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  children: React.ReactNode;
  content: React.ReactNode;
  trigger?: "hover" | "click" | "focus";
  showArrow?: boolean;
  interactive?: boolean;
  delay?: number;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  forceOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  tooltipClassName?: string;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      position = "top",
      variant = "dark",
      trigger = "hover",
      showArrow = true,
      interactive = false,
      delay = 150,
      disabled = false,
      open: controlledOpen,
      defaultOpen = false,
      forceOpen = false,
      onOpenChange,
      className,
      tooltipClassName,
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = forceOpen || (isControlled ? controlledOpen : uncontrolledOpen);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const setOpenState = useCallback(
      (newOpen: boolean) => {
        if (disabled) return;
        if (!isControlled) {
          setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [disabled, isControlled, onOpenChange]
    );

    const handleOpen = useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (delay > 0 && trigger === "hover") {
        timeoutRef.current = setTimeout(() => {
          setOpenState(true);
        }, delay);
      } else {
        setOpenState(true);
      }
    }, [delay, setOpenState, trigger]);

    const handleClose = useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (delay > 0 && trigger === "hover") {
        timeoutRef.current = setTimeout(() => {
          setOpenState(false);
        }, delay);
      } else {
        setOpenState(false);
      }
    }, [delay, setOpenState, trigger]);

    const handleToggle = useCallback((e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (isOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    }, [isOpen, handleClose, handleOpen]);

    // Close on click outside when trigger is 'click'
    useEffect(() => {
      if (trigger !== "click" || !isOpen || forceOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setOpenState(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [trigger, isOpen, forceOpen, setOpenState]);

    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    // Get arrow color matching the variant
    const getArrowColorClass = () => {
      switch (variant) {
        case "dark":
          return "text-slate-900";
        case "light":
        case "outline":
          return "text-white";
        case "primary":
          return "text-indigo-600";
        case "destructive":
          return "text-red-600";
        default:
          return "text-slate-900";
      }
    };

    // Arrow CSS position classes
    const getArrowClasses = () => {
      const base = "absolute w-0 h-0 border-[6px] border-transparent";
      const colorClass = getArrowColorClass();

      switch (position) {
        case "top":
          return cn(base, "top-full left-1/2 -translate-x-1/2 border-t-current", colorClass);
        case "bottom":
          return cn(base, "bottom-full left-1/2 -translate-x-1/2 border-b-current", colorClass);
        case "left":
          return cn(base, "left-full top-1/2 -translate-y-1/2 border-l-current", colorClass);
        case "right":
          return cn(base, "right-full top-1/2 -translate-y-1/2 border-r-current", colorClass);
        default:
          return "";
      }
    };

    // Interactive invisible bridge to preserve hover when moving mouse from trigger to tooltip
    const getBridgeClasses = () => {
      if (!interactive) return "";
      switch (position) {
        case "top":
          return "before:absolute before:-bottom-3 before:left-0 before:right-0 before:h-3 before:content-['']";
        case "bottom":
          return "before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']";
        case "left":
          return "before:absolute before:-right-3 before:top-0 before:bottom-0 before:w-3 before:content-['']";
        case "right":
          return "before:absolute before:-left-3 before:top-0 before:bottom-0 before:w-3 before:content-['']";
        default:
          return "";
      }
    };

    const triggerHandlers = {
      ...(trigger === "hover" && {
        onMouseEnter: handleOpen,
        onMouseLeave: handleClose,
      }),
      ...(trigger === "click" && {
        onClick: handleToggle,
      }),
      ...(trigger === "focus" && {
        onFocus: handleOpen,
        onBlur: handleClose,
      }),
    };

    const tooltipHandlers = interactive && trigger === "hover"
      ? {
          onMouseEnter: handleOpen,
          onMouseLeave: handleClose,
        }
      : {};

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn("relative inline-block", className)}
        {...triggerHandlers}
      >
        {children}

        {isOpen && !disabled && (
          <div
            className={cn(
              tooltipVariants({ variant, position }),
              getBridgeClasses(),
              "animate-fadeIn select-none",
              tooltipClassName
            )}
            {...tooltipHandlers}
            role="tooltip"
          >
            {content}
            {showArrow && <div className={getArrowClasses()} />}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";
