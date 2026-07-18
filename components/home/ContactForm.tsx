"use client";

import { useRef, useState } from "react";

const FORM_ACTION = "https://formspree.io/f/YOUR_FORM_ID";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "success">("idle");
  const [errorText, setErrorText] = useState("⚠ Error — try email directly");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);

    if (FORM_ACTION.includes("YOUR_FORM_ID")) {
      const name = `${data.get("first_name")} ${data.get("last_name")}`;
      const email = data.get("email");
      const subject = encodeURIComponent((data.get("subject") as string) || "Message from portfolio");
      const body = encodeURIComponent(`From: ${name} (${email})\n\n${data.get("message")}`);
      window.location.href = `mailto:stalinrijal.devops@gmail.com?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ACTION, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setErrorText("⚠ Error — try email directly");
        setStatus("error");
      }
    } catch {
      setErrorText("⚠ Error — try email directly");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success visible">
        <div className="check">✅</div>
        <p>Message sent! I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} action={FORM_ACTION} method="POST">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fname">FIRST NAME</label>
          <input type="text" id="fname" name="first_name" placeholder="Jane" required />
        </div>
        <div className="form-group">
          <label htmlFor="lname">LAST NAME</label>
          <input type="text" id="lname" name="last_name" placeholder="Smith" required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">EMAIL</label>
        <input type="email" id="email" name="email" placeholder="jane@company.com" required />
      </div>
      <div className="form-group">
        <label htmlFor="subject">SUBJECT</label>
        <input type="text" id="subject" name="subject" placeholder="Job opportunity / Collaboration / Hello" />
      </div>
      <div className="form-group">
        <label htmlFor="message">MESSAGE</label>
        <textarea id="message" name="message" placeholder="Tell me about the opportunity or project..." required />
      </div>
      <input type="hidden" name="_replyto" value="stalinrijal.devops@gmail.com" />
      <input type="hidden" name="_subject" value="New message from stalinrijal.github.io" />
      <button type="submit" className="btn-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : status === "error" ? errorText : "⟶ SEND MESSAGE"}
      </button>
    </form>
  );
}
