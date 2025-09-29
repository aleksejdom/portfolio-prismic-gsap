// app/projects/[id]/page.tsx
import type { Metadata, ResolvingMetadata, PageProps } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import SimilarProjects from "@/components/SimilarProjects";

export const dynamic = "force-dynamic";
export const revalidate = 60;

type Params = { id: string };

// --- SEO ---
export async function generateMetadata(
  { params }: PageProps<Params>,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const client = createClient();

  try {
    const project = await client.getByUID("projects", id);

    return {
      title: project.data.meta_title || project.data.title || "Projektseite",
      description:
        project.data.meta_description ||
        project.data.description ||
        "Details zu diesem Projekt.",
      openGraph: {
        title: project.data.meta_title || project.data.title,
        description:
          project.data.meta_description || project.data.description,
        images: [
          {
            url: project.data.meta_image?.url || "/default-og-image.jpg",
            alt: project.data.meta_image?.alt || "Projektbild",
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
export default async function ProjectPage(
  { params }: PageProps<Params>
) {
  const { id } = await params;
  const client = createClient();

  try {
    const project = await client.getByUID("projects", id);

    if (!project) {
      notFound();
    }

    return (
      <main>
        <div className="project-intro">
          <h1>{project.data.title}</h1>
          <p>{project.data.description}</p>
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
