import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ConfettiParticle {
  id: number
  x: number
  y: number
  type: "particle" | "letter" | "logo"
  content?: string
  color?: string
  delay: number
  duration: number
  rotation: number
  scale: number
}

const HULUGRAM_LETTERS = "HULUGRAM".split("")
const CONFETTI_COLORS = ["hsl(var(--confetti-pink))", "hsl(var(--confetti-yellow))", "hsl(var(--confetti-blue))", "hsl(var(--confetti-green))"]

export const Confetti = ({ isActive }: { isActive: boolean }) => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([])
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (!isActive) {
      setParticles([])
      return
    }

    const particleCount = prefersReducedMotion ? 20 : 60
    const newParticles: ConfettiParticle[] = []

    // Generate colored particles
    for (let i = 0; i < particleCount * 0.5; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        type: "particle",
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        delay: Math.random() * 0.3,
        duration: 2 + Math.random() * 1.5,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      })
    }

    // Generate letters
    const letterCount = prefersReducedMotion ? 5 : HULUGRAM_LETTERS.length * 2
    for (let i = 0; i < letterCount; i++) {
      newParticles.push({
        id: particleCount * 0.5 + i,
        x: Math.random() * 100,
        y: -10,
        type: "letter",
        content: HULUGRAM_LETTERS[i % HULUGRAM_LETTERS.length],
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        delay: Math.random() * 0.5,
        duration: 2.5 + Math.random() * 1,
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4,
      })
    }

    // Generate logo icons
    const logoCount = prefersReducedMotion ? 3 : 8
    for (let i = 0; i < logoCount; i++) {
      newParticles.push({
        id: particleCount * 0.5 + letterCount + i,
        x: Math.random() * 100,
        y: -10,
        type: "logo",
        delay: Math.random() * 0.4,
        duration: 2.5 + Math.random() * 1,
        rotation: Math.random() * 360,
        scale: 0.3 + Math.random() * 0.3,
      })
    }

    setParticles(newParticles)
  }, [isActive, prefersReducedMotion])

  if (particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}vw`,
            y: "-10vh",
            rotate: particle.rotation,
            scale: particle.scale,
            opacity: 1,
          }}
          animate={{
            y: "95vh",
            rotate: particle.rotation + 720,
            opacity: 1,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="absolute"
          style={{
            left: 0,
            top: 0,
          }}
        >
          {particle.type === "particle" && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: particle.color }} />}
          {particle.type === "letter" && (
            <span className="text-2xl font-bold" style={{ color: particle.color }}>
              {particle.content}
            </span>
          )}
          {particle.type === "logo" && <img src="/logo.png" alt="" className="w-8 h-8 object-contain" aria-hidden="true" />}
        </motion.div>
      ))}
    </div>
  )
}
