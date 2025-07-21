import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ className, variant = "default", size = "default", children, ...props }, ref) => {
  const variants = {
    default: "glass-button",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30",
    ghost: "hover:bg-white/10 text-white",
    outline: "border border-white/30 bg-transparent hover:bg-white/5 text-white",
    gst: "gst-button",
    "gst-active": "gst-button gst-button-active",
  };

  const sizes = {
    default: "px-6 py-3",
    sm: "px-4 py-2 text-sm",
    lg: "px-8 py-4 text-lg",
    icon: "p-3",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500/50 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;