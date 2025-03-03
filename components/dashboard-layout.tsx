"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ScrollArea } from "@/components/ui/scroll-area"

const sidebarItems = [
  { title: "Introduction", href: "/introduction" },
  { title: "Data Structures Fundamentals", href: "/data-structures" },
  { title: "Algorithms", href: "/algorithms" },
  { title: "Trees", href: "/trees" },
  { title: "Searching Techniques", href: "/searching" },
  { title: "Sorting Algorithms", href: "/sorting" },
  { title: "Graphs", href: "/graphs" },
  { title: "Kruskal's Algorithm", href: "/kruskals" },
  { title: "Dijkstra's Algorithm", href: "/dijkstras" },
  { title: "Prim's Algorithm", href: "/" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <nav className="p-4">
              <ul className="space-y-2">
                {sidebarItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 rounded-md ${
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </ScrollArea>
        </aside>
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
