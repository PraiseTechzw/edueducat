"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SearchingVisualization from "@/components/searching-visualization"
import CodeBlock from "@/components/code-block"
import ComplexityTable from "@/components/complexity-table"

const searchingTechniques = [
  {
    name: "Linear Search",
    description: "A simple search algorithm that checks every element in the list sequentially",
    longDescription: `
      Linear Search, also known as sequential search, is the simplest searching algorithm. It works by sequentially checking each element in the list until a match is found or the end of the list is reached.

      Key characteristics of Linear Search:
      1. Simple and easy to implement
      2. Works on both sorted and unsorted lists
      3. Time complexity of O(n) in the worst and average cases
      4. Inefficient for large datasets

      Linear Search is useful when:
      - The list is small
      - The list is unsorted and sorting would be too costly
      - Searching for multiple items in a single pass
      - The list is rarely searched and therefore keeping it unsorted is cheaper
    `,
    visualization: "linear-search",
    code: `
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Return the index if the target is found
    return -1  # Return -1 if the target is not in the array
    `,
    timeComplexity: [
      { operation: "Best Case", complexity: "O(1)" },
      { operation: "Average Case", complexity: "O(n)" },
      { operation: "Worst Case", complexity: "O(n)" },
    ],
    spaceComplexity: "O(1)",
  },
  {
    name: "Binary Search",
    description:
      "An efficient search algorithm that works on sorted arrays by repeatedly dividing the search interval in half",
    longDescription: `
      Binary Search is a highly efficient algorithm for searching a sorted array. It works by repeatedly dividing the search interval in half, eliminating half of the remaining elements in each iteration.

      Key characteristics of Binary Search:
      1. Requires a sorted array
      2. Very efficient, with a time complexity of O(log n)
      3. Uses the divide-and-conquer approach
      4. Significantly faster than linear search for large datasets

      Binary Search is particularly useful when:
      - Searching in large, sorted datasets
      - The dataset is too large to iterate through linearly
      - The dataset is searched repeatedly, justifying the cost of keeping it sorted

      While Binary Search is very efficient, it requires that the data be sorted, which may not always be feasible or efficient depending on the use case.
    `,
    visualization: "binary-search",
    code: `
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid  # Target found, return its index
        elif arr[mid] < target:
            low = mid + 1  # Target is in the upper half
        else:
            high = mid - 1  # Target is in the lower half

    return -1  # Target not found
    `,
    timeComplexity: [
      { operation: "Best Case", complexity: "O(1)" },
      { operation: "Average Case", complexity: "O(log n)" },
      { operation: "Worst Case", complexity: "O(log n)" },
    ],
    spaceComplexity: "O(1)",
  },
  // Add more searching techniques here (e.g., Jump Search, Interpolation Search)
]

export default function SearchingPage() {
  const [activeSearching, setActiveSearching] = useState(searchingTechniques[0].name)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Searching Techniques</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Explore various searching algorithms, their implementations, and use cases. Efficient searching is crucial for
        many applications in computer science and software development.
      </p>
      <Tabs defaultValue={searchingTechniques[0].name} onValueChange={setActiveSearching}>
        <TabsList className="mb-4">
          {searchingTechniques.map((technique) => (
            <TabsTrigger key={technique.name} value={technique.name}>
              {technique.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {searchingTechniques.map((technique) => (
          <TabsContent key={technique.name} value={technique.name}>
            <Card>
              <CardHeader>
                <CardTitle>{technique.name}</CardTitle>
                <CardDescription>{technique.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Visualization</h3>
                    <SearchingVisualization type={technique.visualization} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Implementation</h3>
                    <CodeBlock code={technique.code} language="python" />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Detailed Explanation</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{technique.longDescription}</p>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Time and Space Complexity</h3>
                  <ComplexityTable
                    timeComplexity={technique.timeComplexity}
                    spaceComplexity={technique.spaceComplexity}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

