import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AbstractDataTypes() {
  const adtTopics = [
    {
      title: "What is an Abstract Data Type (ADT)?",
      content: (
        <div className="space-y-4">
          <p>
            An Abstract Data Type (ADT) is a mathematical model for data types where a data type is defined by its
            behavior (semantics) from the point of view of a user of the data, specifically in terms of possible values,
            possible operations on data of this type, and the behavior of these operations.
          </p>
          <p>
            In simpler terms, an ADT is a logical description of how we view the data and the operations that are
            allowed without regard to how they will be implemented. It's a way of thinking about data structures at a
            high level, focusing on what they do rather than how they do it.
          </p>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Key Characteristics of ADTs:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Abstraction:</strong> They hide the implementation details
              </li>
              <li>
                <strong>Encapsulation:</strong> They combine data and operations
              </li>
              <li>
                <strong>Information Hiding:</strong> They expose only what's necessary
              </li>
              <li>
                <strong>Implementation Independence:</strong> They can be implemented in various ways
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "ADT vs. Data Structure",
      content: (
        <div className="space-y-4">
          <p>It's important to understand the difference between an Abstract Data Type (ADT) and a data structure:</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Abstract Data Type (ADT)</TableHead>
                <TableHead>Data Structure</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Logical view of data</TableCell>
                <TableCell>Implementation of ADT</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Defines what operations are possible</TableCell>
                <TableCell>Defines how operations are implemented</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Focuses on what data can do</TableCell>
                <TableCell>Focuses on how data is organized</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Implementation-independent</TableCell>
                <TableCell>Implementation-specific</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Examples: List, Stack, Queue</TableCell>
                <TableCell>Examples: Array, Linked List, Hash Table</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="mt-4">
            For example, a Stack is an ADT that defines operations like push, pop, and peek. It can be implemented using
            various data structures like an array or a linked list. The user of the Stack ADT doesn't need to know which
            data structure is used for implementation; they only need to know what operations are available and what
            they do.
          </p>
        </div>
      ),
    },
    {
      title: "Common Abstract Data Types",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">List</h4>
            <p>
              A List is an ordered collection of elements where each element can be accessed by its position (index).
            </p>
            <div className="mt-2">
              <h5 className="font-medium">Operations:</h5>
              <ul className="list-disc pl-6">
                <li>get(index): Returns the element at the specified index</li>
                <li>insert(index, element): Inserts an element at the specified index</li>
                <li>remove(index): Removes the element at the specified index</li>
                <li>size(): Returns the number of elements in the list</li>
                <li>isEmpty(): Returns true if the list is empty, false otherwise</li>
              </ul>
            </div>
            <div className="mt-2">
              <h5 className="font-medium">Implementations:</h5>
              <ul className="list-disc pl-6">
                <li>Array-based List</li>
                <li>Linked List</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Stack</h4>
            <p>
              A Stack is a collection of elements with a Last-In-First-Out (LIFO) behavior, where elements are added and
              removed from the same end.
            </p>
            <div className="mt-2">
              <h5 className="font-medium">Operations:</h5>
              <ul className="list-disc pl-6">
                <li>push(element): Adds an element to the top of the stack</li>
                <li>pop(): Removes and returns the top element</li>
                <li>peek(): Returns the top element without removing it</li>
                <li>size(): Returns the number of elements in the stack</li>
                <li>isEmpty(): Returns true if the stack is empty, false otherwise</li>
              </ul>
            </div>
            <div className="mt-2">
              <h5 className="font-medium">Implementations:</h5>
              <ul className="list-disc pl-6">
                <li>Array-based Stack</li>
                <li>Linked List-based Stack</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Queue</h4>
            <p>
              A Queue is a collection of elements with a First-In-First-Out (FIFO) behavior, where elements are added at
              the rear and removed from the front.
            </p>
            <div className="mt-2">
              <h5 className="font-medium">Operations:</h5>
              <ul className="list-disc pl-6">
                <li>enqueue(element): Adds an element to the rear of the queue</li>
                <li>dequeue(): Removes and returns the front element</li>
                <li>peek(): Returns the front element without removing it</li>
                <li>size(): Returns the number of elements in the queue</li>
                <li>isEmpty(): Returns true if the queue is empty, false otherwise</li>
              </ul>
            </div>
            <div className="mt-2">
              <h5 className="font-medium">Implementations:</h5>
              <ul className="list-disc pl-6">
                <li>Array-based Queue</li>
                <li>Linked List-based Queue</li>
                <li>Circular Queue</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Map (Dictionary)</h4>
            <p>A Map is a collection of key-value pairs where each key is unique and maps to exactly one value.</p>
            <div className="mt-2">
              <h5 className="font-medium">Operations:</h5>
              <ul className="list-disc pl-6">
                <li>put(key, value): Associates the specified value with the specified key</li>
                <li>get(key): Returns the value associated with the specified key</li>
                <li>remove(key): Removes the key-value pair for the specified key</li>
                <li>containsKey(key): Returns true if the map contains the specified key</li>
                <li>size(): Returns the number of key-value pairs in the map</li>
                <li>isEmpty(): Returns true if the map is empty, false otherwise</li>
              </ul>
            </div>
            <div className="mt-2">
              <h5 className="font-medium">Implementations:</h5>
              <ul className="list-disc pl-6">
                <li>Hash Table</li>
                <li>Binary Search Tree</li>
                <li>Red-Black Tree</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Set</h4>
            <p>A Set is a collection of unique elements with no duplicates.</p>
            <div className="mt-2">
              <h5 className="font-medium">Operations:</h5>
              <ul className="list-disc pl-6">
                <li>add(element): Adds the specified element to the set if it's not already present</li>
                <li>remove(element): Removes the specified element from the set</li>
                <li>contains(element): Returns true if the set contains the specified element</li>
                <li>size(): Returns the number of elements in the set</li>
                <li>isEmpty(): Returns true if the set is empty, false otherwise</li>
                <li>union(set): Returns a new set containing all elements from both sets</li>
                <li>intersection(set): Returns a new set containing only elements that are in both sets</li>
                <li>
                  difference(set): Returns a new set containing elements that are in this set but not in the specified
                  set
                </li>
              </ul>
            </div>
            <div className="mt-2">
              <h5 className="font-medium">Implementations:</h5>
              <ul className="list-disc pl-6">
                <li>Hash Set</li>
                <li>Tree Set</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Tree</h4>
            <p>
              A Tree is a hierarchical data structure with a root element and children elements, forming a tree-like
              structure.
            </p>
            <div className="mt-2">
              <h5 className="font-medium">Operations:</h5>
              <ul className="list-disc pl-6">
                <li>insert(element): Inserts an element into the tree</li>
                <li>remove(element): Removes an element from the tree</li>
                <li>search(element): Searches for an element in the tree</li>
                <li>traversePreOrder(): Visits all nodes in pre-order</li>
                <li>traverseInOrder(): Visits all nodes in in-order</li>
                <li>traversePostOrder(): Visits all nodes in post-order</li>
                <li>traverseLevelOrder(): Visits all nodes level by level</li>
              </ul>
            </div>
            <div className="mt-2">
              <h5 className="font-medium">Implementations:</h5>
              <ul className="list-disc pl-6">
                <li>Binary Tree</li>
                <li>Binary Search Tree</li>
                <li>AVL Tree</li>
                <li>Red-Black Tree</li>
                <li>B-Tree</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Graph</h4>
            <p>
              A Graph is a collection of nodes (vertices) connected by edges, representing relationships between
              objects.
            </p>
            <div className="mt-2">
              <h5 className="font-medium">Operations:</h5>
              <ul className="list-disc pl-6">
                <li>addVertex(vertex): Adds a vertex to the graph</li>
                <li>removeVertex(vertex): Removes a vertex from the graph</li>
                <li>addEdge(vertex1, vertex2): Adds an edge between two vertices</li>
                <li>removeEdge(vertex1, vertex2): Removes the edge between two vertices</li>
                <li>getNeighbors(vertex): Returns all vertices connected to the specified vertex</li>
                <li>
                  depthFirstSearch(startVertex): Performs a depth-first traversal starting from the specified vertex
                </li>
                <li>
                  breadthFirstSearch(startVertex): Performs a breadth-first traversal starting from the specified vertex
                </li>
              </ul>
            </div>
            <div className="mt-2">
              <h5 className="font-medium">Implementations:</h5>
              <ul className="list-disc pl-6">
                <li>Adjacency Matrix</li>
                <li>Adjacency List</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Implementing ADTs",
      content: (
        <div className="space-y-4">
          <p>When implementing an ADT, you need to consider the following:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Data Representation:</strong> How will the data be stored?
            </li>
            <li>
              <strong>Operation Implementation:</strong> How will the operations be implemented?
            </li>
            <li>
              <strong>Time and Space Complexity:</strong> What are the performance characteristics?
            </li>
            <li>
              <strong>Interface Design:</strong> What methods will be exposed to the user?
            </li>
          </ul>
          <p>For example, a Stack ADT can be implemented using an array or a linked list:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Array-based Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
                  <pre className="text-sm">
                    {`class ArrayStack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.pop();
  }
  
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Linked List-based Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
                  <pre className="text-sm">
                    {`class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedListStack {
  constructor() {
    this.top = null;
    this.size = 0;
  }
  
  push(element) {
    const newNode = new Node(element);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
  }
  
  pop() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    const data = this.top.data;
    this.top = this.top.next;
    this.size--;
    return data;
  }
  
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.top.data;
  }
  
  isEmpty() {
    return this.top === null;
  }
  
  getSize() {
    return this.size;
  }
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
          <p className="mt-4">
            Both implementations provide the same functionality (push, pop, peek, isEmpty, size) but use different data
            structures internally. The user of the Stack ADT doesn't need to know which implementation is being used;
            they only need to know what operations are available and what they do.
          </p>
        </div>
      ),
    },
    {
      title: "Benefits of Using ADTs",
      content: (
        <div className="space-y-4">
          <p>Using Abstract Data Types provides several benefits:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Abstraction:</strong> ADTs hide the implementation details, allowing users to focus on what the
              data structure does rather than how it does it
            </li>
            <li>
              <strong>Encapsulation:</strong> ADTs combine data and operations, providing a clean interface for users
            </li>
            <li>
              <strong>Modularity:</strong> ADTs can be developed and tested independently, making code more modular and
              easier to maintain
            </li>
            <li>
              <strong>Reusability:</strong> ADTs can be reused in different applications, reducing code duplication
            </li>
            <li>
              <strong>Flexibility:</strong> The implementation of an ADT can be changed without affecting the code that
              uses it, as long as the interface remains the same
            </li>
          </ul>
          <p>
            For example, if you're using a Stack ADT in your application and later decide to change the implementation
            from an array-based stack to a linked list-based stack for better performance, you can do so without
            changing any of the code that uses the Stack ADT, as long as the interface (push, pop, peek, etc.) remains
            the same.
          </p>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Abstract Data Types (ADTs) are high-level descriptions of data structures that define the behavior of data
          without specifying the implementation details. This section covers the concept of ADTs, common ADTs, and their
          implementations.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {adtTopics.map((topic, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-medium">{topic.title}</AccordionTrigger>
            <AccordionContent>{topic.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

