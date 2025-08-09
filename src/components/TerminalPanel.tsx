"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scrollarea"
import { useRouter, usePathname } from "next/navigation"

type CmdEntry = { kind: "cmd"; user: string; host: string; path: string; command: string }
type OutEntry = { kind: "out"; text: string }
type LoadingEntry = { kind: "loading"; label: string; frame: number }
type Entry = CmdEntry | OutEntry | LoadingEntry

const USER = "victornzyoka"
const HOST = "portfolio"
const HOME = "~"
const STORAGE_KEY = "terminal:v1"

const LOADING_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]

export default function TerminalPanel({ closeMobile }: { closeMobile?: () => void }) {
  const router = useRouter()
  const pathname = usePathname()

  // Input & shell state
  const [value, setValue] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [idx, setIdx] = useState(-1)

  // Terminal state
  const [entries, setEntries] = useState<Entry[]>([{ kind: "out", text: 'Type "help" for commands.' }])
  const [cwd, setCwd] = useState<string>(pathFromRoute(pathname))

  // Refs
  const endRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null)
  const loadingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Sync scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [entries])

  // Restore from localStorage (once)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as { entries: Entry[]; cwd: string }
        // Use saved history but always reflect the actual route as cwd
        setEntries(parsed.entries ?? [])
      }
    } catch {}
    // Always sync cwd to route on first mount
    setCwd(pathFromRoute(pathname))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep cwd in sync with route changes
  useEffect(() => {
    setCwd(pathFromRoute(pathname))
  }, [pathname])

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ entries, cwd }))
    } catch {}
  }, [entries, cwd])

  const pages = useMemo(
    () =>
      ({
        home: "/",
        skills: "/skills",
        projects: "/projects",
        about: "/about",
        contact: "/contact",
        education: "/education",
        experience: "/experience",
      }) as const,
    [],
  )
  const commands = useMemo(
    () =>
      [
        "help",
        "go",
        "home",
        "skills",
        "projects",
        "about",
        "contact",
        "filter",
        "open",
        "clear",
        "pwd",
        "ls",
        "cd",
        "education",
        "experience",
      ] as const,
    [],
  )

  function push(entry: Entry | Entry[]) {
    setEntries((prev) => [...prev, ...(Array.isArray(entry) ? entry : [entry])])
  }

  function navigateWithLoading(path: string, label: string) {
    // Start a spinner line
    const index = entries.length
    push({ kind: "loading", label: `Opening ${label}`, frame: 0 })
    // Animate spinner frames
    loadingIntervalRef.current && clearInterval(loadingIntervalRef.current)
    loadingIntervalRef.current = setInterval(() => {
      setEntries((prev) =>
        prev.map((e, i) =>
          i === index && e.kind === "loading" ? { ...e, frame: (e.frame + 1) % LOADING_FRAMES.length } : e,
        ),
      )
    }, 90)
    // After a short delay, finalize line and navigate
    loadingTimerRef.current && clearTimeout(loadingTimerRef.current)
    loadingTimerRef.current = setTimeout(() => {
      if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current)
      setEntries((prev) =>
        prev.map((e, i) => (i === index && e.kind === "loading" ? { kind: "out", text: `Opened ${label}` } : e)),
      )
      try {
        // Save immediately before navigating so state persists across pages
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ entries: entries.concat({ kind: "out", text: `Opened ${label}` }), cwd }),
        )
      } catch {}
      if (pathname !== path) router.push(path)
      closeMobile?.()
    }, 600)
  }

  useEffect(() => {
    return () => {
      if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current)
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current)
    }
  }, [])

  function run(raw: string) {
    const input = raw.trim()
    if (!input) return

    // Echo the command with prompt
    push({ kind: "cmd", user: USER, host: HOST, path: cwd, command: input })

    setHistory((h) => [input, ...h])
    setIdx(-1)

    const [cmd, ...rest] = input.split(/\s+/)
    const arg = rest.join(" ").trim()

    switch (cmd.toLowerCase()) {
      case "help":
        push({
          kind: "out",
          text: [
            "Available commands:",
            "  help                           Show this help",
            "  go <home|skills|projects|about|contact|education|experience>",
            "  home|skills|projects|about|contact|education|experience   Navigate",
            "  cd <path>                      Navigate like a shell (.. and ~ supported)",
            "  pwd                            Print current path",
            "  ls                             List demo items",
            "  filter <q>                     /projects?q=<q>",
            "  open <name>                    /projects?q=<name>",
            "  clear                          Clear terminal",
          ].join("\n"),
        })
        break

      case "clear":
        setEntries([])
        break

      // Navigation group
      case "go": {
        const key = arg.toLowerCase() as keyof typeof pages
        if (pages[key]) {
          navigateWithLoading(pages[key], key)
        } else {
          push({ kind: "out", text: `Unknown section "${arg}". Try: ${Object.keys(pages).join(", ")}` })
        }
        break
      }
      case "home":
      case "skills":
      case "projects":
      case "about":
      case "contact":
      case "education":
      case "experience": {
        const key = cmd.toLowerCase() as keyof typeof pages
        navigateWithLoading(pages[key], key)
        break
      }

      // Projects helpers
      case "filter":
      case "open": {
        if (!arg) {
          push({ kind: "out", text: `Usage: ${cmd} <query>` })
        } else {
          const q = encodeURIComponent(arg)
          navigateWithLoading(`/projects?q=${q}`, `projects (query: ${arg})`)
        }
        break
      }

      // Shell-like path commands
      case "pwd":
        push({ kind: "out", text: cwd })
        break

      case "ls":
        push({
          kind: "out",
          text: ["./projects", "./skills", "./education.md", "./experience.md", "./about.md", "./contact.txt"].join(
            "\n",
          ),
        })
        break

      case "cd": {
        // Normalize relative paths
        const target = (arg || "~").trim()
        const route = normalizeCdTargetToRoute(target, cwd)
        if (route == null) {
          push({ kind: "out", text: `cd: no such file or directory: ${target}` })
        } else {
          navigateWithLoading(route, pathLabelFromRoute(route))
        }
        break
      }

      default:
        push({ kind: "out", text: `Command not found: ${cmd}. Type "help".` })
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(value)
      setValue("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const next = Math.min(history.length - 1, idx + 1)
      setIdx(next)
      setValue(history[next] ?? value)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const next = Math.max(-1, idx - 1)
      setIdx(next)
      setValue(next === -1 ? "" : (history[next] ?? ""))
    } else if (e.key === "Tab") {
      e.preventDefault()
      const token = value.trim().toLowerCase()
      const match = [...commands].find((s) => s.startsWith(token))
      if (match) setValue(match)
    }
  }

  return (
    <Card
      className="flex h-full flex-col overflow-hidden rounded-2xl border-neutral-800 bg-neutral-950/80 backdrop-blur"
      role="region"
      aria-label="Interactive terminal"
    >
      {/* Minimal header with emerald name/title */}
      <div className="border-b border-neutral-800 px-4 py-3">
        <div className="leading-tight">
          <div className="text-sm font-medium text-emerald-400">Victor Nzyoka</div>
          <div className="text-[11px] text-emerald-500">Software Engineer</div>
        </div>
      </div>

      {/* Terminal body with inline prompt input */}
      <ScrollArea className="flex-1 px-4 py-3" onClick={() => inputRef.current?.focus()}>
        <div className="space-y-1.5 font-mono text-[12px] leading-relaxed">
          {entries.map((entry, i) => {
            if (entry.kind === "cmd") {
              return (
                <PromptLine key={i} user={entry.user} host={entry.host} path={entry.path} command={entry.command} />
              )
            }
            if (entry.kind === "loading") {
              return (
                <div key={i} className="flex min-w-0 items-start gap-2">
                  <span className="shrink-0">
                    <PromptPrefix user={USER} host={HOST} path={cwd} />
                  </span>
                  <span className="inline-flex items-center gap-2 text-emerald-400">
                    <span className="opacity-90">{LOADING_FRAMES[entry.frame]}</span>
                    <span className="text-neutral-300">{entry.label}</span>
                  </span>
                </div>
              )
            }
            return (
              <div key={i} className="whitespace-pre-wrap text-neutral-300" aria-live="polite">
                {entry.text}
              </div>
            )
          })}

          {/* Live prompt with inline input */}
          <div className="flex min-w-0 items-start gap-2">
            <span className="shrink-0">
              <PromptPrefix user={USER} host={HOST} path={cwd} />
            </span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal input"
              className="min-w-0 flex-1 bg-transparent p-0 text-neutral-300 outline-none caret-emerald-400 placeholder:text-neutral-600"
              placeholder=""
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>

          <div ref={endRef} />
        </div>
      </ScrollArea>
    </Card>
  )
}

