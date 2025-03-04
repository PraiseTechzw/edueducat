"use client"

import { useState, useEffect, useCallback } from "react"
import VisualizationCanvas from "../visualization-canvas"
import VisualizationControls from "../visualization-controls"
import AlgorithmExplanation from "../algorithm-explanation"

export default function BreadthFirstSearch() {
  // Graph represented as an adjacency list
  const [graph, setGraph] = useState<Map<number, number[]>>(
    new Map([
      [0, [1, 2]],
      [1, [0, 3, 4]],
      [2, [0, 5]],
      [3, [1, 6]],
      [4, [1, 7]],
      [5, [2, 8]],
      [6, [3]],
      [7, [4]],
      [8, [5]],
    ]),
  )

  // Vertex positions for visualization (arranged in a 3x3 grid)
  const [vertexPositions, setVertexPositions] = useState<[number, number][]>([
    [150, 50], // 0
    [75, 150], // 1
    [225, 150], // 2
    [25, 250], // 3
    [125, 250], // 4
    [275, 250], // 5
    [25, 350], // 6
    [125, 350], // 7
    [275, 350], // 8
  ])

  const [vertexColors, setVertexColors] = useState<string[]>([])
  const [edgeColors, setEdgeColors] = useState<Map<string, string>>(new Map())
  const [isPlaying, setIsPlaying] = useState(false)
  const [isTraversalComplete, setIsTraversalComplete] = useState(false)
  const [currentStep, setCurrentStep] = useState("")
  const [steps, setSteps] = useState<any[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [speed, setSpeed] = useState([50])
  const [startVertex, setStartVertex] = useState(0)

  // Colors
  const defaultColor = "#3b82f6" // Blue
  const visitedColor = "#10b981" // Green
  const currentColor = "#f59e0b" // Yellow
  const queuedColor = "#8b5cf6" // Purple
  const defaultEdgeColor = "#6b7280" // Gray
  const traversedEdgeColor = "#ef4444" // Red

  // Generate BFS traversal steps
  const generateSteps = useCallback(() => {
    const steps: any[] = []

    // Create copies for manipulation
    const vertices = Array.from(graph.keys())
    const vertexColors = Array(vertices.length).fill(defaultColor)
    const edgeColors = new Map<string, string>()

    // Initialize with all edges having default color
    vertices.forEach((vertex) => {
      const neighbors = graph.get(vertex) || []
      neighbors.forEach((neighbor) => {
        // Only add edge color once (for undirected graph)
        const edgeId = vertex < neighbor ? `${vertex}-${neighbor}` : `${neighbor}-${vertex}`
        edgeColors.set(edgeId, defaultEdgeColor)
      })
    })

    steps.push({
      vertexColors: [...vertexColors],
      edgeColors: new Map(edgeColors),
      message: `Starting BFS traversal from vertex ${startVertex}.`,
    })

    // BFS traversal
    const visited: boolean[] = Array(vertices.length).fill(false)
    const queue: number[] = []

    // Add start vertex to queue
    queue.push(startVertex)
    visited[startVertex] = true
    vertexColors[startVertex] = currentColor

    steps.push({
      vertexColors: [...vertexColors],
      edgeColors: new Map(edgeColors),
      message: `Added start vertex ${startVertex} to the queue.`,
    })

    while (queue.length > 0) {
      // Dequeue a vertex
      const currentVertex = queue.shift()!

      // Mark as current
      vertexColors[currentVertex] = currentColor

      steps.push({
        vertexColors: [...vertexColors],
        edgeColors: new Map(edgeColors),
        message: `Processing vertex ${currentVertex}.`,
      })

      // Get all neighbors
      const neighbors = graph.get(currentVertex) || []

      for (const neighbor of neighbors) {
        // Highlight the edge being considered
        const edgeId = currentVertex < neighbor ? `${currentVertex}-${neighbor}` : `${neighbor}-${currentVertex}`
        edgeColors.set(edgeId, traversedEdgeColor)

        steps.push({
          vertexColors: [...vertexColors],
          edgeColors: new Map(edgeColors),
          message: `Examining edge from ${currentVertex} to ${neighbor}.`,
        })

        if (!visited[neighbor]) {
          // Add unvisited neighbor to queue
          queue.push(neighbor)
          visited[neighbor] = true
          vertexColors[neighbor] = queuedColor

          steps.push({
            vertexColors: [...vertexColors],
            edgeColors: new Map(edgeColors),
            message: `Added unvisited vertex ${neighbor} to the queue.`,
          })
        } else {
          steps.push({
            vertexColors: [...vertexColors],
            edgeColors: new Map(edgeColors),
            message: `Vertex ${neighbor} has already been visited or queued.`,
          })
        }
      }

      // Mark as visited after processing all neighbors
      vertexColors[currentVertex] = visitedColor

      steps.push({
        vertexColors: [...vertexColors],
        edgeColors: new Map(edgeColors),
        message: `Finished processing vertex ${currentVertex}. Current queue: [${queue.join(", ")}]`,
      })
    }

    // Final step
    steps.push({
      vertexColors: [...vertexColors],
      edgeColors: new Map(edgeColors),
      message: "BFS traversal complete!",
    })

    return steps
  }, [graph, startVertex])

  // Initialize steps
  useEffect(() => {
    const newSteps = generateSteps()
    setSteps(newSteps)
    setCurrentStepIndex(-1)
    setIsTraversalComplete(false)

    // Reset state
    setVertexColors(Array(graph.size).fill(defaultColor))
    setEdgeColors(new Map())
    setCurrentStep("")
  }, [generateSteps, graph, defaultColor])

  // Animation loop
  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length - 1) {
      if (currentStepIndex >= steps.length - 1) {
        setIsTraversalComplete(true)
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
      setVertexColors(step.vertexColors)
      setEdgeColors(step.edgeColors)
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
    setIsTraversalComplete(false)
    setVertexColors(Array(graph.size).fill(defaultColor))
    setEdgeColors(new Map())
    setCurrentStep("")
  }

  // Handle step forward
  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  // Canvas render function
  const renderCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const width = canvas.width
      const height = canvas.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw edges
      Array.from(graph.keys()).forEach((vertex) => {
        const [x1, y1] = vertexPositions[vertex]
        const neighbors = graph.get(vertex) || []

        neighbors.forEach((neighbor) => {
          // Only draw edge once (for undirected graph)
          if (vertex < neighbor) {
            const [x2, y2] = vertexPositions[neighbor]

            // Edge color
            const edgeId = `${vertex}-${neighbor}`
            const edgeColor = edgeColors.get(edgeId) || defaultEdgeColor

            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.strokeStyle = edgeColor
            ctx.lineWidth = 2
            ctx.stroke()
          }
        })
      })

      // Draw vertices
      Array.from(graph.keys()).forEach((vertex) => {
        const [x, y] = vertexPositions[vertex]
        const nodeRadius = 20

        // Vertex circle
        ctx.fillStyle = vertexColors[vertex] || defaultColor
        ctx.beginPath()
        ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI)
        ctx.fill()

        // Vertex border
        ctx.strokeStyle = "#000"
        ctx.lineWidth = 1
        ctx.stroke()

        // Vertex label
        ctx.fillStyle = "#fff"
        ctx.font = "14px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(vertex.toString(), x, y)
      })

      // Draw legend
      const legendX = 10
      const legendY = 10
      const legendSpacing = 20

      // Start vertex
      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.textAlign = "left"
      ctx.fillText(`Start Vertex: ${startVertex}`, legendX, legendY)

      // Colors
      const drawLegendItem = (color: string, label: string, index: number) => {
        const y = legendY + (index + 1) * legendSpacing

        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(legendX + 10, y - 5, 6, 0, 2 * Math.PI)
        ctx.fill()

        ctx.strokeStyle = "#000"
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.fillStyle = "#000"
        ctx.font = "12px Arial"
        ctx.textAlign = "left"
        ctx.fillText(label, legendX + 25, y)
      }

      drawLegendItem(defaultColor, "Unvisited", 1)
      drawLegendItem(queuedColor, "In Queue", 2)
      drawLegendItem(currentColor, "Current", 3)
      drawLegendItem(visitedColor, "Visited", 4)

      // Draw current step number
      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.textAlign = "right"
      ctx.fillText(`Step ${currentStepIndex + 1} of ${steps.length}`, width - 10, 20)
    },
    [
      graph,
      vertexPositions,
      vertexColors,
      edgeColors,
      currentStepIndex,
      steps.length,
      startVertex,
      defaultColor,
      queuedColor,
      currentColor,
      visitedColor,
      defaultEdgeColor,
    ],
  )

  return (
    <div className="space-y-4">
      <VisualizationCanvas renderFunction={renderCanvas} height={400} />

      <VisualizationControls
        isPlaying={isPlaying}
        speed={speed}
        onPlayPause={handlePlayPause}
        onReset={handleReset}
        onStepForward={handleStepForward}
        onSpeedChange={setSpeed}
        disablePlayPause={false}
        disableStepForward={currentStepIndex >= steps.length - 1}
        disableReset={currentStepIndex === -1}
      />

      <AlgorithmExplanation
        title="Breadth-First Search (BFS) Algorithm"
        description="BFS is a graph traversal algorithm that explores all the vertices at the current depth level before moving on to vertices at the next depth level. It uses a queue data structure to keep track of vertices to be processed."
        timeComplexity="O(V + E) where V is the number of vertices and E is the number of edges"
        spaceComplexity="O(V) for the queue and visited array"
        currentStep={currentStep}
      />
    </div>
  )
}

