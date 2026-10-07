import ProjectsGrid from "@/components/ProjectGrid"
import SiteFrame from "@/components/SiteFrame"
import { MotionFade } from "@/components/Transtion"
import { projects } from "@/lib/data/projects"

type ProjectsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams
  const filter = Array.isArray(params.q) ? params.q[0] : params.q

  return (
    <SiteFrame>
      <MotionFade>
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Selected work</h1>
              <p className="mt-2 max-w-prose text-sm text-neutral-400">
                Education products and applied AI from my work at Nyansapo AI, alongside my personal software projects.
              </p>
            </div>
          </div>

          <ProjectsGrid projects={projects} filter={filter} />
        </section>
      </MotionFade>
    </SiteFrame>
  )
}
