"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import TerminalPanel from "@/components/TerminalPanel"
import { Menu } from "lucide-react"

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  // Keep the page card and the terminal the same height via a shared CSS var.
  const panelHeight = "calc(100vh - 6.5rem)" // header + gaps

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <header className="sticky top-0 z-30 border-b border-neutral-900/60 bg-neutral-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="leading-tight">
            <div className="font-medium text-emerald-400">Victor Nzyoka</div>
            <div className="text-xs text-emerald-500">Software Engineer</div>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className="gap-2 lg:hidden bg-transparent" variant="outline" size="sm">
                <Menu className="h-4 w-4" />
                Terminal
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh] p-0">
              <SheetHeader className="px-4 pt-4">
                <SheetTitle className="text-left">Terminal</SheetTitle>
              </SheetHeader>
              <div className="h-[calc(70vh-56px)]">
                <TerminalPanel closeMobile={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Split layout: share the same computed height on both columns */}
      <div
        className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:py-10"
        style={{ "--panel-h": panelHeight } as React.CSSProperties }
      >
        <div className="min-w-0">
          <div className="min-h-[var(--panel-h)]">{children}</div>
        </div>
        <aside className="sticky top-[5rem] hidden h-[var(--panel-h)] lg:block">
          <TerminalPanel />
        </aside>
      </div>
    </div>
  )
}
