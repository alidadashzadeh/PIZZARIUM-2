import Image from "next/image";
import React from "react";
import FloatingIngredients from "./FloatingIngredients";

export default function HeroImage() {
	return (
		<div className="relative w-[500px] overflow-visible ">
			<div className="absolute -top-24 -left-24 w-[650px] h-[650px] bg-gradient-to-br from-orange-400 via-orange-300 to-yellow-300 rounded-full blur-[120px] opacity-70 z-0" />

			{/* Main Image */}
			<div className="relative w-[500px] aspect-square z-20">
				<Image
					src="/hero/hero.png"
					alt="Hero image"
					fill
					className="object-cover drop-shadow-2xl"
					priority
				/>
			</div>

			{/* Tomato */}
			<Piece
				className="-bottom-20 -left-16 animate-piece-bl animate-float1"
				src="/hero/tomato.png"
			/>

			{/* Mushroom */}
			<Piece
				className="-top-40	 -left-10 animate-piece-tl animate-float3"
				src="/hero/mushroom.png"
			/>

			{/* Olive */}
			<Piece
				className="-top-40 -right-10 animate-piece-tr animate-float2"
				src="/hero/olive.png"
			/>

			{/* Spinach */}
			<Piece
				className="-bottom-4 -right-40 animate-piece-br animate-float2"
				src="/hero/spinach.png"
			/>

			{/* Basil */}
			<Piece
				className="bottom-1/2 -right-40 animate-piece-mr animate-float3"
				src="/hero/basil.png"
			/>
			{/* cheese */}
			<Piece
				className="bottom-1/2 -left-40 animate-piece-ml animate-float1"
				src="/hero/cheese.png"
			/>
			{/* pineapple */}
			<Piece
				className="-bottom-40 left-1/2 animate-piece-mb animate-float2"
				src="/hero/pineapple.png"
			/>
		</div>
	);
}

interface PieceProps {
	src: string;
	className?: string;
}

const Piece: React.FC<PieceProps> = ({ src, className }) => {
	return (
		<div
			className={`absolute w-[128px] aspect-square z-10 drop-shadow-2xl ${className ?? ""}`}
		>
			<Image src={src} alt="" fill className="object-contain" priority />
		</div>
	);
};
