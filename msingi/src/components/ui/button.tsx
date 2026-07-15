import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded text-[13px] font-semibold uppercase tracking-wide transition-colors disabled:opacity-40 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-ink text-ivory hover:bg-burnt",
        outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
        ghost: "text-ink hover:bg-ink/5",
        gold: "bg-gold text-ink hover:bg-gold-600",
      },
      size: {
        sm: "px-4 py-2 text-[11px]",
        md: "px-6 py-3",
        lg: "px-8 py-4 text-[14px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

// Exported so <Link> and other non-<button> elements can share the
// exact same visual variants (e.g. a primary-styled nav CTA link).
export { buttonVariants };
