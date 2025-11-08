import { GiftBox } from "@/components/GiftBox"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LinkPreview } from "@/components/ui/link-preview"
import { useState } from "react"

const Index = () => {
  const [confettiKey, setConfettiKey] = useState(0)

  const handleReset = () => {
    setConfettiKey((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-3xl">
        <header className="text-center mb-16 space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight">
              Hulugram Gift
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">Unboxing</span>
            </h1>
          </div>
        </header>

        <main className="relative z-10">
          <GiftBox key={confettiKey} onReset={handleReset} />
        </main>

        <footer className="mt-16 text-center">
          <p className="text-sm text-muted-foreground/80">
            Powered by <span className="font-semibold text-primary">Hulugram</span> · Made by{" "}
            <span className="font-bold text-primary">
              <LinkPreview url="https://www.alazar.dev" className="font-bold text-primary hover:text-primary/80">
                alazar.dev
              </LinkPreview>
            </span>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Index
