"use client"

import { useSearchParams } from "next/navigation"
import ProjectsGrid from "@/components/ProjectGrid"
import { projects } from "@/lib/data/projects"

export default function ProjectsClient() {
  const params = useSearchParams()
  const q = params.get("q") ?? undefined
  return <ProjectsGrid projects={projects} filter={q} />
}
