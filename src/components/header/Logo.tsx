import Image from "next/image";
import Link from "next/link";

import { H1 } from "../ui/Typography";

function Logo() {
	return (
		<Link href="/">
			<div className="flex items-center gap-2 md:pt-2">
				<div className="relative  w-9 aspect-square sm:w-10  md:w-12 flex items-center">
					<Image
						src="/logo.avif"
						alt="Logo"
						fill
						className="object-cover"
						priority
					/>
				</div>
				<H1 className="text-primary hidden sm:block">PIZZARIUM</H1>
			</div>
		</Link>
	);
}

export default Logo;
