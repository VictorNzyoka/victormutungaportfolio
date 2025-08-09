"use client"

import type { NextPage } from "next"
import SiteFrame from "@/components/SiteFrame"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, FileText } from "lucide-react"

// About copy (edit freely)
export const aboutText =
  "Hi, I'm Victor, i have a deep passion for IT, specializing in both software development and machine learning.I have experience creating responsive and visually engaging web applications using HTML, CSS, JavaScript, React, and Next.js,Nodejs.I’m passionate about building solutions that seamlessly combine functionality and design, ensuring both a smooth user experience and technical efficiency."

const AboutPage: NextPage = () => {
  return (
    <SiteFrame>
      {/* Card height is locked to match the terminal via --panel-h */}
      <Card className="h-[var(--panel-h)] grid grid-cols-1 overflow-hidden border-neutral-800 bg-neutral-900/60 md:grid-cols-[minmax(0,1fr)_420px]">
        {/* Text */}
        <CardContent className="flex flex-col justify-center p-6 sm:p-8">
          <header>
            <h1 className="text-2xl font-semibold tracking-tight">About</h1>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-neutral-300">
              {aboutText}
            </p>
          </header>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="gap-2 bg-emerald-600 hover:bg-emerald-500">
              <a href="/" target="_blank" rel="noreferrer">
                <FileText className="h-4 w-4" />
                Resume
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2 bg-transparent">
              <a href="https://github.com/victornzyoka" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </CardContent>

        {/* Image with framer-motion animation */}
        <div className="relative hidden items-center justify-center md:flex">
          <motion.div
            className="relative m-6 aspect-[4/5] w-[78%] overflow-hidden rounded-2xl border border-neutral-800"
            initial={{ y: 0, rotate: 0, scale: 1 }}
            animate={{ y: [-8, 0, -8] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            whileHover={{ scale: 1.02, rotate: -1 }}
          >
            <Image
              src="/picture.jpeg"
              alt="Portrait/abstract of Victor with code theme"
              fill
              sizes="(max-width: 1024px) 50vw, 420px"
              className="object-cover"
            />
            {/* Subtle overlays */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-emerald-500/10" />
            <div className="pointer-events-none absolute -inset-6 -z-[1] rounded-[28px] bg-emerald-500/10 blur-2xl" />
          </motion.div>
        </div>
      </Card>
    </SiteFrame>
  )
}

export default AboutPage
