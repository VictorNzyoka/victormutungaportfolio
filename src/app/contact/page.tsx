"use client"

import type React from "react"

import SiteFrame from "@/components/SiteFrame"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MotionFade } from "@/components/Transtion"
import { Github, Linkedin, MessageCircle, Mail,PhoneCall } from "lucide-react"
import { useMemo, useState } from "react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [pending, setPending] = useState(false)
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null)

  const socials = useMemo(
    () => [
      { name: "GitHub", href: "https://github.com/victornzyoka", icon: <Github className="h-4 w-4" /> },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/victor-mutunga", icon: <Linkedin className="h-4 w-4" /> },
      { name: "+25479615283", href: "+254796175283", icon: <PhoneCall className="h-4 w-4" /> },
      { name: "WhatsApp", href: "https://wa.me/25496175283", icon: <MessageCircle className="h-4 w-4" /> },
      { name: "Email", href: "mailto:nzyoka18@gmail.com", icon: <Mail className="h-4 w-4" /> },
    ],
    [],
  )

  function isValidEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)

    // Basic validation
    if (!name.trim()) return setStatus({ ok: false, message: "Please enter your name." })
    if (!isValidEmail(email)) return setStatus({ ok: false, message: "Please enter a valid email." })
    if (!title.trim()) return setStatus({ ok: false, message: "Please add a short title." })
    if (message.trim().length < 10)
      return setStatus({ ok: false, message: "Message should be at least 10 characters." })

    setPending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, title, message }),
      })
      const data = (await res.json()) as { ok: boolean; message: string }
      setStatus(data)
      if (data.ok) {
        setName("")
        setEmail("")
        setTitle("")
        setMessage("")
      }
    } catch {
      setStatus({ ok: false, message: "Network error. Please try again." })
    } finally {
      setPending(false)
    }
  }

  return (
    <SiteFrame>
      <MotionFade>
        {/* Keep equal height with terminal */}
        <Card className="h-[var(--panel-h)] overflow-hidden border-neutral-800 bg-neutral-900/60">
          <CardContent className="grid h-full grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_360px]">
            {/* Form */}
            <section aria-labelledby="contact-form" className="flex flex-col justify-center">
              <header>
                <span className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-950/60 px-3 py-1 text-xs text-neutral-400">
                  Contact
                </span>
                <h1 id="contact-form" className="mt-4 text-2xl font-semibold tracking-tight">
                  Let’s talk
                </h1>
                <p className="mt-2 max-w-prose text-sm text-neutral-400">
                  Send me a message and I’ll reply as soon as possible.
                </p>
              </header>

              <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm text-neutral-300">
                      Your name
                    </label>
                    <Input
                      id="name"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-neutral-300">
                      Your email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm text-neutral-300">
                    Subject
                  </label>
                  <Input
                    id="title"
                    placeholder={`e.g. &quot;Project inquiry&quot;`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm text-neutral-300">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="How can I help?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    aria-required="true"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit" disabled={pending} className="bg-emerald-600 hover:bg-emerald-500">
                    {pending ? "Sending..." : "Send message"}
                  </Button>
                  <Button asChild variant="outline">
                    <a href="mailto:hello@example.com">Email directly</a>
                  </Button>
                </div>

                {status && (
                  <p
                    className={`text-sm ${status.ok ? "text-emerald-400" : "text-red-400"}`}
                    role="status"
                    aria-live="polite"
                  >
                    {status.message}
                  </p>
                )}
              </form>
            </section>

            {/* Socials */}
            <aside aria-labelledby="social-links" className="flex flex-col justify-center">
              <h2 id="social-links" className="text-sm font-medium text-neutral-300">
                Elsewhere
              </h2>
              <ul className="mt-4 space-y-2">
                {socials.map((s) => (
                  <li key={s.name}>
                    <Button
                      asChild
                      variant="outline"
                      className="group w-full justify-start gap-2 bg-transparent hover:bg-neutral-900/60"
                    >
                      <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}>
                        <span className="text-emerald-400">{s.icon}</span>
                        <span className="text-neutral-200 group-hover:text-neutral-100">{s.name}</span>
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-950/60 p-4 text-xs text-neutral-400">
               Tip: Prefer the terminal? Type &quot;email&quot; or &quot;contact&quot; to open this page.
              </div>
            </aside>
          </CardContent>
        </Card>
      </MotionFade>
    </SiteFrame>
  )
}
