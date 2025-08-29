"use client";

import { useGetSignaturePizza } from "@/hooks/signature-pizzas/useGetSignaturePizza";
import Image from "next/image";
import { useParams } from "next/navigation";
import RatingStars from "../ui/RatingStars";
import { Clock } from "lucide-react";
import { useState } from "react";
import Quantity from "../ui/Quantity";
import Size from "../ui/Size";
import { Button } from "../ui/button";
import ReviewDetails from "./ReviewDetails";
import FeaturedCarousel from "../ui/FeaturedCarousel";
import { H2, H4, Large, Muted, P, Small } from "../ui/Typography";

type PizzaSize = "small" | "medium" | "large";

function SignaturePizzaDetails() {
  const [size, setSize] = useState<PizzaSize>("small");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const { data: pizza, isLoading, error } = useGetSignaturePizza(id);

  if (isLoading) return <div>Loading...</div>;
  if (error || !pizza) return <div>Pizza not found.</div>;

  const pricePerPizza = pizza.prices[size] ?? 0;
  const totalPrice = (pricePerPizza * quantity).toFixed(2);

  return (
    <div className="flex flex-col gap-16">
      <div className="flex gap-8 pt-8 px-4">
        {/* Left - Image */}
        <Image
          src={pizza.image}
          width={500}
          height={500}
          alt={pizza.name}
          className="rounded-xl object-cover"
        />

        {/* Middle - Info */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
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

          <div>
            <P>{pizza.description}</P>
            <P>
              {pizza.dough} Dough with {pizza.crust} crust and {pizza.sauce}{" "}
              sauce
            </P>
            <P>
              Nutrition: {pizza.calorie.small} - {pizza.calorie.large} Calories
            </P>
          </div>
          <div className="flex flex-col gap-2">
            <H4>Reviews</H4>
            <ReviewDetails reviews={pizza?.reviews} />
          </div>
        </div>

        {/* Right - Controls */}
        <div className="border-2 px-4 py-6 rounded-2xl flex flex-col gap-6 ">
          {/* Size selector */}
          <div>
            <P>Size</P>
            <Size pizza={pizza} size={size} setSize={setSize} />
          </div>

          {/* Quantity selector */}
          <div>
            <P>Quantity</P>
            <Quantity quantity={quantity} setQuantity={setQuantity} />
          </div>

          {/* Customize Section */}
          <div className="flex flex-col ">
            <P>Customize</P>
            <textarea
              placeholder="Add special instructions..."
              className="min-h-[60px] border-2 p-2 rounded-xl focus:border-primary resize-none"
            />
          </div>
          {/* Price & Add to Cart */}
          <div className="flex  items-center mt-4  justify-center">
            <Button>
              <Small>${totalPrice}</Small>
              <Large>Add to Cart</Large>
            </Button>
          </div>
        </div>
      </div>
      <FeaturedCarousel />
    </div>
  );
}

export default SignaturePizzaDetails;
