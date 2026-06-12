import { TabsList, TabsTrigger } from "@/components/ui/tabs";

type Category = {
	name: string;
	value: string;
	type: "single" | "multi";
};

type Props = {
	categories: Category[];
};
export default function CustomPizzaTabsTriggers({ categories }: Props) {
	return (
		<TabsList className="w-full">
			{categories.map((cat) => {
				return (
					<TabsTrigger key={cat.value} value={cat.value} className="w-full">
						{cat.name}
					</TabsTrigger>
				);
			})}
		</TabsList>
	);
}
