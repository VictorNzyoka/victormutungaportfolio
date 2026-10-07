export type WorkItem = {
  role: string
  company: string
  period: string
  summary: string
  tech?: string[]
  start: string // ISO date for sorting newest first
}

export const workItems: WorkItem[] = [
  {
    role: "Full‑Stack Developer",
    company: "Nyansapo AI",
    period: "Mar 2025 – Present",
    start: "2025-03-01",
    summary:
      "Contributing to Nyansapo AI's learning and assessment products: working on Hekima Learning and StadiMath, fine-tuning OCR and speech-to-text models deployed on Azure, and maintaining the NAO Assessments dashboard.",
    tech: ["Next.js", "Firebase", "TypeScript", "Azure", "OCR", "Speech-to-text", "Model fine-tuning"],
  },
  {
    role: "Backend Intern",
    company: "Virtual Mechatronics Lab (Siemens), Dedan Kimathi University of Technology",
    period: "Aug 2024 – Dec 2024",
    start: "2024-08-01",
    summary:
      "Optimized backend services, integrated MongoDB/PostgreSQL, designed and tested RESTful APIs, and reduced errors through code reviews and debugging.",
    tech: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST"],
  },
]
