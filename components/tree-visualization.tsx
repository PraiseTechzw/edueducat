"use client"

import type React from "react"

interface TreeVisualizationProps {
  type: string
}

const TreeVisualization: React.FC<TreeVisualizationProps> = ({ type }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <p className="text-center text-gray-600 dark:text-gray-400">
        Tree visualization for {type} will be implemented here.
      </p>
    </div>
  )
}

export default TreeVisualization

