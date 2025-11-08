# Hulugram Gift Unboxing Animation

A single-page app with an interactive gift box animation. Click or press Enter to open the box and see confetti, sound effects, and smooth animations.

## Live Preview
https://hulugram-gift-box.vercel.app/

## Features

- Interactive gift box that opens on click or keyboard (Enter/Space)
- Confetti animation with "HULUGRAM" letters and logo
- Sound effects for shaking and opening
- Dark/light theme toggle
- Fully accessible with keyboard navigation and screen reader support
- Respects reduced motion preferences
- Reset button to replay the animation

## Setup

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repo
git clone <repository-url>
cd Hulugram_Gift_Box

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open `http://localhost:5173` in your browser.

### Build

```bash
pnpm build
pnpm preview
```

## Tech Stack

- React 19 with TypeScript
- Vite for build tooling
- Framer Motion for animations
- Tailwind CSS v4 for styling
- Custom sound effects hook

## Project Structure

```
src/
├── components/
│   ├── GiftBox.tsx          # Main gift box component
│   ├── Confetti.tsx         # Confetti particles
│   ├── ThemeToggle.tsx     # Theme switcher
│   └── ui/                  # Reusable UI components
├── hooks/
│   └── useSoundEffects.ts  # Audio management
├── pages/
│   └── index.tsx           # Main page
└── lib/
    └── utils.ts            # Utilities
```

## Implementation Notes

### Animations

Used Framer Motion for the gift box animations. The lid opens with a spring animation, and the box bounces slightly when opened. All animations respect `prefers-reduced-motion`.

### Sound Effects

Custom audio files (`shakes.mp3` and `boxopen.mp3`) are placed in the `public` folder. The `useSoundEffects` hook handles audio loading and unlocking (required for browser autoplay policies).

### Confetti

Custom confetti system that generates colored particles, "HULUGRAM" letters, and logo icons. The number of particles is reduced when reduced motion is enabled.

### Accessibility

- Keyboard navigation: Enter/Space to open, Tab to navigate
- ARIA labels on interactive elements
- Focus indicators for keyboard users
- Reduced motion support
- Semantic HTML structure

## Libraries Used

- **framer-motion**: Smooth animations with good performance
- **next-themes**: Theme management with system preference detection
- **lucide-react**: Icons
- **shadcn/ui**: Accessible UI components built on Radix UI
- **react-router-dom**: Routing (prepared for future expansion)
- **@tanstack/react-query**: Included for potential API integration

## Performance

- Audio files are preloaded
- Animations use Framer Motion's optimized engine
- Memoization with useCallback to prevent unnecessary re-renders
- Tailwind CSS purges unused styles in production

## Accessibility

The app is fully accessible:

- **Keyboard**: Enter/Space opens the box, Tab navigates elements
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Reduced Motion**: Animations are simplified when `prefers-reduced-motion` is enabled
- **Focus Management**: Visible focus indicators


## Time Spent

Approximately **5-7 hours** total:
- Setup and architecture: 1 hour
- Core animations: 1.5 hours
- Accessibility: 1 hour
- Sound effects: 0.5 hours
- Confetti: 1 hour
- Styling: 1 hour
- Bug fixes: 0.5-1 hour

### Priorities

1. Accessibility - making sure it works for everyone
2. Smooth animations and good performance
3. Polish - sound effects, confetti, visual feedback
4. Clean, maintainable code

### Future Improvements

If I had more time:
- Add comprehensive tests
- More animation refinements
- Better error handling
- Mobile touch gesture improvements
- Volume controls for sound effects
- More confetti variations

## License

Created for Hulugram Frontend Trial Task.

## Author

alazar.dev
