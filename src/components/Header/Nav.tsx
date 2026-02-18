import NavLink from "../ui/NavLink";
import {
	NavigationMenu,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";

function Nav() {
	const links = [
		{ href: "/signature-pizzas", label: "Signature Pizzas" },
		{ href: "/custom-pizzas", label: "Custom Pizzas" },
		{ href: "/drinks", label: "Drinks" },
	];

	return (
		<NavigationMenu>
			<NavigationMenuList>
				{links.map((link) => (
					<NavLink key={link.href} link={link} />
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}

export default Nav;
