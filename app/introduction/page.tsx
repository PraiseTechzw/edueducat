import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function IntroductionPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Introduction</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Data Structures and Algorithms</CardTitle>
          <CardDescription>An overview of the course and its importance</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            This course will cover fundamental data structures and algorithms, essential for efficient problem-solving
            and software development. You'll learn about various data structures, algorithm design techniques, and their
            practical implementations.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Course Outline</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Data Structures Fundamentals</li>
            <li>Algorithm Basics and Analysis</li>
            <li>Trees and Graph Structures</li>
            <li>Searching and Sorting Techniques</li>
            <li>Advanced Algorithms (Kruskal's, Dijkstra's, Prim's)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

