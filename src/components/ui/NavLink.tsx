"use client";

import {
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function NavLink({
	link,
}: {
	link: { href: string; label: string };
}) {
	const pathname = usePathname();
	const isActive = pathname === link.href;

	return (
		<NavigationMenuItem key={link.href}>
			<NavigationMenuLink
				asChild
				className={`
                  ${navigationMenuTriggerStyle()},
                  "text-lg font-medium tracking-tight focus:text-primary",
                  ${isActive && "text-primary "}
                `}
			>
				<Link href={link.href}>{link.label}</Link>
			</NavigationMenuLink>
		</NavigationMenuItem>
	);
}
