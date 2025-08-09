"use client"

import type { ReactNode, JSX } from "react"
import { motion } from "framer-motion"

export function MotionFade({
  children,
  delay = 0.05,
}: {
  children: ReactNode
  delay?: number
}): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}

export function MotionFloat({
  children,
  amplitude = 8,
  duration = 6,
}: {
  children: ReactNode
  amplitude?: number
  duration?: number
}): JSX.Element {
  return (
    <motion.div
      initial={{ y: 0, scale: 1 }}
      animate={{ y: [-amplitude, 0, -amplitude], scale: [1, 1.01, 1] }}
      transition={{ duration, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}
