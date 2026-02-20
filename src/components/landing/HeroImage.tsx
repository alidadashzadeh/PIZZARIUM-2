import Image from "next/image";
import React from "react";

export default function HeroImage() {
	return (
		<div className="relative w-[500px] overflow-visible ">
			<div
				className="absolute -top-48 -left-64 w-[1000px] h-[1000px] bg-orange-400 opacity-80 shadow-[0_80px_140px_rgba(0,0,0,0.25)] z-0"
				style={{
					borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
				}}
			/>

			{/* Main Image */}
			<div className="relative w-[500px] aspect-square z-20">
				<Image
					src="/hero/hero.avif"
					alt="Hero image"
					fill
					className="object-cover drop-shadow-2xl"
					priority
				/>
			</div>

			{/* Tomato */}
			<Piece
				className="-bottom-20 -left-16 animate-piece-bl animate-float1"
				src="/hero/tomato.avif"
			/>

			{/* Mushroom */}
			<Piece
				className="-top-40 -left-10 animate-piece-tl animate-float3"
				src="/hero/mushroom.avif"
			/>

			{/* Olive */}
			<Piece
				className="-top-40 -right-10 animate-piece-tr animate-float2"
				src="/hero/olive.avif"
			/>

			{/* Spinach */}
			<Piece
				className="-bottom-4 -right-40 animate-piece-br animate-float2"
				src="/hero/spinach.avif"
			/>

			{/* Basil */}
			<Piece
				className="bottom-1/2 -right-40 animate-piece-mr animate-float3"
				src="/hero/basil.avif"
			/>
			{/* cheese */}
			<Piece
				className="bottom-1/2 -left-40 animate-piece-ml animate-float1"
				src="/hero/cheese.avif"
			/>
			{/* pineapple */}
			<Piece
				className="-bottom-40 left-1/2 animate-piece-mb animate-float2"
				src="/hero/pineapple.avif"
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
