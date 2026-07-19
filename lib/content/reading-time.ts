import type { Json } from "@/lib/types/database.types";

const WORDS_PER_MINUTE = 200;

function extractText(node: Json): string {
  if (node === null || typeof node !== "object") return "";
  if (Array.isArray(node)) return node.map(extractText).join(" ");

  const obj = node as { [key: string]: Json | undefined };
  const parts: string[] = [];

  if (typeof obj.text === "string") parts.push(obj.text);
  if (Array.isArray(obj.content)) parts.push(extractText(obj.content));

  return parts.join(" ");
}

export function calculateReadingTime(content: Json): number {
  const text = extractText(content);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
