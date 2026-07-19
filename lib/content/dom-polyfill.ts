import { JSDOM } from "jsdom";

/**
 * Tiptap's generateHTML() calls document.implementation.createHTMLDocument()
 * internally, which requires a DOM even though rendering happens server-side.
 * Importing this module installs a minimal jsdom-backed document/window once
 * per server process.
 */
if (typeof globalThis.document === "undefined") {
  const dom = new JSDOM("<!DOCTYPE html>");
  globalThis.window = dom.window as unknown as Window & typeof globalThis;
  globalThis.document = dom.window.document;
}
