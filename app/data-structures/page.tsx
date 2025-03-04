"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DataStructureList from "@/components/data-structures/data-structure-list"
import DataStructureBasics from "@/components/data-structures/data-structure-basics"
import AbstractDataTypes from "@/components/data-structures/abstract-data-types"
import TimeComplexity from "@/components/data-structures/time-complexity"
import PracticeExercises from "@/components/data-structures/practice-exercises"

export default function DataStructuresPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Data Structures</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Learn and visualize common data structures with interactive examples and implementations.
        </p>
      </div>

      <Tabs defaultValue="data-structures" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="data-structures">Data Structures</TabsTrigger>
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="adt">Abstract Data Types</TabsTrigger>
          <TabsTrigger value="complexity">Time Complexity</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="data-structures" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Structure Visualizations</CardTitle>
              <CardDescription>Explore different data structures with interactive visualizations</CardDescription>
            </CardHeader>
            <CardContent>
              <DataStructureList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="basics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Structure Basics</CardTitle>
              <CardDescription>Learn the fundamental concepts of data structures</CardDescription>
            </CardHeader>
            <CardContent>
              <DataStructureBasics />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adt" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Abstract Data Types</CardTitle>
              <CardDescription>Understand the concept of Abstract Data Types (ADTs)</CardDescription>
            </CardHeader>
            <CardContent>
              <AbstractDataTypes />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complexity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Time Complexity</CardTitle>
              <CardDescription>Compare time complexity of operations across different data structures</CardDescription>
            </CardHeader>
            <CardContent>
              <TimeComplexity />
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

