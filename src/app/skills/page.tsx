"use client"

import SiteFrame from "@/components/SiteFrame"
import { MotionFade } from "@/components/Transtion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Boxes, Database, Wrench } from "lucide-react"
import type { JSX } from "react" // Import JSX to declare it

const groups = {
  Languages: ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL"],
  Frameworks: ["React", "Next.js", "Node.js", "Express", "Nextjs", "React Native"],
  Databases: ["PostgreSQL", "MySQL", "MongoDB", "Superbase", "Firebase"],
  Tools: ["Git", "Docker", "Cloud", "Bash", "Jest", "Figma"],
} as const;


const icons: Record<keyof typeof groups, JSX.Element> = {
  Languages: <Code2 className="h-4 w-4 text-emerald-400" />,
  Frameworks: <Boxes className="h-4 w-4 text-emerald-400" />,
  Databases: <Database className="h-4 w-4 text-emerald-400" />,
  Tools: <Wrench className="h-4 w-4 text-emerald-400" />,
}

export default function SkillsPage() {
  return (
    <SiteFrame>
      <MotionFade>
        {/* Match terminal height */}
        <Card className="h-[var(--panel-h)] overflow-hidden border-neutral-800 bg-neutral-900/60">
          <CardContent className="flex h-full flex-col p-6 sm:p-8">
            <header>
              <span className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-950/60 px-3 py-1 text-xs text-neutral-400">
                Tech Stack
              </span>
              <h1 className="mt-4 text-2xl font-semibold tracking-tight">Skills</h1>
              <p className="mt-2 max-w-prose text-sm text-neutral-400">
                A minimal snapshot of the tools I use regularly.
              </p>
            </header>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {Object.entries(groups).map(([title, list]) => (
                <section
                  key={title}
                  aria-labelledby={`skill-${title}`}
                  className="rounded-xl border border-neutral-800/60 bg-neutral-950/40 p-4"
                >
                  <div className="mb-3 flex items-center gap-2">
                    {icons[title as keyof typeof groups]}
                    <h2 id={`skill-${title}`} className="text-sm font-medium text-neutral-300">
                      {title}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {list.map((item) => (
                      <Badge
                        key={item}
                        variant="outline"
                        className="border-neutral-800 bg-neutral-900/60 text-neutral-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Spacer grows to push footer hint to bottom on tall screens */}
            <div className="flex-1" />

            <footer className="mt-6 text-xs text-neutral-500">
              Tip: Use the terminal to navigate — try {"'go projects'"} or {"'cd ..'"} to return home.
            </footer>
          </CardContent>
        </Card>
      </MotionFade>
    </SiteFrame>
  )
}
