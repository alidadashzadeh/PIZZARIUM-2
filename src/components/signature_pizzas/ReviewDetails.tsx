import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RatingStars from "../ui/RatingStars";
import { Muted, Small } from "../ui/Typography";

export default function ReviewDetails({ reviews }) {
  console.log(reviews);

  return (
    <div className="flex flex-col gap-4">
      {reviews?.map((review) => {
        return (
          <div key={review?.id}>
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage
                  src={review?.user?.avatar}
                  className="h-8 w-8 object-cover object-center rounded-full"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex gap-8 w-full items-center">
                <Small>{review?.user?.full_name}</Small>
                <RatingStars rating={review?.rating} size={4} />
              </div>
            </div>
            <Muted>{review.created_at}</Muted>
            <Muted>{review.review_text}</Muted>
          </div>
        );
      })}
    </div>
  );
}
