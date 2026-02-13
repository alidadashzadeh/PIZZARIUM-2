import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoader() {
	return (
		<div className="flex w-fit items-center gap-4">
			<Skeleton className="size-10 shrink-0 rounded-full" />
			<div className="grid gap-2">
				<Skeleton className="h-10 w-[100px]" />
			</div>
		</div>
	);
}
