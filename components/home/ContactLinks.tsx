import { CONTACT_LINKS } from "@/lib/data/home";

export function ContactLinks() {
  return (
    <div className="contact-info">
      <h3>Let&apos;s build something great together.</h3>
      <p>
        Whether you&apos;re looking for a Cloud/DevOps Engineer, want to collaborate on infrastructure challenges, or
        just want to talk shop — my inbox is open.
      </p>
      <div className="contact-links">
        {CONTACT_LINKS.map((link) => (
          <a
            className="contact-link"
            href={link.href}
            key={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
          >
            <div className="contact-link-icon">{link.icon}</div>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
