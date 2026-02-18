import Link from "next/link";
import Logo from "../header/Logo";
import { Separator } from "../ui/separator";

export default function Footer() {
	return (
		<footer className="mt-32">
			<div className="max-w-7xl mx-auto px-6 py-14">
				<Separator />
				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 mt-8">
					<div className="lg:col-span-2 space-y-4">
						<Logo />
						<p className="text-sm ">
							Building flavorous experiences with speed and simplicity.
						</p>
					</div>

					<FooterColumn title="Product">
						<Link
							className="hover:text-primary transition"
							href={"/signature-pizzas"}
						>
							Signature Pizza
						</Link>
						<Link
							className="hover:text-primary transition"
							href={"/custom-pizzas"}
						>
							Custom Pizza
						</Link>
						<Link className="hover:text-primary transition" href={"/drinks"}>
							Drinks
						</Link>
					</FooterColumn>

					<FooterColumn title="Company">
						<LinkItem label="About" />
						<LinkItem label="Careers" />
						<LinkItem label="Blog" />
						<LinkItem label="Contact" />
					</FooterColumn>

					<FooterColumn title="Resources">
						<LinkItem label="Help Center" />
						<LinkItem label="Privacy Policy" />
						<LinkItem label="Terms" />
						<LinkItem label="Status" />
					</FooterColumn>
				</div>

				<div className="border-t border-zinc-800 mt-10 pt-6 flex flex-col md:flex-row justify-between text-sm text-zinc-500">
					<p>© 2026 YourBrand. All rights reserved.</p>
					<div className="flex gap-4">
						<a href="#">Twitter</a>
						<a href="#">GitHub</a>
						<a href="#">LinkedIn</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

function FooterColumn({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="space-y-3">
			<h3 className="text-white font-medium">{title}</h3>
			<div className="flex flex-col gap-2 text-sm">{children}</div>
		</div>
	);
}

function LinkItem({ label }: { label: string }) {
	return (
		<a href="#" className="hover:text-primary transition">
			{label}
		</a>
	);
}
