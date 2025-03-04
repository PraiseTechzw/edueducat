"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface AlgorithmVisualizationProps {
  type: string
}

const AlgorithmVisualization: React.FC<AlgorithmVisualizationProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw the algorithm visualization based on the type and current step
    switch (type) {
      case "bubble-sort":
        drawBubbleSort(ctx, currentStep)
        break
      case "binary-search":
        drawBinarySearch(ctx, currentStep)
        break
      case "dijkstra":
        drawDijkstra(ctx, currentStep)
        break
      case "astar":
        drawAStar(ctx, currentStep)
        break
      // Add more cases for other algorithms
    }
  }, [type, currentStep])

  const drawBubbleSort = (ctx: CanvasRenderingContext2D, step: number) => {
    const arr = [5, 2, 8, 12, 1, 6]
    const barWidth = 40
    const barSpacing = 10
    const maxBarHeight = 200

    arr.forEach((value, index) => {
      const barHeight = (value / Math.max(...arr)) * maxBarHeight
      const x = index * (barWidth + barSpacing) + 50
      const y = 250 - barHeight

      ctx.fillStyle = index === step || index === step + 1 ? "#ff9800" : "#4caf50"
      ctx.fillRect(x, y, barWidth, barHeight)
      ctx.fillStyle = "#000"
      ctx.fillText(value.toString(), x + barWidth / 2, y - 10)
    })
  }

  const drawBinarySearch = (ctx: CanvasRenderingContext2D, step: number) => {
    const arr = [1, 3, 5, 7, 9, 11, 13, 15]
    const target = 7
    const elementWidth = 50
    const elementHeight = 50
    const startX = 50
    const startY = 100

    arr.forEach((element, index) => {
      ctx.strokeRect(startX + index * elementWidth, startY, elementWidth, elementHeight)
      ctx.fillStyle = element === target && step === arr.indexOf(target) ? "#ff9800" : "#000"
      ctx.fillText(element.toString(), startX + index * elementWidth + 20, startY + 30)
    })

    const low = Math.floor(step / 2)
    const high = arr.length - 1 - Math.floor(step / 2)
    const mid = Math.floor((low + high) / 2)

    ctx.fillStyle = "#4caf50"
    ctx.fillRect(startX + low * elementWidth, startY + elementHeight + 10, elementWidth, 5)
    ctx.fillRect(startX + high * elementWidth, startY + elementHeight + 10, elementWidth, 5)
    ctx.fillStyle = "#2196f3"
    ctx.fillRect(startX + mid * elementWidth, startY + elementHeight + 20, elementWidth, 5)
  }

  const drawDijkstra = (ctx: CanvasRenderingContext2D, step: number) => {
    const graph = [
      [0, 4, 0, 0, 0, 0],
      [4, 0, 8, 0, 11, 0],
      [0, 8, 0, 7, 0, 2],
      [0, 0, 7, 0, 9, 14],
      [0, 11, 0, 9, 0, 10],
      [0, 0, 2, 14, 10, 0],
    ]
    const nodeRadius = 20
    const startX = 50
    const startY = 50
    const spacing = 80

    // Draw nodes
    for (let i = 0; i < graph.length; i++) {
      const x = startX + (i % 3) * spacing
      const y = startY + Math.floor(i / 3) * spacing
      ctx.beginPath()
      ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI)
      ctx.fillStyle = i <= step ? "#4caf50" : "#fff"
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = "#000"
      ctx.fillText(String.fromCharCode(65 + i), x, y)
    }

    // Draw edges
    for (let i = 0; i < graph.length; i++) {
      for (let j = i + 1; j < graph[i].length; j++) {
        if (graph[i][j] !== 0) {
          const x1 = startX + (i % 3) * spacing
          const y1 = startY + Math.floor(i / 3) * spacing
          const x2 = startX + (j % 3) * spacing
          const y2 = startY + Math.floor(j / 3) * spacing
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.strokeStyle = i < step && j < step ? "#ff9800" : "#000"
          ctx.stroke()
          ctx.fillStyle = "#000"
          ctx.fillText(graph[i][j].toString(), (x1 + x2) / 2, (y1 + y2) / 2)
        }
      }
    }
  }

  const drawAStar = (ctx: CanvasRenderingContext2D, step: number) => {
    const grid = [
      [0, 0, 0, 1, 0],
      [1, 1, 0, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 1, 0],
    ]
    const cellSize = 50
    const startX = 50
    const startY = 50

    // Draw grid
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const x = startX + j * cellSize
        const y = startY + i * cellSize
        ctx.fillStyle = grid[i][j] === 1 ? "#000" : "#fff"
        ctx.fillRect(x, y, cellSize, cellSize)
        ctx.strokeRect(x, y, cellSize, cellSize)
      }
    }

    // Draw path
    const path = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      [2, 3],
      [2, 4],
      [3, 4],
      [4, 4],
    ]

    for (let i = 0; i <= step && i < path.length; i++) {
      const [x, y] = path[i]
      ctx.fillStyle = "#4caf50"
      ctx.fillRect(startX + y * cellSize, startY + x * cellSize, cellSize, cellSize)
    }

    // Draw start and goal
    ctx.fillStyle = "#2196f3"
    ctx.fillRect(startX, startY, cellSize, cellSize)
    ctx.fillStyle = "#f44336"
    ctx.fillRect(startX + 4 * cellSize, startY + 4 * cellSize, cellSize, cellSize)
  }

  const handlePlay = () => {
    setIsPlaying(true)
    animationRef.current = requestAnimationFrame(animate)
  }

  const handlePause = () => {
    setIsPlaying(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const animate = () => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1
      if (nextStep >= 10) {
        // Adjust this value based on the number of steps in your animation
        handlePause()
        return prevStep
      }
      return nextStep
    })
    animationRef.current = requestAnimationFrame(animate)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-64 bg-white dark:bg-slate-800 rounded-lg shadow-md"
    >
      <canvas ref={canvasRef} width={400} height={250} className="w-full h-full" />
      <div className="absolute bottom-4 left-4 space-x-2">
        <Button onClick={handlePlay} disabled={isPlaying}>
          Play
        </Button>
        <Button onClick={handlePause} disabled={!isPlaying}>
          Pause
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </motion.div>
  )
}

export default AlgorithmVisualization

