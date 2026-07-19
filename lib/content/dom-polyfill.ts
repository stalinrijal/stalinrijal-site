import { parseHTML } from "linkedom";

/**
 * Tiptap's generateHTML() calls document.implementation.createHTMLDocument()
 * internally, which requires a DOM even though rendering happens server-side.
 * Importing this module installs a minimal linkedom-backed document/window once
 * per server process. Uses linkedom instead of jsdom: jsdom's HTML-parsing
 * dependency chain (html-encoding-sniffer -> @exodus/bytes) is ESM-only and
 * breaks Node's require() when jsdom is externalized in Vercel's runtime.
 */
if (typeof globalThis.document === "undefined") {
  const { window } = parseHTML("<!DOCTYPE html><html><head></head><body></body></html>");
  const doc = window.document as unknown as Document;
  // linkedom doesn't implement DOMImplementation; Tiptap only uses
  // createHTMLDocument() as a scratch container, so returning the same
  // document is safe (avoids cross-realm node ownership mismatches).
  Object.defineProperty(doc, "implementation", {
    value: { createHTMLDocument: () => doc },
  });
  globalThis.window = window as unknown as Window & typeof globalThis;
  globalThis.document = doc;
}
