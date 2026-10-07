import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

export type Project = {
  id: string
  name: string
  description: string
  tags: string[]
  organization?: string
  availability?: string
  href?: string
}

export default function ProjectsGrid({ projects, filter }: { projects: Project[]; filter?: string }) {
  const query = (filter ?? "").trim().toLowerCase()
  const filtered = projects.filter((project) => {
    if (!query) return true

    const searchFields = [
      project.name,
      project.description,
      project.organization ?? "",
      project.availability ?? "",
      ...project.tags,
    ]

    return searchFields.some((field) => field.toLowerCase().includes(query))
  })
  const nyansapoProjects = filtered.filter((project) => project.organization === "Nyansapo AI")
  const personalProjects = filtered.filter((project) => project.organization !== "Nyansapo AI")

  return (
    <div className="mt-8 flex flex-col gap-10">
      {nyansapoProjects.length > 0 && (
        <section aria-labelledby="nyansapo-projects-heading">
          <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="nyansapo-projects-heading" className="text-lg font-semibold text-neutral-100">
                Nyansapo AI
              </h2>
              <p className="mt-1 text-sm text-neutral-400">Learning products, applied AI, and assessment tools.</p>
            </div>
            <Badge variant="outline" className="border-neutral-800 bg-neutral-950/60 text-neutral-400">
              {nyansapoProjects.length} {nyansapoProjects.length === 1 ? "project" : "projects"}
            </Badge>
          </header>
          <ProjectCards projects={nyansapoProjects} />
        </section>
      )}

      {personalProjects.length > 0 && (
        <section aria-labelledby="personal-projects-heading">
          <header className="mb-4">
            <h2 id="personal-projects-heading" className="text-lg font-semibold text-neutral-100">
              Personal projects
            </h2>
          </header>
          <ProjectCards projects={personalProjects} />
        </section>
      )}

      {filtered.length === 0 && (
        <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-6 text-sm text-neutral-400">
          No projects match your filter. Try a different query.
        </div>
      )}
    </div>
  )
}

function ProjectCards({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="group flex h-full flex-col border-neutral-800 bg-neutral-950/60 transition hover:border-neutral-700"
        >
          <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
            <h3 className="text-lg font-medium text-neutral-100">{project.name}</h3>
            {project.availability && (
              <Badge variant="outline" className="shrink-0 border-neutral-800 bg-neutral-900/60 text-neutral-300">
                {project.availability}
              </Badge>
            )}
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-3">
            <p className="text-sm leading-relaxed text-neutral-400">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-neutral-800 bg-neutral-900/60 text-neutral-300">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-3 pt-2">
            <span className="text-xs text-neutral-500">{project.organization ?? "Personal project"}</span>
            {project.href && (
              <Button variant="ghost" size="sm" asChild className="gap-2 text-neutral-300">
                <a href={project.href} target="_blank" rel="noopener noreferrer">
                  View project <ExternalLink data-icon="inline-end" aria-hidden="true" />
                </a>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
