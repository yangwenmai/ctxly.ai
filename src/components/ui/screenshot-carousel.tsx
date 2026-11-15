import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from './card'

interface ScreenshotCarouselProps {
  screenshots: Array<{
    src: string
    alt: string
    title?: string
    description?: string
  }>
  autoPlay?: boolean
  interval?: number
  className?: string
}

export function ScreenshotCarousel({ 
  screenshots, 
  autoPlay = true, 
  interval = 4000,
  className = ""
}: ScreenshotCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || screenshots.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, screenshots.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }

  if (screenshots.length === 0) {
    return null
  }

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      <Card className="overflow-hidden rounded-3xl border-stone-200 shadow-[0_30px_80px_-40px_rgba(28,25,23,0.35)]">
        <div className="relative aspect-[4/5] sm:aspect-[16/10] bg-stone-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 p-6 sm:p-10"
            >
              <img
                src={screenshots[currentIndex].src}
                alt={screenshots[currentIndex].alt}
                className="w-full h-full object-contain drop-shadow-xl"
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          {screenshots.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-colors duration-200 backdrop-blur-sm"
                aria-label="Previous screenshot"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-colors duration-200 backdrop-blur-sm"
                aria-label="Next screenshot"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {screenshots[currentIndex].title && (
          <div className="border-t border-stone-200 bg-white px-6 pt-5 text-center">
            <h3 className="text-base font-semibold text-stone-900">{screenshots[currentIndex].title}</h3>
            {screenshots[currentIndex].description && (
              <p className="mt-1 text-sm text-stone-500">{screenshots[currentIndex].description}</p>
            )}
          </div>
        )}

        {/* Dots indicator */}
        {screenshots.length > 1 && (
          <div className="flex justify-center space-x-2 py-4 bg-white">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex
                    ? 'bg-gray-800'
                    : 'bg-gray-300 hover:bg-gray-500'
                }`}
                aria-label={`Go to screenshot ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
