// layout.tsx — SERVER COMPONENT
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { QueryProvider } from "@/lib/reactQuery";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeProviderWrapper from "@/components/ui/ThemeProviderWrapper"; // client component

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
              <div className="px-4">
                <Header />
                <div className="pt-8">{children}</div>
              </div>
            </TooltipProvider>
          </QueryProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
