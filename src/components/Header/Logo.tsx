import Image from "next/image";
import Link from "next/link";

import { H1 } from "../ui/Typography";

function Logo() {
	return (
		<Link href="/">
			<div className="flex items-center gap-2 pt-2">
				<Image src="/logo.png" alt="Logo" height={48} width={48} />
				<H1 className="text-primary">PIZZARIUM</H1>
			</div>
		</Link>
	);
}

export default Logo;
