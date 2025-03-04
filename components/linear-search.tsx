"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import VisualizationCanvas from "../visualization-canvas"
import VisualizationControls from "../visualization-controls"
import AlgorithmExplanation from "../algorithm-explanation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LinearSearch() {
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90])
  const [colorArray, setColorArray] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSearchComplete, setIsSearchComplete] = useState(false)
  const [currentStep, setCurrentStep] = useState("")
  const [steps, setSteps] = useState<any[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [speed, setSpeed] = useState([50])
  const [customInput, setCustomInput] = useState("")
  const [targetValue, setTargetValue] = useState<string>("12")

  // Colors
  const defaultColor = "#3b82f6" // Blue
  const searchingColor = "#f59e0b" // Yellow
  const foundColor = "#10b981" // Green
  const notFoundColor = "#ef4444" // Red

  // Generate search steps
  const generateSteps = useCallback(() => {
    const arr = [...array]
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
      message: `Starting linear search for value ${target} in the array.`,
    })

    let found = false
    let foundIndex = -1

    for (let i = 0; i < arr.length; i++) {
      // Highlight current element being checked
      const searchColors = Array(arr.length).fill(defaultColor)

      // Previously checked elements
      for (let j = 0; j < i; j++) {
        searchColors[j] = notFoundColor
      }

      // Current element
      searchColors[i] = searchingColor

      steps.push({
        array: arr,
        colorArray: searchColors,
        message: `Checking element at index ${i}: ${arr[i]}`,
      })

      if (arr[i] === target) {
        // Found the target
        found = true
        foundIndex = i

        const foundColors = Array(arr.length).fill(defaultColor)

        // Previously checked elements
        for (let j = 0; j < i; j++) {
          foundColors[j] = notFoundColor
        }

        // Found element
        foundColors[i] = foundColor

        steps.push({
          array: arr,
          colorArray: foundColors,
          message: `Found target value ${target} at index ${i}!`,
        })

        break
      }
    }

    if (!found) {
      // Target not found
      const notFoundColors = Array(arr.length).fill(notFoundColor)

      steps.push({
        array: arr,
        colorArray: notFoundColors,
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
  }, [generateSteps, array, defaultColor])

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
    [array, colorArray, currentStepIndex, steps.length, targetValue],
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
        title="Linear Search Algorithm"
        description="Linear search is the simplest search algorithm that checks each element of the array sequentially until it finds the target value or reaches the end of the array."
        timeComplexity="O(n)"
        spaceComplexity="O(1)"
        bestCase="O(1) - When the target is at the first position"
        worstCase="O(n) - When the target is at the last position or not present"
        averageCase="O(n/2) ≈ O(n)"
        currentStep={currentStep}
      />
    </div>
  )
}

