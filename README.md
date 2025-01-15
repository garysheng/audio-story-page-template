# Audio Story Page Template

A sophisticated audio player implementation that allows users to navigate through multiple sections of content with synchronized audio playback. Built with Next.js 14+, TypeScript, and Tailwind CSS.

## Features

- Continuous audio playback across sections
- Variable playback speed control (1x, 1.5x, 2x)
- Keyboard shortcuts (space bar for play/pause)
- Progress tracking both per-section and overall
- Responsive design with mobile support
- Cross-browser compatibility (Safari, Chrome, Firefox)
- Auto-scrolling to active section
- Dark mode support

## Getting Started

1. Clone this repository:
```bash
git clone https://github.com/yourusername/audio-story-page-template.git
cd audio-story-page-template
```

2. Install dependencies:
```bash
npm install
```

3. Add your audio files to the `public/story` directory:
```
public/
  story/
    section1.mp3
    section2.mp3
    section3.mp3
```

4. Update the sample sections in `src/app/page.tsx` with your content:
```typescript
const sampleSections: StorySection[] = [
  {
    id: '1',
    title: 'Your Title',
    content: 'Your content here...',
    audioUrl: '/story/your-audio-file.mp3'
  },
  // Add more sections...
]
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/components/story-playback.tsx` - Main story playback component
- `src/types/story.ts` - TypeScript interfaces and types
- `src/app/page.tsx` - Example implementation
- `public/story/` - Directory for audio files

## Built With

- [Next.js 14+](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## Contributing

Feel free to submit issues and enhancement requests!
