import SiteFrame from "@/components/SiteFrame"
import { MotionFade } from "@/components/Transtion"
import { Suspense } from "react"
import ProjectsClient from "./projectclient"

export default function ProjectsPage() {
  return (
    <SiteFrame>
      <MotionFade>
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
              <p className="mt-2 max-w-prose text-sm text-neutral-400">
                Use the terminal: filter {"<q>"} or open {"<name>"}.
              </p>
            </div>
          </div>

          <Suspense fallback={<div className="mt-6 text-sm text-neutral-500">Loading…</div>}>
            <ProjectsClient />
          </Suspense>
        </section>
      </MotionFade>
    </SiteFrame>
  )
}
