import type { Metadata, ResolvingMetadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { createClient } from "@/prismicio";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
 
  const client = createClient();
  const page = await client.getSingle("settings");

  return {
    title: page.data.site_title || "Aleksej Portfolio fallback",
    description: page.data.meta_description || "Digital Designer fallback",
    openGraph: {
      images: [page.data.og_image.url || ""],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <header>Header</header> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
     {/*  <footer>Footer</footer> */}
    </html>
  );
}
