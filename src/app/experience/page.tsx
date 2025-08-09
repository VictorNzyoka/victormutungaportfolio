"use client"

import SiteFrame from "@/components/SiteFrame"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scrollarea"
import { MotionFade } from "@/components/Transtion"
import { workItems } from "@/lib/data/work"
import styles from "@/components/noscrollbar.module.css"

export default function ExperiencePage() {
  // newest first
  const items = [...workItems].sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())

  return (
    <SiteFrame>
      <MotionFade>
        {/* Equal height with terminal */}
        <Card className="h-[var(--panel-h)] overflow-hidden border-neutral-800 bg-neutral-900/60">
          <CardContent className="h-full p-0">
            {/* Internal scroll; scrollbar hidden */}
            <ScrollArea className="h-full" viewportClassName={styles.noScrollbar}>
              <div className="relative p-6 sm:p-8">
                {/* Soft gradient accent in the background */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl" />
                  <div className="absolute right-0 bottom-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
                </div>

                <header className="relative z-10">
                  <span className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-950/60 px-3 py-1 text-xs text-neutral-400">
                    Experience
                  </span>
                  <h1 className="mt-4 text-2xl font-semibold tracking-tight">Work Experience</h1>
                  <p className="mt-2 max-w-prose text-sm text-neutral-400">
                    A brief snapshot of recent roles and impact.
                  </p>
                </header>

                {/* Timeline */}
                <ol className="relative z-10 mt-8 space-y-6 border-l border-neutral-800 pl-6">
                  {items.map((job, i) => (
                    <li key={`${job.company}-${job.role}`} className="relative">
                      {/* Rail dot */}
                      <span className="absolute -left-2 top-3 h-3 w-3 rounded-full border border-emerald-600 bg-emerald-500/40" />

                      {/* Card */}
                      <div className="group rounded-xl border border-neutral-800 bg-neutral-950/50 p-4 transition hover:border-neutral-700">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-sm font-medium text-neutral-200">
                            {job.role} — {job.company}
                          </h2>
                          <Badge variant="outline" className="border-neutral-800 bg-neutral-900/60">
                            {job.period}
                          </Badge>
                        </div>

                        {/* Single brief summary line as requested */}
                        <p className="mt-2 text-sm leading-relaxed text-neutral-300">{job.summary}</p>

                        {job.tech && job.tech.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {job.tech.map((t) => (
                              <Badge
                                key={t}
                                variant="outline"
                                className="border-neutral-800 bg-neutral-900/60 text-neutral-300"
                              >
                                {t}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>

                <footer className="relative z-10 mt-8 text-xs text-neutral-500">
                  Tip: In the terminal, try {"'go education'"} or {"'cd ..'"} to go home.
                </footer>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </MotionFade>
    </SiteFrame>
  )
}
