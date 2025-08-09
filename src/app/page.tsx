"use client"

import SiteFrame from "@/components/SiteFrame"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MotionFade, MotionFloat } from "@/components/Transtion"
import { ArrowRight, TerminalSquare } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  return (
    <SiteFrame>
      {/* Match terminal height */}
      <Card className="relative h-[var(--panel-h)] overflow-hidden border-neutral-800 bg-neutral-900/60">
        {/* Subtle background accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl" />
          <div className="absolute -right-16 bottom-1/4 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.25))]" />
        </div>

        <CardContent className="relative z-10 flex h-full flex-col items-start justify-center p-6 sm:p-10">
          <MotionFade delay={0.08}>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl">
              Welcome,I’m Victor.
            </h1>
          </MotionFade>

          <MotionFade delay={0.12}>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-neutral-400">
              I build practical, human‑centered software with a focus on clarity and performance. Use the terminal on
              the right to explore, try {"'help'"}.
            </p>
          </MotionFade>

          {/* Terminal hint pill */}
          <MotionFloat amplitude={4} duration={7}>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/70 px-3 py-1.5 text-xs text-neutral-400">
              <TerminalSquare className="h-3.5 w-3.5 text-emerald-400" />
              Type {"'help'"} in the terminal to see commands.
            </div>
          </MotionFloat>
        </CardContent>
      </Card>
    </SiteFrame>
  )
}
