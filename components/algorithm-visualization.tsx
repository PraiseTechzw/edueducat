"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface AlgorithmVisualizationProps {
  type: string;
}

const AlgorithmVisualization: React.FC<AlgorithmVisualizationProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);
  const animationRef = useRef<number | null>(null);

  // Example data for algorithms
  const bubbleSortArray = [5, 2, 8, 12, 1, 6];
  const binarySearchArray = [1, 3, 5, 7, 9, 11, 13, 15];
  const binarySearchTarget = 7;

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the algorithm visualization based on the type and current step
    switch (type) {
      case "bubble-sort":
        drawBubbleSort(ctx, currentStep);
        break;
      case "binary-search":
        drawBinarySearch(ctx, currentStep);
        break;
      // Add more cases for other algorithms
    }
  }, [type, currentStep]);

  useEffect(() => {
    // Generate step-by-step explanations based on the algorithm type
    switch (type) {
      case "bubble-sort":
        setSteps(generateBubbleSortSteps(bubbleSortArray));
        break;
      case "binary-search":
        setSteps(generateBinarySearchSteps(binarySearchArray, binarySearchTarget));
        break;
      default:
        setSteps([]);
    }
  }, [type]);

  const drawBubbleSort = (ctx: CanvasRenderingContext2D, step: number) => {
    const arr = [...bubbleSortArray];
    const barWidth = 40;
    const barSpacing = 10;
    const maxBarHeight = 200;

    // Simulate bubble sort steps
    for (let i = 0; i < step; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }

    // Draw bars
    arr.forEach((value, index) => {
      const barHeight = (value / Math.max(...arr)) * maxBarHeight;
      const x = index * (barWidth + barSpacing) + 50;
      const y = 250 - barHeight;

      ctx.fillStyle = index === step || index === step + 1 ? "#ff9800" : "#4caf50";
      ctx.fillRect(x, y, barWidth, barHeight);
      ctx.fillStyle = "#000";
      ctx.fillText(value.toString(), x + barWidth / 2, y - 10);
    });
  };

  const drawBinarySearch = (ctx: CanvasRenderingContext2D, step: number) => {
    const arr = [...binarySearchArray];
    const elementWidth = 50;
    const elementHeight = 50;
    const startX = 50;
    const startY = 100;

    // Draw array elements
    arr.forEach((element, index) => {
      ctx.strokeRect(startX + index * elementWidth, startY, elementWidth, elementHeight);
      ctx.fillStyle = element === binarySearchTarget && step === arr.indexOf(binarySearchTarget) ? "#ff9800" : "#000";
      ctx.fillText(element.toString(), startX + index * elementWidth + 20, startY + 30);
    });

    // Draw pointers
    const low = Math.floor(step / 2);
    const high = arr.length - 1 - Math.floor(step / 2);
    const mid = Math.floor((low + high) / 2);

    ctx.fillStyle = "#4caf50";
    ctx.fillRect(startX + low * elementWidth, startY + elementHeight + 10, elementWidth, 5);
    ctx.fillRect(startX + high * elementWidth, startY + elementHeight + 10, elementWidth, 5);
    ctx.fillStyle = "#2196f3";
    ctx.fillRect(startX + mid * elementWidth, startY + elementHeight + 20, elementWidth, 5);
  };

  const generateBubbleSortSteps = (arr: number[]) => {
    const steps: string[] = [];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        steps.push(`Compare ${arr[j]} and ${arr[j + 1]}`);
        if (arr[j] > arr[j + 1]) {
          steps.push(`Swap ${arr[j]} and ${arr[j + 1]}`);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return steps;
  };

  const generateBinarySearchSteps = (arr: number[], target: number) => {
    const steps: string[] = [];
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      steps.push(`Check middle element: ${arr[mid]}`);
      if (arr[mid] === target) {
        steps.push(`Found target: ${target}`);
        break;
      } else if (arr[mid] < target) {
        steps.push(`Target is in the right half`);
        low = mid + 1;
      } else {
        steps.push(`Target is in the left half`);
        high = mid - 1;
      }
    }
    return steps;
  };

  const handlePlay = () => {
    setIsPlaying(true);
    animationRef.current = requestAnimationFrame(animate);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setCurrentStep(value[0]);
  };

  const animate = () => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1;
      if (nextStep >= steps.length) {
        handlePause();
        return prevStep;
      }
      return nextStep;
    });
    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-96 bg-white dark:bg-slate-800 rounded-lg shadow-md p-4"
    >
      <canvas ref={canvasRef} width={400} height={250} className="w-full h-64" />
      <div className="mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {steps[currentStep] || "Start the animation to see the steps."}
        </p>
      </div>
      <div className="absolute bottom-4 left-4 space-x-2">
        <Button onClick={handlePlay} disabled={isPlaying}>
          Play
        </Button>
        <Button onClick={handlePause} disabled={!isPlaying}>
          Pause
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
      <div className="absolute bottom-4 right-4 w-48">
        <Slider
          value={[currentStep]}
          onValueChange={handleSliderChange}
          max={steps.length - 1}
          step={1}
        />
      </div>
    </motion.div>
  );
};

export default AlgorithmVisualization;