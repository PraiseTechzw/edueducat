"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AlgorithmList from "@/components/algorithms/algorithm-list"
import AlgorithmBasics from "@/components/algorithms/algorithm-basics"
import ComplexityAnalysis from "@/components/algorithms/complexity-analysis"
import AsymptoticAnalysis from "@/components/algorithms/asymptotic-analysis"
import PracticeExercises from "@/components/data-structures/practice-exercises"

const algorithms = [
  {
    name: "Bubble Sort",
    description:
      "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order",
    longDescription: `
      Bubble Sort is one of the simplest sorting algorithms. It works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.

      Key characteristics of Bubble Sort:
      1. Simple implementation
      2. O(n^2) time complexity
      3. Stable sort (does not change the relative order of equal elements)
      4. In-place algorithm (requires only a constant amount O(1) of additional memory space)

      Bubble Sort is particularly useful:
      - For educational purposes to introduce the concept of sorting algorithms
      - When simplicity is more important than efficiency
      - For small lists where the inefficiency is less noticeable

      However, it is not suitable for large datasets due to its quadratic time complexity.
    `,
    visualization: "bubble-sort",
    code: `
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
    `,
    timeComplexity: [
      { operation: "Best Case", complexity: "O(n)" },
      { operation: "Average Case", complexity: "O(n^2)" },
      { operation: "Worst Case", complexity: "O(n^2)" },
    ],
    spaceComplexity: "O(1)",
    steps: [
      {
        title: "Understanding the Problem",
        content:
          "Bubble Sort is a comparison-based algorithm that repeatedly compares adjacent elements and swaps them if they are in the wrong order. The algorithm gets its name because smaller elements 'bubble' to the top of the list with each iteration.",
      },
      {
        title: "Algorithm Steps",
        content:
          "1. Start at the beginning of the array\n2. Compare adjacent elements, if they are in the wrong order, swap them\n3. Move to the next pair of adjacent elements and repeat step 2\n4. After one complete pass, the largest element will be at the end\n5. Repeat the process for the remaining elements (excluding the already sorted ones)",
      },
      {
        title: "Implementation",
        content: "Let's implement Bubble Sort in Python:",
        code: `def bubble_sort(arr):
    n = len(arr)
    # Traverse through all array elements
    for i in range(n):
        # Last i elements are already in place
        for j in range(0, n - i - 1):
            # Traverse the array from 0 to n-i-1
            # Swap if the element found is greater than the next element
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = bubble_sort(arr)
print("Sorted array:", sorted_arr)`,
      },
      {
        title: "Optimization",
        content:
          "We can optimize Bubble Sort by stopping the algorithm if the inner loop didn't cause any swap, which means the array is already sorted:",
        code: `def optimized_bubble_sort(arr):
    n = len(arr)
    # Traverse through all array elements
    for i in range(n):
        swapped = False
        # Last i elements are already in place
        for j in range(0, n - i - 1):
            # Traverse the array from 0 to n-i-1
            # Swap if the element found is greater than the next element
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # If no swapping occurred in this pass, array is sorted
        if not swapped:
            break
    return arr`,
      },
      {
        title: "Time and Space Complexity",
        content:
          "Time Complexity:\n- Best Case: O(n) when the array is already sorted\n- Average Case: O(n²)\n- Worst Case: O(n²) when the array is sorted in reverse order\n\nSpace Complexity: O(1) as only a constant amount of extra space is used",
      },
    ],
    quiz: [
      {
        question: "What is the time complexity of Bubble Sort in the worst case?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
        correctAnswer: 2,
        explanation:
          "Bubble Sort has a worst-case time complexity of O(n²) because it uses nested loops to compare and swap adjacent elements.",
      },
      {
        question: "When is Bubble Sort most efficient?",
        options: [
          "When sorting large datasets",
          "When the array is already sorted or nearly sorted",
          "When memory usage is a critical concern",
          "When the array is in reverse order",
        ],
        correctAnswer: 1,
        explanation:
          "Bubble Sort is most efficient when the array is already sorted or nearly sorted, as it can terminate early if no swaps are needed in a pass.",
      },
      {
        question: "Which of the following is NOT a characteristic of Bubble Sort?",
        options: [
          "It's an in-place sorting algorithm",
          "It's a stable sorting algorithm",
          "It has O(n log n) time complexity",
          "It compares adjacent elements",
        ],
        correctAnswer: 2,
        explanation:
          "Bubble Sort does not have O(n log n) time complexity. Its time complexity is O(n²) in the worst and average cases.",
      },
    ],
  },
  {
    name: "Binary Search",
    description: "A search algorithm that finds the position of a target value within a sorted array",
    longDescription: `
      Binary Search is an efficient algorithm for searching a sorted array by repeatedly dividing the search interval in half. It works by comparing the target value to the middle element of the array. If they are unequal, the half in which the target cannot lie is eliminated, and the search continues on the remaining half until the target is found or it is clear the target is not in the array.

      Key characteristics of Binary Search:
      1. Requires a sorted array
      2. O(log n) time complexity
      3. Significantly faster than linear search for large datasets
      4. Uses the divide-and-conquer approach

      Binary Search is particularly useful:
      - When searching in large, sorted datasets
      - When the dataset is too large to iterate through linearly
      - In situations where the dataset is searched repeatedly, justifying the cost of sorting

      The efficiency of Binary Search makes it a fundamental algorithm in computer science, often used as a building block for more complex algorithms.
    `,
    visualization: "binary-search",
    code: `
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1  # Target not found
    `,
    timeComplexity: [
      { operation: "Best Case", complexity: "O(1)" },
      { operation: "Average Case", complexity: "O(log n)" },
      { operation: "Worst Case", complexity: "O(log n)" },
    ],
    spaceComplexity: "O(1)",
    steps: [
      {
        title: "Understanding the Problem",
        content:
          "Binary Search is an efficient algorithm for finding a target value within a sorted array. It works by repeatedly dividing the search interval in half.",
      },
      {
        title: "Prerequisites",
        content:
          "The array must be sorted before applying Binary Search. This is a crucial requirement for the algorithm to work correctly.",
      },
      {
        title: "Algorithm Steps",
        content:
          "1. Find the middle element of the array\n2. If the target value equals the middle element, return the middle index\n3. If the target value is less than the middle element, search the left half\n4. If the target value is greater than the middle element, search the right half\n5. Repeat steps 1-4 until the target is found or the search space is empty",
      },
      {
        title: "Implementation",
        content: "Let's implement Binary Search in Python:",
        code: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        # Find the middle element
        mid = (low + high) // 2
        
        # Check if target is present at mid
        if arr[mid] == target:
            return mid
        
        # If target is greater, ignore left half
        elif arr[mid] < target:
            low = mid + 1
        
        # If target is smaller, ignore right half
        else:
            high = mid - 1
    
    # Target is not present in the array
    return -1

# Example usage
arr = [2, 3, 4, 10, 40]
target = 10
result = binary_search(arr, target)
if result != -1:
    print(f"Element found at index {result}")
else:
    print("Element not found in the array")`,
      },
      {
        title: "Recursive Implementation",
        content: "Binary Search can also be implemented recursively:",
        code: `def binary_search_recursive(arr, target, low, high):
    # Check base case
    if high >= low:
        mid = (high + low) // 2
        
        # If element is present at the middle
        if arr[mid] == target:
            return mid
        
        # If element is smaller than mid, search in left subarray
        elif arr[mid] > target:
            return binary_search_recursive(arr, target, low, mid - 1)
        
        # Else search in right subarray
        else:
            return binary_search_recursive(arr, target, mid + 1, high)
    else:
        # Element is not present in the array
        return -1

# Example usage
arr = [2, 3, 4, 10, 40]
target = 10
result = binary_search_recursive(arr, target, 0, len(arr) - 1)
if result != -1:
    print(f"Element found at index {result}")
else:
    print("Element not found in the array")`,
      },
      {
        title: "Time and Space Complexity",
        content:
          "Time Complexity:\n- Best Case: O(1) when the target is the middle element\n- Average Case: O(log n)\n- Worst Case: O(log n) when the target is not in the array or at the extremes\n\nSpace Complexity:\n- Iterative: O(1) as only a constant amount of extra space is used\n- Recursive: O(log n) due to the call stack",
      },
    ],
    quiz: [
      {
        question: "What is the prerequisite for using Binary Search?",
        options: [
          "The array must be large enough",
          "The array must be sorted",
          "The array must contain unique elements",
          "The array must have an odd number of elements",
        ],
        correctAnswer: 1,
        explanation:
          "Binary Search requires the array to be sorted in order to work correctly. This is because the algorithm eliminates half of the remaining elements based on a comparison with the middle element.",
      },
      {
        question: "What is the time complexity of Binary Search?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        correctAnswer: 2,
        explanation:
          "Binary Search has a time complexity of O(log n) because it divides the search space in half with each comparison.",
      },
      {
        question: "Which of the following is NOT an advantage of Binary Search over Linear Search?",
        options: [
          "Binary Search is faster for large datasets",
          "Binary Search works on unsorted arrays",
          "Binary Search has logarithmic time complexity",
          "Binary Search requires fewer comparisons",
        ],
        correctAnswer: 1,
        explanation:
          "Binary Search does NOT work on unsorted arrays. It requires the array to be sorted before it can be applied.",
      },
    ],
  },
  {
    name: "Merge Sort",
    description:
      "A divide and conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves",
    longDescription: `
      Merge Sort is an efficient, stable sorting algorithm that uses the divide and conquer strategy. It divides the input array into two halves, recursively sorts them, and then merges the sorted halves to produce a sorted output.

      Key characteristics of Merge Sort:
      1. Stable sort (preserves the relative order of equal elements)
      2. O(n log n) time complexity in all cases
      3. Not an in-place algorithm (requires additional memory)
      4. Well-suited for sorting linked lists

      Merge Sort is particularly useful:
      - When stability is needed
      - When guaranteed O(n log n) performance is required
      - For external sorting (when data doesn't fit in memory)
      - For sorting linked lists

      The main drawback of Merge Sort is its O(n) space complexity, which makes it less suitable for situations with memory constraints.
    `,
    visualization: "merge-sort",
    code: `
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]

        merge_sort(L)
        merge_sort(R)

        i = j = k = 0

        while i < len(L) and j < len(R):
            if L[i] <= R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1

        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1

        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1

    return arr
    `,
    timeComplexity: [
      { operation: "Best Case", complexity: "O(n log n)" },
      { operation: "Average Case", complexity: "O(n log n)" },
      { operation: "Worst Case", complexity: "O(n log n)" },
    ],
    spaceComplexity: "O(n)",
    steps: [
      {
        title: "Understanding the Problem",
        content:
          "Merge Sort is a divide and conquer algorithm that splits the array into smaller subarrays, sorts them, and then merges them back together.",
      },
      {
        title: "Algorithm Steps",
        content:
          "1. Divide the unsorted array into n subarrays, each containing one element (a single element is considered sorted)\n2. Repeatedly merge subarrays to produce new sorted subarrays until there is only one subarray remaining",
      },
      {
        title: "The Merge Process",
        content:
          "The key operation in Merge Sort is the merging of two sorted arrays:\n1. Create empty temporary arrays L and R\n2. Copy data to temporary arrays L and R\n3. Merge the temporary arrays back into the original array by comparing elements and placing the smaller element first",
      },
      {
        title: "Implementation",
        content: "Let's implement Merge Sort in Python:",
        code: `def merge_sort(arr):
    if len(arr) > 1:
        # Finding the mid of the array
        mid = len(arr) // 2
        
        # Dividing the array elements into 2 halves
        L = arr[:mid]
        R = arr[mid:]
        
        # Sorting the first half
        merge_sort(L)
        
        # Sorting the second half
        merge_sort(R)
        
        i = j = k = 0
        
        # Copy data to temp arrays L[] and R[]
        while i < len(L) and j < len(R):
            if L[i] <= R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        
        # Checking if any element was left
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
    
    return arr

# Example usage
arr = [12, 11, 13, 5, 6, 7]
sorted_arr = merge_sort(arr)
print("Sorted array:", sorted_arr)`,
      },
      {
        title: "Time and Space Complexity",
        content:
          "Time Complexity:\n- Best Case: O(n log n)\n- Average Case: O(n log n)\n- Worst Case: O(n log n)\n\nSpace Complexity: O(n) because it requires additional space for the temporary arrays during the merge process",
      },
      {
        title: "Advantages and Disadvantages",
        content:
          "Advantages:\n- Stable sorting algorithm\n- Guaranteed O(n log n) performance\n- Well-suited for external sorting\n\nDisadvantages:\n- Requires additional O(n) space\n- Not as efficient as in-place algorithms for small arrays",
      },
    ],
    quiz: [
      {
        question: "What is the time complexity of Merge Sort in the worst case?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correctAnswer: 1,
        explanation:
          "Merge Sort has a worst-case time complexity of O(n log n). This is because the array is divided in half log n times (the divide step), and each division requires O(n) time to merge the halves.",
      },
      {
        question: "Which of the following is a disadvantage of Merge Sort?",
        options: [
          "It has O(n²) worst-case time complexity",
          "It requires O(n) additional space",
          "It is not a stable sorting algorithm",
          "It cannot sort linked lists efficiently",
        ],
        correctAnswer: 1,
        explanation:
          "A disadvantage of Merge Sort is that it requires O(n) additional space for the temporary arrays during the merge process, making it not an in-place sorting algorithm.",
      },
      {
        question: "Which of the following statements about Merge Sort is TRUE?",
        options: [
          "Merge Sort is an in-place sorting algorithm",
          "Merge Sort has different time complexities for best and worst cases",
          "Merge Sort is a stable sorting algorithm",
          "Merge Sort is less efficient than Bubble Sort for large arrays",
        ],
        correctAnswer: 2,
        explanation:
          "Merge Sort is a stable sorting algorithm, which means it preserves the relative order of equal elements in the sorted output.",
      },
    ],
  },
  {
    name: "Quick Sort",
    description:
      "A divide and conquer algorithm that picks an element as a pivot and partitions the array around the pivot",
    longDescription: `
      Quick Sort is an efficient, in-place sorting algorithm that uses the divide and conquer strategy. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot.

      Key characteristics of Quick Sort:
      1. Not stable (does not preserve the relative order of equal elements)
      2. O(n log n) average time complexity
      3. O(n²) worst-case time complexity
      4. In-place algorithm (requires only a small, constant amount of additional memory space)

      Quick Sort is particularly useful:
      - When average-case performance matters more than worst-case
      - When memory usage is a concern
      - In practice, it's often faster than other O(n log n) algorithms due to good cache locality

      The main drawback is its worst-case time complexity of O(n²), which occurs when the pivot selection consistently results in highly unbalanced partitions.
    `,
    visualization: "quick-sort",
    code: `
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)
    `,
    timeComplexity: [
      { operation: "Best Case", complexity: "O(n log n)" },
      { operation: "Average Case", complexity: "O(n log n)" },
      { operation: "Worst Case", complexity: "O(n²)" },
    ],
    spaceComplexity: "O(log n)",
    steps: [
      {
        title: "Understanding the Problem",
        content:
          "Quick Sort is a divide and conquer algorithm that selects a pivot element and partitions the array around the pivot.",
      },
      {
        title: "Algorithm Steps",
        content:
          "1. Choose a pivot element from the array\n2. Partition the array around the pivot (elements less than pivot go to the left, elements greater than pivot go to the right)\n3. Recursively apply the above steps to the sub-arrays",
      },
      {
        title: "Pivot Selection",
        content:
          "The choice of pivot can significantly affect the performance of Quick Sort. Common strategies include:\n- Selecting the first element\n- Selecting the last element\n- Selecting the middle element\n- Selecting a random element\n- Using the median-of-three method (median of first, middle, and last elements)",
      },
      {
        title: "Implementation",
        content: "Let's implement Quick Sort in Python using the Lomuto partition scheme:",
        code: `def partition(arr, low, high):
    # Choose the rightmost element as pivot
    pivot = arr[high]
    
    # Pointer for greater element
    i = low - 1
    
    # Traverse through all elements
    # compare each element with pivot
    for j in range(low, high):
        if arr[j] <= pivot:
            # If element smaller than pivot is found
            # swap it with the greater element pointed by i
            i += 1
            # Swapping element at i with element at j
            arr[i], arr[j] = arr[j], arr[i]
    
    # Swap the pivot element with the greater element specified by i
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    
    # Return the position from where partition is done
    return i + 1

def quick_sort(arr, low, high):
    if low < high:
        # Find pivot element such that
        # element smaller than pivot are on the left
        # element greater than pivot are on the right
        pi = partition(arr, low, high)
        
        # Recursive call on the left of pivot
        quick_sort(arr, low, pi - 1)
        
        # Recursive call on the right of pivot
        quick_sort(arr, pi + 1, high)
    
    return arr

# Example usage
arr = [10, 7, 8, 9, 1, 5]
n = len(arr)
sorted_arr = quick_sort(arr, 0, n - 1)
print("Sorted array:", sorted_arr)`,
      },
      {
        title: "Alternative Implementation",
        content: "Here's a more concise implementation using list comprehensions:",
        code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

# Example usage
arr = [10, 7, 8, 9, 1, 5]
sorted_arr = quick_sort(arr)
print("Sorted array:", sorted_arr)`,
      },
      {
        title: "Time and Space Complexity",
        content:
          "Time Complexity:\n- Best Case: O(n log n) when the partitioning is balanced\n- Average Case: O(n log n)\n- Worst Case: O(n²) when the partitioning is unbalanced (e.g., already sorted array with first/last element as pivot)\n\nSpace Complexity: O(log n) for the recursive call stack in the average case, O(n) in the worst case",
      },
    ],
    quiz: [
      {
        question: "What is the worst-case time complexity of Quick Sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
        correctAnswer: 2,
        explanation:
          "Quick Sort has a worst-case time complexity of O(n²), which occurs when the pivot selection consistently results in highly unbalanced partitions, such as when the array is already sorted and the first or last element is chosen as the pivot.",
      },
      {
        question: "Which of the following is TRUE about Quick Sort?",
        options: [
          "Quick Sort is always faster than Merge Sort",
          "Quick Sort is a stable sorting algorithm",
          "Quick Sort is an in-place sorting algorithm",
          "Quick Sort has O(n) space complexity in all cases",
        ],
        correctAnswer: 2,
        explanation:
          "Quick Sort is an in-place sorting algorithm, meaning it requires only a small, constant amount of additional memory space beyond the input array.",
      },
      {
        question: "What is the key operation in Quick Sort?",
        options: [
          "Merging two sorted arrays",
          "Partitioning the array around a pivot",
          "Finding the middle element",
          "Swapping adjacent elements",
        ],
        correctAnswer: 1,
        explanation:
          "The key operation in Quick Sort is partitioning the array around a pivot, where elements less than the pivot go to the left and elements greater than the pivot go to the right.",
      },
    ],
  },
  {
    name: "Depth-First Search",
    description: "A graph traversal algorithm that explores as far as possible along each branch before backtracking",
    longDescription: `
      Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack data structure (or recursion) to keep track of vertices to visit next.

      Key characteristics of DFS:
      1. Uses a stack or recursion for implementation
      2. O(V + E) time complexity, where V is the number of vertices and E is the number of edges
      3. Explores one branch completely before exploring others
      4. Can be used to detect cycles in a graph

      DFS is particularly useful for:
      - Topological sorting
      - Finding connected components
      - Solving puzzles with only one solution (e.g., mazes)
      - Detecting cycles in a graph

      DFS may not find the shortest path in an unweighted graph, for which Breadth-First Search would be more appropriate.
    `,
    visualization: "dfs",
    code: `
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    print(start, end=' ')
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    
    return visited
    `,
    timeComplexity: [{ operation: "Time Complexity", complexity: "O(V + E)" }],
    spaceComplexity: "O(V)",
    steps: [
      {
        title: "Understanding the Problem",
        content:
          "Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking.",
      },
      {
        title: "Algorithm Steps",
        content:
          "1. Start at a selected node (or any node for a complete traversal)\n2. Mark the current node as visited\n3. Recursively visit all unvisited neighbors of the current node\n4. Backtrack when all neighbors have been visited",
      },
      {
        title: "Implementation (Recursive)",
        content: "Let's implement DFS recursively in Python:",
        code: `def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()
    
    # Mark the current node as visited
    visited.add(node)
    print(node, end=' ')
    
    # Recur for all adjacent vertices
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
    
    return visited

# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

print("DFS traversal starting from vertex 'A':")
dfs_recursive(graph, 'A')`,
      },
      {
        title: "Implementation (Iterative)",
        content: "DFS can also be implemented iteratively using a stack:",
        code: `def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    
    while stack:
        # Pop a vertex from the stack
        vertex = stack.pop()
        
        if vertex not in visited:
            # Mark the vertex as visited
            visited.add(vertex)
            print(vertex, end=' ')
            
            # Add all unvisited neighbors to the stack
            # We add in reverse order to get the same traversal as recursive version
            for neighbor in reversed(graph[vertex]):
                if neighbor not in visited:
                    stack.append(neighbor)
    
    return visited

# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

print("DFS traversal starting from vertex 'A':")
dfs_iterative(graph, 'A')`,
      },
      {
        title: "Applications of DFS",
        content:
          "DFS has many applications in graph theory and algorithms:\n- Topological Sorting: Ordering vertices such that for every directed edge (u, v), vertex u comes before v\n- Finding Connected Components: Identifying subgraphs where any two vertices are connected by a path\n- Detecting Cycles: Determining if a graph contains a cycle\n- Solving Puzzles: Finding solutions to mazes or puzzles with only one solution\n- Generating Spanning Trees: Creating a tree that includes all vertices of a graph",
      },
      {
        title: "Time and Space Complexity",
        content:
          "Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges in the graph\n\nSpace Complexity: O(V) for the visited set and the recursion stack or explicit stack in the iterative version",
      },
    ],
    quiz: [
      {
        question: "What data structure is used in the iterative implementation of DFS?",
        options: ["Queue", "Stack", "Heap", "Hash Table"],
        correctAnswer: 1,
        explanation:
          "DFS uses a stack in its iterative implementation. This allows it to explore as far as possible along each branch before backtracking.",
      },
      {
        question: "What is the time complexity of DFS?",
        options: ["O(V)", "O(E)", "O(V + E)", "O(V * E)"],
        correctAnswer: 2,
        explanation:
          "The time complexity of DFS is O(V + E), where V is the number of vertices and E is the number of edges in the graph. This is because in the worst case, we need to visit all vertices and edges.",
      },
      {
        question: "Which of the following is NOT an application of DFS?",
        options: [
          "Finding connected components",
          "Detecting cycles in a graph",
          "Finding the shortest path in an unweighted graph",
          "Topological sorting",
        ],
        correctAnswer: 2,
        explanation:
          "DFS is not suitable for finding the shortest path in an unweighted graph. Breadth-First Search (BFS) is the appropriate algorithm for that purpose.",
      },
    ],
  },
  {
    name: "Breadth-First Search",
    description:
      "A graph traversal algorithm that explores all neighbors at the present depth before moving to vertices at the next depth level",
    longDescription: `
      Breadth-First Search (BFS) is a graph traversal algorithm that explores all neighbors at the present depth before moving to vertices at the next depth level. It uses a queue data structure to keep track of vertices to visit next.

      Key characteristics of BFS:
      1. Uses a queue for implementation
      2. O(V + E) time complexity, where V is the number of vertices and E is the number of edges
      3. Explores all neighbors before moving to the next level
      4. Finds the shortest path in an unweighted graph

      BFS is particularly useful for:
      - Finding the shortest path in an unweighted graph
      - Testing if a graph is bipartite
      - Finding all nodes within one connected component
      - Finding the level of each node in a tree with respect to the root

      BFS is less memory-efficient than DFS for very deep graphs, as it needs to store all vertices of a level before going to the next level.
    `,
    visualization: "bfs",
    code: `
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    
    while queue:
        vertex = queue.popleft()
        print(vertex, end=' ')
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return visited
    `,
    timeComplexity: [{ operation: "Time Complexity", complexity: "O(V + E)" }],
    spaceComplexity: "O(V)",
    steps: [
      {
        title: "Understanding the Problem",
        content:
          "Breadth-First Search (BFS) is a graph traversal algorithm that explores all neighbors at the present depth before moving to vertices at the next depth level.",
      },
      {
        title: "Algorithm Steps",
        content:
          "1. Start at a selected node (or any node for a complete traversal)\n2. Mark the current node as visited and enqueue it\n3. While the queue is not empty:\n   a. Dequeue a vertex from the queue\n   b. Visit all unvisited neighbors of the dequeued vertex\n   c. Mark each neighbor as visited and enqueue it",
      },
      {
        title: "Implementation",
        content: "Let's implement BFS in Python using a queue:",
        code: `from collections import deque

def bfs(graph, start):
    # Set to keep track of visited vertices
    visited = set()
    # Queue for BFS
    queue = deque([start])
    # Mark the source node as visited
    visited.add(start)
    
    while queue:
        # Dequeue a vertex from queue
        vertex = queue.popleft()
        print(vertex, end=' ')
        
        # Get all adjacent vertices of the dequeued vertex
        # If an adjacent vertex has not been visited, mark it
        # visited and enqueue it
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return visited

# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

print("BFS traversal starting from vertex 'A':")
bfs(graph, 'A')`,
      },
      {
        title: "Finding Shortest Paths",
        content: "BFS can be used to find the shortest path in an unweighted graph:",
        code: `from collections import deque

def shortest_path_bfs(graph, start, end):
    # Return immediately if start and end are the same
    if start == end:
        return [start]
    
    # Keep track of visited vertices
    visited = {start}
    # Queue of paths
    queue = deque([[start]])
    
    while queue:
        # Get the first path from the queue
        path = queue.popleft()
        # Get the last node from the path
        node = path[-1]
        
        # Check all neighbors of the current node
        for neighbor in graph[node]:
            if neighbor not in visited:
                # Create a new path with the neighbor
                new_path = list(path)
                new_path.append(neighbor)
                
                # If we've reached the end, return the path
                if neighbor == end:
                    return new_path
                
                # Mark the neighbor as visited and enqueue the new path
                visited.add(neighbor)
                queue.append(new_path)
    
    # No path found
    return None

# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

path = shortest_path_bfs(graph, 'A', 'F')
if path:
    print(f"Shortest path from A to F: {' -> '.join(path)}")
else:
    print("No path found")`,
      },
      {
        title: "Applications of BFS",
        content:
          "BFS has many applications in graph theory and algorithms:\n- Shortest Path in Unweighted Graphs: Finding the shortest path between two vertices\n- Web Crawlers: Exploring web pages by following links\n- Social Networking: Finding people within a certain degree of connection\n- GPS Navigation: Finding nearby locations\n- Garbage Collection: Identifying and collecting unreachable objects in memory",
      },
      {
        title: "Time and Space Complexity",
        content:
          "Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges in the graph\n\nSpace Complexity: O(V) for the visited set and the queue",
      },
    ],
    quiz: [
      {
        question: "What data structure is used in the implementation of BFS?",
        options: ["Stack", "Queue", "Heap", "Hash Table"],
        correctAnswer: 1,
        explanation:
          "BFS uses a queue data structure to keep track of vertices to visit next. This allows it to explore all neighbors at the current depth before moving to the next level.",
      },
      {
        question: "What is a key advantage of BFS over DFS?",
        options: [
          "BFS uses less memory",
          "BFS is faster for all graphs",
          "BFS finds the shortest path in unweighted graphs",
          "BFS can detect cycles more efficiently",
        ],
        correctAnswer: 2,
        explanation:
          "A key advantage of BFS is that it finds the shortest path in unweighted graphs. This is because it explores all vertices at the current level before moving to the next level.",
      },
      {
        question: "What is the time complexity of BFS?",
        options: ["O(V)", "O(E)", "O(V + E)", "O(V * E)"],
        correctAnswer: 2,
        explanation:
          "The time complexity of BFS is O(V + E), where V is the number of vertices and E is the number of edges in the graph. This is because in the worst case, we need to visit all vertices and edges.",
      },
    ],
  },
]

