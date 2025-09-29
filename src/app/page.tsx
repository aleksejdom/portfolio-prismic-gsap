import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";  

export const dynamic = "force-dynamic"; // Verhindert statisches Caching

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home");

  return (
      <main>
        <SliceZone slices={page.data.slices} components={components} />
      </main>  
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home");

  return {
    title: page.data.meta_title || "Aleksej Domovec",
    description: page.data.meta_description || "Digital Designer",
    robots: {
      index: false,
      follow: false,
    },
  };
}
