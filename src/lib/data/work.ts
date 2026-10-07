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
      "Building React Native learning apps with Next.js and Firebase backends; integrating DeepSeek AI for analysis; maintaining the Next.js/Firebase/Redux NAO Assessments dashboard; and fine-tuning TrOCR and Whisper models, serving them through FastAPI APIs containerized with Docker and deployed on Azure.",
    tech: ["React Native", "Next.js", "Firebase", "Cloud Functions", "Redux", "DeepSeek AI", "TypeScript", "Python", "Hugging Face Transformers", "TrOCR", "Whisper Small", "FastAPI", "Docker", "Azure"],
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
