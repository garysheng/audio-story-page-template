import { StoryPlayback } from '@/components/story-playback'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_75%,black_0deg,rgba(16,185,129,0.1)_90deg,black_180deg)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-emerald-200 inline-block text-transparent bg-clip-text">
              Why Anno? (Change This Title)
            </h1>
            <p className="text-gray-400 mb-4">
              A demo of the{" "}
              <a 
                href="https://github.com/garysheng/audio-story-page-template" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                audio story page template
              </a>
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-emerald-200 mx-auto rounded-full opacity-50" />
          </div>
          
          <StoryPlayback />
          
          {/* Add padding to ensure content is visible above fixed controls */}
          <div className="h-40" />
        </div>
      </div>
    </div>
  )
}
