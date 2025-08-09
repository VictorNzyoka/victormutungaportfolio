"use client"

import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/education", label: "Education" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
] as const

export default function TopNav() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
      {links.map((l) => {
        const active = pathname === l.href
        return (
          <button
            key={l.href}
            type="button"
            onClick={() => router.push(l.href)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm transition",
              active
                ? "bg-neutral-900 text-neutral-100 border border-neutral-800"
                : "text-neutral-300 hover:text-neutral-100 hover:bg-neutral-900/60 border border-transparent",
            )}
            aria-current={active ? "page" : undefined}
            role="link"
          >
            {l.label}
          </button>
        )
      })}
    </nav>
  )
}
