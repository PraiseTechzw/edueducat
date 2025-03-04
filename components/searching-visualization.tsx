"use client"

import type React from "react"

interface SearchingVisualizationProps {
  type: string
}

const SearchingVisualization: React.FC<SearchingVisualizationProps> = ({ type }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <p className="text-center text-gray-600 dark:text-gray-400">
        Searching visualization for {type} will be implemented here.
      </p>
    </div>
  )
}

export default SearchingVisualization

