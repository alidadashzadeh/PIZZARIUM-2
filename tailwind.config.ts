import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./app/**/*.{ts,tsx}",
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
	],
	darkMode: "class", // enables class-based dark mode
	theme: {
		extend: {
			keyframes: {
				"spin-test": {
					from: { transform: "rotate(0deg)" },
					to: { transform: "rotate(360deg)" },
				},
			},
			animation: {
				"spin-test": "spin-test 1s linear infinite",
			},
		},
	},
	plugins: [],
};

export default config;
