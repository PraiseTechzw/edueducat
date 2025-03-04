import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ComplexityAnalysis() {
  const timeComplexityData = [
    { name: "Constant", notation: "O(1)", example: "Array access, Hash table insertion/lookup (average case)" },
    { name: "Logarithmic", notation: "O(log n)", example: "Binary search, Balanced binary search tree operations" },
    { name: "Linear", notation: "O(n)", example: "Linear search, Traversing an array" },
    { name: "Linearithmic", notation: "O(n log n)", example: "Merge sort, Heap sort, Quick sort (average case)" },
    { name: "Quadratic", notation: "O(n²)", example: "Bubble sort, Selection sort, Insertion sort" },
    { name: "Cubic", notation: "O(n³)", example: "Simple matrix multiplication, Some dynamic programming algorithms" },
    { name: "Exponential", notation: "O(2ⁿ)", example: "Tower of Hanoi, Recursive Fibonacci, Generating all subsets" },
    { name: "Factorial", notation: "O(n!)", example: "Generating all permutations, Brute force traveling salesman" },
  ]

  const spaceComplexityData = [
    { name: "Constant", notation: "O(1)", example: "Variables, Simple data structures with fixed size" },
    { name: "Logarithmic", notation: "O(log n)", example: "Recursive binary search (call stack)" },
    { name: "Linear", notation: "O(n)", example: "Arrays, Lists, Hash tables (in general)" },
    { name: "Quadratic", notation: "O(n²)", example: "2D arrays, Adjacency matrices for graphs" },
    { name: "Exponential", notation: "O(2ⁿ)", example: "Recursive algorithms that create binary trees of calls" },
  ]

  const complexityTopics = [
    {
      title: "Understanding Algorithm Complexity",
      content: (
        <div className="space-y-4">
          <p>
            Algorithm complexity refers to the amount of resources (time and space) an algorithm needs to run as a
            function of the input size. It helps us compare algorithms and predict their performance on large inputs.
          </p>
          <p>When we analyze algorithms, we typically focus on two types of complexity:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Time Complexity:</strong> How the running time increases as the input size increases
            </li>
            <li>
              <strong>Space Complexity:</strong> How the memory usage increases as the input size increases
            </li>
          </ul>
          <p>Understanding complexity is crucial for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Choosing the right algorithm for a specific problem</li>
            <li>Predicting how an algorithm will perform with large inputs</li>
            <li>Identifying bottlenecks in your code</li>
            <li>Optimizing algorithms for better performance</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Big O Notation",
      content: (
        <div className="space-y-4">
          <p>
            Big O notation is a mathematical notation that describes the limiting behavior of a function when the
            argument tends towards a particular value or infinity. In computer science, it's used to classify algorithms
            according to how their run time or space requirements grow as the input size grows.
          </p>
          <p>
            Big O notation characterizes functions according to their growth rates. Different functions with the same
            growth rate may be represented using the same O notation.
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
            <p className="font-mono">
              O(f(n)) = {"{g(n) : there exist positive constants c and n₀ such that 0 ≤ g(n) ≤ c*f(n) for all n ≥ n₀}"}
            </p>
          </div>
          <p>
            In simpler terms, Big O notation gives an upper bound on the growth rate of a function. It tells us how the
            algorithm scales with input size in the worst case.
          </p>
          <p>When using Big O notation, we:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Drop lower-order terms (e.g., O(n² + n) becomes O(n²))</li>
            <li>Drop constant coefficients (e.g., O(2n) becomes O(n))</li>
            <li>Focus on the dominant term that grows the fastest</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Common Time Complexities",
      content: (
        <div className="space-y-4">
          <p>
            Time complexity measures the amount of time an algorithm takes to complete as a function of the input size.
            Here are the most common time complexities, ordered from best to worst:
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Complexity</TableHead>
                <TableHead>Notation</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeComplexityData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-mono">{item.notation}</TableCell>
                  <TableCell>
                    {item.name === "Constant" && "Running time doesn't change with input size"}
                    {item.name === "Logarithmic" && "Running time increases logarithmically with input size"}
                    {item.name === "Linear" && "Running time increases linearly with input size"}
                    {item.name === "Linearithmic" && "Running time is between linear and quadratic"}
                    {item.name === "Quadratic" && "Running time is proportional to the square of the input size"}
                    {item.name === "Cubic" && "Running time is proportional to the cube of the input size"}
                    {item.name === "Exponential" && "Running time doubles with each addition to the input"}
                    {item.name === "Factorial" && "Running time grows factorially with input size"}
                  </TableCell>
                  <TableCell>{item.example}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ),
    },
    {
      title: "Space Complexity",
      content: (
        <div className="space-y-4">
          <p>
            Space complexity measures the amount of memory an algorithm needs as a function of the input size. It
            includes both the auxiliary space (extra space used by the algorithm) and the space used by the input.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Complexity</TableHead>
                <TableHead>Notation</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {spaceComplexityData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-mono">{item.notation}</TableCell>
                  <TableCell>
                    {item.name === "Constant" && "Memory usage doesn't change with input size"}
                    {item.name === "Logarithmic" && "Memory usage increases logarithmically with input size"}
                    {item.name === "Linear" && "Memory usage increases linearly with input size"}
                    {item.name === "Quadratic" && "Memory usage is proportional to the square of the input size"}
                    {item.name === "Exponential" && "Memory usage doubles with each addition to the input"}
                  </TableCell>
                  <TableCell>{item.example}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ),
    },
    {
      title: "Best, Average, and Worst Case",
      content: (
        <div className="space-y-4">
          <p>When analyzing algorithm complexity, we often consider three different scenarios:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Best Case</CardTitle>
                <CardDescription>The minimum time/space required</CardDescription>
              </CardHeader>
              <CardContent>
                <p>The best case occurs when the input is in the most favorable configuration for the algorithm.</p>
                <p className="mt-2">
                  <strong>Example:</strong> For linear search, the best case is O(1) when the target element is at the
                  beginning of the array.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Case</CardTitle>
                <CardDescription>The expected time/space required</CardDescription>
              </CardHeader>
              <CardContent>
                <p>The average case represents the expected performance over all possible inputs of a given size.</p>
                <p className="mt-2">
                  <strong>Example:</strong> For quicksort, the average case is O(n log n) when the pivot selection is
                  reasonably balanced.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Worst Case</CardTitle>
                <CardDescription>The maximum time/space required</CardDescription>
              </CardHeader>
              <CardContent>
                <p>The worst case occurs when the input is in the least favorable configuration for the algorithm.</p>
                <p className="mt-2">
                  <strong>Example:</strong> For bubble sort, the worst case is O(n²) when the array is sorted in reverse
                  order.
                </p>
              </CardContent>
            </Card>
          </div>
          <p>
            In practice, we often focus on the worst-case complexity because it gives us a guaranteed upper bound on the
            resource requirements.
          </p>
        </div>
      ),
    },
    {
      title: "Complexity Comparison of Common Algorithms",
      content: (
        <div className="space-y-4">
          <p>Here's a comparison of the time and space complexity of common algorithms:</p>
          <Tabs defaultValue="sorting" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sorting">Sorting</TabsTrigger>
              <TabsTrigger value="searching">Searching</TabsTrigger>
              <TabsTrigger value="graph">Graph</TabsTrigger>
            </TabsList>

            <TabsContent value="sorting">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Algorithm</TableHead>
                    <TableHead>Best Case</TableHead>
                    <TableHead>Average Case</TableHead>
                    <TableHead>Worst Case</TableHead>
                    <TableHead>Space</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Bubble Sort</TableCell>
                    <TableCell className="font-mono">O(n)</TableCell>
                    <TableCell className="font-mono">O(n²)</TableCell>
                    <TableCell className="font-mono">O(n²)</TableCell>
                    <TableCell className="font-mono">O(1)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Selection Sort</TableCell>
                    <TableCell className="font-mono">O(n²)</TableCell>
                    <TableCell className="font-mono">O(n²)</TableCell>
                    <TableCell className="font-mono">O(n²)</TableCell>
                    <TableCell className="font-mono">O(1)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Insertion Sort</TableCell>
                    <TableCell className="font-mono">O(n)</TableCell>
                    <TableCell className="font-mono">O(n²)</TableCell>
                    <TableCell className="font-mono">O(n²)</TableCell>
                    <TableCell className="font-mono">O(1)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Merge Sort</TableCell>
                    <TableCell className="font-mono">O(n log n)</TableCell>
                    <TableCell className="font-mono">O(n log n)</TableCell>
                    <TableCell className="font-mono">O(n log n)</TableCell>
                    <TableCell className="font-mono">O(n)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Quick Sort</TableCell>
                    <TableCell className="font-mono">O(n log n)</TableCell>
                    <TableCell className="font-mono">O(n log n)</TableCell>
                    <TableCell className="font-mono">O(n²)</TableCell>
                    <TableCell className="font-mono">O(log n)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Heap Sort</TableCell>
                    <TableCell className="font-mono">O(n log n)</TableCell>
                    <TableCell className="font-mono">O(n log n)</TableCell>
                    <TableCell className="font-mono">O(n log n)</TableCell>
                    <TableCell className="font-mono">O(1)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="searching">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Algorithm</TableHead>
                    <TableHead>Best Case</TableHead>
                    <TableHead>Average Case</TableHead>
                    <TableHead>Worst Case</TableHead>
                    <TableHead>Space</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Linear Search</TableCell>
                    <TableCell className="font-mono">O(1)</TableCell>
                    <TableCell className="font-mono">O(n)</TableCell>
                    <TableCell className="font-mono">O(n)</TableCell>
                    <TableCell className="font-mono">O(1)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Binary Search</TableCell>
                    <TableCell className="font-mono">O(1)</TableCell>
                    <TableCell className="font-mono">O(log n)</TableCell>
                    <TableCell className="font-mono">O(log n)</TableCell>
                    <TableCell className="font-mono">O(1)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hash Table Lookup</TableCell>
                    <TableCell className="font-mono">O(1)</TableCell>
                    <TableCell className="font-mono">O(1)</TableCell>
                    <TableCell className="font-mono">O(n)</TableCell>
                    <TableCell className="font-mono">O(n)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="graph">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Algorithm</TableHead>
                    <TableHead>Time Complexity</TableHead>
                    <TableHead>Space Complexity</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Breadth-First Search (BFS)</TableCell>
                    <TableCell className="font-mono">O(V + E)</TableCell>
                    <TableCell className="font-mono">O(V)</TableCell>
                    <TableCell>V = vertices, E = edges</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Depth-First Search (DFS)</TableCell>
                    <TableCell className="font-mono">O(V + E)</TableCell>
                    <TableCell className="font-mono">O(V)</TableCell>
                    <TableCell>V = vertices, E = edges</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Dijkstra's Algorithm</TableCell>
                    <TableCell className="font-mono">O((V + E) log V)</TableCell>
                    <TableCell className="font-mono">O(V)</TableCell>
                    <TableCell>With binary heap</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bellman-Ford</TableCell>
                    <TableCell className="font-mono">O(V × E)</TableCell>
                    <TableCell className="font-mono">O(V)</TableCell>
                    <TableCell>Can handle negative weights</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Floyd-Warshall</TableCell>
                    <TableCell className="font-mono">O(V³)</TableCell>
                    <TableCell className="font-mono">O(V²)</TableCell>
                    <TableCell>All-pairs shortest path</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Prim's Algorithm</TableCell>
                    <TableCell className="font-mono">O(E log V)</TableCell>
                    <TableCell className="font-mono">O(V)</TableCell>
                    <TableCell>Minimum spanning tree</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kruskal's Algorithm</TableCell>
                    <TableCell className="font-mono">O(E log E)</TableCell>
                    <TableCell className="font-mono">O(V)</TableCell>
                    <TableCell>Minimum spanning tree</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Algorithm complexity analysis is a fundamental concept in computer science that helps us understand how
          algorithms perform as input sizes grow. This section covers time complexity, space complexity, and how to
          analyze and compare algorithms.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {complexityTopics.map((topic, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-medium">{topic.title}</AccordionTrigger>
            <AccordionContent>{topic.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

