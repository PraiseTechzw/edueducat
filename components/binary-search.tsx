"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import VisualizationCanvas from "../visualization-canvas"
import VisualizationControls from "../visualization-controls"
import AlgorithmExplanation from "../algorithm-explanation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function BinarySearch() {
  const [array, setArray] = useState<number[]>([2, 5, 8, 12, 16, 23, 38, 56, 72, 91])
  const [colorArray, setColorArray] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSearchComplete, setIsSearchComplete] = useState(false)
  const [currentStep, setCurrentStep] = useState("")
  const [steps, setSteps] = useState<any[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [speed, setSpeed] = useState([50])
  const [customInput, setCustomInput] = useState("")
  const [targetValue, setTargetValue] = useState<string>("23")

  // Colors
  const defaultColor = "#3b82f6" // Blue
  const searchRangeColor = "#f59e0b" // Yellow
  const midColor = "#ef4444" // Red
  const foundColor = "#10b981" // Green

  // Generate search steps
  const generateSteps = useCallback(() => {
    const arr = [...array].sort((a, b) => a - b) // Ensure array is sorted
    const target = Number.parseInt(targetValue)

    if (isNaN(target)) {
      return [
        {
          array: arr,
          colorArray: Array(arr.length).fill(defaultColor),
          message: "Please enter a valid target value.",
        },
      ]
    }

    const steps: any[] = []

    steps.push({
      array: arr,
      colorArray: Array(arr.length).fill(defaultColor),
      message: `Starting binary search for value ${target} in the sorted array.`,
    })

    let left = 0
    let right = arr.length - 1
    let found = false

    while (left <= right) {
      // Show current search range
      const rangeColors = Array(arr.length).fill(defaultColor)
      for (let i = left; i <= right; i++) {
        rangeColors[i] = searchRangeColor
      }

      steps.push({
        array: arr,
        colorArray: rangeColors,
        message: `Current search range: indices ${left} to ${right} [${arr.slice(left, right + 1).join(", ")}]`,
      })

      // Calculate mid point
      const mid = Math.floor((left + right) / 2)

      // Highlight mid point
      const midColors = Array(arr.length).fill(defaultColor)
      for (let i = left; i <= right; i++) {
        midColors[i] = searchRangeColor
      }
      midColors[mid] = midColor

      steps.push({
        array: arr,
        colorArray: midColors,
        message: `Checking middle element at index ${mid}: ${arr[mid]}`,
      })

      // Compare with target
      if (arr[mid] === target) {
        // Found the target
        const foundColors = Array(arr.length).fill(defaultColor)
        foundColors[mid] = foundColor

        steps.push({
          array: arr,
          colorArray: foundColors,
          message: `Found target value ${target} at index ${mid}!`,
        })

        found = true
        break
      } else if (arr[mid] < target) {
        // Target is in the right half
        steps.push({
          array: arr,
          colorArray: midColors,
          message: `${arr[mid]} < ${target}, so the target must be in the right half.`,
        })

        left = mid + 1
      } else {
        // Target is in the left half
        steps.push({
          array: arr,
          colorArray: midColors,
          message: `${arr[mid]} > ${target}, so the target must be in the left half.`,
        })

        right = mid - 1
      }
    }

    if (!found) {
      steps.push({
        array: arr,
        colorArray: Array(arr.length).fill(defaultColor),
        message: `Target value ${target} not found in the array.`,
      })
    }

    return steps
  }, [array, targetValue])

  // Initialize steps when target value changes
  useEffect(() => {
    const newSteps = generateSteps()
    setSteps(newSteps)
    setCurrentStepIndex(-1)
    setIsSearchComplete(false)

    // Reset state
    setColorArray(Array(array.length).fill(defaultColor))
    setCurrentStep("")
  }, [generateSteps, array])

  // Animation loop
  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length - 1) {
      if (currentStepIndex >= steps.length - 1) {
        setIsSearchComplete(true)
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
      setColorArray(step.colorArray)
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
    setIsSearchComplete(false)
    setColorArray(Array(array.length).fill(defaultColor))
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
        .sort((a, b) => a - b) // Sort the array for binary search

      if (newArray.length < 2) {
        alert("Please enter at least 2 valid numbers")
        return
      }

      setArray(newArray)
      setIsPlaying(false)
      setCurrentStepIndex(-1)
      setIsSearchComplete(false)
    } catch (error) {
      alert("Invalid input. Please enter comma-separated numbers.")
    }
  }

  // Handle target value change
  const handleTargetValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetValue(e.target.value)
  }

  const handleStartSearch = () => {
    setIsPlaying(false)
    setCurrentStepIndex(-1)
    setIsSearchComplete(false)
    const newSteps = generateSteps()
    setSteps(newSteps)
  }

  // Canvas render function
  const renderCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const width = canvas.width
      const height = canvas.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Calculate box width based on array length
      const boxWidth = Math.min(60, (width - 20) / array.length)
      const boxHeight = 40
      const startX = (width - boxWidth * array.length) / 2
      const startY = height / 2 - boxHeight / 2

      // Draw array boxes
      for (let i = 0; i < array.length; i++) {
        // Box
        ctx.fillStyle = colorArray[i] || defaultColor
        ctx.fillRect(startX + i * boxWidth, startY, boxWidth, boxHeight)

        // Border
        ctx.strokeStyle = "#000"
        ctx.lineWidth = 1
        ctx.strokeRect(startX + i * boxWidth, startY, boxWidth, boxHeight)

        // Value
        ctx.fillStyle = "#fff"
        ctx.font = "14px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(array[i].toString(), startX + i * boxWidth + boxWidth / 2, startY + boxHeight / 2)

        // Index
        ctx.fillStyle = "#000"
        ctx.font = "12px Arial"
        ctx.fillText(i.toString(), startX + i * boxWidth + boxWidth / 2, startY + boxHeight + 15)
      }

      // Draw current step text
      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.textAlign = "left"
      ctx.fillText(`Step ${currentStepIndex + 1} of ${steps.length}`, 10, 20)

      // Draw target value
      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.textAlign = "right"
      ctx.fillText(`Target: ${targetValue}`, width - 10, 20)
    },
    [array, colorArray, currentStepIndex, steps.length, targetValue, defaultColor],
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Input
          placeholder="Enter target value"
          value={targetValue}
          onChange={handleTargetValueChange}
          className="w-40"
        />
        <Button onClick={handleStartSearch}>Search</Button>
      </div>

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
        title="Binary Search Algorithm"
        description="Binary search is an efficient algorithm for finding a target value within a sorted array. It works by repeatedly dividing the search interval in half, eliminating half of the remaining elements at each step."
        timeComplexity="O(log n)"
        spaceComplexity="O(1)"
        bestCase="O(1) - When the target is at the middle"
        worstCase="O(log n) - When the target is at the extreme ends or not present"
        averageCase="O(log n)"
        currentStep={currentStep}
      />
    </div>
  )
}

