import type { Metadata, ResolvingMetadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { createClient } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const interLight = localFont({
  src: "./fonts/InterLight.woff",
  variable: "--font-inter-light",
  weight: "100 200",
});
const interRegular = localFont({
  src: "./fonts/InterRegular.woff",
  variable: "--font-inter-regular",
  weight: "100 400 900",
});

export async function generateMetadata(): Promise<Metadata> {
 
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title || "Aleksej Portfolio fallback",
    description: settings.data.meta_description || "Digital Designer fallback",
    openGraph: {
      images: [settings.data.og_image.url || ""],
    },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      
      <body
        className={`${interLight.variable} ${interRegular.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <CustomCursor />
      </body>
      
    </html>
  );
}
