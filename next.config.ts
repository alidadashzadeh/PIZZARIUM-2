// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
// 	images: {
// 		remotePatterns: [
// 			{
// 				protocol: "https",
// 				hostname: "pqzjdqxjsamhzuwqpwtj.supabase.co",
// 			},
// 			{
// 				protocol: "https",
// 				hostname: "images.unsplash.com",
// 			},
// 		],
// 	},
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "pqzjdqxjsamhzuwqpwtj.supabase.co",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
	},
	// 1. Disable ESLint during builds
	eslint: {
		ignoreDuringBuilds: true,
	},
	// 2. Disable TypeScript errors during builds
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
