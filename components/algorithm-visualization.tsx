"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw } from "lucide-react"

interface AlgorithmVisualizationProps {
  type: string
}

export default function AlgorithmVisualization({ type }: AlgorithmVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState([50])
  const [currentStep, setCurrentStep] = useState(0)
  const [array, setArray] = useState<number[]>([])
  const [steps, setSteps] = useState<any[]>([])
  const [searchTarget, setSearchTarget] = useState<number | null>(null)

  // Initialize the visualization
  useEffect(() => {
    resetVisualization()
  }, [])

  const resetVisualization = () => {
    setIsPlaying(false)
    setCurrentStep(0)

    // Generate random array
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
    setArray(newArray)

    // Generate steps based on algorithm type
    if (type === "bubble-sort") {
      setSteps(generateBubbleSortSteps([...newArray]))
    } else if (type === "binary-search") {
      const sortedArray = [...newArray].sort((a, b) => a - b)
      setArray(sortedArray)
      const target = sortedArray[Math.floor(Math.random() * sortedArray.length)]
      setSearchTarget(target)
      setSteps(generateBinarySearchSteps([...sortedArray], target))
    } else if (type === "merge-sort") {
      setSteps(generateMergeSortSteps([...newArray]))
    } else if (type === "quick-sort") {
      setSteps(generateQuickSortSteps([...newArray]))
    } else if (type === "dfs") {
      // For graph algorithms, we would need a different approach
      // This is a simplified placeholder
      setSteps([{ type: "info", message: "DFS visualization would go here" }])
    } else if (type === "bfs") {
      setSteps([{ type: "info", message: "BFS visualization would go here" }])
    }
  }

  // Animation loop
  useEffect(() => {
    let animationId: number

    if (isPlaying && currentStep < steps.length) {
      const timeout = setTimeout(
        () => {
          setCurrentStep((prev) => prev + 1)
        },
        1000 - speed[0] * 9,
      )

      return () => clearTimeout(timeout)
    }

    if (currentStep >= steps.length) {
      setIsPlaying(false)
    }

    return () => cancelAnimationFrame(animationId)
  }, [isPlaying, currentStep, steps, speed])

  // Draw the current state
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (type === "bubble-sort" || type === "merge-sort" || type === "quick-sort") {
      drawSortingVisualization(ctx, canvas, array, steps[currentStep] || {})
    } else if (type === "binary-search") {
      drawBinarySearchVisualization(ctx, canvas, array, steps[currentStep] || {}, searchTarget)
    }
  }, [array, currentStep, steps, type, searchTarget])

  // Drawing functions
  const drawSortingVisualization = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    arr: number[],
    step: any,
  ) => {
    const barWidth = canvas.width / arr.length
    const maxValue = Math.max(...arr)

    arr.forEach((value, index) => {
      const barHeight = (value / maxValue) * (canvas.height - 40)

      // Default color
      ctx.fillStyle = "#3b82f6"

      // Highlight elements being compared or swapped
      if (step && step.comparing && (step.comparing[0] === index || step.comparing[1] === index)) {
        ctx.fillStyle = "#facc15"
      }

      if (step && step.swapping && (step.swapping[0] === index || step.swapping[1] === index)) {
        ctx.fillStyle = "#ef4444"
      }

      if (step && step.sorted && step.sorted.includes(index)) {
        ctx.fillStyle = "#10b981"
      }

      ctx.fillRect(index * barWidth, canvas.height - barHeight, barWidth - 2, barHeight)

      // Draw value
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.fillText(value.toString(), index * barWidth + barWidth / 2 - 10, canvas.height - 5)
    })
  }

  const drawBinarySearchVisualization = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    arr: number[],
    step: any,
    target: number | null,
  ) => {
    const boxWidth = canvas.width / arr.length
    const boxHeight = 40

    arr.forEach((value, index) => {
      // Default color
      ctx.fillStyle = "#3b82f6"

      // Highlight elements being checked
      if (step && step.mid === index) {
        ctx.fillStyle = "#facc15"
      }

      if (step && step.found === index) {
        ctx.fillStyle = "#10b981"
      }

      if (step && step.eliminated && step.eliminated.includes(index)) {
        ctx.fillStyle = "#d1d5db"
      }

      ctx.fillRect(index * boxWidth, canvas.height / 2 - boxHeight / 2, boxWidth - 2, boxHeight)

      // Draw value
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.fillText(value.toString(), index * boxWidth + boxWidth / 2 - 10, canvas.height / 2 + 5)
    })

    // Draw target
    if (target !== null) {
      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.fillText(`Target: ${target}`, 10, 20)
    }

    // Draw current step info
    if (step && step.message) {
      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.fillText(step.message, 10, canvas.height - 10)
    }
  }

  // Algorithm step generators
  const generateBubbleSortSteps = (arr: number[]) => {
    const steps = []
    const n = arr.length

    // Initial state
    steps.push({ array: [...arr], comparing: null, swapping: null, sorted: [] })

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Comparing step
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapping: null,
          sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
        })

        if (arr[j] > arr[j + 1]) {
          // Swapping step
          steps.push({
            array: [...arr],
            comparing: null,
            swapping: [j, j + 1],
            sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
          })

          // Perform swap
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

          // After swap
          steps.push({
            array: [...arr],
            comparing: null,
            swapping: null,
            sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
          })
        }
      }

      // Mark element as sorted
      steps.push({
        array: [...arr],
        comparing: null,
        swapping: null,
        sorted: Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx),
      })
    }

    return steps
  }

  const generateBinarySearchSteps = (arr: number[], target: number) => {
    const steps = []
    let low = 0
    let high = arr.length - 1

    // Initial state
    steps.push({
      low,
      high,
      mid: null,
      found: null,
      eliminated: [],
      message: "Starting binary search",
    })

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)

      // Checking mid
      steps.push({
        low,
        high,
        mid,
        found: null,
        eliminated: [],
        message: `Checking middle element at index ${mid}: ${arr[mid]}`,
      })

      if (arr[mid] === target) {
        // Found
        steps.push({
          low,
          high,
          mid: null,
          found: mid,
          eliminated: [],
          message: `Found target ${target} at index ${mid}!`,
        })
        break
      } else if (arr[mid] < target) {
        // Eliminate left half
        const eliminated = Array.from({ length: mid - low + 1 }, (_, idx) => low + idx)
        steps.push({
          low: mid + 1,
          high,
          mid: null,
          found: null,
          eliminated,
          message: `${arr[mid]} < ${target}, eliminating left half`,
        })
        low = mid + 1
      } else {
        // Eliminate right half
        const eliminated = Array.from({ length: high - mid + 1 }, (_, idx) => mid + idx)
        steps.push({
          low,
          high: mid - 1,
          mid: null,
          found: null,
          eliminated,
          message: `${arr[mid]} > ${target}, eliminating right half`,
        })
        high = mid - 1
      }
    }

    if (steps[steps.length - 1].found === null) {
      steps.push({
        low,
        high,
        mid: null,
        found: null,
        eliminated: [],
        message: `Target ${target} not found in the array`,
      })
    }

    return steps
  }

  const generateMergeSortSteps = (arr: number[]) => {
    // Simplified for demonstration
    return generateBubbleSortSteps(arr)
  }

  const generateQuickSortSteps = (arr: number[]) => {
    // Simplified for demonstration
    return generateBubbleSortSteps(arr)
  }

  return (
    <div className="flex flex-col space-y-4">
      <canvas ref={canvasRef} width={500} height={300} className="w-full border rounded-md bg-white" />

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={currentStep >= steps.length}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <Button variant="outline" size="icon" onClick={resetVisualization}>
          <RotateCcw className="h-4 w-4" />
        </Button>

        <div className="flex-1">
          <Slider value={speed} min={1} max={100} step={1} onValueChange={setSpeed} />
        </div>
      </div>

      {steps[currentStep]?.message && (
        <div className="text-sm text-gray-700 dark:text-gray-300">{steps[currentStep].message}</div>
      )}

      <div className="text-sm text-gray-500">
        Step {currentStep + 1} of {steps.length}
      </div>
    </div>
  )
}

