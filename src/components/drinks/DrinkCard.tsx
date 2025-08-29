"use client";

import Image from "next/image";
import { H3, H4, Large, P, Small } from "../ui/Typography";
import { Button } from "../ui/button";

type Drink = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
};

type DrinkCardProps = {
  drink: Drink;
};

export default function DrinkCard({ drink }: DrinkCardProps) {
  return (
    <div className="flex flex-col gap-2 relative justify-center items-center rounded-xl pb-4 border-2 hover:border-primary">
      <div className="relative w-44 aspect-square rounded-md overflow-hidden filter drop-shadow-[4px_4px_10px_rgba(0,0,0,0.5)]">
        <Image src={drink?.image} alt="Pizza" width={196} height={196} />
      </div>
      <H4>{drink.name}</H4>
      <P className="px-4 line-clamp-1"> {drink?.description}</P>
      <P className="flex gap-2">{drink?.price} $</P>
      <Button
        className="z-1000 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        variant="default"
        size="sm"
      >
        <Large> Add to cart</Large>
      </Button>
    </div>
  );
}
