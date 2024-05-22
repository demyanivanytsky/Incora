import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const roboto = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Incora",
  description: "Incora technical task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={roboto.className}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
