import type { Metadata } from "next";
import { Inter, Cormorant } from "next/font/google";
import "./globals.css";
import SocialSidebar from "@/components/SocialSidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant({ subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"], variable: "--font-cormorant" });

export const metadata: Metadata = {
  title: "Vaibhav Yadav | Creative Developer",
  description: "I break things to build them better. Creative Developer and Bug Bounty Hunter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased bg-[#121212] text-white w-full`}>
        <SocialSidebar />
        {children}
      </body>
    </html>
  );
}
