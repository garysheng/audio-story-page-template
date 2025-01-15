'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import ReactMarkdown from 'react-markdown'

interface StorySection {
  id: string
  title: string
  content: string
  audioUrl: string
}

const STORY_SECTIONS: StorySection[] = [
  {
    id: 'personal-story',
    title: 'A Personal Story',
    content: `Hey, I'm **Gary**, and I used to be that guy who'd proudly tell everyone about all the podcasts, 
      audiobooks, and YouTube videos I was consuming. The truth? I was basically collecting *digital 
      merit badges* without actually learning anything. Sure, I'd get excited about ideas in the moment, 
      but ask me a week later what I learned? **\*Crickets\***. I was the king of passive consumption, 
      thinking I was getting smarter just by pressing play. *Spoiler alert: I wasn't.*`,
    audioUrl: '/story/personal-story.mp3'
  },
  {
    id: 'vision',
    title: 'The Vision',
    content: `That's why I'm building **Anno**. Because I want to be better every day, and I'm tired of fooling 
      myself with passive learning. I want to be a *live player*, awake and conscious in my learning journey. 
      Whether it's with my AI assistant or with friends who see each day as an opportunity to learn 
      something new, I want to make every article I read, every *"play"* button I press, and every page 
      of every book I read *count*.`,
    audioUrl: '/story/vision.mp3'
  },
  {
    id: 'problem',
    title: 'The Problem with Modern Learning',
    content: `We're doing it wrong. We scroll endlessly through social media, binge educational content, 
      maybe even read books, but how much are we actually retaining? When you're information-overloaded 
      and your brain isn't in a conscious state, **95% of what you consume is lost**. You're essentially 
      burning your time—I know because *I've been there*.`,
    audioUrl: '/story/problem.mp3'
  },
  {
    id: 'solution',
    title: 'The Anno Solution',
    content: `Conversely, when you **verbalize your learning**—even if it's just to an AI assistant that remembers 
      and contextualizes everything—you're already leveling up your learning process. Add 
      *social accountability* from fellow learners who care about your journey, and you've got 
      a powerful combination. Anno is the tool I wish I had when I was consuming all that content.`,
    audioUrl: '/story/solution.mp3'
  },
  {
    id: 'why-anno',
    title: 'Why "Anno"?',
    content: `The name "Anno" works on multiple levels. In Latin, it means *"year"* or *"era"*—pointing to our 
      focus on lifelong learning. It's also related to *"annotation,"* reflecting our mission to help 
      you capture and retain knowledge. And here's the clever part: **Anno** (a-n-n-o) is just one 
      character away from *"nano"*—and that's intentional. We're enabling nano-sized social networks—
      or rather learning networks—or learning circles. For people who don't want to learn solo or with AI alone. 
      These intimate learning circles make sharing more meaningful because learning is vulnerable. It's about admitting what you 
      don't know yet, and *that's beautiful*. And so it just makes sense to do that with small groups of trusted friends.`,
    audioUrl: '/story/why-anno.mp3'
  },
  {
    id: 'future',
    title: 'The Future of Learning',
    content: `Overall, think of Anno as **Strava for lifelong learning**. Just as Strava tracks your physical 
      journey, we track your learning journey. But instead of miles, we track daily *"aha"* 
      moments. And instead of competing, we're collaborating and growing together in small, 
      meaningful groups. Because contrary to popular belief and practice, learning isn't—or 
      at least shouldn't be—a solo sport. It should be a **team adventure**, where *every insight 
      shared makes the whole squad smarter*.`,
    audioUrl: '/story/future.mp3'
  }
]

enum PlaybackState {
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  CONTINUE = 'CONTINUE'
}

