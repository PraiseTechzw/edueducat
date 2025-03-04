"use client"

interface AlgorithmExplanationProps {
  title: string
  description: string
  timeComplexity: string
  spaceComplexity: string
  bestCase?: string
  worstCase?: string
  averageCase?: string
  className?: string
  currentStep?: string
}

export default function AlgorithmExplanation({
  title,
  description,
  timeComplexity,
  spaceComplexity,
  bestCase,
  worstCase,
  averageCase,
  currentStep,
  className = "",
}: AlgorithmExplanationProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="font-medium">Time Complexity:</div>
        <div>{timeComplexity}</div>

        <div className="font-medium">Space Complexity:</div>
        <div>{spaceComplexity}</div>

        {bestCase && (
          <>
            <div className="font-medium">Best Case:</div>
            <div>{bestCase}</div>
          </>
        )}

        {averageCase && (
          <>
            <div className="font-medium">Average Case:</div>
            <div>{averageCase}</div>
          </>
        )}

        {worstCase && (
          <>
            <div className="font-medium">Worst Case:</div>
            <div>{worstCase}</div>
          </>
        )}
      </div>

      {currentStep && (
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md mt-3">
          <p className="text-sm font-medium">Current Step:</p>
          <p className="text-sm">{currentStep}</p>
        </div>
      )}
    </div>
  )
}

