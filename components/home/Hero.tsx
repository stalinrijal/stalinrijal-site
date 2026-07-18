import Image from "next/image";
import { FloatingKeywords } from "./FloatingKeywords";

export function Hero() {
  return (
    <section id="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-tag">Available for opportunities · Toronto, Canada 🍁</div>
          <h1 className="hero-name">
            <span className="line1">Stalin</span>
            <br />
            <span className="line2">Rijal</span>
          </h1>
          <div className="hero-role">
            Cloud Engineer<span className="sep">·</span>SRE<span className="sep">·</span>DevOps
          </div>
          <p className="hero-desc">
            Certified DevOps Engineer with 5+ years of experience building, automating, and securing scalable cloud
            infrastructure. I focus on creating reliable, secure, and efficient systems using modern DevOps
            practices, helping teams deliver faster without compromising quality or compliance.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              ↳ Let&apos;s Talk
            </a>
            <a href="#experience" className="btn-secondary">
              View My Work →
            </a>
          </div>
        </div>

        <div className="hero-image-wrap">
          <FloatingKeywords />
          <div className="hero-image-frame">
            <Image
              className="hero-avatar"
              src="/photo.jpg"
              alt="Stalin Rijal"
              width={280}
              height={280}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
