import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function DataStructureBasics() {
  const basics = [
    {
      title: "What is a Data Structure?",
      content: (
        <div className="space-y-4">
          <p>
            A data structure is a specialized format for organizing, processing, retrieving, and storing data. It
            provides a way to manage data efficiently for various purposes and applications.
          </p>
          <p>
            Think of data structures as containers that store data in a specific layout. The layout allows for efficient
            access and modification based on the specific requirements of the application.
          </p>
        </div>
      ),
    },
    {
      title: "Why Are Data Structures Important?",
      content: (
        <div className="space-y-4">
          <p>Data structures are important for several reasons:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Efficiency:</strong> They allow for efficient storage, retrieval, and manipulation of data
            </li>
            <li>
              <strong>Organization:</strong> They provide a way to organize data in a meaningful manner
            </li>
            <li>
              <strong>Abstraction:</strong> They hide the implementation details and provide a clean interface
            </li>
            <li>
              <strong>Reusability:</strong> Well-designed data structures can be reused in different applications
            </li>
            <li>
              <strong>Problem Solving:</strong> Many complex problems can be solved efficiently with the right data
              structure
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Types of Data Structures",
      content: (
        <div className="space-y-4">
          <p>Data structures can be broadly classified into two categories:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Linear Data Structures</CardTitle>
                <CardDescription>Elements are arranged in a sequential manner</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6">
                  <li>Arrays</li>
                  <li>Linked Lists</li>
                  <li>Stacks</li>
                  <li>Queues</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Non-Linear Data Structures</CardTitle>
                <CardDescription>Elements are not arranged in a sequential manner</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6">
                  <li>Trees</li>
                  <li>Graphs</li>
                  <li>Hash Tables</li>
                  <li>Heaps</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="mt-4">Data structures can also be classified based on their memory allocation:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Static Data Structures</CardTitle>
                <CardDescription>Fixed memory allocation at compile time</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6">
                  <li>Arrays</li>
                  <li>Matrices</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Dynamic Data Structures</CardTitle>
                <CardDescription>Memory allocation at runtime</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6">
                  <li>Linked Lists</li>
                  <li>Trees</li>
                  <li>Graphs</li>
                  <li>Heaps</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      title: "Operations on Data Structures",
      content: (
        <div className="space-y-4">
          <p>Common operations that can be performed on data structures include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Insertion:</strong> Adding a new element to the data structure
            </li>
            <li>
              <strong>Deletion:</strong> Removing an element from the data structure
            </li>
            <li>
              <strong>Traversal:</strong> Accessing each element of the data structure exactly once
            </li>
            <li>
              <strong>Searching:</strong> Finding the location of an element in the data structure
            </li>
            <li>
              <strong>Sorting:</strong> Arranging the elements in a specific order
            </li>
            <li>
              <strong>Merging:</strong> Combining two data structures into one
            </li>
          </ul>
          <p>
            The efficiency of these operations varies depending on the data structure. For example, arrays provide
            constant-time access to elements by index but may require linear time for insertion or deletion. Linked
            lists, on the other hand, provide constant-time insertion and deletion but require linear time for access by
            index.
          </p>
        </div>
      ),
    },
    {
      title: "Choosing the Right Data Structure",
      content: (
        <div className="space-y-4">
          <p>
            Choosing the right data structure for a specific problem is crucial for efficient algorithm design. Here are
            some factors to consider:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Nature of the Problem:</strong> What operations will be performed most frequently?
            </li>
            <li>
              <strong>Time Complexity:</strong> How fast should the operations be?
            </li>
            <li>
              <strong>Space Complexity:</strong> How much memory is available?
            </li>
            <li>
              <strong>Data Size:</strong> How much data will be stored?
            </li>
            <li>
              <strong>Implementation Complexity:</strong> How complex is the implementation?
            </li>
          </ul>
          <p>
            For example, if you need to frequently search for elements in a large dataset, a hash table might be a good
            choice due to its average O(1) lookup time. If you need to maintain a sorted collection with frequent
            insertions and deletions, a balanced binary search tree like a Red-Black tree or an AVL tree might be more
            appropriate.
          </p>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Understanding the fundamentals of data structures is essential for any programmer or computer scientist. This
          section covers the basic concepts, types, and operations of data structures.
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

