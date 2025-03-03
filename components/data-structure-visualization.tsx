"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Play, Pause, RotateCcw, Plus, Minus } from "lucide-react"

interface DataStructureVisualizationProps {
  type: string
}

export default function DataStructureVisualization({ type }: DataStructureVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState([50])
  const [elements, setElements] = useState<number[]>([])
  const [newElement, setNewElement] = useState<string>("")
  const [operationIndex, setOperationIndex] = useState<number | null>(null)
  const [operationValue, setOperationValue] = useState<number | null>(null)
  const [message, setMessage] = useState<string>("")
  const [animationStep, setAnimationStep] = useState(0)
  const [animationSteps, setAnimationSteps] = useState<any[]>([])
  const [pointers, setPointers] = useState<{ [key: string]: number }>({})

  // Initialize the visualization
  useEffect(() => {
    resetVisualization()
  }, [type])

  const resetVisualization = () => {
    setIsPlaying(false)
    setAnimationStep(0)

    // Generate initial elements based on data structure type
    let initialElements: number[] = []
    let initialSteps: any[] = []
    let initialPointers: { [key: string]: number } = {}

    switch (type) {
      case "array":
        initialElements = [10, 20, 30, 40, 50]
        initialSteps = [{ elements: [...initialElements], message: "Initial array" }]
        break
      case "linked-list":
        initialElements = [10, 20, 30]
        initialPointers = { head: 0 }
        initialSteps = [
          {
            elements: [...initialElements],
            pointers: { ...initialPointers },
            message: "Initial linked list with head pointing to first node",
          },
        ]
        break
      case "stack":
        initialElements = [30, 20, 10]
        initialPointers = { top: 0 }
        initialSteps = [
          {
            elements: [...initialElements],
            pointers: { ...initialPointers },
            message: "Initial stack with top element: 30",
          },
        ]
        break
      case "queue":
        initialElements = [10, 20, 30]
        initialPointers = { front: 0, rear: 2 }
        initialSteps = [
          {
            elements: [...initialElements],
            pointers: { ...initialPointers },
            message: "Initial queue with front: 10 and rear: 30",
          },
        ]
        break
      case "hash-table":
        initialElements = [null, 42, null, 13, 7, null, null, 28]
        initialSteps = [
          {
            elements: [...initialElements],
            message: "Hash table with elements stored at their hash positions",
          },
        ]
        break
      case "binary-tree":
        initialElements = [50, 30, 70, 20, 40, 60, 80]
        initialSteps = [
          {
            elements: [...initialElements],
            message: "Binary tree with root node 50",
          },
        ]
        break
      case "heap":
        initialElements = [90, 70, 60, 40, 50, 20, 30]
        initialSteps = [
          {
            elements: [...initialElements],
            message: "Max heap with root element 90",
          },
        ]
        break
      case "graph":
        // For graph, we'll use a different approach
        initialElements = [1, 2, 3, 4, 5]
        initialSteps = [
          {
            elements: [...initialElements],
            edges: [
              [0, 1],
              [0, 3],
              [1, 2],
              [2, 3],
              [3, 4],
            ],
            message: "Graph with 5 vertices and 5 edges",
          },
        ]
        break
      default:
        initialElements = [10, 20, 30, 40, 50]
        initialSteps = [{ elements: [...initialElements], message: "Data structure visualization" }]
    }

    setElements(initialElements)
    setAnimationSteps(initialSteps)
    setPointers(initialPointers)
    setMessage(initialSteps[0].message)
  }

  // Handle adding a new element
  const handleAddElement = () => {
    if (!newElement.trim()) return

    const value = Number.parseInt(newElement)
    if (isNaN(value)) return

    const newElements = [...elements]
    const newPointers = { ...pointers }
    let steps: any[] = []

    switch (type) {
      case "array":
        steps = generateArrayInsertSteps(newElements, value)
        break
      case "linked-list":
        steps = generateLinkedListAppendSteps(newElements, value, newPointers)
        break
      case "stack":
        steps = generateStackPushSteps(newElements, value, newPointers)
        break
      case "queue":
        steps = generateQueueEnqueueSteps(newElements, value, newPointers)
        break
      default:
        newElements.push(value)
        steps = [
          {
            elements: [...newElements],
            pointers: { ...newPointers },
            message: `Added element ${value}`,
          },
        ]
    }

    setAnimationSteps(steps)
    setAnimationStep(0)
    setNewElement("")
  }

  // Handle removing an element
  const handleRemoveElement = () => {
    if (elements.length === 0) return

    const newElements = [...elements]
    const newPointers = { ...pointers }
    let steps: any[] = []

    switch (type) {
      case "array":
        steps = generateArrayRemoveSteps(newElements, operationIndex || 0)
        break
      case "linked-list":
        steps = generateLinkedListRemoveSteps(newElements, operationValue || 0, newPointers)
        break
      case "stack":
        steps = generateStackPopSteps(newElements, newPointers)
        break
      case "queue":
        steps = generateQueueDequeueSteps(newElements, newPointers)
        break
      default:
        newElements.pop()
        steps = [
          {
            elements: [...newElements],
            pointers: { ...newPointers },
            message: "Removed last element",
          },
        ]
    }

    setAnimationSteps(steps)
    setAnimationStep(0)
    setOperationIndex(null)
    setOperationValue(null)
  }

  // Animation loop
  useEffect(() => {
    let animationId: number

    if (isPlaying && animationStep < animationSteps.length - 1) {
      const timeout = setTimeout(
        () => {
          setAnimationStep((prev) => prev + 1)
        },
        1000 - speed[0] * 9,
      )

      return () => clearTimeout(timeout)
    }

    if (animationStep >= animationSteps.length - 1) {
      setIsPlaying(false)

      // Update final state
      if (animationSteps.length > 0) {
        const finalStep = animationSteps[animationSteps.length - 1]
        setElements(finalStep.elements || [])
        setPointers(finalStep.pointers || {})
        setMessage(finalStep.message || "")
      }
    }

    return () => cancelAnimationFrame(animationId)
  }, [isPlaying, animationStep, animationSteps, speed])

  // Update current state based on animation step
  useEffect(() => {
    if (animationSteps.length > 0 && animationStep < animationSteps.length) {
      const currentStep = animationSteps[animationStep]
      setElements(currentStep.elements || [])
      setPointers(currentStep.pointers || {})
      setMessage(currentStep.message || "")
    }
  }, [animationStep, animationSteps])

  // Draw the current state
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw based on data structure type
    switch (type) {
      case "array":
        drawArray(ctx, canvas, elements, operationIndex)
        break
      case "linked-list":
        drawLinkedList(ctx, canvas, elements, pointers, operationValue)
        break
      case "stack":
        drawStack(ctx, canvas, elements, pointers)
        break
      case "queue":
        drawQueue(ctx, canvas, elements, pointers)
        break
      case "hash-table":
        drawHashTable(ctx, canvas, elements)
        break
      case "binary-tree":
        drawBinaryTree(ctx, canvas, elements)
        break
      case "heap":
        drawHeap(ctx, canvas, elements)
        break
      case "graph":
        const currentStep = animationSteps[animationStep] || {}
        drawGraph(ctx, canvas, elements, currentStep.edges || [])
        break
      default:
        drawArray(ctx, canvas, elements, null)
    }

    // Draw message
    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.fillText(message, 10, canvas.height - 10)
  }, [elements, type, operationIndex, operationValue, pointers, message, animationStep, animationSteps])

  // Drawing functions
  const drawArray = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    arr: number[],
    highlightIndex: number | null,
  ) => {
    const boxWidth = Math.min(60, (canvas.width - 40) / arr.length)
    const boxHeight = 40
    const startX = (canvas.width - boxWidth * arr.length) / 2
    const startY = canvas.height / 2 - boxHeight / 2

    // Draw array boxes
    arr.forEach((value, index) => {
      // Box
      ctx.fillStyle = highlightIndex === index ? "#facc15" : "#3b82f6"
      ctx.fillRect(startX + index * boxWidth, startY, boxWidth, boxHeight)

      // Border
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 1
      ctx.strokeRect(startX + index * boxWidth, startY, boxWidth, boxHeight)

      // Value
      ctx.fillStyle = "#fff"
      ctx.font = "14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(
        value === null ? "null" : value.toString(),
        startX + index * boxWidth + boxWidth / 2,
        startY + boxHeight / 2,
      )

      // Index
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.fillText(index.toString(), startX + index * boxWidth + boxWidth / 2, startY + boxHeight + 15)
    })
  }

  const drawLinkedList = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    arr: number[],
    pointers: { [key: string]: number },
    highlightValue: number | null,
  ) => {
    const nodeRadius = 25
    const horizontalSpacing = 100
    const startX = 50
    const startY = canvas.height / 2

    // Draw nodes and links
    arr.forEach((value, index) => {
      const x = startX + index * horizontalSpacing

      // Node circle
      ctx.fillStyle = value === highlightValue ? "#facc15" : "#3b82f6"
      ctx.beginPath()
      ctx.arc(x, startY, nodeRadius, 0, 2 * Math.PI)
      ctx.fill()

      // Node border
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 1
      ctx.stroke()

      // Value
      ctx.fillStyle = "#fff"
      ctx.font = "14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(value.toString(), x, startY)

      // Arrow to next node
      if (index < arr.length - 1) {
        const nextX = startX + (index + 1) * horizontalSpacing

        // Line
        ctx.beginPath()
        ctx.moveTo(x + nodeRadius, startY)
        ctx.lineTo(nextX - nodeRadius, startY)
        ctx.strokeStyle = "#000"
        ctx.lineWidth = 1
        ctx.stroke()

        // Arrow head
        ctx.beginPath()
        ctx.moveTo(nextX - nodeRadius, startY)
        ctx.lineTo(nextX - nodeRadius - 10, startY - 5)
        ctx.lineTo(nextX - nodeRadius - 10, startY + 5)
        ctx.closePath()
        ctx.fillStyle = "#000"
        ctx.fill()
      } else {
        // Null pointer for last node
        ctx.beginPath()
        ctx.moveTo(x + nodeRadius, startY)
        ctx.lineTo(x + nodeRadius + 30, startY)
        ctx.strokeStyle = "#000"
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.fillStyle = "#000"
        ctx.font = "14px Arial"
        ctx.textAlign = "left"
        ctx.fillText("null", x + nodeRadius + 35, startY)
      }
    })

    // Draw head pointer
    if (pointers.head !== undefined && arr.length > 0) {
      const headX = startX + pointers.head * horizontalSpacing

      ctx.beginPath()
      ctx.moveTo(startX - 40, startY - 40)
      ctx.lineTo(headX, startY - nodeRadius)
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.textAlign = "right"
      ctx.fillText("head", startX - 45, startY - 40)
    }
  }

  const drawStack = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    arr: number[],
    pointers: { [key: string]: number },
  ) => {
    const boxWidth = 100
    const boxHeight = 40
    const startX = (canvas.width - boxWidth) / 2
    const startY = canvas.height - 80

    // Draw stack boxes from bottom to top
    arr.forEach((value, index) => {
      const y = startY - index * boxHeight

      // Box
      ctx.fillStyle = pointers.top === index ? "#facc15" : "#3b82f6"
      ctx.fillRect(startX, y, boxWidth, boxHeight)

      // Border
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 1
      ctx.strokeRect(startX, y, boxWidth, boxHeight)

      // Value
      ctx.fillStyle = "#fff"
      ctx.font = "14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(value.toString(), startX + boxWidth / 2, y + boxHeight / 2)
    })

    // Draw top pointer
    if (arr.length > 0) {
      const topY = startY - pointers.top * boxHeight

      ctx.beginPath()
      ctx.moveTo(startX + boxWidth + 20, topY + boxHeight / 2)
      ctx.lineTo(startX + boxWidth, topY + boxHeight / 2)
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.textAlign = "left"
      ctx.fillText("top", startX + boxWidth + 25, topY + boxHeight / 2)
    }

    // Draw stack container
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.strokeRect(startX - 5, startY - arr.length * boxHeight - 5, boxWidth + 10, arr.length * boxHeight + 10)
  }

  const drawQueue = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    arr: number[],
    pointers: { [key: string]: number },
  ) => {
    const boxWidth = 60
    const boxHeight = 40
    const startX = (canvas.width - boxWidth * arr.length) / 2
    const startY = canvas.height / 2 - boxHeight / 2

    // Draw queue boxes
    arr.forEach((value, index) => {
      // Box
      ctx.fillStyle = "#3b82f6"
      if (pointers.front === index) ctx.fillStyle = "#10b981"
      if (pointers.rear === index) ctx.fillStyle = "#ef4444"
      if (pointers.front === index && pointers.rear === index) ctx.fillStyle = "#facc15"

      ctx.fillRect(startX + index * boxWidth, startY, boxWidth, boxHeight)

      // Border
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 1
      ctx.strokeRect(startX + index * boxWidth, startY, boxWidth, boxHeight)

      // Value
      ctx.fillStyle = "#fff"
      ctx.font = "14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(value.toString(), startX + index * boxWidth + boxWidth / 2, startY + boxHeight / 2)
    })

    // Draw front pointer
    if (arr.length > 0 && pointers.front !== undefined) {
      const frontX = startX + pointers.front * boxWidth + boxWidth / 2

      ctx.beginPath()
      ctx.moveTo(frontX, startY - 20)
      ctx.lineTo(frontX, startY)
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.textAlign = "center"
      ctx.fillText("front", frontX, startY - 30)
    }

    // Draw rear pointer
    if (arr.length > 0 && pointers.rear !== undefined) {
      const rearX = startX + pointers.rear * boxWidth + boxWidth / 2

      ctx.beginPath()
      ctx.moveTo(rearX, startY + boxHeight)
      ctx.lineTo(rearX, startY + boxHeight + 20)
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.textAlign = "center"
      ctx.fillText("rear", rearX, startY + boxHeight + 30)
    }
  }

  const drawHashTable = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, arr: number[]) => {
    const boxWidth = 60
    const boxHeight = 40
    const startX = (canvas.width - boxWidth) / 2
    const startY = 50

    // Draw hash table buckets
    arr.forEach((value, index) => {
      // Box
      ctx.fillStyle = value === null ? "#d1d5db" : "#3b82f6"
      ctx.fillRect(startX, startY + index * boxHeight, boxWidth, boxHeight)

      // Border
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 1
      ctx.strokeRect(startX, startY + index * boxHeight, boxWidth, boxHeight)

      // Value
      ctx.fillStyle = value === null ? "#000" : "#fff"
      ctx.font = "14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(
        value === null ? "null" : value.toString(),
        startX + boxWidth / 2,
        startY + index * boxHeight + boxHeight / 2,
      )

      // Index
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.textAlign = "right"
      ctx.fillText(index.toString(), startX - 10, startY + index * boxHeight + boxHeight / 2)
    })
  }

  const drawBinaryTree = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, arr: number[]) => {
    const nodeRadius = 20
    const levelHeight = 70
    const startX = canvas.width / 2
    const startY = 50

    // Helper function to draw a node
    const drawNode = (value: number, x: number, y: number) => {
      // Node circle
      ctx.fillStyle = "#3b82f6"
      ctx.beginPath()
      ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI)
      ctx.fill()

      // Node border
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 1
      ctx.stroke()

      // Value
      ctx.fillStyle = "#fff"
      ctx.font = "14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(value.toString(), x, y)
    }

    // Helper function to draw a complete binary tree
    const drawCompleteTree = () => {
      if (arr.length === 0) return

      // Draw root
      drawNode(arr[0], startX, startY)

      // Draw levels
      let levelStart = 0
      let levelSize = 1
      let level = 0

      while (levelStart < arr.length) {
        const levelWidth = Math.pow(2, level) * 150

        for (let i = 0; i < levelSize && levelStart + i < arr.length; i++) {
          const nodeIndex = levelStart + i
          const x = startX - levelWidth / 2 + (i + 0.5) * (levelWidth / levelSize)
          const y = startY + level * levelHeight

          // Draw node
          if (nodeIndex > 0) {
            drawNode(arr[nodeIndex], x, y)

            // Draw edge from parent
            const parentIndex = Math.floor((nodeIndex - 1) / 2)
            const parentX =
              startX -
              levelWidth / Math.pow(2, level - 1) +
              (parentIndex - levelStart + levelSize) * (levelWidth / Math.pow(2, level))
            const parentY = startY + (level - 1) * levelHeight

            ctx.beginPath()
            ctx.moveTo(parentX, parentY + nodeRadius)
            ctx.lineTo(x, y - nodeRadius)
            ctx.strokeStyle = "#000"
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

        levelStart += levelSize
        levelSize *= 2
        level++
      }
    }

    drawCompleteTree()
  }

  const drawHeap = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, arr: number[]) => {
    // Heap is visualized the same way as a binary tree
    drawBinaryTree(ctx, canvas, arr)
  }

  const drawGraph = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    vertices: number[],
    edges: number[][],
  ) => {
    const nodeRadius = 20
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - nodeRadius - 20

    // Calculate vertex positions in a circle
    const vertexPositions: [number, number][] = []

    vertices.forEach((_, index) => {
      const angle = (index / vertices.length) * 2 * Math.PI
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      vertexPositions.push([x, y])
    })

    // Draw edges
    edges.forEach(([from, to]) => {
      if (from < vertexPositions.length && to < vertexPositions.length) {
        const [fromX, fromY] = vertexPositions[from]
        const [toX, toY] = vertexPositions[to]

        ctx.beginPath()
        ctx.moveTo(fromX, fromY)
        ctx.lineTo(toX, toY)
        ctx.strokeStyle = "#000"
        ctx.lineWidth = 1
        ctx.stroke()
      }
    })

    // Draw vertices
    vertices.forEach((value, index) => {
      if (index < vertexPositions.length) {
        const [x, y] = vertexPositions[index]

        // Node circle
        ctx.fillStyle = "#3b82f6"
        ctx.beginPath()
        ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI)
        ctx.fill()

        // Node border
        ctx.strokeStyle = "#000"
        ctx.lineWidth = 1
        ctx.stroke()

        // Value
        ctx.fillStyle = "#fff"
        ctx.font = "14px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(value.toString(), x, y)
      }
    })
  }

  // Animation step generators
  const generateArrayInsertSteps = (arr: number[], value: number) => {
    const steps = []

    // Initial state
    steps.push({
      elements: [...arr],
      message: `Inserting ${value} into the array`,
    })

    // Add element
    const newArr = [...arr, value]
    steps.push({
      elements: newArr,
      message: `Added ${value} at index ${arr.length}`,
    })

    return steps
  }

  const generateArrayRemoveSteps = (arr: number[], index: number) => {
    if (index < 0 || index >= arr.length) {
      return [
        {
          elements: [...arr],
          message: `Invalid index: ${index}`,
        },
      ]
    }

    const steps = []

    // Initial state
    steps.push({
      elements: [...arr],
      message: `Removing element at index ${index}`,
    })

    // Highlight element to remove
    steps.push({
      elements: [...arr],
      message: `Removing element ${arr[index]} at index ${index}`,
      highlightIndex: index,
    })

    // Remove element
    const newArr = [...arr]
    newArr.splice(index, 1)
    steps.push({
      elements: newArr,
      message: `Removed element at index ${index}`,
    })

    return steps
  }

  const generateLinkedListAppendSteps = (arr: number[], value: number, pointers: { [key: string]: number }) => {
    const steps = []

    // Initial state
    steps.push({
      elements: [...arr],
      pointers: { ...pointers },
      message: `Appending ${value} to the linked list`,
    })

    // Traverse to the end
    for (let i = 0; i < arr.length; i++) {
      steps.push({
        elements: [...arr],
        pointers: { ...pointers },
        message: `Traversing to node ${i + 1}`,
        highlightValue: arr[i],
      })
    }

    // Add new node
    const newArr = [...arr, value]
    steps.push({
      elements: newArr,
      pointers: { ...pointers },
      message: `Created new node with value ${value}`,
      highlightValue: value,
    })

    // Final state
    steps.push({
      elements: newArr,
      pointers: { ...pointers },
      message: `Appended ${value} to the linked list`,
    })

    return steps
  }

  const generateLinkedListRemoveSteps = (arr: number[], value: number, pointers: { [key: string]: number }) => {
    const valueIndex = arr.indexOf(value)

    if (valueIndex === -1) {
      return [
        {
          elements: [...arr],
          pointers: { ...pointers },
          message: `Value ${value} not found in the linked list`,
        },
      ]
    }

    const steps = []

    // Initial state
    steps.push({
      elements: [...arr],
      pointers: { ...pointers },
      message: `Removing ${value} from the linked list`,
    })

    // Traverse to find the value
    for (let i = 0; i <= valueIndex; i++) {
      steps.push({
        elements: [...arr],
        pointers: { ...pointers },
        message: i === valueIndex ? `Found ${value} at node ${i + 1}` : `Traversing to node ${i + 1}`,
        highlightValue: arr[i],
      })
    }

    // Update head if removing first node
    const newPointers = { ...pointers }
    if (valueIndex === 0 && arr.length > 1) {
      newPointers.head = 0
      steps.push({
        elements: [...arr],
        pointers: newPointers,
        message: `Updated head to point to the next node`,
        highlightValue: arr[1],
      })
    }

    // Remove node
    const newArr = [...arr]
    newArr.splice(valueIndex, 1)

    // Update pointers after removal
    if (pointers.head > valueIndex) {
      newPointers.head = pointers.head - 1
    }

    steps.push({
      elements: newArr,
      pointers: newPointers,
      message: `Removed node with value ${value}`,
    })

    return steps
  }

  const generateStackPushSteps = (arr: number[], value: number, pointers: { [key: string]: number }) => {
    const steps = []

    // Initial state
    steps.push({
      elements: [...arr],
      pointers: { ...pointers },
      message: `Pushing ${value} onto the stack`,
    })

    // Add element to the top
    const newArr = [value, ...arr]
    const newPointers = { top: 0 }

    steps.push({
      elements: newArr,
      pointers: newPointers,
      message: `Pushed ${value} onto the stack`,
    })

    return steps
  }

  const generateStackPopSteps = (arr: number[], pointers: { [key: string]: number }) => {
    if (arr.length === 0) {
      return [
        {
          elements: [],
          pointers: { ...pointers },
          message: "Stack is empty, cannot pop",
        },
      ]
    }

    const steps = []

    // Initial state
    steps.push({
      elements: [...arr],
      pointers: { ...pointers },
      message: "Popping element from the stack",
    })

    // Highlight top element
    steps.push({
      elements: [...arr],
      pointers: { ...pointers },
      message: `Popping top element: ${arr[0]}`,
    })

    // Remove top element
    const newArr = [...arr]
    newArr.shift()
    const newPointers = { top: 0 }

    steps.push({
      elements: newArr,
      pointers: newPointers,
      message: "Popped element from the stack",
    })

    return steps
  }

  const generateQueueEnqueueSteps = (arr: number[], value: number, pointers: { [key: string]: number }) => {
    const steps = []

    // Initial state
    steps.push({
      elements: [...arr],
      pointers: { ...pointers },
      message: `Enqueuing ${value} to the queue`,
    })

    // Add element to the rear
    const newArr = [...arr, value]
    const newPointers = {
      front: pointers.front || 0,
      rear: newArr.length - 1,
    }

    steps.push({
      elements: newArr,
      pointers: newPointers,
      message: `Enqueued ${value} to the queue`,
    })

    return steps
  }

  const generateQueueDequeueSteps = (arr: number[], pointers: { [key: string]: number }) => {
    if (arr.length === 0) {
      return [
        {
          elements: [],
          pointers: { ...pointers },
          message: "Queue is empty, cannot dequeue",
        },
      ]
    }

    const steps = []

    // Initial state
    steps.push({
      elements: [...arr],
      pointers: { ...pointers },
      message: "Dequeuing element from the queue",
    })

    // Highlight front element
    steps.push({
      elements: [...arr],
      pointers: { ...pointers },
      message: `Dequeuing front element: ${arr[pointers.front || 0]}`,
    })

    // Remove front element
    const newArr = [...arr]
    newArr.shift()
    const newPointers = {
      front: 0,
      rear: Math.max(0, newArr.length - 1),
    }

    steps.push({
      elements: newArr,
      pointers: newPointers,
      message: "Dequeued element from the queue",
    })

    return steps
  }

  return (
    <div className="flex flex-col space-y-4">
      <canvas ref={canvasRef} width={500} height={300} className="w-full border rounded-md bg-white" />

      <div className="flex flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter value"
            value={newElement}
            onChange={(e) => setNewElement(e.target.value)}
            className="w-24"
          />
          <Button variant="outline" size="sm" onClick={handleAddElement}>
            <Plus className="h-4 w-4 mr-1" />
            {type === "stack" ? "Push" : type === "queue" ? "Enqueue" : "Add"}
          </Button>
        </div>

        <Button variant="outline" size="sm" onClick={handleRemoveElement}>
          <Minus className="h-4 w-4 mr-1" />
          {type === "stack" ? "Pop" : type === "queue" ? "Dequeue" : "Remove"}
        </Button>

        <Button variant="outline" size="sm" onClick={resetVisualization}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={animationStep >= animationSteps.length - 1}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <div className="flex-1">
          <Slider value={speed} min={1} max={100} step={1} onValueChange={setSpeed} />
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Step {animationStep + 1} of {animationSteps.length}
      </div>
    </div>
  )
}

