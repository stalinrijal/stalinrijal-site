import { ContactLinks } from "./ContactLinks";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact">
      <div className="section-inner">
        <h2 className="section-title">Contact Me</h2>
        <div className="contact-grid">
          <ContactLinks />
          <div className="contact-form">
            <div className="form-title">Send a message</div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
