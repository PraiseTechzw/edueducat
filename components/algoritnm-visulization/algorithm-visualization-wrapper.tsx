"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BubbleSort from "./sorting/bubble-sort"
import MergeSort from "./sorting/merge-sort"
import QuickSort from "./sorting/quick-sort"
import BinarySearch from "./searching/binary-search"
import LinearSearch from "./searching/linear-search"
import BreadthFirstSearch from "./graph/breadth-first-search"
import DepthFirstSearch from "./graph/depth-first-search"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export type AlgorithmCategory = "sorting" | "searching" | "graph" | "dynamic-programming"
export type AlgorithmType =
  // Sorting algorithms
  | "bubble-sort"
  | "quick-sort"
  | "merge-sort"
  // Searching algorithms
  | "binary-search"
  | "linear-search"
  // Graph algorithms
  | "breadth-first-search"
  | "depth-first-search"

interface AlgorithmVisualizationWrapperProps {
  type?: AlgorithmType
  category?: AlgorithmCategory
  showTabs?: boolean
}

export default function AlgorithmVisualizationWrapper({
  type = "bubble-sort",
  category = "sorting",
  showTabs = true,
}: AlgorithmVisualizationWrapperProps) {
  const [activeAlgorithm, setActiveAlgorithm] = useState<AlgorithmType>(type)

  const sortingAlgorithms = [
    { id: "bubble-sort", name: "Bubble Sort", component: BubbleSort },
    { id: "merge-sort", name: "Merge Sort", component: MergeSort },
    { id: "quick-sort", name: "Quick Sort", component: QuickSort },
  ]

  const searchingAlgorithms = [
    { id: "binary-search", name: "Binary Search", component: BinarySearch },
    { id: "linear-search", name: "Linear Search", component: LinearSearch },
  ]

  const graphAlgorithms = [
    { id: "breadth-first-search", name: "Breadth-First Search", component: BreadthFirstSearch },
    { id: "depth-first-search", name: "Depth-First Search", component: DepthFirstSearch },
  ]

  const getAlgorithms = () => {
    switch (category) {
      case "sorting":
        return sortingAlgorithms
      case "searching":
        return searchingAlgorithms
      case "graph":
        return graphAlgorithms
      default:
        return sortingAlgorithms
    }
  }

  const renderActiveAlgorithm = () => {
    const algorithms = getAlgorithms()
    const algorithm = algorithms.find((algo) => algo.id === activeAlgorithm)

    if (algorithm) {
      const AlgorithmComponent = algorithm.component
      return <AlgorithmComponent />
    }

    return <div>Algorithm not found</div>
  }

  if (!showTabs) {
    return renderActiveAlgorithm()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{category} Algorithms</CardTitle>
        <CardDescription>Visualize and learn how {category} algorithms work step by step</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeAlgorithm} onValueChange={(value) => setActiveAlgorithm(value as AlgorithmType)}>
          <TabsList className="mb-4">
            {getAlgorithms().map((algorithm) => (
              <TabsTrigger key={algorithm.id} value={algorithm.id as string}>
                {algorithm.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {getAlgorithms().map((algorithm) => (
            <TabsContent key={algorithm.id} value={algorithm.id as string}>
              {algorithm.id === activeAlgorithm && <algorithm.component />}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

