"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, StepForward } from "lucide-react"
import { Input } from "@/components/ui/input"

interface VisualizationControlsProps {
  isPlaying: boolean
  speed: number[]
  onPlayPause: () => void
  onReset: () => void
  onStepForward: () => void
  onSpeedChange: (value: number[]) => void
  customInput?: string
  onCustomInputChange?: (value: string) => void
  onApplyCustomInput?: () => void
  disablePlayPause?: boolean
  disableStepForward?: boolean
  disableReset?: boolean
  className?: string
}

export default function VisualizationControls({
  isPlaying,
  speed,
  onPlayPause,
  onReset,
  onStepForward,
  onSpeedChange,
  customInput,
  onCustomInputChange,
  onApplyCustomInput,
  disablePlayPause = false,
  disableStepForward = false,
  disableReset = false,
  className = "",
}: VisualizationControlsProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Custom input */}
      {customInput !== undefined && onCustomInputChange && onApplyCustomInput && (
        <div className="flex items-center space-x-2 mb-2">
          <Input
            placeholder="Custom input (comma separated)"
            value={customInput}
            onChange={(e) => onCustomInputChange(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" onClick={onApplyCustomInput}>
            Apply
          </Button>
        </div>
      )}

      {/* Playback controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPlayPause}
          disabled={disablePlayPause}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onStepForward}
          disabled={disableStepForward}
          title="Step Forward"
        >
          <StepForward className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon" onClick={onReset} disabled={disableReset} title="Reset">
          <RotateCcw className="h-4 w-4" />
        </Button>

        <div className="flex-1">
          <Slider value={speed} min={1} max={100} step={1} onValueChange={onSpeedChange} />
        </div>
        <div className="text-xs text-gray-500 w-28">Speed: {speed[0]}%</div>
      </div>
    </div>
  )
}

