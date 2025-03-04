"use client"

import { useEffect, useRef } from "react"

interface VisualizationCanvasProps {
  renderFunction: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void
  width?: number
  height?: number
  className?: string
}

export default function VisualizationCanvas({
  renderFunction,
  width = 600,
  height = 300,
  className = "",
}: VisualizationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Call the render function
    renderFunction(ctx, canvas)
  }, [renderFunction])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`w-full border rounded-md bg-white ${className}`}
    />
  )
}

