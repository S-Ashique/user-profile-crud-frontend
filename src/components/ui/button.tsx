"use client";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion,  } from "motion/react";
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium  transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-t from-stone-600 to-stone-950 text-white focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:ring-stone-950",
        destructive:
          "text-white bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-400 via-rose-500 to-pink-600 focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:ring-red-500",
        link: "text-stone-950  underline-offset-4 hover:underline focus-visible:underline",
        ghost:
          "bg-stone-100 text-stone-950 hover:bg-stone-200 focus-visible:bg-stone-200 focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:ring-stone-200  ",
      },
      size: {
        default: "h-10 px-4 py-2",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef<
  HTMLButtonElement,
  HTMLMotionProps<"button"> & VariantProps<typeof buttonVariants>
>(({ className, variant, size, ...props }, ref) => {
  return (
    <motion.button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
      whileHover={{ scale: 1.05 }}
      whileFocus={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    />
  );
});

Button.displayName = "Button";

export default Button;
