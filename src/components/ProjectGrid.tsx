"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

export type Project = {
  id: string
  name: string
  description: string
  tags: string[]
  href: string
}

export default function ProjectsGrid({ projects, filter }: { projects: Project[]; filter?: string }) {
  const q = (filter ?? "").toLowerCase()
  const filtered = projects.filter(
    (p) => !q || p.name.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)),
  )

  return (
    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {filtered.map((p) => (
        <Card key={p.id} className="group border-neutral-800 bg-neutral-950/60 transition hover:border-neutral-700">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-medium text-neutral-100">{p.name}</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-neutral-400">{p.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <Badge key={t} variant="outline" className="border-neutral-800 bg-neutral-900/60 text-neutral-300">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild className="gap-2 text-neutral-300">
              <a href={p.href} target="_blank" rel="noreferrer">
                Open <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
      {filtered.length === 0 && (
        <div className="col-span-full rounded-xl border border-neutral-800 bg-neutral-950/60 p-6 text-sm text-neutral-400">
          No projects match your filter. Try a different query.
        </div>
      )}
    </div>
  )
}
