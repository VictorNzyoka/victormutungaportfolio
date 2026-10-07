"use client"

import Link from "next/link"
import SiteFrame from "@/components/SiteFrame"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MotionFade, MotionFloat } from "@/components/Transtion"
import { TerminalSquare } from "lucide-react"

export default function HomePage() {
  return (
    <SiteFrame>
      <Card className="relative h-[var(--panel-h)] overflow-hidden border-neutral-800 bg-neutral-900/60">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl" />
          <div className="absolute -right-16 bottom-1/4 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.25))]" />
        </div>

        <CardContent className="relative z-10 flex h-full flex-col items-start justify-center p-6 sm:p-10">
          <MotionFade delay={0.08}>
            <p className="text-sm font-medium tracking-wide text-emerald-400">Software Engineer · AI &amp; Education</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl">
              Hi, I&apos;m Victor Nzyoka.
            </h1>
          </MotionFade>

          <MotionFade delay={0.12}>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-neutral-400">
              I build practical software for learning and assessment. At Nyansapo AI, I contribute to Hekima Learning and
              Stadi Learn, maintain the NAO Assessments dashboard, and fine-tune OCR and speech-to-text models before
              packaging inference services with FastAPI and Docker for Azure deployment.
            </p>
          </MotionFade>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="sm">
              <Link href="/projects">Explore projects</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/experience">View experience</Link>
            </Button>
          </div>

          <MotionFloat amplitude={4} duration={7}>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/70 px-3 py-1.5 text-xs text-neutral-400">
              <TerminalSquare className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              Type {"'help'"} in the terminal to see commands.
            </div>
          </MotionFloat>
        </CardContent>
      </Card>
    </SiteFrame>
  )
}
