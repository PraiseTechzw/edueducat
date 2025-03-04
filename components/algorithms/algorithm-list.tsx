"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, SortAsc, Search, GitMerge, GitBranch, Network, Workflow } from "lucide-react"

// Import algorithm visualizations
import BubbleSortVisualization from "@/components/algorithms/visualizations/bubble-sort-visualization"
import BinarySearchVisualization from "@/components/algorithms/visualizations/binary-search-visualization"
import MergeSortVisualization from "@/components/algorithms/visualizations/merge-sort-visualization"
import QuickSortVisualization from "@/components/algorithms/visualizations/quick-sort-visualization"
import DfsVisualization from "@/components/algorithms/visualizations/dfs-visualization"
import BfsVisualization from "@/components/algorithms/visualizations/bfs-visualization"

export default function AlgorithmList() {
  const [activeAlgorithm, setActiveAlgorithm] = useState<string | null>(null)

  const algorithms = [
    {
      id: "bubble-sort",
      name: "Bubble Sort",
      category: "sorting",
      description:
        "A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
      icon: SortAsc,
      component: <BubbleSortVisualization />,
    },
    {
      id: "binary-search",
      name: "Binary Search",
      category: "searching",
      description:
        "A search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.",
      icon: Search,
      component: <BinarySearchVisualization />,
    },
    {
      id: "merge-sort",
      name: "Merge Sort",
      category: "sorting",
      description:
        "An efficient, stable, comparison-based, divide and conquer sorting algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.",
      icon: GitMerge,
      component: <MergeSortVisualization />,
    },
    {
      id: "quick-sort",
      name: "Quick Sort",
      category: "sorting",
      description:
        "An efficient, in-place sorting algorithm that uses a divide-and-conquer strategy with a pivot element to partition the array.",
      icon: GitBranch,
      component: <QuickSortVisualization />,
    },
    {
      id: "dfs",
      name: "Depth-First Search",
      category: "graph",
      description:
        "A graph traversal algorithm that explores as far as possible along each branch before backtracking.",
      icon: Network,
      component: <DfsVisualization />,
    },
    {
      id: "bfs",
      name: "Breadth-First Search",
      category: "graph",
      description:
        "A graph traversal algorithm that explores all the vertices of a graph at the present depth prior to moving on to vertices at the next depth level.",
      icon: Workflow,
      component: <BfsVisualization />,
    },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="sorting">Sorting</TabsTrigger>
          <TabsTrigger value="searching">Searching</TabsTrigger>
          <TabsTrigger value="graph">Graph</TabsTrigger>
        </TabsList>

        {["all", "sorting", "searching", "graph"].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {algorithms
                .filter((algo) => category === "all" || algo.category === category)
                .map((algorithm) => {
                  const Icon = algorithm.icon
                  return (
                    <Card key={algorithm.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-md ${
                              algorithm.category === "sorting"
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                                : algorithm.category === "searching"
                                  ? "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400"
                                  : "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <CardTitle>{algorithm.name}</CardTitle>
                        </div>
                        <CardDescription>{algorithm.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-2">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setActiveAlgorithm(activeAlgorithm === algorithm.id ? null : algorithm.id)}
                        >
                          {activeAlgorithm === algorithm.id ? "Hide Visualization" : "View Visualization"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                      {activeAlgorithm === algorithm.id && (
                        <CardContent className="pt-4 border-t">{algorithm.component}</CardContent>
                      )}
                    </Card>
                  )
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

