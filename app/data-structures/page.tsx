"use client"

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
    steps: [
      {
        title: "Understanding Arrays",
        content: "An array is a collection of elements stored at contiguous memory locations. It is the simplest and most widely used data structure. Arrays store elements of the same data type, and each element can be accessed using an index."
      },
      {
        title: "Array Operations",
        content: "The basic operations on arrays include:\n- Accessing elements by index (O(1))\n- Searching for an element (O(n))\n- Inserting an element (O(n) in worst case)\n- Deleting an element (O(n) in worst case)"
      },
      {
        title: "Implementation",
        content: "Let's implement a dynamic array in Python:",
        code: `class DynamicArray:
    def __init__(self):
        self.array = []  # Internal array
        self.size = 0    # Size tracker
    
    def append(self, element):
        # Add element to the end
        self.array.append(element)
        self.size += 1
    
    def insert(self, index, element):
        # Insert element at specific index
        if index < 0 or index > self.size:
            raise IndexError("Index out of range")
        self.array.insert(index, element)
        self.size += 1
    
    def remove(self, element):
        # Remove first occurrence of element
        if element in self.array:
            self.array.remove(element)
            self.size -= 1
        else:
            raise ValueError("Element not found")
    
    def get(self, index):
        # Get element at index
        if index < 0 or index >= self.size:
            raise IndexError("Index out of range")
        return self.array[index]
    
    def length(self):
        # Return size of array
        return self.size
    
    def __str__(self):
        # String representation
        return str(self.array)`
      },
      {
        title: "Array Types",\
        content: "There are different types of arrays:\n\n1. One-dimensional arrays: Linear arrays with elements accesse are different types of arrays:

1. One-dimensional arrays: Linear arrays with elements accessed using a single index
2. Multi-dimensional arrays: Arrays with elements accessed using multiple indices (e.g., 2D arrays, 3D arrays)
3. Jagged arrays: Arrays of arrays where each sub-array can have a different length

Arrays are fundamental building blocks for many other data structures and algorithms.
      },
      {
        title: "Advantages and Limitations",
        content: "Advantages of arrays:\n- Simple and easy to use\n- Fast access to elements by index (O(1))\n- Memory efficiency for primitive data types\n\nLimitations of arrays:\n- Fixed size in many languages (need to resize or use dynamic arrays)\n- Inefficient insertions and deletions (especially in the middle)\n- Homogeneous elements (all elements must be of the same type in many languages)"
      }
    ],
    quiz: [
      {
        question: "What is the time complexity of accessing an element in an array by its index?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 0,
        explanation: "Accessing an element in an array by its index is a constant time operation O(1) because the memory address can be calculated directly using the index."
      },
      {
        question: "What is the time complexity of inserting an element at the beginning of an array?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 2,
        explanation: "Inserting an element at the beginning of an array requires shifting all existing elements one position to the right, which takes O(n) time where n is the number of elements in the array."
      },
      {
        question: "Which of the following is NOT a characteristic of arrays?",
        options: [
          "Elements are stored in contiguous memory locations",
          "Elements can be of different data types in a single array",
          "Random access to elements",
          "Fixed size in many programming languages"
        ],
        correctAnswer: 1,
        explanation: "In most programming languages, arrays are homogeneous, meaning all elements must be of the same data type. Some languages like JavaScript and Python allow heterogeneous arrays, but this is not a general characteristic of arrays."
      }
    ]
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
    steps: [
      {
        title: "Understanding Linked Lists",
        content: "A linked list is a linear data structure where elements are stored in nodes. Each node contains data and a reference (or link) to the next node in the sequence. Unlike arrays, linked lists do not require contiguous memory allocation."
      },
      {
        title: "Types of Linked Lists",
        content: "There are three main types of linked lists:\n\n1. Singly Linked List: Each node points to the next node\n2. Doubly Linked List: Each node points to both the next and previous nodes\n3. Circular Linked List: The last node points back to the first node"
      },
      {
        title: "Basic Structure",
        content: "A linked list consists of nodes. Each node has:\n- Data: The value stored in the node\n- Next: A reference to the next node\n\nThe list is accessed through a 'head' pointer that points to the first node.",
        code: `class Node:
    def __init__(self, data):
        self.data = data  # The value
        self.next = None  # Reference to the next node

class LinkedList:
    def __init__(self):
        self.head = None  # Head pointer`
      },
      {
        title: "Basic Operations",
        content: "The basic operations on linked lists include:\n- Insertion: Adding a new node (at the beginning, end, or middle)\n- Deletion: Removing a node\n- Traversal: Visiting each node to access or modify data\n- Searching: Finding a node with a specific value",
        code: `# Append a node to the end
def append(self, data):
    new_node = Node(data)
    # If list is empty, make new node the head
    if not self.head:
        self.head = new_node
        return
    # Otherwise, traverse to the end
    current = self.head
    while current.next:
        current = current.next
    # Link the new node
    current.next = new_node

# Insert a node at the beginning
def prepend(self, data):
    new_node = Node(data)
    # Point new node to current head
    new_node.next = self.head
    # Update head to new node
    self.head = new_node

# Delete a node with specific data
def delete(self, data):
    # If list is empty
    if not self.head:
        return
    # If head node has the data
    if self.head.data == data:
        self.head = self.head.next
        return
    # Search for the node to delete
    current = self.head
    while current.next:
        if current.next.data == data:
            # Skip over the node to delete
            current.next = current.next.next
            return
        current = current.next`
      },
      {
        title: "Advantages and Limitations",
        content: "Advantages of linked lists:\n- Dynamic size (can grow or shrink at runtime)\n- Efficient insertions and deletions (especially at the beginning)\n- No need for contiguous memory allocation\n\nLimitations of linked lists:\n- Sequential access only (no random access)\n- Extra memory for storing references\n- Not cache-friendly due to non-contiguous memory"
      }
    ],
    quiz: [
      {
        question: "What is the time complexity of inserting a node at the beginning of a singly linked list?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 0,
        explanation: "Inserting a node at the beginning of a singly linked list is a constant time operation O(1) because we only need to update the head pointer and the next pointer of the new node."
      },
      {
        question: "What is the time complexity of accessing the nth element in a linked list?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 2,
        explanation: "Accessing the nth element in a linked list requires traversing the list from the head, which takes O(n) time in the worst case."
      },
      {
        question: "Which of the following is an advantage of linked lists over arrays?",
        options: [
          "Faster random access to elements",
          "More memory efficient",
          "Dynamic size (easy insertion and deletion)",
          "Better cache locality"
        ],
        correctAnswer: 2,
        explanation: "A key advantage of linked lists over arrays is their dynamic size, which allows for efficient insertions and deletions without having to resize the entire structure."
      }
    ]
  },
  {
    name: "Stack",
    description: "A linear data structure that follows the Last In, First Out (LIFO) principle",
    longDescription: `
      A stack is a linear data structure that follows the Last In, First Out (LIFO) principle. This means that the last element added to the stack is the first one to be removed. Think of a stack of plates: you can only take the top plate, and you can only add a new plate to the top.

      Key characteristics of stacks:
      1. LIFO (Last In, First Out) behavior
      2. Elements can only be added or removed from one end (the "top")
      3. Basic operations: push (add), pop (remove), peek (view top without removing)
      4. Can be implemented using arrays or linked lists

      Stacks are particularly useful for:
      - Function call management (call stack)
      - Expression evaluation and syntax parsing
      - Backtracking algorithms
      - Undo mechanisms in applications
    `,
    visualization: "stack",
    code: `
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)
    `,
    timeComplexity: [
      { operation: "Push", complexity: "O(1)" },
      { operation: "Pop", complexity: "O(1)" },
      { operation: "Peek", complexity: "O(1)" },
      { operation: "Search", complexity: "O(n)" },
    ],
    spaceComplexity: "O(n)",
    steps: [
      {
        title: "Understanding Stacks",
        content: "A stack is a linear data structure that follows the Last In, First Out (LIFO) principle. This means the last element added to the stack is the first one to be removed. Think of a stack of plates: you can only take the top plate, and you can only add a new plate to the top."
      },
      {
        title: "Basic Operations",
        content: "The basic operations on a stack are:\n\n1. Push: Add an element to the top of the stack\n2. Pop: Remove the top element from the stack\n3. Peek/Top: View the top element without removing it\n4. isEmpty: Check if the stack is empty"
      },
      {
        title: "Implementation Using Arrays",
        content: "Stacks can be implemented using arrays. Here's a simple implementation in Python:",
        code: `class Stack:
    def __init__(self):
        self.items = []  # Initialize empty list
    
    def push(self, item):
        # Add item to the top of the stack
        self.items.append(item)
    
    def pop(self):
        # Remove and return the top item
        if not self.is_empty():
            return self.items.pop()
        return None  # Stack underflow
    
    def peek(self):
        # Return the top item without removing it
        if not self.is_empty():
            return self.items[-1]
        return None
    
    def is_empty(self):
        # Check if stack is empty
        return len(self.items) == 0
    
    def size(self):
        # Return the number of items in the stack
        return len(self.items)`
      },
      {
        title: "Implementation Using Linked Lists",
        content: "Stacks can also be implemented using linked lists. Here's a simple implementation in Python:",
        code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Stack:
    def __init__(self):
        self.top = None  # Initialize empty stack
    
    def push(self, item):
        # Create a new node
        new_node = Node(item)
        # Link new node to current top
        new_node.next = self.top
        # Update top to new node
        self.top = new_node
    
    def pop(self):
        # Check if stack is empty
        if self.is_empty():
            return None  # Stack underflow
        # Get data from top node
        data = self.top.data
        # Update top to next node
        self.top = self.top.next
        return data
    
    def peek(self):
        # Check if stack is empty
        if self.is_empty():
            return None
        # Return data from top node
        return self.top.data
    
    def is_empty(self):
        # Check if top is None
        return self.top is None`
      },
      {
        title: "Applications of Stacks",
        content: "Stacks are used in many applications:\n\n1. Function Call Management: The call stack keeps track of function calls and their local variables\n2. Expression Evaluation: Used to evaluate arithmetic expressions (e.g., infix to postfix conversion)\n3. Syntax Parsing: Used in compilers and calculators\n4. Backtracking Algorithms: Used in maze solving, puzzle solving\n5. Undo Mechanisms: Used in text editors and other applications\n6. Browser History: The back button uses a stack to keep track of previously visited pages"
      }
    ],
    quiz: [
      {
        question: "Which principle does a stack follow?",
        options: ["FIFO (First In, First Out)", "LIFO (Last In, First Out)", "FILO (First In, Last Out)", "Random Access"],
        correctAnswer: 1,
        explanation: "A stack follows the LIFO (Last In, First Out) principle, which means the last element added to the stack is the first one to be removed."
      },
      {
        question: "What is the time complexity of the push operation in a stack?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 0,
        explanation: "The push operation in a stack has a time complexity of O(1) because it simply adds an element to the top of the stack, which is a constant time operation."
      },
      {
        question: "Which of the following is NOT a basic operation of a stack?",
        options: ["Push", "Pop", "Peek", "Insert at middle"],
        correctAnswer: 3,
        explanation: "Inserting an element at the middle is not a basic operation of a stack. The basic operations are push (add to top), pop (remove from top), and peek (view top without removing)."
      }
    ]
  },
  {
    name: "Queue",
    description: "A linear data structure that follows the First In, First Out (FIFO) principle",
    longDescription: `
      A queue is a linear data structure that follows the First In, First Out (FIFO) principle. This means that the first element added to the queue is the first one to be removed. Think of a queue of people waiting in line: the first person to join the line is the first one to be served.

      Key characteristics of queues:
      1. FIFO (First In, First Out) behavior
      2. Elements are added at one end (the "rear") and removed from the other end (the "front")
      3. Basic operations: enqueue (add), dequeue (remove), peek (view front without removing)
      4. Can be implemented using arrays or linked lists

      Types of queues:
      1. Simple Queue: Standard FIFO queue
      2. Circular Queue: The last position is connected to the first position
      3. Priority Queue: Elements are served based on priority, not arrival time
      4. Double-ended Queue (Deque): Elements can be added or removed from both ends

      Queues are particularly useful for:
      - Task scheduling in operating systems
      - Handling requests in web servers
      - Breadth-first search in graphs
      - Print job scheduling
    `,
    visualization: "queue",
    code: `
class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if not self.is_empty():
            return self.items.pop(0)
        return None

    def peek(self):
        if not self.is_empty():
            return self.items[0]
        return None

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)
    `,
    timeComplexity: [
      { operation: "Enqueue", complexity: "O(1)" },
      { operation: "Dequeue", complexity: "O(n) for array, O(1) for linked list" },
      { operation: "Peek", complexity: "O(1)" },
      { operation: "Search", complexity: "O(n)" },
    ],
    spaceComplexity: "O(n)",
    steps: [
      {
        title: "Understanding Queues",
        content: "A queue is a linear data structure that follows the First In, First Out (FIFO) principle. This means the first element added to the queue is the first one to be removed. Think of a queue of people waiting in line: the first person to join the line is the first one to be served."
      },
      {
        title: "Basic Operations",
        content: "The basic operations on a queue are:\n\n1. Enqueue: Add an element to the rear of the queue\n2. Dequeue: Remove the front element from the queue\n3. Peek/Front: View the front element without removing it\n4. isEmpty: Check if the queue is empty"
      },
      {
        title: "Implementation Using Arrays",
        content: "Queues can be implemented using arrays. Here's a simple implementation in Python:",
        code: `class Queue:
    def __init__(self):
        self.items = []  # Initialize empty list
    
    def enqueue(self, item):
        # Add item to the rear of the queue
        self.items.append(item)
    
    def dequeue(self):
        # Remove and return the front item
        if not self.is_empty():
            return self.items.pop(0)  # O(n) operation
        return None  # Queue underflow
    
    def peek(self):
        # Return the front item without removing it
        if not self.is_empty():
            return self.items[0]
        return None
    
    def is_empty(self):
        # Check if queue is empty
        return len(self.items) == 0
    
    def size(self):
        # Return the number of items in the queue
        return len(self.items)`
      },
      {
        title: "Implementation Using Linked Lists",
        content: "Queues can also be implemented using linked lists. Here's a simple implementation in Python:",
        code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Queue:
    def __init__(self):
        self.front = None  # For dequeue
        self.rear = None   # For enqueue
    
    def enqueue(self, item):
        # Create a new node
        new_node = Node(item)
        
        # If queue is empty
        if self.is_empty():
            self.front = new_node
            self.rear = new_node
            return
        
        # Add new node at the rear
        self.rear.next = new_node
        self.rear = new_node
    
    def dequeue(self):
        # Check if queue is empty
        if self.is_empty():
            return None  # Queue underflow
        
        # Get data from front node
        data = self.front.data
        
        # Update front to next node
        self.front = self.front.next
        
        # If front becomes None, update rear as well
        if self.front is None:
            self.rear = None
            
        return data
    
    def peek(self):
        # Check if queue is empty
        if self.is_empty():
            return None
        
        # Return data from front node
        return self.front.data
    
    def is_empty(self):
        # Check if front is None
        return self.front is None`
      },
      {
        title: "Types of Queues",
        content: "There are several types of queues:\n\n1. Simple Queue: Standard FIFO queue\n2. Circular Queue: The last position is connected to the first position, efficient for fixed-size queues\n3. Priority Queue: Elements are served based on priority, not arrival time\n4. Double-ended Queue (Deque): Elements can be added or removed from both ends"
      },
      {
        title: "Applications of Queues",
        content: "Queues are used in many applications:\n\n1. CPU Scheduling: Managing processes waiting to be executed\n2. Disk Scheduling: Managing I/O requests\n3. Print Job Scheduling: Managing print jobs in a printer queue\n4. Breadth-First Search: Used in graph algorithms\n5. Web Servers: Handling requests from clients\n6. Buffering: Managing data buffers in various applications"
      }
    ],
    quiz: [
      {
        question: "Which principle does a queue follow?",
        options: ["FIFO (First In, First Out)", "LIFO (Last In, First Out)", "FILO (First In, Last Out)", "Random Access"],
        correctAnswer: 0,
        explanation: "A queue follows the FIFO (First In, First Out) principle, which means the first element added to the queue is the first one to be removed."
      },
      {
        question: "What is the time complexity of the dequeue operation in a queue implemented using an array?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 2,
        explanation: "The dequeue operation in a queue implemented using an array has a time complexity of O(n) because removing the front element requires shifting all other elements one position to the left."
      },
      {
        question: "Which of the following is NOT a type of queue?",
        options: ["Circular Queue", "Priority Queue", "Double-ended Queue (Deque)", "Sorted Queue"],
        correctAnswer: 3,
        explanation: "Sorted Queue is not a standard type of queue. The standard types include Simple Queue, Circular Queue, Priority Queue, and Double-ended Queue (Deque)."
      }
    ]
  },
  {
    name: "Hash Table",
    description: "A data structure that implements an associative array abstract data type, a structure that can map keys to values",
    longDescription: `
      A hash table (hash map) is a data structure that implements an associative array abstract data type, a structure that can map keys to values. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.

      Key characteristics of hash tables:
      1. Fast access, insertion, and deletion operations (average case O(1))
      2. Uses a hash function to map keys to array indices
      3. Handles collisions (when different keys hash to the same index)
      4. Dynamic size in most implementations

      Common collision resolution techniques:
      1. Chaining: Each bucket contains a linked list of all key-value pairs that hash to the same index
      2. Open Addressing: When a collision occurs, the algorithm searches for the next available slot
         - Linear Probing: Check the next slot sequentially
         - Quadratic Probing: Check slots at quadratic distances
         - Double Hashing: Use a second hash function to determine the step size

      Hash tables are particularly useful for:
      - Database indexing
      - Caches
      - Symbol tables in compilers
      - Associative arrays
      - Sets
    `,
    visualization: "hash-table",
    code: `
class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [None] * size

    def _hash(self, key):
        if isinstance(key, str):
            return sum(ord(c) for c in key) % self.size
        return key % self.size

    def insert(self, key, value):
        index = self._hash(key)
        if self.table[index] is None:
            self.table[index] = []
        
        # Check if key already exists
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index][i] = (key, value)
                return
        
        # Add new key-value pair
        self.table[index].append((key, value))

    def get(self, key):
        index = self._hash(key)
        if self.table[index] is None:
            return None
        
        for k, v in self.table[index]:
            if k == key:
                return v
        
        return None

    def remove(self, key):
        index = self._hash(key)
        if self.table[index] is None:
            return False
        
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                del self.table[index][i]
                return True
        
        return False
    `,
    timeComplexity: [
      { operation: "Insert", complexity: "O(1) average, O(n) worst" },
      { operation: "Search", complexity: "O(1) average, O(n) worst" },
      { operation: "Delete", complexity: "O(1) average, O(n) worst" },
    ],
    spaceComplexity: "O(n)",
    steps: [
      {
        title: "Understanding Hash Tables",
        content: "A hash table (hash map) is a data structure that implements an associative array abstract data type, a structure that can map keys to values. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found."
      },
      {
        title: "Hash Functions",
        content: "A hash function converts keys into array indices. A good hash function should:\n\n1. Be deterministic (same key always produces same hash)\n2. Distribute keys uniformly across the array\n3. Be efficient to compute\n4. Minimize collisions"
      },
      {
        title: "Handling Collisions",
        content: "Collisions occur when different keys hash to the same index. There are two main approaches to handle collisions:\n\n1. Chaining: Each bucket contains a linked list of all key-value pairs that hash to the same index\n2. Open Addressing: When a collision occurs, the algorithm searches for the next available slot\n   - Linear Probing: Check the next slot sequentially\n   - Quadratic Probing: Check slots at quadratic distances\n   - Double Hashing: Use a second hash function to determine the step size"
      },
      {
        title: "Implementation with Chaining",
        content: "Here's a simple implementation of a hash table using chaining for collision resolution:",
        code: `class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [None] * size  # Initialize array of None
    
    def _hash(self, key):
        # Simple hash function
        if isinstance(key, str):
            return sum(ord(c) for c in key) % self.size
        return key % self.size
    
    def insert(self, key, value):
        # Get the index from the hash function
        index = self._hash(key)
        
        # If bucket is empty, initialize it
        if self.table[index] is None:
            self.table[index] = []
        
        # Check if key already exists
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                # Update value if key exists
                self.table[index][i] = (key, value)
                return
        
        # Add new key-value pair
        self.table[index].append((key, value))
    
    def get(self, key):
        # Get the index from the hash function
        index = self._hash(key)
        
        # If bucket is empty
        if self.table[index] is None:
            return None
        
        # Search for the key in the bucket
        for k, v in self.table[index]:
            if k == key:
                return v
        
        # Key not found
        return None
    
    def remove(self, key):
        # Get the index from the hash function
        index = self._hash(key)
        
        # If bucket is empty
        if self.table[index] is None:
            return False
        
        # Search for the key in the bucket
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                # Remove the key-value pair
                del self.table[index][i]
                return True
        
        # Key not found
        return False`
      },
      {
        title: "Load Factor and Resizing",
        content: "The load factor of a hash table is the ratio of the number of stored elements to the number of buckets. As the load factor increases, the probability of collisions also increases.\n\nWhen the load factor exceeds a certain threshold (typically 0.7), the hash table is resized (usually doubled in size) and all elements are rehashed to maintain performance."
      },
      {
        title: "Applications of Hash Tables",
        content: "Hash tables are used in many applications:\n\n1. Database Indexing: For fast data retrieval\n2. Caches: To store frequently accessed data\n3. Symbol Tables: In compilers and interpreters\n4. Associative Arrays: In programming languages\n5. Sets: To store unique elements\n6. Counting Frequencies: In various algorithms"
      }
    ],
    quiz: [
      {
        question: "What is the average time complexity of insertion, deletion, and search operations in a hash table?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 0,
        explanation: "The average time complexity of insertion, deletion, and search operations in a hash table is O(1), which makes hash tables very efficient for these operations."
      },
      {
        question: "What happens when two different keys hash to the same index in a hash table?",
        options: ["The second key overwrites the first", "A collision occurs and must be resolved", "The hash table automatically resizes", "The second key is rejected"],
        correctAnswer: 1,
        explanation: "When two different keys hash to the same index, a collision occurs. Hash tables use collision resolution techniques like chaining or open addressing to handle these situations."
      },
      {
        question: "What is the load factor of a hash table?",
        options: [
          "The ratio of the number of stored elements to the number of buckets",
          "The number of collisions per insertion",
          "The average time complexity of operations",
          "The size of the largest bucket"
        ],
        correctAnswer: 0,
        explanation: "The load factor of a hash table is the ratio of the number of stored elements to the number of buckets. It's an important metric