// Educational content about algorithm basics
const algorithmBasics = [
  {
    title: "What is an Algorithm?",
    content:
      "An algorithm is a step-by-step procedure or a set of rules designed to perform a specific task or solve a particular problem. Algorithms are the foundation of computer science and are used in various fields, from mathematics to artificial intelligence.",
  },
  {
    title: "Characteristics of a Good Algorithm",
    content:
      "A good algorithm should have the following characteristics:\n- Input: It should take zero or more inputs\n- Output: It should produce at least one output\n- Definiteness: Each step must be clear and unambiguous\n- Finiteness: It should terminate after a finite number of steps\n- Effectiveness: Each step must be basic enough to be carried out by a person using only pencil and paper",
  },
  {
    title: "Types of Algorithms",
    content:
      "Algorithms can be classified into various types based on their approach and application:\n- Sorting Algorithms: Arrange data in a particular order (e.g., Bubble Sort, Merge Sort)\n- Search Algorithms: Find an item in a data structure (e.g., Binary Search)\n- Graph Algorithms: Solve problems related to graphs (e.g., DFS, BFS)\n- Dynamic Programming: Break down complex problems into simpler subproblems\n- Divide and Conquer: Break a problem into subproblems, solve them, and combine the results\n- Greedy Algorithms: Make locally optimal choices at each stage",
  },
]

