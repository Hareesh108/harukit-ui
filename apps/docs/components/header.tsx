import Link from "next/link";
import { DarkModeToggle } from "./dark-mode-toggle";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 h-16 flex items-center px-6 justify-between">
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl text-yellow-500">Harukit UI</span>
      </div>
      <nav className="flex items-center gap-6 text-sm font-medium">
        <Link href="/docs" className="hover:text-yellow-500 transition">
          Docs
        </Link>
        <Link
          href="/docs/components/button"
          className="hover:text-yellow-500 transition"
        >
          Components
        </Link>
        <Link href="#blocks" className="hover:text-yellow-500 transition">
          Blocks
        </Link>
        <Link href="#themes" className="hover:text-yellow-500 transition">
          Themes
        </Link>
        <Link href="#colors" className="hover:text-yellow-500 transition">
          Colors
        </Link>
        <DarkModeToggle />
      </nav>
    </header>
  );
}
