"use client"

import { useState, useEffect, useCallback } from "react"
import VisualizationCanvas from "../visualization-canvas"
import VisualizationControls from "../visualization-controls"
import AlgorithmExplanation from "../algorithm-explanation"

export default function DepthFirstSearch() {
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
  const stackColor = "#8b5cf6" // Purple
  const defaultEdgeColor = "#6b7280" // Gray
  const traversedEdgeColor = "#ef4444" // Red

  // Generate DFS traversal steps
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
      message: `Starting DFS traversal from vertex ${startVertex}.`,
    })

    // DFS traversal
    const visited: boolean[] = Array(vertices.length).fill(false)
    const stack: number[] = []

    // Helper function for recursive DFS
    const dfs = (vertex: number) => {
      // Add to stack and mark as current
      stack.push(vertex)
      vertexColors[vertex] = currentColor

      steps.push({
        vertexColors: [...vertexColors],
        edgeColors: new Map(edgeColors),
        message: `Visiting vertex ${vertex}. Current stack: [${stack.join(", ")}]`,
      })

      // Mark as visited
      visited[vertex] = true

      // Get all neighbors
      const neighbors = graph.get(vertex) || []

      for (const neighbor of neighbors) {
        // Highlight the edge being considered
        const edgeId = vertex < neighbor ? `${vertex}-${neighbor}` : `${neighbor}-${vertex}`
        edgeColors.set(edgeId, traversedEdgeColor)

        steps.push({
          vertexColors: [...vertexColors],
          edgeColors: new Map(edgeColors),
          message: `Examining edge from ${vertex} to ${neighbor}.`,
        })

        if (!visited[neighbor]) {
          // Mark parent as in stack
          vertexColors[vertex] = stackColor

          steps.push({
            vertexColors: [...vertexColors],
            edgeColors: new Map(edgeColors),
            message: `Neighbor ${neighbor} has not been visited. Recursively visiting it.`,
          })

          // Recursively visit neighbor
          dfs(neighbor)
        } else {
          steps.push({
            vertexColors: [...vertexColors],
            edgeColors: new Map(edgeColors),
            message: `Neighbor ${neighbor} has already been visited.`,
          })
        }
      }

      // Mark as visited after processing all neighbors
      vertexColors[vertex] = visitedColor

      // Remove from stack
      stack.pop()

      steps.push({
        vertexColors: [...vertexColors],
        edgeColors: new Map(edgeColors),
        message: `Finished processing vertex ${vertex}. Backtracking. Current stack: [${stack.join(", ")}]`,
      })
    }

    dfs(startVertex)

    setSteps(steps)
    setCurrentStepIndex(0)
    setIsTraversalComplete(false)
  }, [graph, startVertex])

  // Initialize traversal
  useEffect(() => {
    generateSteps()
  }, [generateSteps])

  // Update vertex and edge colors based on current step
  useEffect(() => {
    if (steps.length > 0 && currentStepIndex >= 0 && currentStepIndex < steps.length) {
      setVertexColors(steps[currentStepIndex].vertexColors)
      setEdgeColors(steps[currentStepIndex].edgeColors)
      setCurrentStep(steps[currentStepIndex].message)
    }
  }, [currentStepIndex, steps])

  // Control play/pause
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isPlaying && currentStepIndex < steps.length - 1) {
      timeoutId = setTimeout(() => {
        setCurrentStepIndex((prevIndex) => prevIndex + 1)
      }, speed[0])
    } else if (currentStepIndex === steps.length - 1) {
      setIsPlaying(false)
      setIsTraversalComplete(true)
    }

    return () => clearTimeout(timeoutId)
  }, [isPlaying, currentStepIndex, steps.length, speed])

  // Handlers for controls
  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStepIndex(0)
    generateSteps()
    setIsTraversalComplete(false)
  }

  const handlePrevious = () => {
    setIsPlaying(false)
    setCurrentStepIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  const handleNext = () => {
    setIsPlaying(false)
    setCurrentStepIndex((prevIndex) => Math.min(prevIndex + 1, steps.length - 1))
  }

  const handleSpeedChange = (newSpeed: number[]) => {
    setSpeed(newSpeed)
  }

  const handleStartVertexChange = (newStartVertex: number) => {
    setStartVertex(newStartVertex)
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Depth-First Search Visualization</h1>

      <VisualizationCanvas vertexPositions={vertexPositions} vertexColors={vertexColors} edgeColors={edgeColors} />

      <VisualizationControls
        isPlaying={isPlaying}
        isTraversalComplete={isTraversalComplete}
        onPlay={handlePlay}
        onPause={handlePause}
        onReset={handleReset}
        onPrevious={handlePrevious}
        onNext={handleNext}
        speed={speed}
        onSpeedChange={handleSpeedChange}
        startVertex={startVertex}
        onStartVertexChange={handleStartVertexChange}
        maxStartVertex={graph.size - 1}
      />

      <AlgorithmExplanation currentStep={currentStep} />
    </div>
  )
}

