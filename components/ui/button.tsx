"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium cursor-pointer select-none",
    "transition-[background-color,border-color,color,transform] duration-200 ease-out",
    "active:scale-[0.97] active:duration-100",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "bg-fg text-bg hover:bg-fg/85",
        outline:
          "border border-line-strong text-fg hover:bg-surface hover:border-fg/30",
        ghost: "text-muted hover:text-fg hover:bg-surface",
      },
      size: {
        default: "h-11 px-5 text-small",
        sm: "h-9 px-4 text-small",
        lg: "h-12 pl-6 pr-2 text-body",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
