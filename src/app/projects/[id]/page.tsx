// src/app/projects/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import SimilarProjects from "@/components/SimilarProjects";

export const revalidate = 60;

type RouteProps = {
  // In Next.js 15 sind params (und ggf. searchParams) Promises
  params: Promise<{ id: string }>;
  // Optional, falls genutzt:
  // searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

// --- SEO ---
export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { id } = await params; // params auflösen
  const client = createClient();

  try {
    const project = await client.getByUID("projects", id);

    const title =
      (project.data.meta_title as string | undefined) ||
      (project.data.title as string | undefined) ||
      "Projektseite";

    const description =
      (project.data.meta_description as string | undefined) ||
      (project.data.description as string | undefined) ||
      "Details zu diesem Projekt.";

    return {
      title,
      description,
      openGraph: {
        title:
          (project.data.meta_title as string | undefined) ||
          (project.data.title as string | undefined) ||
          title,
        description:
          (project.data.meta_description as string | undefined) ||
          (project.data.description as string | undefined) ||
          description,
        images: [
          {
            url:
              (project.data.meta_image?.url as string | undefined) ||
              "/default-og-image.jpg",
            alt:
              (project.data.meta_image?.alt as string | undefined) ||
              "Projektbild",
          },
        ],
      },
    };
  } catch {
    return {
      title: "Projekt nicht gefunden",
      description: "Das angeforderte Projekt konnte nicht gefunden werden.",
    };
  }
}

// --- Page ---
export default async function ProjectPage({ params }: RouteProps) {
  const { id } = await params; // Promise auflösen
  const client = createClient();

  try {
    const project = await client.getByUID("projects", id);
    if (!project) notFound();

    return (
      <main>
        <div className="project-intro">
          <h1>{project.data.title as string}</h1>
          <p>{project.data.description as string}</p>
        </div>

        <SliceZone slices={project.data.slices} components={components} />

        <SimilarProjects
          currentProjectId={project.id}
          category={project.data.kategorie}
        />
      </main>
    );
  } catch {
    notFound();
  }
}
