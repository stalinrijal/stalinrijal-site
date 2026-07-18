import { EXPERIENCE } from "@/lib/data/home";

export function Experience() {
  return (
    <section id="experience">
      <div className="section-inner">
        <h2 className="section-title">Work Experience</h2>
        <div className="timeline">
          {EXPERIENCE.map((item) => (
            <div className="timeline-item" key={item.title + item.date}>
              <div className="timeline-dot" />
              <div className="tl-header">
                <div className="tl-title">{item.title}</div>
                <div className="tl-date">{item.date}</div>
              </div>
              <div className="tl-company">{item.company}</div>
              <ul className="tl-bullets">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
