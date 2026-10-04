'use client'

import { useEffect, useRef } from 'react'

export default function ParallaxLayer({ children, className = '', speed = 0.06 }) {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!layer || reduceMotion.matches) return undefined

    let frame = 0
    const updatePosition = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const bounds = layer.getBoundingClientRect()
        const currentOffset = Number.parseFloat(layer.style.getPropertyValue('--parallax-y')) || 0
        const distanceFromCenter = bounds.top - currentOffset + bounds.height / 2 - window.innerHeight / 2
        layer.style.setProperty('--parallax-y', `${-distanceFromCenter * speed}px`)
      })
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, { passive: true })
    window.addEventListener('resize', updatePosition)
    reduceMotion.addEventListener?.('change', updatePosition)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
      reduceMotion.removeEventListener?.('change', updatePosition)
    }
  }, [speed])

  return <div ref={layerRef} className={`parallax-layer ${className}`}>{children}</div>
}
