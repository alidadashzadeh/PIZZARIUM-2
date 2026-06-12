import { useEffect, useState } from "react";

export function useAvatarLoaded(avatarUrl?: string) {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!avatarUrl) return setLoaded(false);

		const img = new Image();
		img.src = avatarUrl;
		img.onload = () => setLoaded(true);

		return () => {
			img.onload = null;
		};
	}, [avatarUrl]);

	return loaded;
}
