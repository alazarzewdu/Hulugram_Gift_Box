import { motion, useAnimation } from "framer-motion"
import { useEffect, useState, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";
import { Confetti } from "./Confetti";
import { useSoundEffects } from "../hooks/useSoundEffects";

interface GiftBoxProps {
  onReset?: () => void
}

export const GiftBox = ({ onReset }: GiftBoxProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const lidControls = useAnimation()
  const boxControls = useAnimation()
  const { playShakeSound, playOpenSound } = useSoundEffects()

  const handleReset = useCallback(() => {
    setIsOpen(false)
    setShowConfetti(false)
    lidControls.set({ y: 0, rotate: 0, scale: 1 })
    boxControls.set({ scale: 1 })
    onReset?.()
  }, [lidControls, boxControls, onReset])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  // Idle shake animation
  useEffect(() => {
    if (isOpen || prefersReducedMotion) return

    const shakeInterval = setInterval(() => {
      playShakeSound()
      lidControls.start({
        rotate: [0, -2, 2, -2, 2, 0],
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      })
    }, 3000)

    return () => clearInterval(shakeInterval)
  }, [isOpen, lidControls, prefersReducedMotion, playShakeSound])

  const handleOpen = useCallback(async () => {
    if (isOpen) return

    setIsOpen(true)

    // Play opening sound
    playOpenSound()

    // Animate lid opening
    await lidControls.start({
      y: prefersReducedMotion ? -80 : -120,
      rotate: prefersReducedMotion ? -15 : -25,
      scale: prefersReducedMotion ? 1 : 1.1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8,
      },
    })

    // Animate box bounce
    await boxControls.start({
      scale: [1, 1.05, 0.98, 1.02, 1],
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    })

    // Trigger confetti
    setShowConfetti(true)
  }, [isOpen, lidControls, boxControls, prefersReducedMotion, playOpenSound])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        if (!isOpen) {
          handleOpen()
        }
      }
    },
    [handleOpen, isOpen]
  )

  return (
    <>
      <div className="relative w-full max-w-md mx-auto">
        {/* Reset button - only show when opened */}
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }} className="absolute -top-6 right-0 z-50">
            <Button onClick={handleReset} variant="outline" size="sm" className="rounded-full shadow-lg" aria-label="Reset gift box">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </motion.div>
        )}
        <motion.div
          className="relative cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-4 rounded-lg"
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label="Open gift box"
          aria-expanded={isOpen}
          whileHover={!isOpen ? { scale: 1.02 } : {}}
          whileTap={!isOpen ? { scale: 0.98 } : {}}
        >
          {/* Gift Box Body */}
          <motion.div animate={boxControls} className="relative z-10">
            <img src="/gift_2.png" alt="Gift box" className="w-full h-auto drop-shadow-2xl" />
          </motion.div>

          {/* Gift Box Lid */}
          <motion.div
            animate={lidControls}
            className="absolute top-0 left-0 w-full z-20"
            style={{
              transformOrigin: "center bottom",
            }}
          >
            <img src="/gift_1.png" alt="Gift box lid" className="w-full h-auto drop-shadow-2xl" />
          </motion.div>

          {/* Glow effect when hovering */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 -z-10 blur-3xl opacity-0 rounded-full"
              whileHover={{ opacity: 0.3 }}
              style={{
                background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
              }}
            />
          )}
        </motion.div>

        {/* Instruction text */}
        {!isOpen && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center mt-12 space-y-3">
            <p className="text-lg sm:text-xl text-muted-foreground font-medium">
              Click the gift or press <kbd className="px-2 py-1 text-sm font-semibold text-foreground bg-secondary border border-border rounded shadow-sm">Enter</kbd>
            </p>
            <p className="text-sm text-muted-foreground/70">Tap anywhere on the box to unwrap</p>
          </motion.div>
        )}

        {/* Success message after opening */}
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.5, type: "spring", stiffness: 200 }} className="text-center mt-12 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
              <span className="text-4xl">🎉</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">Congratulations!</h2>

            <p className="text-lg sm:text-xl text-foreground/90 max-w-lg mx-auto leading-relaxed">
              Your Hulugram gift has been revealed!
              <br />
              <span className="text-base text-muted-foreground mt-2 inline-block">Check out all the confetti at the bottom 🎊</span>
            </p>
          </motion.div>
        )}
      </div>

      <Confetti isActive={showConfetti} />
    </>
  )
}
