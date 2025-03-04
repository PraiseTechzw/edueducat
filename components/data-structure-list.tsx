"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, ListOrdered, List, BarChart2, Hash, GitFork, Database } from "lucide-react"

// Import data structure visualizations
import ArrayVisualization from "@/components/data-structures/visualizations/array-visualization"
import LinkedListVisualization from "@/components/data-structures/visualizations/linked-list-visualization"
import StackVisualization from "@/components/data-structures/visualizations/stack-visualization"
import QueueVisualization from "@/components/data-structures/visualizations/queue-visualization"
import HashTableVisualization from "@/components/data-structures/visualizations/hash-table-visualization"
import BinaryTreeVisualization from "@/components/data-structures/visualizations/binary-tree-visualization"

export default function DataStructureList() {
  const [activeDataStructure, setActiveDataStructure] = useState<string | null>(null)

  const dataStructures = [
    {
      id: "array",
      name: "Array",
      category: "linear",
      description:
        "A collection of elements stored at contiguous memory locations, each identified by an index or a key.",
      icon: ListOrdered,
      component: <ArrayVisualization />,
    },
    {
      id: "linked-list",
      name: "Linked List",
      category: "linear",
      description:
        "A linear collection of data elements whose order is not given by their physical placement in memory but by pointers.",
      icon: List,
      component: <LinkedListVisualization />,
    },
    {
      id: "stack",
      name: "Stack",
      category: "linear",
      description: "A Last-In-First-Out (LIFO) data structure where elements are added and removed from the same end.",
      icon: BarChart2,
      component: <StackVisualization />,
    },
    {
      id: "queue",
      name: "Queue",
      category: "linear",
      description:
        "A First-In-First-Out (FIFO) data structure where elements are added at the rear and removed from the front.",
      icon: Database,
      component: <QueueVisualization />,
    },
    {
      id: "hash-table",
      name: "Hash Table",
      category: "non-linear",
      description:
        "A data structure that implements an associative array abstract data type, a structure that can map keys to values.",
      icon: Hash,
      component: <HashTableVisualization />,
    },
    {
      id: "binary-tree",
      name: "Binary Tree",
      category: "non-linear",
      description:
        "A tree data structure in which each node has at most two children, referred to as the left child and the right child.",
      icon: GitFork,
      component: <BinaryTreeVisualization />,
    },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="linear">Linear</TabsTrigger>
          <TabsTrigger value="non-linear">Non-Linear</TabsTrigger>
        </TabsList>

        {["all", "linear", "non-linear"].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dataStructures
                .filter((ds) => category === "all" || ds.category === category)
                .map((dataStructure) => {
                  const Icon = dataStructure.icon
                  return (
                    <Card key={dataStructure.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-md ${
                              dataStructure.category === "linear"
                                ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                                : "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <CardTitle>{dataStructure.name}</CardTitle>
                        </div>
                        <CardDescription>{dataStructure.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-2">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            setActiveDataStructure(activeDataStructure === dataStructure.id ? null : dataStructure.id)
                          }
                        >
                          {activeDataStructure === dataStructure.id ? "Hide Visualization" : "View Visualization"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                      {activeDataStructure === dataStructure.id && (
                        <CardContent className="pt-4 border-t">{dataStructure.component}</CardContent>
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

