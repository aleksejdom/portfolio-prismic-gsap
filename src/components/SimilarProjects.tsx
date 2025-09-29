import { createClient } from "@/prismicio";
import styles from "./SimilarProjects.module.css";

interface SimilarProjectsProps {
  currentProjectId: string;
  category: any;
}

export default async function SimilarProjects({
  currentProjectId,
  category,
} : SimilarProjectsProps): Promise<JSX.Element> {
  const client = createClient();

  try {
    const allProjects = await client.getAllByType("projects");

    const similarProjects = allProjects
      .filter((project) => {
        const projectCategory = project.data.kategorie?.trim().toLowerCase();
        const currentCategory = category?.trim().toLowerCase();
        return projectCategory === currentCategory && project.id !== currentProjectId;
      })
      .slice(0, 3); // Maximal 3 Projekte anzeigen

    if (similarProjects.length === 0) {
      return <></>;
    }

    // Bestimme die dynamische Klasse
    const itemClass = styles[`item${similarProjects.length}`] || "";

    return (
      <div className={styles.similarProjects}>
        <div className={styles.layout}>
          <p className={styles.headline}>Ähnliche Projekte</p>
          <div className={`${styles.projectList} ${itemClass}`}>
            {similarProjects.map((project) => (
               <a href={`/projects/${project.uid}`} className={styles.projectLink}>
              <div key={project.id} className={styles.projectCard}>
                {project.data.thumbnail?.url && (
                  <img
                    src={project.data.thumbnail.url}
                    alt={project.data.thumbnail.alt || "Projektbild"}
                    className={styles.projectImage}
                  />
                )}
                <div className={styles.details}>
                  <h3 className={styles.projectTitle}>{project.data.title}</h3>
                  <p className={styles.projectDescription}>{project.data.description}</p>
                  <span className={styles.projectLink}>
                    Mehr erfahren
                  </span>
                </div>
              </div>
              </a>
            ))}
          </div>
          <a href="/projects" className={styles.btnAll}>Alle Projekte</a>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Fehler beim Abrufen ähnlicher Projekte:", error);
    return <p>Ähnliche Projekte konnten nicht geladen werden.</p>;
  }
}
