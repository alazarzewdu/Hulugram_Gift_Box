import { useCallback, useRef, useEffect } from "react"

export const useSoundEffects = () => {
  const shakeAudioRef = useRef<HTMLAudioElement | null>(null)
  const openAudioRef = useRef<HTMLAudioElement | null>(null)
  const audioUnlockedRef = useRef(false)

  useEffect(() => {
    if (!shakeAudioRef.current) {
      const audio = new Audio("/shakes.mp3")
      audio.preload = "auto"
      audio.volume = 0.5
      audio.load()
      shakeAudioRef.current = audio
    }

    if (!openAudioRef.current) {
      const audio = new Audio("/boxopen.mp3")
      audio.preload = "auto"
      audio.volume = 0.7
      audio.load()
      openAudioRef.current = audio
    }

    const unlockAudio = async () => {
      if (!audioUnlockedRef.current) {
        try {
          if (shakeAudioRef.current) {
            await shakeAudioRef.current.play()
            shakeAudioRef.current.pause()
            shakeAudioRef.current.currentTime = 0
          }
          if (openAudioRef.current) {
            await openAudioRef.current.play()
            openAudioRef.current.pause()
            openAudioRef.current.currentTime = 0
          }
          audioUnlockedRef.current = true
        } catch (error) {
          console.warn("Could not play audio:", error)
        }
      }
    }

    const events = ["click", "touchstart", "keydown"]
    events.forEach((event) => {
      document.addEventListener(event, unlockAudio, { once: true })
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, unlockAudio)
      })
      if (shakeAudioRef.current) {
        shakeAudioRef.current.pause()
        shakeAudioRef.current = null
      }
      if (openAudioRef.current) {
        openAudioRef.current.pause()
        openAudioRef.current = null
      }
    }
  }, [])

  const playShakeSound = useCallback(() => {
    try {
      if (!shakeAudioRef.current) {
        const audio = new Audio("/shakes.mp3")
        audio.preload = "auto"
        audio.volume = 0.5
        audio.load()
        shakeAudioRef.current = audio
      }

      const audio = shakeAudioRef.current
      
      audio.currentTime = 0
      
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Could not play shake sound:", error)
        })
      }
    } catch (error) {
      console.warn("Audio not available:", error)
    }
  }, [])

  const playOpenSound = useCallback(() => {
    try {
      if (!openAudioRef.current) {
        const audio = new Audio("/boxopen.mp3")
        audio.preload = "auto"
        audio.volume = 0.7
        audio.load()
        openAudioRef.current = audio
      }

      const audio = openAudioRef.current
      
      audio.currentTime = 0
      
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Could not play open sound:", error)
        })
      }
    } catch (error) {
      console.warn("Audio not available:", error)
    }
  }, [])

  return { playShakeSound, playOpenSound }
}

