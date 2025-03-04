"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DataStructureVisualization from "@/components/data-structure-visualization"
import CodeBlock from "@/components/code-block"
import ComplexityTable from "@/components/complexity-table"

const dataStructures = [
  {
    name: "Array",
    description: "A collection of elements stored at contiguous memory locations",
    longDescription: `
      An array is a fundamental data structure that stores elements of the same type in contiguous memory locations. It provides fast access to individual elements using their indices. Arrays are widely used due to their simplicity and efficiency in accessing elements.

      Key characteristics of arrays:
      1. Fixed size (in most programming languages)
      2. Homogeneous elements (all elements are of the same type)
      3. Random access (constant time access to any element)
      4. Cache-friendly (due to contiguous memory allocation)

      Arrays are particularly useful when:
      - You need to store a collection of elements of the same type
      - You know the size of the collection in advance
      - You require fast access to elements by their position
    `,
    visualization: "array",
    code: `
class DynamicArray:
    def __init__(self):
        self.array = []
        self.size = 0

    def append(self, element):
        self.array.append(element)
        self.size += 1

    def insert(self, index, element):
        self.array.insert(index, element)
        self.size += 1

    def remove(self, element):
        self.array.remove(element)
        self.size -= 1

    def get(self, index):
        return self.array[index]

    def length(self):
        return self.size
    `,
    timeComplexity: [
      { operation: "Access", complexity: "O(1)" },
      { operation: "Search", complexity: "O(n)" },
      { operation: "Insertion", complexity: "O(n)" },
      { operation: "Deletion", complexity: "O(n)" },
    ],
    spaceComplexity: "O(n)",
  },
  {
    name: "Linked List",
    description: "A linear collection of data elements whose order is not given by their physical placement in memory",
    longDescription: `
      A linked list is a linear data structure where elements are stored in nodes. Each node contains a data field and a reference (or link) to the next node in the sequence. Unlike arrays, linked lists do not store elements in contiguous memory locations.

      Key characteristics of linked lists:
      1. Dynamic size (can grow or shrink at runtime)
      2. Efficient insertion and deletion (especially at the beginning)
      3. Non-contiguous memory allocation
      4. Sequential access (no random access)

      Types of linked lists:
      1. Singly Linked List: Each node has a reference to the next node
      2. Doubly Linked List: Each node has references to both the next and previous nodes
      3. Circular Linked List: The last node points back to the first node

      Linked lists are particularly useful when:
      - You need frequent insertions or deletions
      - You don't know the size of the list in advance
      - You don't need random access to elements
    `,
    visualization: "linked-list",
    code: `
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def delete(self, data):
        if not self.head:
            return
        if self.head.data == data:
            self.head = self.head.next
            return
        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                return
            current = current.next

    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(current.data)
            current = current.next
        return elements
    `,
    timeComplexity: [
      { operation: "Access", complexity: "O(n)" },
      { operation: "Search", complexity: "O(n)" },
      { operation: "Insertion (at beginning)", complexity: "O(1)" },
      { operation: "Insertion (at end)", complexity: "O(n)" },
      { operation: "Deletion", complexity: "O(n)" },
    ],
    spaceComplexity: "O(n)",
  },
  // Add more data structures here (Stack, Queue, Hash Table, etc.)
]

export default function DataStructuresPage() {
  const [activeDataStructure, setActiveDataStructure] = useState(dataStructures[0].name)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Data Structures Fundamentals</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Explore various data structures, their implementations, and use cases. Understanding these fundamental building
        blocks is crucial for efficient algorithm design and problem-solving in computer science.
      </p>
      <Tabs defaultValue={dataStructures[0].name} onValueChange={setActiveDataStructure}>
        <TabsList className="mb-4">
          {dataStructures.map((ds) => (
            <TabsTrigger key={ds.name} value={ds.name}>
              {ds.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {dataStructures.map((ds) => (
          <TabsContent key={ds.name} value={ds.name}>
            <Card>
              <CardHeader>
                <CardTitle>{ds.name}</CardTitle>
                <CardDescription>{ds.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Visualization</h3>
                    <DataStructureVisualization type={ds.visualization} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Implementation</h3>
                    <CodeBlock code={ds.code} language="python" />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Detailed Explanation</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{ds.longDescription}</p>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Time and Space Complexity</h3>
                  <ComplexityTable timeComplexity={ds.timeComplexity} spaceComplexity={ds.spaceComplexity} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

