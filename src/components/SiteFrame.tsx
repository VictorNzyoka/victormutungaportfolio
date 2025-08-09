"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import TerminalPanel from "@/components/TerminalPanel"
import { Menu, TerminalSquare, LayoutList } from "lucide-react"
import TopNav from "@/components/TopNav"
import { cn } from "@/lib/utils"

type NavMode = "terminal" | "navbar"
const STORAGE_KEY = "nav:mode:v1"

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<NavMode>("terminal")
  const [open, setOpen] = useState(false)

  // Read persisted mode on first load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as NavMode | null
      if (saved === "navbar" || saved === "terminal") setMode(saved)
    } catch {}
  }, [])

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {}
  }, [mode])

  const panelHeight = "calc(100vh - 6.5rem)" // header + gaps

  // Mobile toggle buttons for mode
  const ModeToggle = useMemo(() => {
    return (
      <div className="inline-flex items-center gap-1 rounded-md border border-neutral-900/70 bg-neutral-950/60 p-1">
        <Button
          variant="ghost"
          size="sm"
          aria-pressed={mode === "terminal"}
          className={cn("gap-2", mode === "terminal" && "bg-neutral-900 text-neutral-100 border border-neutral-800")}
          onClick={() => setMode("terminal")}
          title="Use terminal navigation"
        >
          <TerminalSquare className="h-4 w-4 text-emerald-400" />
          <span className="hidden sm:inline">Terminal</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          aria-pressed={mode === "navbar"}
          className={cn("gap-2", mode === "navbar" && "bg-neutral-900 text-neutral-100 border border-neutral-800")}
          onClick={() => setMode("navbar")}
          title="Use navbar navigation"
        >
          <LayoutList className="h-4 w-4 text-emerald-400" />
          <span className="hidden sm:inline">Navbar</span>
        </Button>
      </div>
    )
  }, [mode])

  // Mobile sheet trigger depends on mode: terminal or nav
  function MobileTrigger() {
    if (mode === "terminal") {
      return (
        <Button className="gap-2 lg:hidden bg-transparent" variant="outline" size="sm" onClick={() => setOpen(true)}>
          <TerminalSquare className="h-4 w-4" />
          Terminal
        </Button>
      )
    }
    // Navbar mode -> Menu for links
    return (
      <Button className="gap-2 md:hidden bg-transparent" variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Menu className="h-4 w-4" />
        Menu
      </Button>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <header className="sticky top-0 z-30 border-b border-neutral-900/60 bg-neutral-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          {/* Identity */}
          <div className="leading-tight">
            <div className="font-medium text-emerald-400">Victor Nzyoka</div>
            <div className="text-xs text-emerald-500">Software Engineer</div>
          </div>

          {/* Center: show navbar on desktop when in navbar mode */}
          {mode === "navbar" && <TopNav />}

          {/* Right: mode toggle + mobile trigger */}
          <div className="flex items-center gap-2">
            {ModeToggle}
            <MobileTrigger />
          </div>
        </div>

        {/* Mobile sheets for each mode */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom" className="h-[70vh] p-0">
            <SheetHeader className="px-4 pt-4">
              <SheetTitle className="text-left">{mode === "terminal" ? "Terminal" : "Navigation"}</SheetTitle>
            </SheetHeader>
            <div className="h-[calc(70vh-56px)]">
              {mode === "terminal" ? (
                <TerminalPanel closeMobile={() => setOpen(false)} />
              ) : (
                <div className="p-4">
                  {/* Mobile nav list */}
                  <nav aria-label="Mobile">
                    <ul className="space-y-2">
                      {[
                        { href: "/", label: "Home" },
                        { href: "/skills", label: "Skills" },
                        { href: "/projects", label: "Projects" },
                        { href: "/about", label: "About" },
                        { href: "/education", label: "Education" },
                        { href: "/experience", label: "Experience" },
                        { href: "/contact", label: "Contact" },
                      ].map((l) => (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            className="block rounded-md border border-neutral-900/70 bg-neutral-950 px-4 py-3 text-neutral-200 hover:bg-neutral-900/60"
                            onClick={() => setOpen(false)}
                          >
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="mt-4 text-xs text-neutral-500">
                    Tip: Switch back to Terminal mode using the toggle in the header.
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Layout */}
      <div
        className={cn(
          "mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:py-10",
          mode === "terminal" ? "grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px]" : "grid-cols-1",
        )}
       style={{ "--panel-h": panelHeight } as React.CSSProperties }
      >
        {/* Main content */}
        <div className="min-w-0">
          <div className="min-h-[var(--panel-h)]">{children}</div>
        </div>

        {/* Terminal sidebar (desktop) only in terminal mode */}
        {mode === "terminal" && (
          <aside className="sticky top-[5rem] hidden h-[var(--panel-h)] lg:block">
            <TerminalPanel />
          </aside>
        )}
      </div>
    </div>
  )
}
