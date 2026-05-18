import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";
import SiteNavbar from "@/components/SiteNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kiray Putjung Aboriginal Corporation",
  description: "Website for the Kiray Putjung Aboriginal Corporation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-background overflow-x-hidden">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full bg-background overflow-x-hidden`}
        >
        <Providers>
            <div className="min-h-screen w-full bg-background font-sans">
                <SiteNavbar />

                <main className="w-full">
                    {children}
                </main>
            </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
        </body>
        </html>
    );
}
