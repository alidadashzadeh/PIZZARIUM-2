export interface ReviewProps {
	text: string;
	rating: number;
	created_at: string;
	profiles: {
		avatar: string;
		username: string;
	};
}
