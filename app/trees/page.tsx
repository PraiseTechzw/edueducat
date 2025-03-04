"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TreeVisualization from "@/components/tree-visualization"
import CodeBlock from "@/components/code-block"
import ComplexityTable from "@/components/complexity-table"

const trees = [
  {
    name: "Binary Tree",
    description: "A tree data structure in which each node has at most two children",
    longDescription: `
      A Binary Tree is a hierarchical data structure in which each node has at most two children, referred to as the left child and the right child. It is a fundamental data structure in computer science and forms the basis for more complex tree structures.

      Key characteristics of Binary Trees:
      1. Each node has at most two children
      2. There is exactly one root node (the topmost node)
      3. Each child node is either a left child or a right child
      4. Binary trees can be balanced or unbalanced

      Types of Binary Trees:
      1. Full Binary Tree: Every node has 0 or 2 children
      2. Complete Binary Tree: All levels are filled except possibly the last, which is filled from left to right
      3. Perfect Binary Tree: All internal nodes have two children and all leaf nodes are at the same level
      4. Balanced Binary Tree: The height of the left and right subtrees of every node differs by at most one

      Binary Trees are used in various applications, including:
      - Expression parsing
      - Huffman coding for data compression
      - Implementation of binary search trees and heaps
    `,
    visualization: "binary-tree",
    code: `
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None

    def insert(self, value):
        if not self.root:
            self.root = Node(value)
        else:
            self._insert_recursive(self.root, value)

    def _insert_recursive(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = Node(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = Node(value)
            else:
                self._insert_recursive(node.right, value)

    def inorder_traversal(self):
        return self._inorder_recursive(self.root)

    def _inorder_recursive(self, node):
        if node is None:
            return []
        return (
            self._inorder_recursive(node.left) +
            [node.value] +
            self._inorder_recursive(node.right)
        )
    `,
    timeComplexity: [
      { operation: "Insertion", complexity: "O(h), where h is the height of the tree" },
      { operation: "Search", complexity: "O(h)" },
      { operation: "Deletion", complexity: "O(h)" },
      { operation: "Traversal", complexity: "O(n), where n is the number of nodes" },
    ],
    spaceComplexity: "O(n) for storing n nodes",
  },
  // Add more tree types here (e.g., AVL Tree, Red-Black Tree)
]

export default function TreesPage() {
  const [activeTree, setActiveTree] = useState(trees[0].name)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Trees</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Explore various tree data structures, their implementations, and use cases. Trees are hierarchical data
        structures that are fundamental to many algorithms and applications in computer science.
      </p>
      <Tabs defaultValue={trees[0].name} onValueChange={setActiveTree}>
        <TabsList className="mb-4">
          {trees.map((tree) => (
            <TabsTrigger key={tree.name} value={tree.name}>
              {tree.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {trees.map((tree) => (
          <TabsContent key={tree.name} value={tree.name}>
            <Card>
              <CardHeader>
                <CardTitle>{tree.name}</CardTitle>
                <CardDescription>{tree.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Visualization</h3>
                    <TreeVisualization type={tree.visualization} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Implementation</h3>
                    <CodeBlock code={tree.code} language="python" />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Detailed Explanation</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{tree.longDescription}</p>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Time and Space Complexity</h3>
                  <ComplexityTable timeComplexity={tree.timeComplexity} spaceComplexity={tree.spaceComplexity} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