// Educational content about algorithm complexity
const algorithmComplexity = [
  {
    title: "Understanding Algorithm Complexity",
    content:
      "Algorithm complexity refers to the amount of resources (time and space) an algorithm needs to run as a function of the input size. It helps us compare algorithms and predict their performance on large inputs.",
  },
  {
    title: "Time Complexity",
    content:
      "Time complexity measures the amount of time an algorithm takes to complete as a function of the input size. It's typically expressed using Big O notation, which describes the upper bound of the growth rate.",
  },
  {
    title: "Space Complexity",
    content:
      "Space complexity measures the amount of memory an algorithm needs as a function of the input size. It includes both the auxiliary space (extra space used by the algorithm) and the space used by the input.",
  },
  {
    title: "Common Time Complexities",
    content:
      "Here are some common time complexities, ordered from best to worst:\n- O(1): Constant time (e.g., accessing an array element)\n- O(log n): Logarithmic time (e.g., binary search)\n- O(n): Linear time (e.g., linear search)\n- O(n log n): Linearithmic time (e.g., efficient sorting algorithms like merge sort)\n- O(n²): Quadratic time (e.g., simple sorting algorithms like bubble sort)\n- O(2ⁿ): Exponential time (e.g., recursive calculation of Fibonacci numbers)\n- O(n!): Factorial time (e.g., brute force solution to the traveling salesman problem)",
  },
]

