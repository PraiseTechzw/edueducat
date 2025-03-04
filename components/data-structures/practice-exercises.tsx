"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronRight, Code, Lightbulb } from "lucide-react"

export default function PracticeExercises() {
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({})

  const toggleSolution = (id: string) => {
    setShowSolution((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const exercises = {
    sorting: [
      {
        id: "sorting-1",
        title: "Implement Bubble Sort",
        difficulty: "Easy",
        description: "Implement the Bubble Sort algorithm to sort an array of integers in ascending order.",
        hints: [
          "Compare adjacent elements and swap them if they are in the wrong order",
          "After each pass, the largest element will be at the end of the array",
          "You can optimize by stopping if no swaps are made in a pass",
        ],
        solution: `
function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    let swapped = false;
    
    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap them if they are in the wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swapping occurred in this pass, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort([...arr])); // [11, 12, 22, 25, 34, 64, 90]
        `,
      },
      {
        id: "sorting-2",
        title: "Implement Merge Sort",
        difficulty: "Medium",
        description: "Implement the Merge Sort algorithm to sort an array of integers in ascending order.",
        hints: [
          "Divide the array into two halves, recursively sort them, and then merge",
          "The merge function combines two sorted arrays into a single sorted array",
          "Create temporary arrays to hold the left and right subarrays",
        ],
        solution: `
function mergeSort(arr) {
  // Base case: arrays with 0 or 1 element are already sorted
  if (arr.length <= 1) {
    return arr;
  }
  
  // Divide the array into two halves
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  
  // Recursively sort both halves
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // Compare elements from both arrays and add the smaller one to the result
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // Add remaining elements from either array
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Example usage
const arr = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSort([...arr])); // [3, 9, 10, 27, 38, 43, 82]
        `,
      },
      {
        id: "sorting-3",
        title: "Implement Quick Sort",
        difficulty: "Hard",
        description: "Implement the Quick Sort algorithm to sort an array of integers in ascending order.",
        hints: [
          "Choose a pivot element from the array",
          "Partition the array around the pivot (elements less than pivot go to the left, elements greater than pivot go to the right)",
          "Recursively apply the above steps to the sub-arrays",
        ],
        solution: `
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Partition the array and get the pivot index
    const pivotIndex = partition(arr, low, high);
    
    // Recursively sort the sub-arrays
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  
  return arr;
}

function partition(arr, low, high) {
  // Choose the rightmost element as the pivot
  const pivot = arr[high];
  
  // Index of the smaller element
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    // If the current element is smaller than or equal to the pivot
    if (arr[j] <= pivot) {
      i++;
      // Swap arr[i] and arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // Swap arr[i+1] and arr[high] (put the pivot in its correct position)
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  // Return the pivot index
  return i + 1;
}

// Example usage
const arr = [10, 7, 8, 9, 1, 5];
console.log(quickSort([...arr])); // [1, 5, 7, 8, 9, 10]
        `,
      },
    ],
    searching: [
      {
        id: "searching-1",
        title: "Implement Linear Search",
        difficulty: "Easy",
        description: "Implement the Linear Search algorithm to find the index of a target element in an array.",
        hints: [
          "Iterate through each element in the array",
          "Compare each element with the target value",
          "Return the index if found, or -1 if not found",
        ],
        solution: `
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Return the index if the target is found
    }
  }
  return -1; // Return -1 if the target is not found
}

// Example usage
const arr = [10, 20, 80, 30, 60, 50, 110, 100, 130, 170];
console.log(linearSearch(arr, 110)); // 6
console.log(linearSearch(arr, 175)); // -1
        `,
      },
      {
        id: "searching-2",
        title: "Implement Binary Search",
        difficulty: "Medium",
        description: "Implement the Binary Search algorithm to find the index of a target element in a sorted array.",
        hints: [
          "The array must be sorted",
          "Compare the target with the middle element",
          "If the target is smaller, search in the left half; if larger, search in the right half",
        ],
        solution: `
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    // Calculate the middle index
    const mid = Math.floor((left + right) / 2);
    
    // Check if the target is at the middle
    if (arr[mid] === target) {
      return mid;
    }
    
    // If the target is smaller, search in the left half
    if (arr[mid] > target) {
      right = mid - 1;
    } 
    // If the target is larger, search in the right half
    else {
      left = mid + 1;
    }
  }
  
  // Target not found
  return -1;
}

// Example usage
const arr = [2, 3, 4, 10, 40];
console.log(binarySearch(arr, 10)); // 3
console.log(binarySearch(arr, 5));  // -1
        `,
      },
      {
        id: "searching-3",
        title: "Implement Jump Search",
        difficulty: "Hard",
        description: "Implement the Jump Search algorithm to find the index of a target element in a sorted array.",
        hints: [
          "The array must be sorted",
          "Jump ahead by fixed steps",
          "When you find a value greater than the target, perform a linear search in the previous block",
        ],
        solution: `
function jumpSearch(arr, target) {
  const n = arr.length;
  
  // Finding the optimal block size to jump
  const step = Math.floor(Math.sqrt(n));
  
  // Finding the block where the target may be present
  let prev = 0;
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) {
      return -1; // Target not found
    }
  }
  
  // Linear search in the identified block
  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) {
      return -1; // Target not found
    }
  }
  
  // Check if the element is found
  if (arr[prev] === target) {
    return prev;
  }
  
  return -1; // Target not found
}

// Example usage
const arr = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];
console.log(jumpSearch(arr, 55)); // 10
console.log(jumpSearch(arr, 56)); // -1
        `,
      },
    ],
    graph: [
      {
        id: "graph-1",
        title: "Implement Depth-First Search",
        difficulty: "Medium",
        description: "Implement the Depth-First Search algorithm to traverse a graph.",
        hints: [
          "Use a stack or recursion to keep track of vertices to visit",
          "Mark vertices as visited to avoid cycles",
          "Explore one branch completely before moving to the next",
        ],
        solution: `
// Recursive DFS implementation
function dfs(graph, start, visited = new Set()) {
  // Mark the current node as visited
  visited.add(start);
  console.log(start); // Process the current vertex
  
  // Recur for all adjacent vertices
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
  
  return visited;
}

// Iterative DFS implementation using a stack
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  
  while (stack.length > 0) {
    // Pop a vertex from the stack
    const vertex = stack.pop();
    
    if (!visited.has(vertex)) {
      // Mark the vertex as visited
      visited.add(vertex);
      console.log(vertex); // Process the current vertex
      
      // Add all unvisited neighbors to the stack
      // We add in reverse order to get the same traversal as recursive version
      for (let i = graph[vertex].length - 1; i >= 0; i--) {
        const neighbor = graph[vertex][i];
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
  
  return visited;
}

// Example usage
const graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E']
};

console.log("Recursive DFS:");
dfs(graph, 'A');

console.log("\\nIterative DFS:");
dfsIterative(graph, 'A');
        `,
      },
      {
        id: "graph-2",
        title: "Implement Breadth-First Search",
        difficulty: "Medium",
        description: "Implement the Breadth-First Search algorithm to traverse a graph.",
        hints: [
          "Use a queue to keep track of vertices to visit",
          "Mark vertices as visited to avoid cycles",
          "Explore all neighbors at the current depth before moving to the next depth level",
        ],
        solution: `
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  
  while (queue.length > 0) {
    // Dequeue a vertex from the queue
    const vertex = queue.shift();
    console.log(vertex); // Process the current vertex
    
    // Visit all the adjacent vertices
    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return visited;
}

// Example usage
const graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E']
};

console.log("BFS traversal:");
bfs(graph, 'A');
        `,
      },
      {
        id: "graph-3",
        title: "Implement Dijkstra's Algorithm",
        difficulty: "Hard",
        description:
          "Implement Dijkstra's Algorithm to find the shortest path from a source vertex to all other vertices in a weighted graph.",
        hints: [
          "Use a priority queue to select the vertex with the minimum distance",
          "Maintain a distance array to store the shortest distance from the source to each vertex",
          "Relax the edges of each vertex when it is processed",
        ],
        solution: `
function dijkstra(graph, start) {
  // Create a set to keep track of vertices that are being processed
  const visited = new Set();
  
  // Create a map to store the shortest distance from start to each vertex
  const distances = new Map();
  
  // Create a map to store the previous vertex in the shortest path
  const previous = new Map();
  
  // Initialize distances with infinity for all vertices except the start vertex
  for (const vertex of Object.keys(graph)) {
    distances.set(vertex, Infinity);
  }
  distances.set(start, 0);
  
  // Main loop
  while (visited.size < Object.keys(graph).length) {
    // Find the vertex with the minimum distance
    let minVertex = null;
    let minDistance = Infinity;
    
    for (const [vertex, distance] of distances.entries()) {
      if (!visited.has(vertex) && distance < minDistance) {
        minVertex = vertex;
        minDistance = distance;
      }
    }
    
    // If we can't find a vertex to process, break the loop
    if (minVertex === null) break;
    
    // Mark the selected vertex as processed
    visited.add(minVertex);
    
    // Update distances to adjacent vertices
    for (const [neighbor, weight] of Object.entries(graph[minVertex])) {
      // Skip if the neighbor has been processed
      if (visited.has(neighbor)) continue;
      
      // Calculate the distance through the current vertex
      const alt = distances.get(neighbor) + weight;
      
      // If we found a shorter path, update the distance and previous vertex
      if (alt < distances.get(neighbor)) {
        distances.set(neighbor, alt);
        previous.set(neighbor, minVertex);
      }
    }
  }
  
  return { distances, previous };
}

// Helper function to reconstruct the shortest path
function getPath(previous, to) {
  const path = [];
  let current = to;
  
  while (current !== undefined) {
    path.unshift(current);
    current = previous.get(current);
  }
  
  return path;
}

// Example usage
const graph = {
  'A': { 'B': 4, 'C': 2 },
  'B': { 'A': 4, 'D': 2, 'E': 3 },
  'C': { 'A': 2, 'F': 4 },
  'D': { 'B': 2 },
  'E': { 'B': 3, 'F': 1 },
  'F': { 'C': 4, 'E': 1 }
};

const { distances, previous } = dijkstra(graph, 'A');

console.log("Shortest distances from A:");
for (const [vertex, distance] of distances.entries()) {
  console.log(\`A to ${vertex}: ${distance}\`);
}

console.log("\nShortest path from A to F:");
const path = getPath(previous, 'F');
console.log(path.join(' -> '));
        `,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Practice is essential for mastering algorithms. This section provides coding exercises of varying difficulty
          levels to help you apply what you've learned.
        </p>
      </div>

      <Tabs defaultValue="sorting" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sorting">Sorting</TabsTrigger>
          <TabsTrigger value="searching">Searching</TabsTrigger>
          <TabsTrigger value="graph">Graph</TabsTrigger>
        </TabsList>

        {Object.entries(exercises).map(([category, categoryExercises]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {categoryExercises.map((exercise) => (
              <Card key={exercise.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{exercise.title}</CardTitle>
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        exercise.difficulty === "Easy"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : exercise.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {exercise.difficulty}
                    </div>
                  </div>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="hints">
                      <AccordionTrigger className="flex items-center">
                        <div className="flex items-center">
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Hints
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pl-6">
                          {exercise.hints.map((hint, index) => (
                            <li key={index} className="flex items-start">
                              <ChevronRight className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                              <span>{hint}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="flex items-center" onClick={() => toggleSolution(exercise.id)}>
                    <Code className="h-4 w-4 mr-2" />
                    {showSolution[exercise.id] ? "Hide Solution" : "Show Solution"}
                  </Button>
                </CardFooter>
                {showSolution[exercise.id] && (
                  <CardContent className="pt-0">
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-md p-4 overflow-x-auto">
                      <pre className="text-sm">
                        <code>{exercise.solution}</code>
                      </pre>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

