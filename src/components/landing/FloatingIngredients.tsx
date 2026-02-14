// components/landing/FloatingIngredients.tsx

import Image from "next/image";

export default function FloatingIngredients() {
	return (
		<div className="pointer-events-none absolute inset-0 overflow-visible">
			{/* Basil */}
			<Image
				src="/hero/basil.png"
				width={80}
				height={80}
				alt=""
				className="absolute top-40 left-10 animate-float1"
			/>

			{/* Tomato */}
			<Image
				src="/hero/tomato.png"
				width={100}
				height={100}
				alt=""
				className="absolute bottom-20 left-20 animate-float2"
			/>

			{/* Mushroom */}
			<Image
				src="/hero/mushroom.png"
				width={70}
				height={70}
				alt=""
				className="absolute top-1/2 left-140 animate-float3"
			/>
		</div>
	);
}
