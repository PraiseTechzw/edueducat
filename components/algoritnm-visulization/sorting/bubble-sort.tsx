"use client"

import { useState, useEffect, useCallback } from "react"
import VisualizationCanvas from "../visualization-canvas"
import VisualizationControls from "../visualization-controls"
import AlgorithmExplanation from "../algorithm-explanation"

export default function BubbleSort() {
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90])
  const [sortedIndices, setSortedIndices] = useState<number[]>([])
  const [comparingIndices, setComparingIndices] = useState<number[]>([])
  const [swappingIndices, setSwappingIndices] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSorted, setIsSorted] = useState(false)
  const [currentStep, setCurrentStep] = useState("")
  const [steps, setSteps] = useState<any[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [speed, setSpeed] = useState([50])
  const [customInput, setCustomInput] = useState("")

  // Generate sorting steps
  const generateSteps = useCallback(() => {
    const arr = [...array]
    const steps = []

    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      message: "Starting bubble sort. We'll compare adjacent elements and swap them if they're in the wrong order.",
    })

    const n = arr.length
    const sortedIndices = []

    for (let i = 0; i < n - 1; i++) {
      let swapped = false

      for (let j = 0; j < n - i - 1; j++) {
        // Compare adjacent elements
        steps.push({
          array: [...arr],
          comparingIndices: [j, j + 1],
          swappingIndices: [],
          sortedIndices: [...sortedIndices],
          message: `Comparing elements at indices ${j} and ${j + 1}: ${arr[j]} and ${arr[j + 1]}`,
        })

        if (arr[j] > arr[j + 1]) {
          // Swap elements
          steps.push({
            array: [...arr],
            comparingIndices: [],
            swappingIndices: [j, j + 1],
            sortedIndices: [...sortedIndices],
            message: `${arr[j]} > ${arr[j + 1]}, swapping elements`,
          })

          const temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
          swapped = true

          // Show array after swap
          steps.push({
            array: [...arr],
            comparingIndices: [],
            swappingIndices: [],
            sortedIndices: [...sortedIndices],
            message: `After swap: ${arr.join(", ")}`,
          })
        } else {
          steps.push({
            array: [...arr],
            comparingIndices: [],
            swappingIndices: [],
            sortedIndices: [...sortedIndices],
            message: `${arr[j]} <= ${arr[j + 1]}, no swap needed`,
          })
        }
      }

      // Mark the last element as sorted
      sortedIndices.push(n - i - 1)

      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [...sortedIndices],
        message: `Element at index ${n - i - 1} (value ${arr[n - i - 1]}) is now in its correct position`,
      })

      // If no swapping occurred in this pass, the array is sorted
      if (!swapped) {
        // Mark all remaining elements as sorted
        for (let k = 0; k < n - i - 1; k++) {
          if (!sortedIndices.includes(k)) {
            sortedIndices.push(k)
          }
        }

        steps.push({
          array: [...arr],
          comparingIndices: [],
          swappingIndices: [],
          sortedIndices: [...sortedIndices],
          message: "No swaps in this pass, the array is sorted",
        })

        break
      }
    }

    // Final step - all sorted
    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: Array.from(Array(n).keys()), // All indices are sorted
      message: "Bubble sort complete! The array is now sorted.",
    })

    return steps
  }, [array])

  // Initialize steps
  useEffect(() => {
    const newSteps = generateSteps()
    setSteps(newSteps)
    setCurrentStepIndex(-1)
    setIsSorted(false)

    // Reset state
    setComparingIndices([])
    setSwappingIndices([])
    setSortedIndices([])
    setCurrentStep("")
  }, [generateSteps])

  // Animation loop
  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length - 1) {
      if (currentStepIndex >= steps.length - 1) {
        setIsSorted(true)
        setIsPlaying(false)
      }
      return
    }

    const timeout = setTimeout(
      () => {
        setCurrentStepIndex((prevIndex) => prevIndex + 1)
      },
      1000 - speed[0] * 9,
    ) // Convert speed (1-100) to delay (900-0ms)

    return () => clearTimeout(timeout)
  }, [isPlaying, currentStepIndex, steps, speed])

  // Update visualization based on current step
  useEffect(() => {
    if (currentStepIndex >= 0 && currentStepIndex < steps.length) {
      const step = steps[currentStepIndex]
      setArray(step.array)
      setComparingIndices(step.comparingIndices)
      setSwappingIndices(step.swappingIndices)
      setSortedIndices(step.sortedIndices)
      setCurrentStep(step.message)
    }
  }, [currentStepIndex, steps])

  // Handle play/pause
  const handlePlayPause = () => {
    if (currentStepIndex >= steps.length - 1) {
      // If at the end, restart
      setCurrentStepIndex(0)
    }
    setIsPlaying(!isPlaying)
  }

  // Handle reset
  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStepIndex(-1)
    setIsSorted(false)
    setComparingIndices([])
    setSwappingIndices([])
    setSortedIndices([])
    setCurrentStep("")
  }

  // Handle step forward
  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  // Apply custom input
  const handleApplyCustomInput = () => {
    try {
      const newArray = customInput
        .split(",")
        .map((item) => Number.parseInt(item.trim()))
        .filter((num) => !isNaN(num))

      if (newArray.length < 2) {
        alert("Please enter at least 2 valid numbers")
        return
      }

      setArray(newArray)
      setIsPlaying(false)
      setCurrentStepIndex(-1)
      setIsSorted(false)
    } catch (error) {
      alert("Invalid input. Please enter comma-separated numbers.")
    }
  }

  // Canvas render function
  const renderCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const width = canvas.width
      const height = canvas.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Calculate bar width based on array length
      const barWidth = (width - 20) / array.length
      const maxValue = Math.max(...array, 1)

      // Draw bars
      for (let i = 0; i < array.length; i++) {
        const barHeight = (array[i] / maxValue) * (height - 60)
        const x = 10 + i * barWidth
        const y = height - 30 - barHeight

        // Determine bar color
        let color = "#3b82f6" // Default blue

        if (sortedIndices.includes(i)) {
          color = "#10b981" // Green for sorted
        } else if (comparingIndices.includes(i)) {
          color = "#f59e0b" // Yellow for comparing
        } else if (swappingIndices.includes(i)) {
          color = "#ef4444" // Red for swapping
        }

        // Draw bar
        ctx.fillStyle = color
        ctx.fillRect(x, y, barWidth - 2, barHeight)

        // Draw value
        ctx.fillStyle = "#000"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.fillText(array[i].toString(), x + barWidth / 2, height - 10)
      }

      // Draw current step text
      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.textAlign = "left"
      ctx.fillText(`Step ${currentStepIndex + 1} of ${steps.length}`, 10, 20)
    },
    [array, comparingIndices, swappingIndices, sortedIndices, currentStepIndex, steps.length],
  )

  return (
    <div className="space-y-4">
      <VisualizationCanvas renderFunction={renderCanvas} />

      <VisualizationControls
        isPlaying={isPlaying}
        speed={speed}
        onPlayPause={handlePlayPause}
        onReset={handleReset}
        onStepForward={handleStepForward}
        onSpeedChange={setSpeed}
        customInput={customInput}
        onCustomInputChange={setCustomInput}
        onApplyCustomInput={handleApplyCustomInput}
        disablePlayPause={false}
        disableStepForward={currentStepIndex >= steps.length - 1}
        disableReset={currentStepIndex === -1}
      />

      <AlgorithmExplanation
        title="Bubble Sort Algorithm"
        description="Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted."
        timeComplexity="O(n²)"
        spaceComplexity="O(1)"
        bestCase="O(n) - When the array is already sorted"
        worstCase="O(n²) - When the array is sorted in reverse order"
        averageCase="O(n²)"
        currentStep={currentStep}
      />
    </div>
  )
}