function PromptPrefix({ user, host, path }: { user: string; host: string; path: string }) {
  return (
    <span className="select-none">
      <span className="text-emerald-400">{user}</span>
      <span className="text-neutral-500">@</span>
      <span className="text-emerald-400">{host}</span>
      <span className="text-neutral-500">:</span>
      <span className="text-cyan-400">{path}</span>
      <span className="text-neutral-500"> $</span>
    </span>
  )
}

function PromptLine({
  user,
  host,
  path,
  command,
}: {
  user: string
  host: string
  path: string
  command: string
}) {
  return (
    <div className="flex min-w-0 items-start gap-2">
      <span className="shrink-0">
        <PromptPrefix user={user} host={host} path={path} />
      </span>
      <span className="min-w-0 break-words text-neutral-300">{command}</span>
    </div>
  )
}

/* Helpers */

function pathFromRoute(route: string): string {
  return route === "/" ? HOME : `${HOME}${route}`
}

function pathLabelFromRoute(route: string): string {
  if (route === "/") return "home"
  return route.replace(/^\//, "")
}

function normalizeCdTargetToRoute(target: string, currentCwd: string): string | null {
  // Basic normalization for ~, .., relative names and absolute /names
  if (target === "~" || target === "/") return "/"

  if (target === "..") {
    return "/"
  }

  // Remove leading "./"
  const clean = target.replace(/^\.\//, "")

  // If absolute like /about
  if (clean.startsWith("/")) {
    const route = sanitizeRoute(clean)
    return allowRoute(route) ? route : null
  }

  // If starts with ~/
  if (clean.startsWith("~/")) {
    const route = sanitizeRoute(clean.slice(1)) // remove leading ~
    return allowRoute(route) ? route : null
  }

  // Relative names like "about" from any location map to "/about"
  const route = sanitizeRoute("/" + clean.replace(/^\/+/, ""))
  return allowRoute(route) ? route : null
}

function sanitizeRoute(route: string): string {
  const normalized = route.replace(/\/+/g, "/")
  return normalized === "/" ? "/" : "/" + normalized.replace(/^\//, "")
}

function allowRoute(route: string): boolean {
  return ["/", "/skills", "/projects", "/about", "/contact", "/education", "/experience"].includes(route)
}
