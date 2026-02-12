"use client";

import { usePathname } from "next/navigation";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

function Nav() {
	const pathname = usePathname();

	const links = [
		{ href: "/signature-pizzas", label: "Signature Pizzas" },
		{ href: "/custom-pizzas", label: "Custom Pizzas" },
		{ href: "/drinks", label: "Drinks" },
	];

	return (
		<NavigationMenu>
			<NavigationMenuList>
				{links.map((link) => {
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
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
}

export default Nav;