// Educational content about asymptotic analysis
const asymptoticAnalysis = [
  {
    title: "What is Asymptotic Analysis?",
    content:
      "Asymptotic analysis is a method of describing the limiting behavior of a function when the argument tends towards a particular value or infinity. In algorithm analysis, it helps us understand how the runtime or space requirements grow as the input size increases.",
  },
  {
    title: "Big O Notation (O)",
    content:
      "Big O notation represents the upper bound of an algorithm's growth rate. It describes the worst-case scenario and is the most commonly used notation. For example, O(n²) means the algorithm's time complexity grows no faster than n².",
  },
  {
    title: "Big Omega Notation (Ω)",
    content:
      "Big Omega notation represents the lower bound of an algorithm's growth rate. It describes the best-case scenario. For example, Ω(n) means the algorithm's time complexity grows at least as fast as n.",
  },
  {
    title: "Big Theta Notation (Θ)",
    content:
      "Big Theta notation represents both the upper and lower bounds of an algorithm's growth rate. It describes the tight bound. For example, Θ(n log n) means the algorithm's time complexity grows exactly at the rate of n log n.",
  },
]

// Quiz questions for algorithm complexity
const complexityQuiz = {
  title: "Algorithm Complexity Quiz",
  questions: [
    {
      question: "What is the time complexity of searching for an element in a sorted array using binary search?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1,
      explanation:
        "Binary search has a time complexity of O(log n) because it divides the search space in half with each comparison.",
    },
    {
      question: "Which sorting algorithm has the best average-case time complexity?",
      options: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Selection Sort"],
      correctAnswer: 2,
      explanation:
        "Quick Sort has an average-case time complexity of O(n log n), which is better than Bubble Sort, Insertion Sort, and Selection Sort, which all have O(n²) average-case time complexity.",
    },
    {
      question: "What does it mean if an algorithm has O(1) space complexity?",
      options: [
        "It uses a constant amount of extra space regardless of input size",
        "It uses exactly 1 byte of memory",
        "It uses the same amount of space as the input",
        "It uses no extra space at all",
      ],
      correctAnswer: 0,
      explanation:
        "O(1) space complexity means the algorithm uses a constant amount of extra space regardless of the input size. It doesn't mean it uses exactly 1 byte or no extra space at all.",
    },
    {
      question: "Which of the following represents the worst time complexity?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
      correctAnswer: 1,
      explanation:
        "Among the given options, O(n²) represents the worst time complexity because it grows faster than O(n), O(log n), and O(n log n) as the input size increases.",
    },
  ],
}

