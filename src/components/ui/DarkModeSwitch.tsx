"use client";

import * as React from "react";
import { Moon, Sun, Star } from "lucide-react";
import { Button } from "./button";

function Switch() {
	const [theme, setTheme] = React.useState<"light" | "dark">("light");

	// Initialize theme from localStorage or system preference
	React.useEffect(() => {
		const stored = localStorage.getItem("theme");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;
		const initialTheme =
			stored === "dark" || (!stored && prefersDark) ? "dark" : "light";
		setTheme(initialTheme);

		document.documentElement.classList.toggle("dark", initialTheme === "dark");
	}, []);

	const handleToggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);

		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={handleToggleTheme}
			aria-label="Toggle theme"
			className="cursor-pointer"
		>
			{theme === "light" ? (
				<div className="relative inline-block">
					<Moon className="w-6 h-6 text-foreground" />
					<span className="absolute -top-1 -right-1 scale-30">
						<Star className="w-3 h-3 text-foreground" />
					</span>
					<span className="absolute -top-2 -right-2 scale-30">
						<Star className="w-3 h-3 text-foreground" />
					</span>
				</div>
			) : (
				<Sun className="w-5 h-5 text-yellow-400" />
			)}
		</Button>
	);
}

export { Switch };
