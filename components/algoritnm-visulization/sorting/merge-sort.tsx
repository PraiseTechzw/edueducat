"use client"

import { useState, useEffect, useCallback } from "react"
import VisualizationCanvas from "../visualization-canvas"
import VisualizationControls from "../visualization-controls"
import AlgorithmExplanation from "../algorithm-explanation"

export default function MergeSort() {
  const [array, setArray] = useState<number[]>([38, 27, 43, 3, 9, 82, 10])
  const [auxiliaryArray, setAuxiliaryArray] = useState<number[]>([])
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
  const mergeColor = "#10b981" // Green
  const pivotColor = "#ef4444" // Red

  // Generate sorting steps
  const generateSteps = useCallback(() => {
    const arr = [...array]
    const steps: any[] = []
    const auxArray = [...arr]

    steps.push({
      array: [...arr],
      auxiliaryArray: [...auxArray],
      colorArray: Array(arr.length).fill(defaultColor),
      message: "Starting Merge Sort. This algorithm uses a divide-and-conquer approach.",
    })

    // Helper function to generate merge sort steps
    const mergeSortHelper = (mainArray: number[], auxiliaryArray: number[], start: number, end: number, depth = 0) => {
      if (start === end) {
        // Single element is already sorted
        const colors = Array(mainArray.length).fill(defaultColor)
        colors[start] = mergeColor

        steps.push({
          array: [...mainArray],
          auxiliaryArray: [...auxiliaryArray],
          colorArray: colors,
          message: `Subarray with single element [${mainArray[start]}] is already sorted.`,
        })

        return
      }

      const mid = Math.floor((start + end) / 2)

      // Visualize the division
      const divisionColors = Array(mainArray.length).fill(defaultColor)
      for (let i = start; i <= end; i++) {
        divisionColors[i] = i <= mid ? compareColor : pivotColor
      }

      steps.push({
        array: [...mainArray],
        auxiliaryArray: [...auxiliaryArray],
        colorArray: divisionColors,
        message: `Dividing array into two halves: [${mainArray.slice(start, mid + 1).join(", ")}] and [${mainArray.slice(mid + 1, end + 1).join(", ")}]`,
      })

      // Recursively sort
      mergeSortHelper(auxiliaryArray, mainArray, start, mid, depth + 1)
      mergeSortHelper(auxiliaryArray, mainArray, mid + 1, end, depth + 1)

      // Merge the sorted halves
      let i = start
      let j = mid + 1
      let k = start

      steps.push({
        array: [...mainArray],
        auxiliaryArray: [...auxiliaryArray],
        colorArray: divisionColors,
        message: `Merging subarrays [${auxiliaryArray.slice(start, mid + 1).join(", ")}] and [${auxiliaryArray.slice(mid + 1, end + 1).join(", ")}]`,
      })

      while (i <= mid && j <= end) {
        // Highlight elements being compared
        const compareColors = Array(mainArray.length).fill(defaultColor)
        compareColors[i] = compareColor
        compareColors[j] = pivotColor

        steps.push({
          array: [...mainArray],
          auxiliaryArray: [...auxiliaryArray],
          colorArray: compareColors,
          message: `Comparing elements: ${auxiliaryArray[i]} and ${auxiliaryArray[j]}`,
        })

        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
          // Choose from left subarray
          mainArray[k] = auxiliaryArray[i]

          const mergeColors = Array(mainArray.length).fill(defaultColor)
          mergeColors[k] = mergeColor

          steps.push({
            array: [...mainArray],
            auxiliaryArray: [...auxiliaryArray],
            colorArray: mergeColors,
            message: `${auxiliaryArray[i]} <= ${auxiliaryArray[j]}, placing ${auxiliaryArray[i]} at position ${k}`,
          })

          i++
        } else {
          // Choose from right subarray
          mainArray[k] = auxiliaryArray[j]

          const mergeColors = Array(mainArray.length).fill(defaultColor)
          mergeColors[k] = mergeColor

          steps.push({
            array: [...mainArray],
            auxiliaryArray: [...auxiliaryArray],
            colorArray: mergeColors,
            message: `${auxiliaryArray[i]} > ${auxiliaryArray[j]}, placing ${auxiliaryArray[j]} at position ${k}`,
          })

          j++
        }
        k++
      }

      // Copy remaining elements from left subarray
      while (i <= mid) {
        mainArray[k] = auxiliaryArray[i]

        const mergeColors = Array(mainArray.length).fill(defaultColor)
        mergeColors[k] = mergeColor

        steps.push({
          array: [...mainArray],
          auxiliaryArray: [...auxiliaryArray],
          colorArray: mergeColors,
          message: `Copying remaining element ${auxiliaryArray[i]} from left subarray to position ${k}`,
        })

        i++
        k++
      }

      // Copy remaining elements from right subarray
      while (j <= end) {
        mainArray[k] = auxiliaryArray[j]

        const mergeColors = Array(mainArray.length).fill(defaultColor)
        mergeColors[k] = mergeColor

        steps.push({
          array: [...mainArray],
          auxiliaryArray: [...auxiliaryArray],
          colorArray: mergeColors,
          message: `Copying remaining element ${auxiliaryArray[j]} from right subarray to position ${k}`,
        })

        j++
        k++
      }

      // Show merged subarray
      const mergedColors = Array(mainArray.length).fill(defaultColor)
      for (let i = start; i <= end; i++) {
        mergedColors[i] = mergeColor
      }

      steps.push({
        array: [...mainArray],
        auxiliaryArray: [...auxiliaryArray],
        colorArray: mergedColors,
        message: `Merged subarray: [${mainArray.slice(start, end + 1).join(", ")}]`,
      })

      // If we're at the top level and the entire array is processed, mark as sorted
      if (depth === 0 && start === 0 && end === mainArray.length - 1) {
        steps.push({
          array: [...mainArray],
          auxiliaryArray: [...auxiliaryArray],
          colorArray: Array(mainArray.length).fill(mergeColor),
          message: "Merge sort complete! The array is now sorted.",
        })
      }
    }

    // Start the merge sort
    mergeSortHelper(auxArray, arr, 0, arr.length - 1)

    return steps
  }, [array])

  // Initialize steps
  useEffect(() => {
    const newSteps = generateSteps()
    setSteps(newSteps)
    setCurrentStepIndex(-1)
    setIsSorted(false)

    // Reset state
    setAuxiliaryArray([...array])
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
      setAuxiliaryArray(step.auxiliaryArray)
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
      const maxValue = Math.max(...array, ...auxiliaryArray, 1)

      // Draw main array
      for (let i = 0; i < array.length; i++) {
        const barHeight = (array[i] / maxValue) * (height / 2 - 60)
        const x = 10 + i * barWidth
        const y = height / 2 - 30 - barHeight

        // Draw bar
        ctx.fillStyle = colorArray[i] || defaultColor
        ctx.fillRect(x, y, barWidth - 2, barHeight)

        // Draw value
        ctx.fillStyle = "#000"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.fillText(array[i].toString(), x + barWidth / 2, height / 2 - 10)
      }

      // Draw auxiliary array (if visible)
      if (auxiliaryArray.length > 0 && currentStepIndex > 0) {
        ctx.fillStyle = "#000"
        ctx.font = "12px Arial"
        ctx.textAlign = "left"
        ctx.fillText("Auxiliary Array:", 10, height / 2 + 20)

        for (let i = 0; i < auxiliaryArray.length; i++) {
          const barHeight = (auxiliaryArray[i] / maxValue) * (height / 2 - 60)
          const x = 10 + i * barWidth
          const y = height - 30 - barHeight

          // Draw bar
          ctx.fillStyle = "#6b7280" // Gray
          ctx.fillRect(x, y, barWidth - 2, barHeight)

          // Draw value
          ctx.fillStyle = "#000"
          ctx.font = "12px Arial"
          ctx.textAlign = "center"
          ctx.fillText(auxiliaryArray[i].toString(), x + barWidth / 2, height - 10)
        }
      }

      // Draw current step text
      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.textAlign = "left"
      ctx.fillText(`Step ${currentStepIndex + 1} of ${steps.length}`, 10, 20)
    },
    [array, auxiliaryArray, colorArray, currentStepIndex, steps.length, defaultColor],
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
        title="Merge Sort Algorithm"
        description="Merge Sort is an efficient, stable, comparison-based, divide and conquer sorting algorithm. It divides the input array into two halves, recursively sorts them, and then merges the sorted halves."
        timeComplexity="O(n log n)"
        spaceComplexity="O(n)"
        bestCase="O(n log n)"
        worstCase="O(n log n)"
        averageCase="O(n log n)"
        currentStep={currentStep}
      />
    </div>
  )
}

