// layout.tsx — SERVER COMPONENT
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/header/Header";
import "./globals.css";
import { QueryProvider } from "@/lib/reactQuery";
import { CartSyncClient } from "@/components/ui/CartSyncClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeProviderWrapper from "@/components/ui/ThemeProviderWrapper";
import Footer from "@/components/footer/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "PIZZARIUM",
	description: "Best pizza in town",
	icons: { icon: "/logo.png" },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProviderWrapper>
					<QueryProvider>
						<TooltipProvider>
							<div className="px-4 ">
								<Header />
								<div className="pt-8 min-h-screen">{children}</div>
								<Footer />
								<CartSyncClient />
							</div>
						</TooltipProvider>
					</QueryProvider>
				</ThemeProviderWrapper>
			</body>
		</html>
	);
}
