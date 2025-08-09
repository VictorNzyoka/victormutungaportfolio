"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-emerald-600 text-white hover:bg-emerald-500",
        secondary: "border-transparent bg-neutral-800 text-neutral-100 hover:bg-neutral-700",
        destructive: "border-transparent bg-red-600 text-white hover:bg-red-500",
        outline: "border-neutral-800 bg-transparent text-neutral-300 hover:bg-neutral-900/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, variant, ...props }, ref) => {
  return <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
})
Badge.displayName = "Badge"

export { badgeVariants }
