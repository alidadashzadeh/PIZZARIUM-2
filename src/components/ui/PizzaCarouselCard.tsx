import Image from "next/image";
import RatingStars from "../ui/RatingStars"; // your rating component
import { Button } from "../ui/button";
import Link from "next/link";
import { H4, Muted, P, Small } from "./Typography";

interface SignaturePizzaCardProps {
  pizza: {
    id: string;
    name: string;
    image: string;
    avg_rating: number;
    rating_count: number;
    price: { small: number; medium?: number; large?: number };
    description?: string;
  };
}

export default function PizzaCarouselCard({ pizza }: SignaturePizzaCardProps) {
  return (
    <div className="  rounded-lg shadow-md bg-background p-4 flex flex-col gap-1 items-center m-4">
      <div className="relative w-48 h-48 rounded-lg overflow-hidden">
        <Image
          src={pizza?.image}
          alt={pizza?.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 192px"
          priority
        />
      </div>

      <H4>{pizza.name}</H4>

      <div className="flex items-center gap-2 mt-1">
        <RatingStars rating={pizza.avg_rating} size={4} />
        <Muted>({pizza.rating_count} Reviews)</Muted>
      </div>

      {pizza.price.small && (
        <Small>Starting from ${pizza.price.small.toFixed(2)} (Small)</Small>
      )}

      <div>
        {pizza.description && (
          <P className="line-clamp-1">{pizza.description}</P>
        )}
      </div>

      <Link href={`/signature-pizzas/${pizza?.id}`}>
        <Button
          variant="outline"
          size="sm"
          className="mt-auto"
          // onClick={}
        >
          View Details
        </Button>
      </Link>
    </div>
  );
}
