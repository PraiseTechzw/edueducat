"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "@/components/code-block"
import { Input } from "@/components/ui/input"
import { Play, RotateCcw } from "lucide-react"

interface PracticalActivityProps {
  title: string
  description: string
  implementations: {
    name: string
    code: string
    language: string
  }[]
}

export default function PracticalActivity({ title, description, implementations }: PracticalActivityProps) {
  const [activeTab, setActiveTab] = useState(implementations[0].name)
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = () => {
    setIsRunning(true)
    setOutput([...output, `> Running ${activeTab} implementation...`])

    // Simulate execution
    setTimeout(() => {
      const implementation = implementations.find((impl) => impl.name === activeTab)

      if (implementation) {
        // Parse input
        const values = input
          .split(",")
          .map((val) => val.trim())
          .filter(Boolean)

        // Simulate output based on implementation type
        let simulatedOutput: string[] = []

        switch (activeTab.toLowerCase()) {
          case "stack":
            simulatedOutput = simulateStack(values)
            break
          case "queue":
            simulatedOutput = simulateQueue(values)
            break
          case "linked list":
            simulatedOutput = simulateLinkedList(values)
            break
          case "array":
            simulatedOutput = simulateArray(values)
            break
          default:
            simulatedOutput = [`Executed with input: ${input}`]
        }

        setOutput([...output, `> Running ${activeTab} implementation...`, ...simulatedOutput])
      }

      setIsRunning(false)
    }, 1000)
  }

  const simulateStack = (values: string[]) => {
    const result: string[] = ["Stack operations:"]
    const stack: string[] = []

    values.forEach((val) => {
      if (val.startsWith("pop")) {
        if (stack.length === 0) {
          result.push("  pop() -> Stack is empty")
        } else {
          const popped = stack.shift()
          result.push(`  pop() -> ${popped}`)
        }
      } else {
        stack.unshift(val)
        result.push(`  push(${val}) -> Stack: [${stack.join(", ")}]`)
      }
    })

    result.push(`Final stack: [${stack.join(", ")}]`)
    return result
  }

  const simulateQueue = (values: string[]) => {
    const result: string[] = ["Queue operations:"]
    const queue: string[] = []

    values.forEach((val) => {
      if (val.startsWith("deq")) {
        if (queue.length === 0) {
          result.push("  dequeue() -> Queue is empty")
        } else {
          const dequeued = queue.shift()
          result.push(`  dequeue() -> ${dequeued}`)
        }
      } else {
        queue.push(val)
        result.push(`  enqueue(${val}) -> Queue: [${queue.join(", ")}]`)
      }
    })

    result.push(`Final queue: [${queue.join(", ")}]`)
    return result
  }

  const simulateLinkedList = (values: string[]) => {
    const result: string[] = ["Linked List operations:"]
    const list: string[] = []

    values.forEach((val) => {
      if (val.startsWith("del:")) {
        const valueToDelete = val.substring(4)
        const index = list.indexOf(valueToDelete)

        if (index === -1) {
          result.push(`  delete(${valueToDelete}) -> Value not found`)
        } else {
          list.splice(index, 1)
          result.push(`  delete(${valueToDelete}) -> List: ${formatLinkedList(list)}`)
        }
      } else if (val.startsWith("pre:")) {
        const valueToPrepend = val.substring(4)
        list.unshift(valueToPrepend)
        result.push(`  prepend(${valueToPrepend}) -> List: ${formatLinkedList(list)}`)
      } else {
        list.push(val)
        result.push(`  append(${val}) -> List: ${formatLinkedList(list)}`)
      }
    })

    result.push(`Final linked list: ${formatLinkedList(list)}`)
    return result
  }

  const simulateArray = (values: string[]) => {
    const result: string[] = ["Array operations:"]
    const array: string[] = []

    values.forEach((val) => {
      if (val.startsWith("ins:")) {
        const [indexStr, value] = val.substring(4).split(":")
        const index = Number.parseInt(indexStr)

        if (isNaN(index) || index < 0 || index > array.length) {
          result.push(`  insert(${indexStr}, ${value}) -> Invalid index`)
        } else {
          array.splice(index, 0, value)
          result.push(`  insert(${index}, ${value}) -> Array: [${array.join(", ")}]`)
        }
      } else if (val.startsWith("rem:")) {
        const indexStr = val.substring(4)
        const index = Number.parseInt(indexStr)

        if (isNaN(index) || index < 0 || index >= array.length) {
          result.push(`  remove(${indexStr}) -> Invalid index`)
        } else {
          const removed = array.splice(index, 1)[0]
          result.push(`  remove(${index}) -> Removed ${removed} -> Array: [${array.join(", ")}]`)
        }
      } else {
        array.push(val)
        result.push(`  append(${val}) -> Array: [${array.join(", ")}]`)
      }
    })

    result.push(`Final array: [${array.join(", ")}]`)
    return result
  }

  const formatLinkedList = (list: string[]) => {
    if (list.length === 0) return "Empty"
    return list.join(" -> ") + " -> null"
  }

  const handleClearOutput = () => {
    setOutput([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>

        <Tabs defaultValue={implementations[0].name} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            {implementations.map((impl) => (
              <TabsTrigger key={impl.name} value={impl.name}>
                {impl.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {implementations.map((impl) => (
            <TabsContent key={impl.name} value={impl.name}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Implementation</h3>
                <CodeBlock code={impl.code} language={impl.language} />
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Try it out</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {activeTab === "Stack" && "Enter values separated by commas. Use 'pop' to remove from stack."}
                  {activeTab === "Queue" && "Enter values separated by commas. Use 'deq' to dequeue."}
                  {activeTab === "Linked List" &&
                    "Enter values separated by commas. Use 'del:value' to delete, 'pre:value' to prepend."}
                  {activeTab === "Array" &&
                    "Enter values separated by commas. Use 'ins:index:value' to insert, 'rem:index' to remove."}
                </p>

                <div className="flex space-x-2 mb-4">
                  <Input
                    placeholder="Enter input values separated by commas"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <Button onClick={handleRun} disabled={isRunning}>
                    <Play className="h-4 w-4 mr-2" />
                    Run
                  </Button>
                </div>

                <div className="bg-black text-white p-4 rounded-md h-64 overflow-y-auto font-mono text-sm">
                  {output.length === 0 ? (
                    <div className="text-gray-500">Output will appear here...</div>
                  ) : (
                    output.map((line, index) => (
                      <div key={index} className="whitespace-pre-wrap">
                        {line}
                      </div>
                    ))
                  )}
                </div>

                <div className="flex justify-end mt-2">
                  <Button variant="outline" size="sm" onClick={handleClearOutput}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

