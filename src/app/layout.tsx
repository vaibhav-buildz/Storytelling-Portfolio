import type { Metadata } from "next";
import { Inter, Cormorant } from "next/font/google";
import "./globals.css";
import SocialSidebar from "@/components/SocialSidebar";
import SecurityFeatures from "@/components/SecurityFeatures";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import BackToTop from "@/components/BackToTop";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant({ subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"], variable: "--font-cormorant" });

export const metadata: Metadata = {
  metadataBase: new URL("https://vaibhavyadav.com"),
  title: "Vaibhav Yadav | Creative Developer",
  description: "Vaibhav Yadav — Creative Developer & Security Analyst. Building immersive web experiences and hunting vulnerabilities.",
  openGraph: {
    title: "Vaibhav Yadav | Creative Developer",
    description: "Vaibhav Yadav — Creative Developer & Security Analyst. Building immersive web experiences and hunting vulnerabilities.",
    images: ["/profile-photo.jpeg"],
    url: "https://vaibhavyadav.com",
    type: "website",
  },
  appleWebApp: {
    title: "Vaibhav",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased bg-[#121212] text-white w-full`} suppressHydrationWarning>
        <Preloader />
        <ScrollProgress />
        <BackToTop />
        <SecurityFeatures />
        <SocialSidebar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
