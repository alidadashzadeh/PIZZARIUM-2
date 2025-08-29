"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { Moon, Star, Sun } from "lucide-react";
import { Button } from "./button";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const stored = localStorage.getItem("theme");
    const themeToSet = stored === "dark" ? "dark" : "light";
    setTheme(themeToSet);
    document.body.classList.toggle("dark", stored === "dark");
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleTheme}
      aria-label="Toggle theme"
      className="cursor-pointer"
    >
      {theme === "light" ? (
        <div className="relative inline-block">
          <Moon className="w-6 h-6 text-yellow-400" />
          <span className="absolute -top-1 -right-1 scale-30">
            <Star className="w-3 h-3 text-yellow-400" />
          </span>
          <span className="absolute -top-2 -right-2 scale-30">
            <Star className="w-3 h-3 text-yellow-400" />
          </span>
        </div>
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </Button>
  );
}

export { Switch };
