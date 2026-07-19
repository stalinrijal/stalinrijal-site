import { defaultSchema, type Schema } from "hast-util-sanitize";

export const postContentSchema: Schema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "figure", "figcaption", "iframe", "mark"],
  attributes: {
    ...defaultSchema.attributes,
    "*": [...(defaultSchema.attributes?.["*"] ?? []), "className", "style", "id"],
    a: [...((defaultSchema.attributes?.a as string[]) ?? []), "target", "rel"],
    img: [...((defaultSchema.attributes?.img as string[]) ?? []), "alt", "title", "width", "height", "loading"],
    code: [...((defaultSchema.attributes?.code as string[]) ?? []), "className", "dataLanguage", "dataTheme"],
    pre: ["className", "dataLanguage", "dataTheme", "tabIndex"],
    span: ["className", "style", "dataLine", "dataHighlightedLine", "dataRehypePrettyCodeFigure"],
    figure: ["className", "dataRehypePrettyCodeFigure"],
    div: ["className", "dataCallout", "dataVariant", "dataType"],
    ul: ["className", "dataType"],
    li: ["className", "dataType", "dataChecked"],
    input: ["type", "checked", "disabled"],
    iframe: ["src", "width", "height", "frameBorder", "allow", "allowFullScreen", "title", "className"],
  },
  protocols: {
    ...defaultSchema.protocols,
    src: [...((defaultSchema.protocols?.src as string[]) ?? []), "http", "https"],
  },
};
