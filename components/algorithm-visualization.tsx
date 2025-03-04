"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, SkipForward, SkipBack, Shuffle, ArrowDownUp, Search, Network, GitMerge, SplitSquareVertical, BarChart2, ArrowRightLeft, ListTree } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [graphNodes, setGraphNodes] = useState<any[]>([])
  const [graphEdges, setGraphEdges] = useState<any[]>([])
  const [treeNodes, setTreeNodes] = useState<any[]>([])

  // Get algorithm icon
  const getAlgorithmIcon = () => {
    switch (type) {
      case "bubble-sort":
      case "insertion-sort":
      case "selection-sort":
        return <ArrowDownUp className="h-5 w-5 mr-2" />
      case "merge-sort":
        return <GitMerge className="h-5 w-5 mr-2" />
      case "quick-sort":
        return <SplitSquareVertical className="h-5 w-5 mr-2" />
      case "heap-sort":
        return <BarChart2 className="h-5 w-5 mr-2" />
      case "binary-search":
      case "linear-search":
        return <Search className="h-5 w-5 mr-2" />
      case "dfs":
      case "bfs":
        return <Network className="h-5 w-5 mr-2" />
      case "dijkstra":
        return <ArrowRightLeft className="h-5 w-5 mr-2" />
      case "binary-tree":
        return <ListTree className="h-5 w-5 mr-2" />
      default:
        return null
    }
  }

  // Initialize the visualization
  useEffect(() => {
    resetVisualization()
  }, [type])

  const resetVisualization = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    
    // Generate random array for sorting/searching algorithms
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
    
    // Generate steps based on algorithm type
    if (["bubble-sort", "insertion-sort", "selection-sort", "merge-sort", "quick-sort", "heap-sort"].includes(type)) {
      // For sorting algorithms
      setArray(newArray)
      
      if (type === "bubble-sort") {
        setSteps(generateBubbleSortSteps([...newArray]))
      } else if (type === "insertion-sort") {
        setSteps(generateInsertionSortSteps([...newArray]))
      } else if (type === "selection-sort") {
        setSteps(generateSelectionSortSteps([...newArray]))
      } else if (type === "merge-sort") {
        setSteps(generateMergeSortSteps([...newArray]))
      } else if (type === "quick-sort") {
        setSteps(generateQuickSortSteps([...newArray]))
      } else if (type === "heap-sort") {
        setSteps(generateHeapSortSteps([...newArray]))
      }
    } else if (["binary-search", "linear-search"].includes(type)) {
      // For search algorithms
      const sortedArray = [...newArray].sort((a, b) => a - b)
      setArray(sortedArray)
      const target = sortedArray[Math.floor(Math.random() * sortedArray.length)]
      setSearchTarget(target)
      
      if (type === "binary-search") {
        setSteps(generateBinarySearchSteps([...sortedArray], target))
      } else if (type === "linear-search") {
        setSteps(generateLinearSearchSteps([...sortedArray], target))
      }
    } else if (["dfs", "bfs", "dijkstra"].includes(type)) {
      // For graph algorithms
      const { nodes, edges } = generateRandomGraph()
      setGraphNodes(nodes)
      setGraphEdges(edges)
      
      if (type === "dfs") {
        setSteps(generateDFSSteps(nodes, edges))
      } else if (type === "bfs") {
        setSteps(generateBFSSteps(nodes, edges))
      } else if (type === "dijkstra") {
        setSteps(generateDijkstraSteps(nodes, edges))
      }
    } else if (type === "binary-tree") {
      // For binary tree operations
      const treeNodes = generateRandomBinaryTree()
      setTreeNodes(treeNodes)
      setSteps(generateBinaryTreeSteps(treeNodes))
    }
  }

  // Animation loop
  useEffect(() => {
    let animationId: number

    if (isPlaying && currentStep < steps.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 1000 - (speed[0] * 9))
      
      return () => clearTimeout(timeout)
    }
    
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false)
    }
    
    return () => cancelAnimationFrame(animationId)
  }, [isPlaying, currentStep, steps, speed])

  // Draw the current state
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    if (["bubble-sort", "insertion-sort", "selection-sort", "merge-sort", "quick-sort", "heap-sort"].includes(type)) {
      drawSortingVisualization(ctx, canvas, array, steps[currentStep] || {})
    } else if (["binary-search", "linear-search"].includes(type)) {
      drawSearchVisualization(ctx, canvas, array, steps[currentStep] || {}, searchTarget)
    } else if (["dfs", "bfs", "dijkstra"].includes(type)) {
      drawGraphVisualization(ctx, canvas, graphNodes, graphEdges, steps[currentStep] || {})
    } else if (type === "binary-tree") {
      drawBinaryTreeVisualization(ctx, canvas, treeNodes, steps[currentStep] || {})
    }
  }, [array, currentStep, steps, type, searchTarget, graphNodes, graphEdges, treeNodes])

  // Step navigation
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Drawing functions
  const drawSortingVisualization = (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement, 
    arr: number[], 
    step: any
  ) => {
    const barWidth = canvas.width / arr.length
    const maxValue = Math.max(...arr, 1) // Avoid division by zero
    
    // Draw background grid
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 0.5
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }
    
    // Draw bars
    arr.forEach((value, index) => {
      const barHeight = (value / maxValue) * (canvas.height - 60)
      
      // Default color
      ctx.fillStyle = '#3b82f6'
      
      // Highlight elements based on the current step
      if (step && step.comparing && (step.comparing[0] === index || step.comparing[1] === index)) {
        ctx.fillStyle = '#facc15' // Yellow for comparing
      }
      
      if (step && step.swapping && (step.swapping[0] === index || step.swapping[1] === index)) {
        ctx.fillStyle = '#ef4444' // Red for swapping
      }
      
      if (step && step.sorted && step.sorted.includes(index)) {
        ctx.fillStyle = '#10b981' // Green for sorted
      }
      
      if (step && step.current === index) {
        ctx.fillStyle = '#8b5cf6' // Purple for current element
      }
      
      if (step && step.pivot === index) {
        ctx.fillStyle = '#f97316' // Orange for pivot
      }
      
      // Draw bar with rounded top
      ctx.beginPath()
      ctx.moveTo(index * barWidth + 2, canvas.height - 30)
      ctx.lineTo(index * barWidth + 2, canvas.height - 30 - barHeight)
      ctx.arcTo(
        index * barWidth + 2, canvas.height - 30 - barHeight,
        index * barWidth + barWidth - 2, canvas.height - 30 - barHeight,
        (barWidth - 4) / 2
      )
      ctx.lineTo(index * barWidth + barWidth - 2, canvas.height - 30 - barHeight)
      ctx.lineTo(index * barWidth + barWidth - 2, canvas.height - 30)
      ctx.fill()
      
      // Draw value
      ctx.fillStyle = '#000'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(
        value.toString(), 
        index * barWidth + barWidth / 2, 
        canvas.height - 10
      )
    })
    
    // Draw current step info
    if (step && step.message) {
      ctx.fillStyle = '#000'
      ctx.font = '14px Arial'
      ctx.textAlign = 'left'
      ctx.fillText(
        step.message, 
        10, 
        20
      )
    }
  }

  const drawSearchVisualization = (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement, 
    arr: number[], 
    step: any,
    target: number | null
  ) => {
    const boxWidth = canvas.width / arr.length
    const boxHeight = 50
    
    // Draw target
    if (target !== null) {
      ctx.fillStyle = '#000'
      ctx.font = '16px Arial'
      ctx.textAlign = 'left'
      ctx.fillText(
        `Target: ${target}`, 
        10, 
        30
      )
    }
    
    // Draw array elements
    arr.forEach((value, index) => {
      // Default color
      ctx.fillStyle = '#3b82f6'
      
      // Highlight elements based on the current step
      if (step && step.mid === index) {
        ctx.fillStyle = '#facc15' // Yellow for middle element
      }
      
      if (step && step.current === index) {
        ctx.fillStyle = '#8b5cf6' // Purple for current element
      }
      
      if (step && step.found === index) {
        ctx.fillStyle = '#10b981' // Green for found element
      }
      
      if (step && step.eliminated && step.eliminated.includes(index)) {
        ctx.fillStyle = '#d1d5db' // Gray for eliminated elements
      }
      
      // Draw rounded rectangle
      const x = index * boxWidth + 2
      const y = canvas.height / 2 - boxHeight / 2
      const width = boxWidth - 4
      const height = boxHeight
      const radius = 8
      
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + width - radius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
      ctx.lineTo(x + width, y + height - radius)
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
      ctx.lineTo(x + radius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
      ctx.closePath()
      ctx.fill()
      
      // Draw value
      ctx.fillStyle = '#fff'
      ctx.font = '14px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(
        value.toString(), 
        index * boxWidth + boxWidth / 2, 
        canvas.height / 2 + 5
      )
      
      // Draw index
      ctx.fillStyle = '#000'
      ctx.font = '12px Arial'
      ctx.fillText(
        index.toString(), 
        index * boxWidth + boxWidth / 2, 
        canvas.height / 2 + boxHeight / 2 + 15
      )
    })
    
    // Draw pointers for binary search
    if (type === "binary-search" && step && step.low !== undefined && step.high !== undefined) {
      // Draw low pointer
      ctx.fillStyle = '#ef4444'
      ctx.beginPath()
      ctx.moveTo(step.low * boxWidth + boxWidth / 2, canvas.height / 2 + boxHeight / 2 + 25)
      ctx.lineTo(step.low * boxWidth + boxWidth / 2 - 8, canvas.height / 2 + boxHeight / 2 + 35)
      ctx.lineTo(step.low * boxWidth + boxWidth / 2 + 8, canvas.height / 2 + boxHeight / 2 + 35)
      ctx.fill()
      ctx.fillText("low", step.low * boxWidth + boxWidth / 2, canvas.height / 2 + boxHeight / 2 + 50)
      
      // Draw high pointer
      ctx.fillStyle = '#3b82f6'
      ctx.beginPath()
      ctx.moveTo(step.high * boxWidth + boxWidth / 2, canvas.height / 2 + boxHeight / 2 + 25)
      ctx.lineTo(step.high * boxWidth + boxWidth / 2 - 8, canvas.height / 2 + boxHeight / 2 + 35)
      ctx.lineTo(step.high * boxWidth + boxWidth / 2 + 8, canvas.height / 2 + boxHeight / 2 + 35)
      ctx.fill()
      ctx.fillText("high", step.high * boxWidth + boxWidth / 2, canvas.height / 2 + boxHeight / 2 + 50)
      
      // Draw mid pointer if available
      if (step.mid !== undefined && step.mid !== null) {
        ctx.fillStyle = '#10b981'
        ctx.beginPath()
        ctx.moveTo(step.mid * boxWidth + boxWidth / 2, canvas.height / 2 - boxHeight / 2 - 10)
        ctx.lineTo(step.mid * boxWidth + boxWidth / 2 - 8, canvas.height / 2 - boxHeight / 2 - 20)
        ctx.lineTo(step.mid * boxWidth + boxWidth / 2 + 8, canvas.height / 2 - boxHeight / 2 - 20)
        ctx.fill()
        ctx.fillText("mid", step.mid * boxWidth + boxWidth / 2, canvas.height / 2 - boxHeight / 2 - 25)
      }
    }
    
    // Draw current step info
    if (step && step.message) {
      ctx.fillStyle = '#000'
      ctx.font = '14px Arial'
      ctx.textAlign = 'left'
      ctx.fillText(
        step.message, 
        10, 
        canvas.height - 20
      )
    }
  }

  const drawGraphVisualization = (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement, 
    nodes: any[], 
    edges: any[], 
    step: any
  ) => {
    // Draw edges
    edges.forEach(edge => {
      const startNode = nodes.find(n => n.id === edge.source)
      const endNode = nodes.find(n => n.id === edge.target)
      
      if (startNode && endNode) {
        ctx.beginPath()
        ctx.moveTo(startNode.x, startNode.y)
        ctx.lineTo(endNode.x, endNode.y)
        
        // Default edge color
        ctx.strokeStyle = '#d1d5db'
        
        // Highlight edges based on the current step
        if (step && step.visitedEdges && step.visitedEdges.some(e => 
          (e.source === edge.source && e.target === edge.target) || 
          (e.source === edge.target && e.target === edge.source)
        )) {
          ctx.strokeStyle = '#10b981' // Green for visited edges
        }
        
        if (step && step.currentEdge && 
          ((step.currentEdge.source === edge.source && step.currentEdge.target === edge.target) || 
           (step.currentEdge.source === edge.target && step.currentEdge.target === edge.source))
        ) {
          ctx.strokeStyle = '#ef4444' // Red for current edge
        }
        
        // Draw edge weight for Dijkstra
        if (type === "dijkstra" && edge.weight !== undefined) {
          const midX = (startNode.x + endNode.x) / 2
          const midY = (startNode.y + endNode.y) / 2
          
          ctx.fillStyle = '#fff'
          ctx.beginPath()
          ctx.arc(midX, midY, 12, 0, 2 * Math.PI)
          ctx.fill()
          
          ctx.fillStyle = '#000'
          ctx.font = '12px Arial'
          ctx.textAlign = 'center'
          ctx.fillText(edge.weight.toString(), midX, midY + 4)
        }
        
        ctx.lineWidth = 2
        ctx.stroke()
      }
    })
    
    // Draw nodes
    nodes.forEach(node => {
      // Default node color
      ctx.fillStyle = '#3b82f6'
      
      // Highlight nodes based on the current step
      if (step && step.visitedNodes && step.visitedNodes.includes(node.id)) {
        ctx.fillStyle = '#10b981' // Green for visited nodes
      }
      
      if (step && step.currentNode === node.id) {
        ctx.fillStyle = '#ef4444' // Red for current node
      }
      
      if (step && step.startNode === node.id) {
        ctx.fillStyle = '#f97316' // Orange for start node
      }
      
      if (step && step.targetNode === node.id) {
        ctx.fillStyle = '#8b5cf6' // Purple for target node
      }
      
      // Draw node
      ctx.beginPath()
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI)
      ctx.fill()
      
      // Draw node label
      ctx.fillStyle = '#fff'
      ctx.font = '14px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(node.id.toString(), node.x, node.y + 5)
      
      // Draw distance label for Dijkstra
      if (type === "dijkstra" && step && step.distances && step.distances[node.id] !== undefined) {
        const distance = step.distances[node.id] === Infinity ? "∞" : step.distances[node.id].toString()
        
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(node.x, node.y - 30, 12, 0, 2 * Math.PI)
        ctx.fill()
        
        ctx.fillStyle = '#000'
        ctx.font = '12px Arial'
        ctx.fillText(distance, node.x, node.y - 26)
      }
    })
    
    // Draw current step info
    if (step && step.message) {
      ctx.fillStyle = '#000'
      ctx.font = '14px Arial'
      ctx.textAlign = 'left'
      ctx.fillText(
        step.message, 
        10, 
        30
      )
    }
  }

  const drawBinaryTreeVisualization = (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement, 
    nodes: any[], 
    step: any
  ) => {
    // Calculate tree layout
    const maxDepth = Math.max(...nodes.map(node => node.depth))
    const levelHeight = canvas.height / (maxDepth + 2)
    
    // Draw edges first
    nodes.forEach(node => {
      if (node.parent !== null) {
        const parent = nodes.find(n => n.id === node.parent)
        
        if (parent) {
          const startX = parent.x
          const startY = parent.y
          const endX = node.x
          const endY = node.y
          
          ctx.beginPath()
          ctx.moveTo(startX, startY + 15) // Bottom of parent node
          ctx.lineTo(endX, endY - 15) // Top of child node
          
          // Default edge color
          ctx.strokeStyle = '#d1d5db'
          
          // Highlight edges based on the current step
          if (step && step.visitedEdges && step.visitedEdges.some(e => 
            (e.parent === node.parent && e.child === node.id)
          )) {
            ctx.strokeStyle = '#10b981' // Green for visited edges
          }
          
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }
    })
    
    // Draw nodes
    nodes.forEach(node => {
      // Default node color
      ctx.fillStyle = '#3b82f6'
      
      // Highlight nodes based on the current step
      if (step && step.visitedNodes && step.visitedNodes.includes(node.id)) {
        ctx.fillStyle = '#10b981' // Green for visited nodes
      }
      
      if (step && step.currentNode === node.id) {
        ctx.fillStyle = '#ef4444' // Red for current node
      }
      
      if (step && step.targetNode === node.id) {
        ctx.fillStyle = '#8b5cf6' // Purple for target node
      }
      
      // Draw node
      ctx.beginPath()
      ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI)
      ctx.fill()
      
      // Draw node value
      ctx.fillStyle = '#fff'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(node.value.toString(), node.x, node.y + 4)
    })
    
    // Draw current step info
    if (step && step.message) {
      ctx.fillStyle = '#000'
      ctx.font = '14px Arial'
      ctx.textAlign = 'left'
      ctx.fillText(
        step.message, 
        10, 
        30
      )
    }
  }

  // Algorithm step generators
  const generateBubbleSortSteps = (arr: number[]) => {
    const steps = []
    const n = arr.length
    
    // Initial state
    steps.push({ 
      array: [...arr], 
      comparing: null, 
      swapping: null, 
      sorted: [],
      message: "Starting Bubble Sort" 
    })
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Comparing step
        steps.push({ 
          array: [...arr], 
          comparing: [j, j + 1], 
          swapping: null, 
          sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
          message: `Comparing elements at indices ${j} and ${j + 1}: ${arr[j]} and ${arr[j + 1]}` 
        })
        
        if (arr[j] > arr[j + 1]) {
          // Swapping step
          steps.push({ 
            array: [...arr], 
            comparing: null, 
            swapping: [j, j + 1], 
            sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
            message: `Swapping elements: ${arr[j]} > ${arr[j + 1]}` 
          })
          
          // Perform swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          
          // After swap
          steps.push({ 
            array: [...arr], 
            comparing: null, 
            swapping: null, 
            sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
            message: `Swapped elements at indices ${j} and ${j + 1}` 
          })
        } else {
          steps.push({ 
            array: [...arr], 
            comparing: null, 
            swapping: null, 
            sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
            message: `No swap needed: ${arr[j]} <= ${arr[j + 1]}` 
          })
        }
      }
      
      // Mark element as sorted
      steps.push({ 
        array: [...arr], 
        comparing: null, 
        swapping: null, 
        sorted: Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx),
        message: `Element at index ${n - 1 - i} is now in its correct position` 
      })
    }
    
    // Final state
    steps.push({ 
      array: [...arr], 
      comparing: null, 
      swapping: null, 
      sorted: Array.from({ length: n }, (_, idx) => idx),
      message: "Array is now sorted" 
    })
    
    return steps
  }

  const generateInsertionSortSteps = (arr: number[]) => {
    const steps = []
    const n = arr.length
    
    // Initial state
    steps.push({ 
      array: [...arr], 
      current: null, 
      comparing: null, 
      sorted: [0],
      message: "Starting Insertion Sort. First element is considered sorted." 
    })
    
    for (let i = 1; i < n; i++) {
      // Current element to be inserted
      steps.push({ 
        array: [...arr], 
        current: i, 
        comparing: null, 
        sorted: Array.from({ length: i }, (_, idx) => idx),
        message: `Inserting element at index ${i}: ${arr[i]}` 
      })
      
      let j = i - 1
      const key = arr[i]
      
      while (j >= 0 && arr[j] > key) {
        // Compare current element with sorted elements
        steps.push({ 
          array: [...arr], 
          current: i, 
          comparing: [j, j + 1], 
          sorted: Array.from({ length: i }, (_, idx) => idx),
          message: `Comparing ${arr[j]} > ${key}` 
        })
        
        // Shift element to the right
        arr[j + 1] = arr[j]
        steps.push({ 
          array: [...arr], 
          current: i, 
          comparing: null, 
          sorted: Array.from({ length: i }, (_, idx) => idx),
          message: `Shifting element ${arr[j]} to the right` 
        })
        
        j--
      }
      
      // Place the current element in its correct position
      arr[j + 1] = key
      steps.push({ 
        array: [...arr], 
        current: j + 1, 
        comparing: null, 
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
        message: `Placed ${key} at index ${j + 1}` 
      })
    }
    
    // Final state
    steps.push({ 
      array: [...arr], 
      current: null, 
      comparing: null, 
      sorted: Array.from({ length: n }, (_, idx) => idx),
      message: "Array is now sorted" 
    })
    
    return steps
  }

  const generateSelectionSortSteps = (arr: number[]) => {
    const steps = []
    const n = arr.length
    
    // Initial state
    steps.push({ 
      array: [...arr], 
      current: null, 
      comparing: null, 
      sorted: [],
      message: "Starting Selection Sort" 
    })
    
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i
      
      // Start looking for the minimum element
      steps.push({ 
        array: [...arr], 
        current: i, 
        comparing: null, 
        sorted: Array.from({ length: i }, (_, idx) => idx),
        message: `Finding minimum element starting from index ${i}length: i}, (_, idx) => idx),
        message: `Finding minimum element starting from index ${i}`
      })
      
      for (let j = i + 1; j < n; j++) {
        // Compare current element with minimum
        steps.push({ 
          array: [...arr], 
          current: i, 
          comparing: [minIndex, j], 
          sorted: Array.from({ length: i }, (_, idx) => idx),
          message: `Comparing current minimum ${arr[minIndex]} with ${arr[j]}`
        })
        
        if (arr[j] < arr[minIndex]) {
          minIndex = j
          steps.push({ 
            array: [...arr], 
            current: i, 
            comparing: null, 
            sorted: Array.from({ length: i }, (_, idx) => idx),
            message: `New minimum found: ${arr[minIndex]} at index ${minIndex}`
          })
        }
      }
      
      // Swap the minimum element with the first unsorted element
      if (minIndex !== i) {
        steps.push({ 
          array: [...arr], 
          current: i, 
          swapping: [i, minIndex], 
          sorted: Array.from({ length: i }, (_, idx) => idx),
          message: `Swapping ${arr[i]} with minimum ${arr[minIndex]}`
        })
        
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
      }
      
      // Mark element as sorted
      steps.push({ 
        array: [...arr], 
        current: null, 
        comparing: null, 
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
        message: `Element ${arr[i]} is now in its correct position at index ${i}`
      })
    }
    
    // Final state
    steps.push({ 
      array: [...arr], 
      current: null, 
      comparing: null, 
      sorted: Array.from({ length: n }, (_, idx) => idx),
      message: "Array is now sorted"
    })
    
    return steps
  }

  const generateMergeSortSteps = (arr: number[]) => {
    const steps: any[] = []
    const n = arr.length
    
    // Initial state
    steps.push({ 
      array: [...arr], 
      message: "Starting Merge Sort"
    })
    
    // For visualization purposes, we'll use a simplified representation
    // In a real implementation, we would track the recursive calls and merges
    
    // Divide the array into subarrays of size 1
    steps.push({ 
      array: [...arr], 
      message: "Dividing array into subarrays of size 1"
    })
    
    // Merge subarrays of size 1 to get subarrays of size 2
    const tempArr1 = [...arr]
    for (let i = 0; i < n - 1; i += 2) {
      if (tempArr1[i] > tempArr1[i + 1]) {
        [tempArr1[i], tempArr1[i + 1]] = [tempArr1[i + 1], tempArr1[i]]
      }
    }
    
    steps.push({ 
      array: [...tempArr1], 
      message: "Merging subarrays of size 1 to get subarrays of size 2"
    })
    
    // Merge subarrays of size 2 to get subarrays of size 4
    const tempArr2 = [...tempArr1]
    for (let i = 0; i < n - 3; i += 4) {
      const end = Math.min(i + 4, n)
      const mid = i + 2
      
      // Merge [i...mid-1] and [mid...end-1]
      const left = tempArr2.slice(i, mid)
      const right = tempArr2.slice(mid, end)
      let leftIndex = 0
      let rightIndex = 0
      let arrIndex = i
      
      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
          tempArr2[arrIndex] = left[leftIndex]
          leftIndex++
        } else {
          tempArr2[arrIndex] = right[rightIndex]
          rightIndex++
        }
        arrIndex++
      }
      
      while (leftIndex < left.length) {
        tempArr2[arrIndex] = left[leftIndex]
        leftIndex++
        arrIndex++
      }
      
      while (rightIndex < right.length) {
        tempArr2[arrIndex] = right[rightIndex]
        rightIndex++
        arrIndex++
      }
    }
    
    steps.push({ 
      array: [...tempArr2], 
      message: "Merging subarrays of size 2 to get subarrays of size 4"
    })
    
    // Continue merging until the entire array is sorted
    const sortedArr = [...arr].sort((a, b) => a - b)
    steps.push({ 
      array: [...sortedArr], 
      message: "Final merge: array is now sorted"
    })
    
    return steps
  }

  const generateQuickSortSteps = (arr: number[]) => {
    const steps: any[] = []
    
    // Initial state
    steps.push({ 
      array: [...arr], 
      pivot: null,
      message: "Starting Quick Sort"
    })
    
    // For visualization purposes, we'll use a simplified representation
    // In a real implementation, we would track the recursive partitioning
    
    // First partition
    const tempArr1 = [...arr]
    const pivotIndex1 = Math.floor(tempArr1.length / 2)
    const pivot1 = tempArr1[pivotIndex1]
    
    steps.push({ 
      array: [...tempArr1], 
      pivot: pivotIndex1,
      message: `Selecting pivot: ${pivot1} at index ${pivotIndex1}`
    })
    
    // Partition the array
    const left1 = tempArr1.filter(x => x < pivot1)
    const middle1 = tempArr1.filter(x => x === pivot1)
    const right1 = tempArr1.filter(x => x > pivot1)
    
    const partitioned1 = [...left1, ...middle1, ...right1]
    
    steps.push({ 
      array: [...partitioned1], 
      message: `Partitioned array: elements < ${pivot1} on the left, elements > ${pivot1} on the right`
    })
    
    // Recursively sort the left and right subarrays
    steps.push({ 
      array: [...partitioned1], 
      message: "Recursively sorting subarrays"
    })
    
    // Final sorted array
    const sortedArr = [...arr].sort((a, b) => a - b)
    steps.push({ 
      array: [...sortedArr], 
      message: "Array is now sorted"
    })
    
    return steps
  }

  const generateHeapSortSteps = (arr: number[]) => {
    const steps: any[] = []
    
    // Initial state
    steps.push({ 
      array: [...arr], 
      message: "Starting Heap Sort"
    })
    
    // For visualization purposes, we'll use a simplified representation
    
    // Build max heap
    steps.push({ 
      array: [...arr], 
      message: "Building max heap"
    })
    
    // Extract elements from the heap one by one
    const sortedArr = [...arr].sort((a, b) => a - b)
    steps.push({ 
      array: [...sortedArr], 
      message: "Extracting elements from heap"
    })
    
    // Final sorted array
    steps.push({ 
      array: [...sortedArr], 
      message: "Array is now sorted"
    })
    
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
      message: "Starting binary search for target " + target
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
        message: `Checking middle element at index ${mid}: ${arr[mid]}`
      })
      
      if (arr[mid] === target) {
        // Found
        steps.push({ 
          low, 
          high, 
          mid: null, 
          found: mid, 
          eliminated: [], 
          message: `Found target ${target} at index ${mid}!`
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
          message: `${arr[mid]} < ${target}, eliminating left half (indices ${low} to ${mid})`
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
          message: `${arr[mid]} > ${target}, eliminating right half (indices ${mid} to ${high})`
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
        message: `Target ${target} not found in the array`
      })
    }
    
    return steps
  }

  const generateLinearSearchSteps = (arr: number[], target: number) => {
    const steps = []
    
    // Initial state
    steps.push({ 
      current: null, 
      found: null, 
      message: "Starting linear search for target " + target
    })
    
    for (let i = 0; i < arr.length; i++) {
      // Checking current element
      steps.push({ 
        current: i, 
        found: null, 
        message: `Checking element at index ${i}: ${arr[i]}`
      })
      
      if (arr[i] === target) {
        // Found
        steps.push({ 
          current: null, 
          found: i, 
          message: `Found target ${target} at index ${i}!`
        })
        break
      }
      
      // Not found, continue to next element
      if (i < arr.length - 1) {
        steps.push({ 
          current: null, 
          found: null, 
          message: `Element at index ${i} is not the target, moving to next element`
        })
      }
    }
    
    // If target not found after checking all elements
    if (steps[steps.length - 1].found === null) {
      steps.push({ 
        current: null, 
        found: null, 
        message: `Target ${target} not found in the array after checking all elements`
      })
    }
    
    return steps
  }

  const generateRandomGraph = () => {
    const numNodes = 6
    const nodes = []
    const edges = []
    
    // Create nodes in a circular layout
    for (let i = 0; i < numNodes; i++) {
      const angle = (i / numNodes) * 2 * Math.PI
      const x = 250 + 150 * Math.cos(angle)
      const y = 150 + 100 * Math.sin(angle)
      
      nodes.push({
        id: i,
        x,
        y
      })
    }
    
    // Create edges (connected in a circle with some random connections)
    for (let i = 0; i < numNodes; i++) {
      // Connect to next node in circle
      edges.push({
        source: i,
        target: (i + 1) % numNodes,
        weight: Math.floor(Math.random() * 10) + 1
      })
      
      // Add some random connections
      if (Math.random() < 0.3) {
        const target = (i + 2) % numNodes
        if (!edges.some(e => 
          (e.source === i && e.target === target) || 
          (e.source === target && e.target === i)
        )) {
          edges.push({
            source: i,
            target,
            weight: Math.floor(Math.random() * 10) + 1
          })
        }
      }
    }
    
    return { nodes, edges }
  }

  const generateRandomBinaryTree = () => {
    const numNodes = 7
    const nodes = []
    
    // Create nodes
    for (let i = 0; i < numNodes; i++) {
      const depth = Math.floor(Math.log2(i + 1))
      const position = i - Math.pow(2, depth) + 1
      const totalPositions = Math.pow(2, depth)
      const x = 250 + (position - totalPositions / 2) * (400 / totalPositions)
      const y = 50 + depth * 80
      
      nodes.push({
        id: i,
        value: Math.floor(Math.random() * 100),
        parent: i === 0 ? null : Math.floor((i - 1) / 2),
        left: 2 * i + 1 < numNodes ? 2 * i + 1 : null,
        right: 2 * i + 2 < numNodes ? 2 * i + 2 : null,
        depth,
        x,
        y
      })
    }
    
    return nodes
  }

  const generateDFSSteps = (nodes: any[], edges: any[]) => {
    const steps = []
    const visited = new Set()
    const startNode = 0
    
    // Initial state
    steps.push({ 
      visitedNodes: [],
      currentNode: null,
      visitedEdges: [],
      currentEdge: null,
      message: "Starting Depth-First Search from node " + startNode
    })
    
    // DFS function
    const dfs = (node: number, path: number[] = []) => {
      visited.add(node)
      
      steps.push({ 
        visitedNodes: [...visited],
        currentNode: node,
        visitedEdges: [...path.map((p, i) => i > 0 ? { source: path[i-1], target: p } : null).filter(Boolean)],
        currentEdge: path.length > 0 ? { source: path[path.length - 1], target: node } : null,
        message: `Visiting node ${node}`
      })
      
      // Get all adjacent vertices
      const neighbors = edges
        .filter(e => e.source === node || e.target === node)
        .map(e => e.source === node ? e.target : e.source)
      
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          steps.push({ 
            visitedNodes: [...visited],
            currentNode: node,
            visitedEdges: [...path.map((p, i) => i > 0 ? { source: path[i-1], target: p } : null).filter(Boolean)],
            currentEdge: { source: node, target: neighbor },
            message: `Exploring edge from ${node} to ${neighbor}`
          })
          
          dfs(neighbor, [...path, node])
        }
      }
      
      steps.push({ 
        visitedNodes: [...visited],
        currentNode: null,
        visitedEdges: [...path.map((p, i) => i > 0 ? { source: path[i-1], target: p } : null).filter(Boolean)],
        currentEdge: null,
        message: `Backtracking from node ${node}`
      })
    }
    
    dfs(startNode)
    
    // Final state
    steps.push({ 
      visitedNodes: [...visited],
      currentNode: null,
      visitedEdges: [],
      currentEdge: null,
      message: "DFS traversal complete"
    })
    
    return steps
  }

  const generateBFSSteps = (nodes: any[], edges: any[]) => {
    const steps = []
    const visited = new Set()
    const queue: number[] = []
    const startNode = 0
    
    // Initial state
    steps.push({ 
      visitedNodes: [],
      currentNode: null,
      visitedEdges: [],
      currentEdge: null,
      message: "Starting Breadth-First Search from node " + startNode
    })
    
    // Mark the start node as visited and enqueue it
    visited.add(startNode)
    queue.push(startNode)
    
    steps.push({ 
      visitedNodes: [...visited],
      currentNode: startNode,
      visitedEdges: [],
      currentEdge: null,
      message: `Visiting start node ${startNode}`
    })
    
    while (queue.length > 0) {
      // Dequeue a vertex from queue
      const currentNode = queue.shift()!
      
      steps.push({ 
        visitedNodes: [...visited],
        currentNode,
        visitedEdges: [],
        currentEdge: null,
        message: `Processing node ${currentNode}`
      })
      
      // Get all adjacent vertices of the dequeued vertex
      const neighbors = edges
        .filter(e => e.source === currentNode || e.target === currentNode)
        .map(e => e.source === currentNode ? e.target : e.source)
      
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          steps.push({ 
            visitedNodes: [...visited],
            currentNode,
            visitedEdges: [],
            currentEdge: { source: currentNode, target: neighbor },
            message: `Exploring edge from ${currentNode} to ${neighbor}`
          })
          
          visited.add(neighbor)
          queue.push(neighbor)
          
          steps.push({ 
            visitedNodes: [...visited],
            currentNode: neighbor,
            visitedEdges: [],
            currentEdge: null,
            message: `Visiting node ${neighbor} and adding to queue`
          })
        }
      }
    }
    
    // Final state
    steps.push({ 
      visitedNodes: [...visited],
      currentNode: null,
      visitedEdges: [],
      currentEdge: null,
      message: "BFS traversal complete"
    })
    
    return steps
  }

  const generateDijkstraSteps = (nodes: any[], edges: any[]) => {
    const steps = []
    const startNode = 0
    
    // Initial state
    steps.push({ 
      visitedNodes: [],
      currentNode: null,
      visitedEdges: [],
      currentEdge: null,
      distances: nodes.reduce((acc, node) => {
        acc[node.id] = node.id === startNode ? 0 : Infinity
        return acc
      }, {}),
      message: "Starting Dijkstra's algorithm from node " + startNode
    })
    
    // Create a simplified version of Dijkstra's algorithm for visualization
    const distances: {[key: number]: number} = {}
    const previous: {[key: number]: number | null} = {}
    const unvisited = new Set(nodes.map(node => node.id))
    
    // Initialize distances
    for (const node of nodes) {
      distances[node.id] = node.id === startNode ? 0 : Infinity
      previous[node.id] = null
    }
    
    while (unvisited.size > 0) {
      // Find the unvisited node with the smallest distance
      let current: number | null = null
      let smallestDistance = Infinity
      
      for (const nodeId of unvisited) {
        if (distances[nodeId] < smallestDistance) {
          smallestDistance = distances[nodeId]
          current = nodeId
        }
      }
      
      if (current === null || distances[current] === Infinity) {
        break // All remaining nodes are unreachable
      }
      
      steps.push({ 
        visitedNodes: nodes.map(node => node.id).filter(id => !unvisited.has(id)),
        currentNode: current,
        visitedEdges: [],
        currentEdge: null,
        distances: {...distances},
        message: `Processing node ${current} with current distance ${distances[current]}`
      })
      
      // Remove current node from unvisited set
      unvisited.delete(current)
      
      // Update distances to neighbors
      const neighbors = edges
        .filter(e => e.source === current || e.target === current)
        .map(e => ({
          node: e.source === current ? e.target : e.source,
          weight: e.weight
        }))
      
      for (const { node: neighbor, weight } of neighbors) {
        if (!unvisited.has(neighbor)) continue
        
        steps.push({ 
          visitedNodes: nodes.map(node => node.id).filter(id => !unvisited.has(id)),
          currentNode: current,
          visitedEdges: [],
          currentEdge: { source: current, target: neighbor },
          distances: {...distances},
          message: `Checking neighbor ${neighbor} with edge weight ${weight}`
        })
        
        const newDistance = distances[current] + weight
        
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance
          previous[neighbor] = current
          
          steps.push({ 
            visitedNodes: nodes.map(node => node.id).filter(id => !unvisited.has(id)),
            currentNode: current,
            visitedEdges: [],
            currentEdge: { source: current, target: neighbor },
            distances: {...distances},
            message: `Updated distance to node ${neighbor} to ${newDistance}`
          })
        }
      }
    }
    
    // Final state
    steps.push({ 
      visitedNodes: nodes.map(node => node.id).filter(id => !unvisited.has(id)),
      currentNode: null,
      visitedEdges: [],
      currentEdge: null,
      distances: {...distances},
      message: "Dijkstra's algorithm complete"
    })
    
    return steps
  }

  const generateBinaryTreeSteps = (nodes: any[]) => {
    const steps = []
    
    // Initial state
    steps.push({ 
      visitedNodes: [],
      currentNode: null,
      visitedEdges: [],
      message: "Binary Tree Traversal"
    })
    
    // In-order traversal
    steps.push({ 
      visitedNodes: [],
      currentNode: null,
      visitedEdges: [],
      message: "Starting In-order Traversal (Left -> Root -> Right)"
    })
    
    const inOrderTraversal = (nodeId: number | null, visited: number[] = []) => {
      if (nodeId === null) return visited
      
      const node = nodes.find(n => n.id === nodeId)
      if (!node) return visited
      
      // Traverse left subtree
      if (node.left !== null) {
        steps.push({ 
          visitedNodes: [...visited],
          currentNode: nodeId,
          visitedEdges: [],
          message: `Moving to left child of node ${nodeId}`
        })
        
        visited = inOrderTraversal(node.left, visited)
      }
      
      // Visit node
      visited.push(nodeId)
      steps.push({ 
        visitedNodes: [...visited],
        currentNode: nodeId,
        visitedEdges: [],
        message: `Visiting node ${nodeId} with value ${node.value}`
      })
      
      // Traverse right subtree
      if (node.right !== null) {
        steps.push({ 
          visitedNodes: [...visited],
          currentNode: nodeId,
          visitedEdges: [],
          message: `Moving to right child of node ${nodeId}`
        })
        
        visited = inOrderTraversal(node.right, visited)
      }
      
      return visited
    }
    
    inOrderTraversal(0)
    
    // Final state
    steps.push({ 
      visitedNodes: nodes.map(node => node.id),
      currentNode: null,
      visitedEdges: [],
      message: "In-order traversal complete"
    })
    
    return steps
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center gap-2 mb-2">
        {getAlgorithmIcon()}
        <h3 className="text-lg font-semibold">{type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Visualization</h3>
      </div>
      
      <div className="relative">
        <canvas 
          ref={canvasRef} 
          width={500} 
          height={300} 
          className="w-full border rounded-md bg-white"
        />
        
        {steps[currentStep]?.message && (
          <div className="absolute bottom-2 left-2 right-2 bg-white/80 dark:bg-gray-800/80 p-2 rounded text-sm">
            {steps[currentStep].message}
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentStep(0)}
                disabled={currentStep === 0}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>First Step</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Previous Step</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={currentStep >= steps.length - 1}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isPlaying ? 'Pause' : 'Play'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNextStep}
                disabled={currentStep >= steps.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Next Step</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentStep(steps.length - 1)}
                disabled={currentStep >= steps.length - 1}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Last Step</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex-1">
          <Slider
            value={speed}
            min={1}
            max={100}
            step={1}
            onValueChange={setSpeed}
          />
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={resetVisualization}
              >
                <Shuffle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>New Random Data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </div>
        
        <div className="flex gap-2">
          {["bubble-sort", "insertion-sort", "selection-sort", "merge-sort", "quick-sort", "heap-sort"].includes(type) && (
            <>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                Comparing
              </Badge>
              <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                Swapping
              </Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Sorted
              </Badge>
            </>
          )}
          
          {["binary-search", "linear-search"].includes(type) && (
            <>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                Checking
              </Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Found
              </Badge>
              <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                Eliminated
              </Badge>
            </>
          )}
          
          {["dfs", "bfs", "dijkstra"].includes(type) && (
            <>
              <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                Current
              </Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Visited
              </Badge>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