export default function AlgorithmsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Algorithms</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Learn and visualize popular algorithms with step-by-step explanations and interactive examples.
        </p>
      </div>

      <Tabs defaultValue="algorithms" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="complexity">Complexity</TabsTrigger>
          <TabsTrigger value="asymptotic">Asymptotic Analysis</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="algorithms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Algorithm Visualizations</CardTitle>
              <CardDescription>Explore different algorithms with interactive visualizations</CardDescription>
            </CardHeader>
            <CardContent>
              <AlgorithmList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="basics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Algorithm Basics</CardTitle>
              <CardDescription>Learn the fundamental concepts of algorithms</CardDescription>
            </CardHeader>
            <CardContent>
              <AlgorithmBasics />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complexity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Complexity Analysis</CardTitle>
              <CardDescription>Understand time and space complexity of algorithms</CardDescription>
            </CardHeader>
            <CardContent>
              <ComplexityAnalysis />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="asymptotic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Asymptotic Analysis</CardTitle>
              <CardDescription>Learn about Big O, Big Omega, and Big Theta notations</CardDescription>
            </CardHeader>
            <CardContent>
              <AsymptoticAnalysis />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Practice Exercises</CardTitle>
              <CardDescription>Apply your knowledge with practical exercises</CardDescription>
            </CardHeader>
            <CardContent>
              <PracticeExercises />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

