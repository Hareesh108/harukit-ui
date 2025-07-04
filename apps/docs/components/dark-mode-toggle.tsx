import { Switch } from "./ui/switch";
import { useDarkMode } from "../hooks/use-dark-mode";
import { Sun, Moon } from "lucide-react";

export function DarkModeToggle() {
  const [isDark, toggle] = useDarkMode();
  return (
    <div className="flex items-center gap-2">
      <Sun className="w-4 h-4 text-yellow-500" aria-hidden={!isDark} />
      <Switch checked={isDark} onChange={toggle} label="Toggle dark mode" />
      <Moon
        className="w-4 h-4 text-gray-700 dark:text-yellow-300"
        aria-hidden={isDark}
      />
    </div>
  );
}
