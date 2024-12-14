import { cn } from "@/lib/utils";
import React from "react";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full bg-transparent px-3 py-2 border-b border-stone-300 focus-visible:border-stone-400 transition-colors  disabled:cursor-not-allowed disabled:opacity-50  ",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export default Input;
