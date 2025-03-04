import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AsymptoticAnalysis() {
  const asymptoticTopics = [
    {
      title: "What is Asymptotic Analysis?",
      content: (
        <div className="space-y-4">
          <p>
            Asymptotic analysis is a method of describing the limiting behavior of a function when the argument tends towards a particular value or infinity. In algorithm analysis, it helps us understand how the runtime or space requirements grow as the input size increases.
          </p>
          <p>
            The key idea behind asymptotic analysis is to focus on the growth rate of an algorithm's resource usage (time or space) rather than the exact count of operations or bytes. This allows us to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Compare algorithms independently of hardware or implementation details</li>
            <li>Focus on the algorithm's behavior with large inputs (which is often the most critical case)</li>
            <li>Simplify the analysis by ignoring constants and lower-order terms</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Big O Notation (O)",
      content: (
        <div className="space-y-4">
          <p>
            Big O notation represents the upper bound of an algorithm's growth rate. It describes the worst-case scenario and is the most commonly used notation.
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
            <p className="font-mono">O(f(n)) = { "{g(n) : there exist positive constants c and n₀ such that 0 ≤ g(n) ≤ c*f(n) for all n   = { \"{g(n) : there exist positive constants c and n₀ such that 0 ≤ g(n) ≤ c*f(n) for all n ≥ n₀}" }</p>
          </div>
          <p>
            In simpler terms, Big O notation gives an upper bound on the growth rate of a function. It tells us how the algorithm scales with input size in the worst case.
          </p>
          <p>
            For example, if an algorithm has a time complexity of O(n²), it means that the running time grows at most quadratically with the input size. The actual running time might be better, but it won't be worse (asymptotically).
          </p>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Properties of Big O Notation:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>It provides an upper bound on the growth rate</li>
              <li>Constants are dropped: O(2n) = O(n)</li>
              <li>Lower-order terms are dropped: O(n² + n) = O(n²)</li>
              <li>It focuses on the behavior as n approaches infinity</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Big Omega Notation (Ω)",
      content: (
        <div className="space-y-4">
          <p>
            Big Omega notation represents the lower bound of an algorithm's growth rate. It describes the best-case scenario.
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
            <p className="font-mono">Ω(f(n)) = { "{g(n) : there exist positive constants c and n₀ such that 0 ≤ c*f(n) ≤ g(n) for all n ≥ n₀}" }</p>
          </div>
          <p>
            In simpler terms, Big Omega notation gives a lower bound on the growth rate of a function. It tells us how the algorithm scales with input size in the best case.
          </p>
          <p>
            For example, if an algorithm has a time complexity of Ω(n), it means that the running time grows at least linearly with the input size. The actual running time might be worse, but it won't be better (asymptotically).
          </p>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Properties of Big Omega Notation:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>It provides a lower bound on the growth rate</li>
              <li>Constants are dropped: Ω(2n) = Ω(n)</li>
              <li>Higher-order terms are dropped: Ω(n + n²) = Ω(n²)</li>
              <li>It focuses on the behavior as n approaches infinity</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Big Theta Notation (Θ)",
      content: (
        <div className="space-y-4">
          <p>
            Big Theta notation represents both the upper and lower bounds of an algorithm's growth rate. It describes the tight bound.
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
            <p className="font-mono">Θ(f(n)) = { "{g(n) : there exist positive constants c₁, c₂, and n₀ such that 0 ≤ c₁*f(n) ≤ g(n) ≤ c₂*f(n) for all n ≥ n₀}" }</p>
          </div>
          <p>
            In simpler terms, Big Theta notation gives both an upper and lower bound on the growth rate of a function. It tells us how the algorithm scales with input size when the best and worst cases have the same asymptotic growth.
          </p>
          <p>
            For example, if an algorithm has a time complexity of Θ(n log n), it means that the running time grows exactly at the rate of n log n, up to constant factors.
          </p>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Properties of Big Theta Notation:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>It provides both upper and lower bounds on the growth rate</li>
              <li>Constants are dropped: Θ(2n) = Θ(n)</li>
              <li>It's the intersection of Big O and Big Omega: Θ(f(n)) = O(f(n)) ∩ Ω(f(n))</li>
              <li>It gives the most precise description of an algorithm's asymptotic behavior</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Little o Notation (o)",
      content: (
        <div className="space-y-4">
          <p>
            Little o notation represents a strict upper bound of an algorithm's growth rate. It's similar to Big O, but it excludes the case where the growth rates are the same.
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
            <p className="font-mono">o(f(n)) = { "{g(n) : for every positive constant c, there exists a constant n₀ such that 0 ≤ g(n) < c*f(n) for all n ≥ n₀}" }</p>
          </div>
          <p>
            In simpler terms, if g(n) = o(f(n)), then g(n) grows strictly slower than f(n).
          </p>
          <p>
            For example, n = o(n²) because n grows strictly slower than n². However, n ≠ o(n) because n doesn't grow strictly slower than itself.
          </p>
        </div>
      ),
    },
    {
      title: "Little omega Notation (ω)",
      content: (
        <div className="space-y-4">
          <p>
            Little omega notation represents a strict lower bound of an algorithm's growth rate. It's similar to Big Omega, but it excludes the case where the growth rates are the same.
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
            <p className="font-mono">ω(f(n)) = { "{g(n) : for every positive constant c, there exists a constant n₀ such that 0 ≤ c*f(n) < g(n) for all n ≥ n₀}" }</p>
          </div>
          <p>
            In simpler terms, if g(n) = ω(f(n)), then g(n) grows strictly faster than f(n).
          </p>
          <p>
            For example, n² = ω(n) because n² grows strictly faster than n. However, n ≠ ω(n) because n doesn't grow strictly faster than itself.
          </p>
        </div>
      ),
    },
    {
      title: "Comparing Asymptotic Notations",
      content: (
        <div className="space-y-4">
          <p>
            Here's a comparison of the different asymptotic notations:
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Notation</TableHead>
                <TableHead>Meaning</TableHead>
                <TableHead>Analogy</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Big O (O)</TableCell>
                <TableCell>Upper bound</TableCell>
                <TableCell>Less than or equal to (≤)</TableCell>
                <TableCell>f(n) = O(g(n)) means f grows no faster than g</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Big Omega (Ω)</TableCell>
                <TableCell>Lower bound</TableCell>
                <TableCell>Greater than or equal to (≥)</TableCell>
                <TableCell>f(n) = Ω(g(n)) means f grows no slower than g</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Big Theta (Θ)</TableCell>
                <TableCell>Tight bound</TableCell>
                <TableCell>Equal to (=)</TableCell>
                <TableCell>f(n) = Θ(g(n)) means f grows at the same rate as g</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Little o (o)</TableCell>
                <TableCell>Strict upper bound</TableCell>
                <TableCell>Less than (<)</TableCell>\
                <TableCell>f(n) = o(g(n)) means f grows strictly slower than g</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Little omega (ω)</TableCell>
                <TableCell>Strict lower bound</TableCell>
                <TableCell>Greater than (>)</TableCell>
                <TableCell>f(n) = ω(g(n)) means f grows strictly faster than g</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Relationships:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>If f(n) = Θ(g(n)), then f(n) = O(g(n)) and f(n) = Ω(g(n))</li>
              <li>If f(n) = o(g(n)), then f(n) = O(g(n))</li>
              <li>If f(n) = ω(g(n)), then f(n) = Ω(g(n))</li>
              <li>If f(n) = o(g(n)), then g(n) = ω(f(n))</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Common Growth Rates",
      content: (
        <div className="space-y-4">
          <p>
            Here are some common growth rates, ordered from slowest to fastest:
          </p>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Growth Rate</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Example</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono">O(1)</TableCell>
                  <TableCell>Constant</TableCell>
                  <TableCell>Array access, Hash table insertion/lookup (average case)</TableCell>
                  <TableCell>The running time is constant regardless of the input size</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">O(log log n)</TableCell>
                  <TableCell>Double logarithmic</TableCell>
                  <TableCell>Interpolation search in a sorted array with uniform distribution</TableCell>
                  <TableCell>Grows very slowly, even slower than logarithmic</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">O(log n)</TableCell>
                  <TableCell>Logarithmic</TableCell>
                  <TableCell>Binary search, Balanced binary search tree operations</TableCell>
                  <TableCell>Grows logarithmically with the input size</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">O(n)</TableCell>
                  <TableCell>Linear</TableCell>
                  <TableCell>Linear search, Traversing an array</TableCell>
                  <TableCell>Grows linearly with the input size</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">O(n log n)</TableCell>
                  <TableCell>Linearithmic</TableCell>
                  <TableCell>Merge sort, Heap sort, Quick sort (average case)</TableCell>
                  <TableCell>Grows slightly faster than linear but slower than quadratic</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">O(n²)</TableCell>
                  <TableCell>Quadratic</TableCell>
                  <TableCell>Bubble sort, Selection sort, Insertion sort</TableCell>
                  <TableCell>Grows quadratically with the input size</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">O(n³)</TableCell>
                  <TableCell>Cubic</TableCell>
                  <TableCell>Simple matrix multiplication, Some dynamic programming algorithms</TableCell>
                  <TableCell>Grows cubically with the input size</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">O(2ⁿ)</TableCell>
                  <TableCell>Exponential</TableCell>
                  <TableCell>Tower of Hanoi, Recursive Fibonacci, Generating all subsets</TableCell>
                  <TableCell>Grows exponentially with the input size</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">O(n!)</TableCell>
                  <TableCell>Factorial</TableCell>
                  <TableCell>Generating all permutations, Brute force traveling salesman</TableCell>
                  <TableCell>Grows factorially with the input size</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Asymptotic analysis is a mathematical framework for analyzing the efficiency of algorithms as the input size grows. This section covers the different notations used in asymptotic analysis and how they help us understand algorithm behavior.
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {asymptoticTopics.map((topic, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-medium">{topic.title}</AccordionTrigger>
            <AccordionContent>{topic.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

