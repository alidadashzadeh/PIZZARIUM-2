import { Clock, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import RatingStars from "../ui/RatingStars";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "../ui/badge";
import { Pizza } from "@/types/pizza";
import { H3, H4, Muted, P, Small } from "../ui/Typography";

type PizzaCardProps = {
  pizza: Pizza;
};

export default function SignaturePizzasCard({ pizza }: PizzaCardProps) {
  return (
    <Link
      href={`/signature-pizzas/${pizza.id}`}
      className="flex flex-col gap-2 relative justify-center items-center rounded-xl pb-4 border-2 hover:border-primary"
    >
      <Image src={pizza?.image} alt="Pizza" width={240} height={240} />
      <H3>{pizza.name}</H3>
      <div className="flex gap-4 items-center">
        <RatingStars rating={pizza?.avg_rating} size={4} />
        <Muted>({pizza?.rating_count} reviews)</Muted>
      </div>
      <P className="px-4 line-clamp-1"> {pizza?.description}</P>
      <P className="flex gap-2">
        Starting from <span className="text-lg">{pizza?.prices?.small} $</span>
      </P>
      <div className="flex items-center gap-16">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <Clock />
              <Small>{pizza?.prep_time_minutes} min</Small>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="start">
            <Badge variant="default">
              <Small>Prep time</Small>
            </Badge>
          </TooltipContent>
        </Tooltip>
        <Button
          className="z-1000 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          variant="default"
          size="sm"
        >
          <Small>Quick Add</Small>
        </Button>
      </div>
    </Link>
  );
}
