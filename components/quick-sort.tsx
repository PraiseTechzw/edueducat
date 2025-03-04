"use client"

import { useState, useEffect, useCallback } from "react"
import VisualizationCanvas from "../visualization-canvas"
import VisualizationControls from "../visualization-controls"
import AlgorithmExplanation from "../algorithm-explanation"

export default function QuickSort() {
  const [array, setArray] = useState<number[]>([38, 27, 43, 3, 9, 82, 10])
  const [colorArray, setColorArray] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSorted, setIsSorted] = useState(false)
  const [currentStep, setCurrentStep] = useState("")
  const [steps, setSteps] = useState<any[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [speed, setSpeed] = useState([50])
  const [customInput, setCustomInput] = useState("")

  // Colors
  const defaultColor = "#3b82f6" // Blue
  const compareColor = "#f59e0b" // Yellow
  const sortedColor = "#10b981" // Green
  const pivotColor = "#ef4444" // Red
  const partitionColor = "#8b5cf6" // Purple

  // Generate sorting steps
  const generateSteps = useCallback(() => {
    const arr = [...array]
    const steps: any[] = []

    steps.push({
      array: [...arr],
      colorArray: Array(arr.length).fill(defaultColor),
      pivotIndex: -1,
      message: "Starting Quick Sort. This algorithm uses a divide-and-conquer approach with a pivot element.",
    })

    // Helper function to generate quick sort steps
    const quickSortHelper = (arr: number[], low: number, high: number, depth = 0) => {
      if (low >= high) {
        if (low === high) {
          // Single element is already sorted
          const colors = Array(arr.length).fill(defaultColor)
          colors[low] = sortedColor

          steps.push({
            array: [...arr],
            colorArray: colors,
            pivotIndex: -1,
            message: `Subarray with single element [${arr[low]}] is already sorted.`,
          })
        }
        return
      }

      // Choose pivot (last element)
      const pivotIndex = high
      const pivot = arr[pivotIndex]

      // Visualize the partition
      const partitionColors = Array(arr.length).fill(defaultColor)
      for (let i = low; i <= high; i++) {
        partitionColors[i] = partitionColor
      }
      partitionColors[pivotIndex] = pivotColor

      steps.push({
        array: [...arr],
        colorArray: partitionColors,
        pivotIndex,
        message: `Choosing pivot element: ${pivot} at index ${pivotIndex}`,
      })

      // Partition the array
      let i = low - 1

      for (let j = low; j < high; j++) {
        // Highlight elements being compared
        const compareColors = Array(arr.length).fill(defaultColor)
        for (let k = low; k <= high; k++) {
          compareColors[k] = partitionColor
        }
        compareColors[pivotIndex] = pivotColor
        compareColors[j] = compareColor

        steps.push({
          array: [...arr],
          colorArray: compareColors,
          pivotIndex,
          message: `Comparing element ${arr[j]} with pivot ${pivot}`,
        })

        if (arr[j] <= pivot) {
          i++

          // Swap arr[i] and arr[j]
          if (i !== j) {
            const swapColors = Array(arr.length).fill(defaultColor)
            for (let k = low; k <= high; k++) {
              swapColors[k] = partitionColor
            }
            swapColors[pivotIndex] = pivotColor
            swapColors[i] = compareColor
            swapColors[j] = compareColor

            steps.push({
              array: [...arr],
              colorArray: swapColors,
              pivotIndex,
              message: `${arr[j]} <= ${pivot}, swapping elements ${arr[i]} and ${arr[j]}`,
            })

            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp

            steps.push({
              array: [...arr],
              colorArray: swapColors,
              pivotIndex,
              message: `After swap: ${arr.slice(low, high + 1).join(", ")}`,
            })
          } else {
            steps.push({
              array: [...arr],
              colorArray: compareColors,
              pivotIndex,
              message: `${arr[j]} <= ${pivot}, element is already in correct position`,
            })
          }
        } else {
          steps.push({
            array: [...arr],
            colorArray: compareColors,
            pivotIndex,
            message: `${arr[j]} > ${pivot}, no swap needed`,
          })
        }
      }

      // Place pivot in correct position
      i++

      if (i !== high) {
        const swapColors = Array(arr.length).fill(defaultColor)
        for (let k = low; k <= high; k++) {
          swapColors[k] = partitionColor
        }
        swapColors[i] = compareColor
        swapColors[high] = pivotColor

        steps.push({
          array: [...arr],
          colorArray: swapColors,
          pivotIndex,
          message: `Placing pivot ${pivot} in its correct position by swapping with element ${arr[i]}`,
        })

        const temp = arr[i]
        arr[i] = arr[high]
        arr[high] = temp
      } else {
        steps.push({
          array: [...arr],
          colorArray: Array(arr.length)
            .fill(defaultColor)
            .map((c, idx) => (idx >= low && idx <= high ? partitionColor : c))
            .map((c, idx) => (idx === i ? pivotColor : c)),
          pivotIndex: i,
          message: `Pivot ${pivot} is already in its correct position at index ${i}`,
        })
      }

      // Mark pivot as sorted
      const pivotSortedColors = Array(arr.length).fill(defaultColor)
      for (let k = low; k <= high; k++) {
        pivotSortedColors[k] = partitionColor
      }
      pivotSortedColors[i] = sortedColor

      steps.push({
        array: [...arr],
        colorArray: pivotSortedColors,
        pivotIndex: i,
        message: `Pivot ${pivot} is now in its final sorted position. Elements to the left are smaller, elements to the right are larger.`,
      })

      // Recursively sort elements before and after pivot
      if (low < i - 1) {
        steps.push({
          array: [...arr],
          colorArray: Array(arr.length)
            .fill(defaultColor)
            .map((c, idx) => (idx >= low && idx <= i - 1 ? partitionColor : c)),
          pivotIndex: -1,
          message: `Recursively sorting left subarray [${arr.slice(low, i).join(", ")}]`,
        })
      }

      quickSortHelper(arr, low, i - 1, depth + 1)

      if (i + 1 < high) {
        steps.push({
          array: [...arr],
          colorArray: Array(arr.length)
            .fill(defaultColor)
            .map((c, idx) => (idx >= i + 1 && idx <= high ? partitionColor : c)),
          pivotIndex: -1,
          message: `Recursively sorting right subarray [${arr.slice(i + 1, high + 1).join(", ")}]`,
        })
      }

      quickSortHelper(arr, i + 1, high, depth + 1)

      // If we're at the top level and the entire array is processed, mark as sorted
      if (depth === 0 && low === 0 && high === arr.length - 1) {
        steps.push({
          array: [...arr],
          colorArray: Array(arr.length).fill(sortedColor),
          pivotIndex: -1,
          message: "Quick sort complete! The array is now sorted.",
        })
      }
    }

    // Start the quick sort
    quickSortHelper(arr, 0, arr.length - 1)

    return steps
  }, [array])

  // Initialize steps
  useEffect(() => {
    const newSteps = generateSteps()
    setSteps(newSteps)
    setCurrentStepIndex(-1)
    setIsSorted(false)

    // Reset state
    setColorArray(Array(array.length).fill(defaultColor))
    setCurrentStep("")
  }, [generateSteps, array])

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
    setIsSorted(false)
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

        // Draw bar
        ctx.fillStyle = colorArray[i] || defaultColor
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
    [array, colorArray, currentStepIndex, steps.length, defaultColor],
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
        title="Quick Sort Algorithm"
        description="Quick Sort is a divide-and-conquer algorithm that selects a 'pivot' element and partitions the array around it, so that elements less than the pivot are on the left and elements greater than the pivot are on the right."
        timeComplexity="O(n log n) average, O(n²) worst case"
        spaceComplexity="O(log n)"
        bestCase="O(n log n)"
        worstCase="O(n²) - When the array is already sorted or reverse sorted"
        averageCase="O(n log n)"
        currentStep={currentStep}
      />
    </div>
  )
}

