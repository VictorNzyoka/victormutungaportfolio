"use client"

import SiteFrame from "@/components/SiteFrame"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scrollarea"
import { Badge } from "@/components/ui/badge"
import { MotionFade } from "@/components/Transtion"
import { educationTimeline } from "@/lib/data/education"

export default function EducationPage() {
  return (
    <SiteFrame>
      <MotionFade>
        {/* Equal height with terminal */}
        <Card className="h-[var(--panel-h)] overflow-hidden border-neutral-800 bg-neutral-900/60">
          <CardContent className="h-full p-0">
            {/* Scroll within the card, not the page */}
            <ScrollArea className="h-full">
              <div className="p-6 sm:p-8">
                <header>
                  <span className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-950/60 px-3 py-1 text-xs text-neutral-400">
                    Education
                  </span>
                  <h1 className="mt-4 text-2xl font-semibold tracking-tight">Education</h1>
                  <p className="mt-2 max-w-prose text-sm text-neutral-400">
                    A concise overview of my academic background.
                  </p>
                </header>

                {/* Minimal vertical timeline without highlights */}
                <ol className="relative mt-8 space-y-8 border-l border-neutral-800 pl-6">
                  {educationTimeline.map((item) => (
                    <li key={item.year} className="relative">
                      <span className="absolute -left-2 top-1.5 h-3 w-3 rounded-full border border-emerald-600 bg-emerald-500/40" />
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="border-neutral-800 bg-neutral-900/60">
                          {item.year}
                        </Badge>
                        <h3 className="text-sm font-medium text-neutral-200">{item.title}</h3>
                      </div>

                      {/* Only the core education line(s), no “highlights” section */}
                      <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                        {item.education.map((e) => (
                          <li key={e} className="rounded-md border border-neutral-800 bg-neutral-950/50 px-3 py-2">
                            {e}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>

                <footer className="mt-8 text-xs text-neutral-500">
                  Tip: Use the terminal — try {'"cd experience"'} or {'"cd .."'} to return home.
                </footer>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </MotionFade>
    </SiteFrame>
  )
}
