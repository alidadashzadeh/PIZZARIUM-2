import Image from "next/image";
import React from "react";

export default function HeroImage() {
	return (
		<div className="relative w-auto h-auto overflow-visible ">
			{/* Hero Image */}

			<div className="relative w-[280px] sm:w-[350px] md:w-[400px] lg:w-[500px] aspect-square z-20 mx-auto">
				<div
					className="absolute -top-6 sm:-top-8 md:-top-12 lg:-top-16 -left-6 sm:-left-8 md:-left-12 lg:-left-20 w-[130%] sm:w-[135%] md:w-[140%] xl:w-[150%] aspect-square bg-primary opacity-80 shadow-[0_80px_140px_rgba(0,0,0,0.25)] z-0"
					style={{
						borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
					}}
				/>
				<Image
					src="/hero/hero.avif"
					alt="Hero image"
					fill
					className="object-cover drop-shadow-2xl"
					priority
				/>
			</div>

			<Piece
				className="-bottom-6 sm:-bottom-12 md:-bottom-16 lg:-bottom-20 -left-4 sm:-left-8 md:-left-12 lg:-left-16 animate-piece-bl animate-float1"
				src="/hero/tomato.avif"
			/>

			<Piece
				className="-top-12 sm:-top-20 md:-top-28 lg:-top-36 -left-2 sm:-left-4 md:-left-8 lg:-left-12 animate-piece-tl animate-float3"
				src="/hero/mushroom.avif"
			/>

			<Piece
				className="-top-12 sm:-top-20 md:-top-28 lg:-top-36 -right-2 sm:-right-4 md:-right-8 lg:-right-12 animate-piece-tr animate-float2"
				src="/hero/olive.avif"
			/>

			<Piece
				className="-bottom-1 sm:-bottom-2 md:-bottom-4 lg:-bottom-6 -right-8 sm:-right-12 md:-right-16 lg:-right-20 animate-piece-br animate-float2"
				src="/hero/spinach.avif"
			/>

			<Piece
				className="bottom-1/2 sm:bottom-1/2 md:bottom-1/2 lg:bottom-1/2 -right-8 sm:-right-12 md:-right-16 lg:-right-20 animate-piece-mr animate-float3"
				src="/hero/basil.avif"
			/>

			<Piece
				className="bottom-1/2 sm:bottom-1/2 md:bottom-1/2 lg:bottom-1/2 -left-8 sm:-left-12 md:-left-16 lg:-left-20 animate-piece-ml animate-float1"
				src="/hero/cheese.avif"
			/>

			<Piece
				className="-bottom-12 sm:-bottom-20 md:-bottom-28 lg:-bottom-36 left-1/2 sm:left-1/2 md:left-1/2 lg:left-1/2 animate-piece-mb animate-float2"
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
			className={`absolute w-[64px] md:w-[128px] aspect-square z-20 drop-shadow-2xl ${className ?? ""}`}
		>
			<Image src={src} alt="" fill className="object-contain" priority />
		</div>
	);
};
