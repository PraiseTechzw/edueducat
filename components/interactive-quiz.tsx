"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from "lucide-react"

interface Question {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface InteractiveQuizProps {
  questions: Question[]
  title: string
}

export default function InteractiveQuiz({ questions, title }: InteractiveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const handleOptionSelect = (index: number) => {
    if (!isAnswered) {
      setSelectedOption(index)
    }
  }

  const checkAnswer = () => {
    if (selectedOption === null) return

    setIsAnswered(true)
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setCompleted(false)
  }

  if (completed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title} - Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
            <p className="text-lg mb-4">
              Your score: {score} out of {questions.length}
            </p>
            <Button onClick={resetQuiz}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{questions[currentQuestion].question}</p>

          <RadioGroup value={selectedOption?.toString()}>
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  disabled={isAnswered}
                  onClick={() => handleOptionSelect(index)}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className={`flex-1 ${
                    isAnswered && index === questions[currentQuestion].correctAnswer
                      ? "text-green-600 font-medium"
                      : isAnswered && index === selectedOption
                        ? "text-red-600 font-medium"
                        : ""
                  }`}
                >
                  {option}
                  {isAnswered && index === questions[currentQuestion].correctAnswer && (
                    <CheckCircle className="inline-block ml-2 h-4 w-4 text-green-600" />
                  )}
                  {isAnswered && index === selectedOption && index !== questions[currentQuestion].correctAnswer && (
                    <XCircle className="inline-block ml-2 h-4 w-4 text-red-600" />
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {isAnswered && (
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
              <p className="text-sm">{questions[currentQuestion].explanation}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-500">
          Score: {score}/{currentQuestion + (isAnswered ? 1 : 0)}
        </div>
        {!isAnswered ? (
          <Button onClick={checkAnswer} disabled={selectedOption === null}>
            Check Answer
          </Button>
        ) : (
          <Button onClick={nextQuestion}>
            {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

