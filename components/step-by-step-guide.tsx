"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Step {
  title: string
  content: string
  code?: string
}

interface StepByStepGuideProps {
  steps: Step[]
}

export default function StepByStepGuide({ steps }: StepByStepGuideProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Step-by-Step Guide</h3>
        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h4 className="text-md font-medium mb-2">{steps[currentStep].title}</h4>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line mb-4">{steps[currentStep].content}</p>
          {steps[currentStep].code && (
            <pre className="p-4 rounded-md bg-gray-100 dark:bg-gray-800 overflow-x-auto">
              <code>{steps[currentStep].code}</code>
            </pre>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={goToPreviousStep} disabled={currentStep === 0}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button variant="outline" onClick={goToNextStep} disabled={currentStep === steps.length - 1}>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

