import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://picomedia.sudicorp.com"),
  title: {
    default: "Pico Media | Digital Marketing & Creative Agency",
    template: "%s | Pico Media",
  },
  description:
    "Pico Media is a bilingual digital marketing and creative agency offering branding, web design, content creation, and digital solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black text-white`}>
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
