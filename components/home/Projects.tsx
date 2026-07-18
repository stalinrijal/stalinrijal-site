"use client";

import { PROJECTS } from "@/lib/data/home";
import { useReveal } from "@/lib/hooks/useReveal";

export function Projects() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section id="projects">
      <div className="section-inner">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid reveal" ref={revealRef}>
          {PROJECTS.map((project) => (
            <div className="project-card" key={project.title}>
              <span className="project-emoji">{project.emoji}</span>
              <div className="project-title">{project.title}</div>
              <div className="project-org">{project.org}</div>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span className="project-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
