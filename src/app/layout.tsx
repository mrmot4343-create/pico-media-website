import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pico Media | Digital Marketing & Graphic Design",
  description: "Transforming ideas into impactful digital presence. Professional digital marketing and graphic design services with 6+ years of experience.",
  keywords: ["Pico Media", "Digital Marketing", "Graphic Design", "Web Development", "Branding", "Social Media"],
  authors: [{ name: "Pico Media" }],
  icons: {
    icon: "https://res.cloudinary.com/duaec3vl4/image/upload/v1767508906/Picsart_26-01-04_09-40-07-527_ina23d.png",
  },
  openGraph: {
    title: "Pico Media | Digital Marketing & Graphic Design",
    description: "Transforming ideas into impactful digital presence. Professional digital marketing and graphic design services.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pico Media | Digital Marketing & Graphic Design",
    description: "Transforming ideas into impactful digital presence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
