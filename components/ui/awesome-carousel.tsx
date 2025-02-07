'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CarouselItem {
  id: number
  content: React.ReactNode
}

interface AwesomeCarouselProps {
  items: CarouselItem[]
  className?: string
}

export function AwesomeCarousel({ items, className }: AwesomeCarouselProps) {
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const controls = useAnimation()
  const x = useMotionValue(0)

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [items])

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50
    const velocity = info.velocity.x
    const offset = info.offset.x

    if (offset > threshold || velocity > 500) {
      handlePrev()
    } else if (offset < -threshold || velocity < -500) {
      handleNext()
    } else {
      controls.start({ x: -activeIndex * (carousel.current?.offsetWidth || 0) })
    }
  }

  const handleNext = () => {
    if (activeIndex < items.length - 1) {
      setActiveIndex(activeIndex + 1)
    } else {
      setActiveIndex(0)
    }
  }

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    } else {
      setActiveIndex(items.length - 1)
    }
  }

  useEffect(() => {
    controls.start({ x: -activeIndex * (carousel.current?.offsetWidth || 0) })
  }, [activeIndex, controls])

  return (
    <div className={cn("relative", className)}>
      <motion.div
        ref={carousel}
        className="cursor-grab active:cursor-grabbing overflow-hidden"
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x }}
          className="flex"
        >
          {[...items, ...items, ...items].map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className="min-w-full px-4"
              style={{
                scale: 0.9,
                opacity: x.get() === -index * (carousel.current?.offsetWidth || 0) ? 1 : 0.5,
              }}
              transition={{ duration: 0.2 }}
            >
              {item.content}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-2xl text-white/70 hover:text-white transition-colors"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-2xl text-white/70 hover:text-white transition-colors"
        aria-label="Next slide"
      >
        ›
      </button>
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex % items.length
                ? 'w-8 bg-primary'
                : 'w-2 bg-primary/50 hover:bg-primary/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
