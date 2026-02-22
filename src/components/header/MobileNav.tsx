"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

const links = [
	{ href: "/signature-pizzas", label: "Signature Pizzas" },
	{ href: "/custom-pizzas", label: "Custom Pizzas" },
	{ href: "/drinks", label: "Drinks" },
];

const MobileNav = () => {
	const [open, setOpen] = useState(false);

	// Lock body scroll when menu open
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "unset";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [open]);

	return (
		<>
			<div className="md:hidden">
				<Button
					size="icon"
					variant="ghost"
					onClick={() => setOpen(true)}
					aria-label="Open menu"
				>
					<Menu size={32} />
				</Button>
			</div>

			{open && (
				<div className="fixed inset-0 z-[100] bg-background">
					{/* Top bar */}
					<div className="flex items-center justify-between h-12 px-6 border-b">
						<span className="font-semibold">Menu</span>
						<Button
							size="icon"
							variant="ghost"
							onClick={() => setOpen(false)}
							aria-label="Close menu"
						>
							<X size={32} />
						</Button>
					</div>

					{/* Links */}
					<nav className="flex flex-col p-6 gap-4 text-lg">
						{links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="py-2 border-b border-muted hover:text-primary transition"
								onClick={() => setOpen(false)}
							>
								{link.label}
							</Link>
						))}
					</nav>
				</div>
			)}
		</>
	);
};

export default MobileNav;
