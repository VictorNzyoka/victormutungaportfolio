"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  viewportClassName?: string
}

/**
 * Minimal ScrollArea compatible with shadcn/ui API.
 * Renders a wrapper and a scrollable viewport div.
 */
const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, viewportClassName, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative h-full w-full", className)} {...props}>
        <div className={cn("h-full w-full overflow-auto", viewportClassName)}>{children}</div>
      </div>
    )
  },
)
ScrollArea.displayName = "ScrollArea"

export { ScrollArea }
