"use client";

import { CERTIFICATIONS } from "@/lib/data/home";
import { useReveal } from "@/lib/hooks/useReveal";

export function Certifications() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section id="certifications">
      <div className="section-inner">
        <h2 className="section-title">Certifications</h2>
        <div className="certs-grid reveal" ref={revealRef}>
          {CERTIFICATIONS.map((cert) => {
            const inner = (
              <>
                <div className={`cert-badge ${cert.colorClass}`}>{cert.badge}</div>
                <div className="cert-info">
                  <p>{cert.title}</p>
                  <span>{cert.issuer}</span>
                </div>
              </>
            );
            return (
              <div className="cert-card" key={cert.title}>
                {cert.href ? (
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "contents", textDecoration: "none", color: "inherit" }}
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
