export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 shadow-md mt-auto">
      <div className="container mx-auto px-4 py-4 text-center">
        <p className="text-slate-600 dark:text-slate-400">
          © {new Date().getFullYear()} Praise Masunga. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

