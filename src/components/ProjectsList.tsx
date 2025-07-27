"use client";

import { useState } from "react";
import styles from "./projects.module.css";

export default function ProjectsList({ projects }: { projects: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.projectItems}>
      <h1 className={styles.headline}>Projekte</h1>

      <div className={`${styles.projectList} p-10 pt-0 flex flex-col items-center`}>
        {currentProjects.map((item: any) => (
          <a key={item.id} href={`/projects/${item.uid}`} className={styles.projectLink}>
            <div className={styles.projectCard}>
              {item.data.thumbnail?.url && (
                <img
                  src={item.data.thumbnail.url}
                  alt={item.data.thumbnail.alt || "Projektbild"}
                  className={styles.projectImage}
                />
              )}
              <div className={styles.details}>
                <h3 className={styles.projectTitle}>{item.data.title}</h3>
                <p className={styles.projectDescription}>{item.data.description}</p>
                <span className={styles.projectLink}>Mehr erfahren</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="flex gap-4 mt-6 items-center justify-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-white ${currentPage === 1 ? "bg-gray-500" : "bg-blue-500"}`}
        >
          Zurück
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-white ${currentPage === totalPages ? "bg-gray-500" : "bg-blue-500"}`}
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
