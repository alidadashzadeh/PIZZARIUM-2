import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SignaturePizzaInfoProps } from "@/types/siganaturPizzaType";

export default function SignaturePizzaImage({
	pizza,
}: SignaturePizzaInfoProps) {
	return (
		<div className="relative w-full lg:w-[500px]">
			<Image
				src={pizza.image}
				width={400}
				height={400}
				alt={pizza.name}
				className="object-cover rounded-lg"
			/>
			<Button
				asChild
				className="absolute top-2 left-2"
				variant="outline"
				size="sm"
			>
				<Link href={"/signature-pizzas"}>
					<ArrowLeft className="mr-1" />
					Back
				</Link>
			</Button>
		</div>
	);
}
