import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import RatingStars from "../ui/RatingStars";
import { Card, CardContent } from "@/components/ui/card";

import { H3, Muted, P, Small } from "../ui/Typography";
import { SignaturePizza } from "@/types/pizzaType";
import { useCartStore } from "@/store/useCartStore";

type SignaturePizzaCardProps = {
  pizza: SignaturePizza;
};

export default function SignaturePizzasCard({
  pizza,
}: SignaturePizzaCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <>
      <Card>
        <CardContent className="relative flex flex-col gap-2">
          <Image src={pizza?.image} alt="Pizza" width={240} height={240} />
          <H3>{pizza.name}</H3>
          <div className="flex gap-4 items-center">
            <RatingStars rating={pizza?.avg_rating} size={4} />
            <Muted>({pizza?.rating_count} reviews)</Muted>
          </div>
          <P className="pr-4 line-clamp-1"> {pizza?.description}</P>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Clock />
            <Small>{pizza?.prep_time_minutes} min</Small>
          </div>

          <div className="flex justify-between">
            <P className="flex gap-2">
              Starting from
              <span className="text-lg">{pizza?.price?.small} $</span>
            </P>
            <Link href={`/signature-pizzas/${pizza.id}`}>
              <Button className="cursor-pointer" variant="outline" size="sm">
                <Small>Customize</Small>
              </Button>
            </Link>
            <Button
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();

                // add to cart logic here
                addItem({ ...pizza, type: "signature", size: "small" });
                // console.log({ ...pizza, type: "signature" });
              }}
              variant="default"
              size="sm"
            >
              <Small>Quick Add</Small>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
