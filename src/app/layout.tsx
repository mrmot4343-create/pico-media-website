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
  metadataBase: new URL("https://picomedia.sudicorp.com"),

  title: {
    default: "Pico Media | Digital Marketing & Creative Agency",
    template: "%s | Pico Media",
  },

  description:
    "Pico Media is a bilingual digital marketing and creative agency offering branding, web design, content creation, and digital solutions.",

  keywords: [
    "Pico Media",
    "Digital Marketing",
    "Branding",
    "Web Design",
    "Creative Agency",
    "تصميم مواقع",
    "تسويق رقمي",
    "هوية بصرية",
  ],

  authors: [{ name: "Pico Media" }],

  icons: {
    icon: "https://res.cloudinary.com/duaec3vl4/image/upload/v1767589096/Picsart_26-01-04_09-40-07-527_ina23d.png",
  },

  openGraph: {
    title: "Pico Media | Digital Marketing & Creative Agency",
    description:
      "Creative digital agency specializing in branding, web design, and marketing solutions.",
    url: "https://picomedia.sudicorp.com",
    siteName: "Pico Media",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pico Media | Digital Marketing & Creative Agency",
    description:
      "Creative digital agency specializing in branding, web design, and marketing solutions.",
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
