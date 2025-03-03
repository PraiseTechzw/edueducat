"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface DataStructureVisualizationProps {
  type: string
}

const DataStructureVisualization: React.FC<DataStructureVisualizationProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw the data structure based on the type
    switch (type) {
      case "array":
        drawArray(ctx)
        break
      case "linked-list":
        drawLinkedList(ctx)
        break
      // Add more cases for other data structures
    }
  }, [type])

  const drawArray = (ctx: CanvasRenderingContext2D) => {
    const elements = [1, 2, 3, 4, 5]
    const elementWidth = 50
    const elementHeight = 50
    const startX = 50
    const startY = 100

    elements.forEach((element, index) => {
      ctx.strokeRect(startX + index * elementWidth, startY, elementWidth, elementHeight)
      ctx.fillText(element.toString(), startX + index * elementWidth + 20, startY + 30)
    })
  }

  const drawLinkedList = (ctx: CanvasRenderingContext2D) => {
    const elements = [1, 2, 3, 4, 5]
    const elementWidth = 50
    const elementHeight = 50
    const startX = 50
    const startY = 100
    const arrowLength = 30

    elements.forEach((element, index) => {
      ctx.strokeRect(startX + index * (elementWidth + arrowLength), startY, elementWidth, elementHeight)
      ctx.fillText(element.toString(), startX + index * (elementWidth + arrowLength) + 20, startY + 30)

      if (index < elements.length - 1) {
        ctx.beginPath()
        ctx.moveTo(startX + (index + 1) * (elementWidth + arrowLength) - arrowLength, startY + elementHeight / 2)
        ctx.lineTo(startX + (index + 1) * (elementWidth + arrowLength), startY + elementHeight / 2)
        ctx.stroke()

        // Draw arrowhead
        ctx.beginPath()
        ctx.moveTo(startX + (index + 1) * (elementWidth + arrowLength), startY + elementHeight / 2)
        ctx.lineTo(startX + (index + 1) * (elementWidth + arrowLength) - 10, startY + elementHeight / 2 - 5)
        ctx.lineTo(startX + (index + 1) * (elementWidth + arrowLength) - 10, startY + elementHeight / 2 + 5)
        ctx.closePath()
        ctx.fill()
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-64 bg-white dark:bg-slate-800 rounded-lg shadow-md"
    >
      <canvas ref={canvasRef} width={400} height={250} className="w-full h-full" />
    </motion.div>
  )
}

export default DataStructureVisualization

