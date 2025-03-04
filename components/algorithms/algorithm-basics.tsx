import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function AlgorithmBasics() {
  const basics = [
    {
      title: "What is an Algorithm?",
      content: (
        <div className="space-y-4">
          <p>
            An algorithm is a step-by-step procedure or a set of rules designed to perform a specific task or solve a
            particular problem. Algorithms are the foundation of computer science and are used in various fields, from
            mathematics to artificial intelligence.
          </p>
          <p>
            Think of an algorithm as a recipe - it provides clear instructions that, when followed correctly, will
            produce the expected result every time.
          </p>
        </div>
      ),
    },
    {
      title: "Characteristics of a Good Algorithm",
      content: (
        <div className="space-y-4">
          <p>A good algorithm should have the following characteristics:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Input:</strong> It should take zero or more inputs
            </li>
            <li>
              <strong>Output:</strong> It should produce at least one output
            </li>
            <li>
              <strong>Definiteness:</strong> Each step must be clear and unambiguous
            </li>
            <li>
              <strong>Finiteness:</strong> It should terminate after a finite number of steps
            </li>
            <li>
              <strong>Effectiveness:</strong> Each step must be basic enough to be carried out by a person using only
              pencil and paper
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Types of Algorithms",
      content: (
        <div className="space-y-4">
          <p>Algorithms can be classified into various types based on their approach and application:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Sorting Algorithms</CardTitle>
                <CardDescription>Arrange data in a particular order</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6">
                  <li>Bubble Sort</li>
                  <li>Merge Sort</li>
                  <li>Quick Sort</li>
                  <li>Insertion Sort</li>
                  <li>Selection Sort</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Search Algorithms</CardTitle>
                <CardDescription>Find an item in a data structure</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6">
                  <li>Linear Search</li>
                  <li>Binary Search</li>
                  <li>Depth-First Search</li>
                  <li>Breadth-First Search</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Divide and Conquer</CardTitle>
                <CardDescription>Break a problem into subproblems, solve them, and combine the results</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6">
                  <li>Merge Sort</li>
                  <li>Quick Sort</li>
                  <li>Binary Search</li>
                  <li>Strassen's Matrix Multiplication</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Dynamic Programming</CardTitle>
                <CardDescription>Break down complex problems into simpler subproblems</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6">
                  <li>Fibonacci Sequence</li>
                  <li>Knapsack Problem</li>
                  <li>Longest Common Subsequence</li>
                  <li>Matrix Chain Multiplication</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Greedy Algorithms</CardTitle>
                <CardDescription>Make locally optimal choices at each stage</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6">
                  <li>Dijkstra's Algorithm</li>
                  <li>Prim's Algorithm</li>
                  <li>Kruskal's Algorithm</li>
                  <li>Huffman Coding</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Backtracking</CardTitle>
                <CardDescription>
                  Build solutions incrementally and abandon a solution when it fails to satisfy constraints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6">
                  <li>N-Queens Problem</li>
                  <li>Sudoku Solver</li>
                  <li>Hamiltonian Path</li>
                  <li>Graph Coloring</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      title: "Algorithm Design Paradigms",
      content: (
        <div className="space-y-4">
          <p>
            Algorithm design paradigms are general approaches to solving problems algorithmically. Understanding these
            paradigms can help you develop efficient solutions to complex problems.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Brute Force:</strong> Try all possible solutions until you find one that works
            </li>
            <li>
              <strong>Divide and Conquer:</strong> Break the problem into smaller subproblems, solve them recursively,
              and combine their solutions
            </li>
            <li>
              <strong>Dynamic Programming:</strong> Break down a problem into overlapping subproblems and solve each
              subproblem only once
            </li>
            <li>
              <strong>Greedy Approach:</strong> Make the locally optimal choice at each step with the hope of finding a
              global optimum
            </li>
            <li>
              <strong>Backtracking:</strong> Build a solution incrementally, abandoning a path as soon as it is
              determined to be invalid
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Pseudocode",
      content: (
        <div className="space-y-4">
          <p>
            Pseudocode is a high-level description of an algorithm that uses the structural conventions of a programming
            language but is intended for human reading rather than machine reading. It is a way of expressing an
            algorithm without getting bogged down in language-specific syntax.
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
            <pre className="text-sm">
              {`ALGORITHM BubbleSort(A)
  // A is an array of comparable elements
  n = length(A)
  for i = 0 to n-1
    for j = 0 to n-i-1
      if A[j] > A[j+1]
        swap A[j] and A[j+1]
  return A`}
            </pre>
          </div>
          <p>Good pseudocode should be:</p>
          <ul className="list-disc pl-6">
            <li>Clear and unambiguous</li>
            <li>Language-independent</li>
            <li>Easy to translate into actual code</li>
            <li>Focused on the logic rather than implementation details</li>
          </ul>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Understanding the fundamentals of algorithms is essential for any programmer or computer scientist. This
          section covers the basic concepts, characteristics, and types of algorithms.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {basics.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-medium">{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

