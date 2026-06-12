import { H1, H4, P } from "../ui/Typography";
import { MapPin, Clock, Phone } from "lucide-react";

const locations = [
	{
		name: "Downtown Toronto",
		address: "123 Queen St W, Toronto, ON",
		phone: "(416) 123-4567",
		hours: "11:00 AM - 11:00 PM",
	},
	{
		name: "North York",
		address: "456 Yonge St, Toronto, ON",
		phone: "(416) 987-6543",
		hours: "11:00 AM - 11:00 PM",
	},
];

export default function Locations() {
	return (
		<section className="mt-32 py-24">
			{/* Header */}
			<div className="text-center max-w-2xl mx-auto space-y-4">
				<H4>Visit Us</H4>

				<H1 className="text-primary text-5xl md:text-6xl">Our Locations</H1>

				<P>
					Find us in Toronto — visit one of our branches or order fresh pizza
					for delivery.
				</P>
			</div>

			{/* Content */}
			<div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
				{/* Map */}
				<div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
					<iframe
						src="https://maps.google.com/maps?q=Toronto&t=&z=12&ie=UTF8&iwloc=&output=embed"
						className="w-full h-full border-0"
						loading="lazy"
					/>
				</div>

				{/* Location cards */}
				<div className="space-y-6">
					{locations.map((loc, i) => (
						<div
							key={i}
							className="p-6 rounded-xl bg-primary/5 hover:bg-primary/10 transition"
						>
							<h3 className="font-semibold text-xl mb-3">{loc.name}</h3>

							<div className="space-y-2 text-sm">
								<p className="flex items-center gap-2">
									<MapPin className="w-4 h-4 text-primary" />
									{loc.address}
								</p>

								<p className="flex items-center gap-2">
									<Phone className="w-4 h-4 text-primary" />
									{loc.phone}
								</p>

								<p className="flex items-center gap-2">
									<Clock className="w-4 h-4 text-primary" />
									{loc.hours}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
