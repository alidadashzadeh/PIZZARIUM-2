"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["Fresh", "Hot", "Authentic", "handcrafted"];

export default function RollingWord() {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % words.length);
		}, 2500);

		return () => clearInterval(interval);
	}, []);

	return (
		<span className="relative inline-block h-[1.2em] align-bottom">
			<AnimatePresence mode="wait">
				<motion.span
					key={words[index]}
					initial={{ y: 30, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -30, opacity: 0 }}
					transition={{ duration: 0.25 }}
					className="absolute left-0 text-primary"
				>
					{words[index]}
				</motion.span>
			</AnimatePresence>
		</span>
	);
}
