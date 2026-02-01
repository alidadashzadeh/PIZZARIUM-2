"use client";

import { useGetSignaturePizzaDetails } from "@/hooks/signature-pizzas/useGetSignaturePizza";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Clock } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import RatingStars from "../ui/RatingStars";
import Quantity from "../ui/Quantity";
import Size from "../ui/Size";
import ReviewDetails from "./ReviewDetails";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { H2, H4, Large, Muted, P, Small } from "../ui/Typography";

import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";

type PizzaSize = "small" | "medium" | "large";

function SignaturePizzaDetails() {
  const router = useRouter();

  const { id, slug } = useParams<{
    id: string;
    slug: string;
  }>();
  const { data: pizza, isLoading, error } = useGetSignaturePizzaDetails(id);

  const addItem = useCartStore((s) => s.addItem);

  const [size, setSize] = useState<PizzaSize>("small");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!pizza) return;

    if (slug !== pizza.slug) {
      router.replace(`/signature-pizzas/${pizza.id}/${pizza.slug}`, {
        scroll: false,
      });
    }
  }, [pizza, slug, router]);

  const pricePerPizza = useMemo(
    () => pizza?.price[size] ?? 0,
    [pizza?.price, size]
  );

  const totalPrice = useMemo(
    () => (pricePerPizza * quantity).toFixed(2),
    [pricePerPizza, quantity]
  );

  const cartItem = useMemo(
    () => ({
      ...pizza,
      size,
      quantity,
      type: "signature" as const,
    }),
    [pizza, size, quantity]
  );

  const handleAddToCart = useCallback(() => {
    addItem(cartItem);
    console.log(cartItem);
  }, [cartItem, addItem]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !pizza) return <div>Pizza not found.</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-4 ">
      {/* Image */}
      <div className="">
        <Image
          src={pizza.image}
          width={500}
          height={500}
          alt={pizza.name}
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <H2>{pizza.name}</H2>
          <div className="flex gap-2 items-center text-muted-foreground">
            <Clock />
            <Small>{pizza.prep_time_minutes} mins</Small>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <RatingStars rating={pizza.avg_rating} size={6} />
          <Muted>({pizza.rating_count} Reviews)</Muted>
        </div>

        <Muted>{pizza.description}</Muted>

        <div>
          <Large>Recipe</Large>
          <Muted>
            {pizza.dough} dough with {pizza.crust} crust and {pizza.sauce} sauce
            on {pizza.cheese} cheese
          </Muted>
        </div>

        <div>
          <Large>Toppings</Large>
          <div className="flex gap-2">
            {pizza.ingredients.map((ing) => (
              <div
                key={ing.id}
                className="flex gap-2 px-2 rounded text-black"
                style={{ backgroundColor: `#${ing.background_color}` }}
              >
                <span>{ing.name}</span>
                <span>{ing.emoji}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Large>Nutrition</Large>
          <P>
            {pizza.calorie.small} – {pizza.calorie.large} Calories
          </P>
        </div>

        <div>
          <H4>Reviews</H4>
          <ReviewDetails reviews={pizza.reviews} />
        </div>
      </div>

      {/* Controls */}
      <Card className="w-full lg:w-80 px-2 py-4">
        <CardContent className="flex flex-col gap-4">
          <div>
            <P>Size</P>
            <Size pizza={pizza} size={size} setSize={setSize} />
          </div>

          <div>
            <P>Quantity</P>
            <Quantity quantity={quantity} setQuantity={setQuantity} />
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <P>Total:</P>
              <Large>${totalPrice}</Large>
            </div>

            <Button size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignaturePizzaDetails;
