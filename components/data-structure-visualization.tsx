"use client"

import { Button } from "@/components/ui/button"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface DataStructureVisualizationProps {
  type: string
  animationSpeed: number
  darkMode: boolean
}

const DataStructureVisualization: React.FC<DataStructureVisualizationProps> = ({ type, animationSpeed, darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [elements, setElements] = useState<number[]>([1, 2, 3, 4, 5])
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set colors based on dark mode
      const bgColor = darkMode ? "#1a202c" : "#ffffff"
      const textColor = darkMode ? "#ffffff" : "#000000"
      const elementColor = darkMode ? "#4a5568" : "#e2e8f0"
      const highlightColor = darkMode ? "#48bb78" : "#68d391"

      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw the data structure based on the type
      switch (type) {
        case "array":
          drawArray(ctx, elements, animationStep, textColor, elementColor, highlightColor)
          break
        case "linked-list":
          drawLinkedList(ctx, elements, animationStep, textColor, elementColor, highlightColor)
          break
        // Add more cases for other data structures
      }

      // Increment animation step
      setAnimationStep((prev) => (prev + 1) % (elements.length * 2))
    }

    const animationId = setInterval(animate, 1000 / animationSpeed)

    return () => clearInterval(animationId)
  }, [type, elements, animationSpeed, darkMode, animationStep])

  const drawArray = (
    ctx: CanvasRenderingContext2D,
    elements: number[],
    step: number,
    textColor: string,
    elementColor: string,
    highlightColor: string,
  ) => {
    const elementWidth = 50
    const elementHeight = 50
    const startX = 50
    const startY = 100

    elements.forEach((element, index) => {
      ctx.fillStyle = index === step % elements.length ? highlightColor : elementColor
      ctx.fillRect(startX + index * elementWidth, startY, elementWidth, elementHeight)
      ctx.strokeRect(startX + index * elementWidth, startY, elementWidth, elementHeight)

      ctx.fillStyle = textColor
      ctx.font = "20px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(element.toString(), startX + index * elementWidth + elementWidth / 2, startY + elementHeight / 2)
    })
  }

  const drawLinkedList = (
    ctx: CanvasRenderingContext2D,
    elements: number[],
    step: number,
    textColor: string,
    elementColor: string,
    highlightColor: string,
  ) => {
    const elementWidth = 50
    const elementHeight = 50
    const startX = 50
    const startY = 100
    const arrowLength = 30

    elements.forEach((element, index) => {
      ctx.fillStyle = index === step % elements.length ? highlightColor : elementColor
      ctx.fillRect(startX + index * (elementWidth + arrowLength), startY, elementWidth, elementHeight)
      ctx.strokeRect(startX + index * (elementWidth + arrowLength), startY, elementWidth, elementHeight)

      ctx.fillStyle = textColor
      ctx.font = "20px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(
        element.toString(),
        startX + index * (elementWidth + arrowLength) + elementWidth / 2,
        startY + elementHeight / 2,
      )

      if (index < elements.length - 1) {
        ctx.beginPath()
        ctx.moveTo(startX + (index + 1) * (elementWidth + arrowLength) - arrowLength, startY + elementHeight / 2)
        ctx.lineTo(startX + (index + 1) * (elementWidth + arrowLength), startY + elementHeight / 2)
        ctx.strokeStyle = textColor
        ctx.stroke()

        // Draw arrowhead
        ctx.beginPath()
        ctx.moveTo(startX + (index + 1) * (elementWidth + arrowLength), startY + elementHeight / 2)
        ctx.lineTo(startX + (index + 1) * (elementWidth + arrowLength) - 10, startY + elementHeight / 2 - 5)
        ctx.lineTo(startX + (index + 1) * (elementWidth + arrowLength) - 10, startY + elementHeight / 2 + 5)
        ctx.closePath()
        ctx.fillStyle = textColor
        ctx.fill()
      }
    })
  }

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={400} height={200} className="w-full h-auto border rounded-lg" />
      <div className="mt-4 flex justify-center space-x-2">
        <Button onClick={() => setElements([...elements, elements.length + 1])}>Add Element</Button>
        <Button onClick={() => setElements(elements.slice(0, -1))}>Remove Element</Button>
      </div>
    </div>
  )
}

export default DataStructureVisualization

