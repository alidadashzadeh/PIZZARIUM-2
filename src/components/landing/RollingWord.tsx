"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["Fresh", "Hot", "Authentic", "Handcrafted"];

export default function RollingWord() {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % words.length);
		}, 2500);

		return () => clearInterval(interval);
	}, []);

	return (
		<span className="relative inline-flex items-baseline leading-none">
			<AnimatePresence mode="wait">
				<motion.span
					key={words[index]}
					initial={{ y: "100%", opacity: 0 }}
					animate={{ y: "0%", opacity: 1 }}
					exit={{ y: "-100%", opacity: 0 }}
					transition={{ duration: 0.25, ease: "easeOut" }}
					className="absolute left-0 whitespace-nowrap text-primary leading-none"
				>
					{words[index]}
				</motion.span>
			</AnimatePresence>

			{/* Invisible placeholder to preserve baseline height */}
			<span className="invisible whitespace-nowrap leading-none">
				{words[0]}
			</span>
		</span>
	);
}
