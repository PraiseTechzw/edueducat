import Link from "next/link"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 sm:mb-0">
          Prim's Algorithm
        </Link>
        <nav>
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com/PraiseTechzw/edueducat" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </nav>
      </div>
    </header>
  )
}

