import "./dom-polyfill";
import { generateHTML } from "@tiptap/core";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Element, Root } from "hast";
import { editorExtensions } from "@/components/admin/editor/extensions";
import { postContentSchema } from "./sanitize-schema";
import type { Json } from "@/lib/types/database.types";

export type Heading = { id: string; text: string; level: number };

function collectHeadings(headings: Heading[]) {
  return () => (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      const match = /^h([1-3])$/.exec(node.tagName);
      const id = node.properties?.id;
      if (match && typeof id === "string") {
        headings.push({ id, text: toString(node), level: Number(match[1]) });
      }
    });
  };
}

export async function renderPostContent(content: Json): Promise<{ html: string; headings: Heading[] }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawHtml = generateHTML(content as any, editorExtensions);
  const headings: Heading[] = [];

  const file = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSlug)
    .use(rehypePrettyCode, { theme: "github-dark", keepBackground: true })
    .use(collectHeadings(headings))
    .use(rehypeSanitize, postContentSchema)
    .use(rehypeStringify)
    .process(rawHtml);

  return { html: String(file), headings };
}
