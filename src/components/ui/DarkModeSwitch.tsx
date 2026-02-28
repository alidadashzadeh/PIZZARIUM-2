"use client";

import * as React from "react";
import { Moon, Sun, Star } from "lucide-react";
import { Button } from "./button";

function Switch() {
	const [theme, setTheme] = React.useState<"light" | "dark">("light");

	React.useEffect(() => {
		const stored = localStorage.getItem("theme");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;

		const initialTheme =
			stored === "dark" || (!stored && prefersDark) ? "dark" : "light";

		setTheme(initialTheme);
		document.documentElement.classList.toggle("dark", initialTheme === "dark");
	}, []);

	const applyTheme = (newTheme: "light" | "dark") => {
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	const handleToggleTheme = (e: React.MouseEvent) => {
		const newTheme = theme === "dark" ? "light" : "dark";

		const x = e.clientX;
		const y = e.clientY;

		const maxX = Math.max(x, window.innerWidth - x);
		const maxY = Math.max(y, window.innerHeight - y);
		const r = Math.hypot(maxX, maxY);

		const anyDoc = document;

		if (typeof anyDoc.startViewTransition === "function") {
			document.documentElement.style.setProperty("--vt-x", `${x}px`);
			document.documentElement.style.setProperty("--vt-y", `${y}px`);
			document.documentElement.style.setProperty("--vt-from", `0px`);
			document.documentElement.style.setProperty("--vt-to", `${r}px`);

			anyDoc.startViewTransition(() => {
				applyTheme(newTheme);
			});

			return;
		}

		applyTheme(newTheme);
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
