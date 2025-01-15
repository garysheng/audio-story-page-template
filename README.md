# Audio Story Page Template

A sophisticated audio story player template built with Next.js 15+, TypeScript, and Tailwind CSS. Features continuous playback across sections, variable speed control, keyboard shortcuts, and progress tracking. Perfect for creating immersive, audio-driven storytelling experiences with synchronized text.

🔴 [Live Demo](https://audio-story-page-template.vercel.app/)

## Browser Compatibility
✅ Safari Desktop & Mobile (including proper audio handling and autoplay)
✅ Chrome Desktop & Mobile
✅ Firefox Desktop & Mobile

## Setup Checklist

1. **Fork & Clone**
   - [ ] Fork this repository
   - [ ] Clone your fork: `git clone https://github.com/garysheng/audio-story-page-template.git`
   - [ ] Navigate to project: `cd audio-story-page-template`

2. **Install Dependencies**
   - [ ] Install Node.js 20+ if you haven't already
   - [ ] Run: `npm install`

3. **Add Your Content**
   - [ ] Replace audio files in `/public/story/` with your own MP3s
   - [ ] Update story sections in `src/components/story-playback.tsx`:
     ```typescript
     const STORY_SECTIONS = [
       {
         id: 'your-section-id',
         title: 'Your Section Title',
         content: 'Your **Markdown** content',
         audioUrl: '/story/your-audio-file.mp3'
       },
       // Add more sections...
     ]
     ```
   - [ ] Update page title in `src/app/page.tsx`

4. **Customize Styling (Optional)**
   - [ ] Modify colors in `src/app/globals.css`
   - [ ] Adjust background gradient in `src/app/page.tsx`
   - [ ] Update card animations in `tailwind.config.ts`

5. **Test Locally**
   - [ ] Run: `npm run dev`
   - [ ] Visit: `http://localhost:3000`
   - [ ] Test audio playback
   - [ ] Verify mobile responsiveness
   - [ ] Check dark mode

6. **Deploy**
   - [ ] Create a new repository for your project
   - [ ] Update git remote: `git remote set-url origin YOUR_NEW_REPO_URL`
   - [ ] Push changes: `git push -u origin main`
   - [ ] Deploy to Vercel (recommended) or your preferred hosting

## Audio File Requirements
- Format: MP3 (best browser compatibility)
- Recommended bitrate: 128-192 kbps
- Place files in: `/public/story/`
- Ensure filenames match `audioUrl` in story sections

## Development Notes
- Audio handling is optimized for Safari's strict autoplay policies
- Smooth transitions between sections with proper cleanup
- Mobile-first responsive design
- Keyboard shortcuts (space bar) with proper handling
- Progress tracking with automatic scrolling

## Need Help?
Feel free to open an issue if you run into any problems!
