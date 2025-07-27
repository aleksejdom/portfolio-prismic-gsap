import { createClient } from "@/prismicio";
import ProjectsList from "@/components/ProjectsList";

export const revalidate = 60; // ISR: alle 60 Sekunden neu generieren

export default async function ProjectsPage() {
  const client = createClient();
  const allProjects = await client.getAllByType("projects");

  return <ProjectsList projects={allProjects} />;
}