export function StoryPlayback() {
  const [playbackState, setPlaybackState] = useState<PlaybackState>(PlaybackState.LOADING)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isEnded, setIsEnded] = useState(false)
  const [displaySpeed, setDisplaySpeed] = useState(1) // Only for display purposes
  const playbackSpeedRef = useRef(1)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const shouldAutoplayRef = useRef(false)

  // Handle play/pause
  const togglePlayPause = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !isReady) return

    try {
      if (playbackState === PlaybackState.PLAYING) {
        audio.pause()
        setPlaybackState(PlaybackState.PAUSED)
      } else {
        if (isEnded) {
          shouldAutoplayRef.current = true
          setCurrentSectionIndex(0)
          setIsEnded(false)
          window.scrollTo({ top: 0, behavior: 'smooth' })
          return
        }

        if (audio.ended) {
          audio.currentTime = 0
        }
        
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          setPlaybackState(PlaybackState.PLAYING)
          await playPromise
          audio.playbackRate = playbackSpeedRef.current
        } else {
          setPlaybackState(PlaybackState.PLAYING)
        }
      }
    } catch (error) {
      console.error('Playback failed:', error)
      setPlaybackState(PlaybackState.PAUSED)
    }
  }, [playbackState, isReady, isEnded])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle space when not typing in an input/textarea
      if (event.code === 'Space' && 
          event.target instanceof HTMLElement && 
          !['INPUT', 'TEXTAREA'].includes(event.target.tagName)) {
        event.preventDefault() // Prevent page scroll
        if (isReady && playbackState !== PlaybackState.LOADING) {
          togglePlayPause()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [isReady, playbackState, togglePlayPause])

  // Handle section end
  const handleSectionEnd = useCallback(() => {
    if (currentSectionIndex < STORY_SECTIONS.length - 1) {
      shouldAutoplayRef.current = true
      setCurrentSectionIndex(prev => prev + 1)
    } else {
      setPlaybackState(PlaybackState.PAUSED)
      setIsEnded(true)
    }
  }, [currentSectionIndex])

  // Initialize audio element
  useEffect(() => {
    setIsReady(false)
    setPlaybackState(PlaybackState.LOADING)
    setProgress(0)
    setIsEnded(false)

    const audio = new Audio()
    
    const handleCanPlay = async () => {
      setIsReady(true)
      audio.playbackRate = playbackSpeedRef.current
      
      // If we should autoplay (coming from replay or section end)
      if (shouldAutoplayRef.current) {
        shouldAutoplayRef.current = false
        try {
          const playPromise = audio.play()
          if (playPromise !== undefined) {
            setPlaybackState(PlaybackState.PLAYING)
            await playPromise
          } else {
            setPlaybackState(PlaybackState.PLAYING)
          }
        } catch (error) {
          console.error('Auto-play failed:', error)
          setPlaybackState(PlaybackState.PAUSED)
        }
      } else {
        setPlaybackState(PlaybackState.PAUSED)
      }
    }

    const handleTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setProgress(audio.currentTime / audio.duration)
      }
    }

    const handleError = (e: ErrorEvent) => {
      console.error('Audio error:', e)
      setPlaybackState(PlaybackState.PAUSED)
      setIsReady(false)
    }

    // Set up audio element
    audio.src = STORY_SECTIONS[currentSectionIndex].audioUrl
    audio.preload = 'auto'
    audio.currentTime = 0

    // Add event listeners
    audio.addEventListener('canplaythrough', handleCanPlay)
    audio.addEventListener('ended', handleSectionEnd)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('error', handleError)

    // Store reference and set initial playback speed
    audioRef.current = audio
    audio.playbackRate = playbackSpeedRef.current

    // Load the audio
    audio.load()

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay)
      audio.removeEventListener('ended', handleSectionEnd)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('error', handleError)
      audio.pause()
      audio.src = ''
      audioRef.current = null
      setIsReady(false)
    }
  }, [currentSectionIndex, handleSectionEnd])

  // Handle speed change
  const toggleSpeed = useCallback(() => {
    const speeds = [1, 1.5, 2.0, 2.5]
    const currentIndex = speeds.indexOf(playbackSpeedRef.current)
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length]
    
    const audio = audioRef.current
    if (audio) {
      audio.playbackRate = nextSpeed
    }
    playbackSpeedRef.current = nextSpeed
    setDisplaySpeed(nextSpeed) // Update display state
  }, [])

  // Handle section change
  const jumpToSection = useCallback((index: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      shouldAutoplayRef.current = true
      setProgress(0)
      setCurrentSectionIndex(index)
      setPlaybackState(PlaybackState.PAUSED)
    }
  }, [])

  // Scroll handling
  useEffect(() => {
    const currentCard = cardRefs.current[currentSectionIndex]
    if (currentCard) {
      const cardTop = currentCard.offsetTop
      const cardHeight = currentCard.offsetHeight
      const windowHeight = window.innerHeight
      const scrollTarget = cardTop - (windowHeight / 2) + (cardHeight / 2) + 150
      
      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
      })
    }
  }, [currentSectionIndex])

  return (
    <div className="space-y-8">
      <div className="space-y-8 pb-24">
        {STORY_SECTIONS.map((section, index) => (
          <Card 
            key={section.id}
            ref={el => { cardRefs.current[index] = el }}
            className={`relative border-0 shadow-lg transition-all duration-300 cursor-pointer
              ${index === currentSectionIndex 
                ? 'scale-[1.02]' 
                : 'opacity-75 hover:opacity-90'}`}
            onClick={() => jumpToSection(index)}
          >
            {/* Background layer */}
            <div className={`absolute inset-0 rounded-lg transition-opacity duration-300
              ${index === currentSectionIndex 
                ? '!bg-gray-50 dark:bg-gray-50' 
                : '!bg-white/90 dark:bg-gray-900/90'}`}
            />
            
            {/* Border effect layer */}
            <div className={`absolute inset-0 rounded-lg transition-all duration-300
              ${index === currentSectionIndex 
                ? 'border-2 border-emerald-500/30 dark:border-emerald-400/30' 
                : ''}`}
            />
            
            {/* Content layer */}
            <CardContent className="relative pt-6 z-10">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className={`mb-4 ${index === currentSectionIndex ? '!text-gray-900' : '!text-gray-900 dark:text-gray-100'}`}>
                  <ReactMarkdown>
                    {section.content}
                  </ReactMarkdown>
                </div>
              </div>
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="text-xs italic text-gray-500 dark:text-gray-400">
                  {section.title}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
        <div className="max-w-screen-xl mx-auto p-4">
          <div className="w-full bg-emerald-100 dark:bg-emerald-950/30 h-1 rounded-full mb-4">
            <div className="relative w-full h-full">
              {/* Overall progress bar */}
              <div 
                className="absolute inset-y-0 left-0 bg-emerald-500/30 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((currentSectionIndex) / STORY_SECTIONS.length) * 100}%` 
                }}
              />
              {/* Current section progress bar */}
              <div 
                className="absolute inset-y-0 left-0 bg-emerald-500 rounded-full transition-all duration-100"
                style={{ 
                  width: `${((currentSectionIndex + progress) / STORY_SECTIONS.length) * 100}%`
                }}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="hidden sm:block w-24 text-sm text-muted-foreground">
              {currentSectionIndex + 1} of {STORY_SECTIONS.length}
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={togglePlayPause}
                disabled={!isReady || playbackState === PlaybackState.LOADING}
                size="lg"
                className="w-48 bg-emerald-500 hover:bg-emerald-600 text-white group relative"
              >
                {(() => {
                  if (!isReady || playbackState === PlaybackState.LOADING) {
                    return "Loading..."
                  }
                  if (isEnded) {
                    return <><Play className="mr-2 h-4 w-4" /> Replay from beginning</>
                  }
                  return (
                    <>
                      {playbackState === PlaybackState.PLAYING 
                        ? <><Pause className="mr-2 h-4 w-4" /> Pause</>
                        : <><Play className="mr-2 h-4 w-4" /> {currentSectionIndex > 0 ? 'Continue' : 'Play'}</>}
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-border/50 hidden md:block">
                        Press space to {isEnded ? 'replay' : playbackState === PlaybackState.PLAYING ? 'pause' : currentSectionIndex > 0 ? 'continue' : 'play'}
                      </span>
                    </>
                  )
                })()}
              </Button>
              <Button
                onClick={toggleSpeed}
                size="sm"
                variant="outline"
                className="text-xs font-mono min-w-[48px]"
                disabled={!isReady || playbackState === PlaybackState.LOADING}
              >
                {displaySpeed}x
              </Button>
            </div>
            <div className="sm:hidden text-sm text-muted-foreground">
              {currentSectionIndex + 1} of {STORY_SECTIONS.length}
            </div>
            <div className="hidden sm:block w-24"></div>
          </div>
        </div>
      </div>
    </div>
  )
} 