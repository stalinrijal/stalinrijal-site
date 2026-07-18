"use client";

import { SKILLS } from "@/lib/data/home";
import { useReveal } from "@/lib/hooks/useReveal";

export function Skills() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section id="skills">
      <div className="section-inner">
        <h2 className="section-title">Tech Stack</h2>
        <div className="skills-grid reveal" ref={revealRef}>
          {SKILLS.map((skill) => (
            <div className="skill-card" key={skill.title}>
              <div className="skill-card-header">
                <div className="skill-icon">{skill.icon}</div>
                <div className="skill-card-title">{skill.title}</div>
              </div>
              <div className="skill-tags">
                {skill.tags.map((tag) => (
                  <span className="skill-tag" key={tag}>
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
