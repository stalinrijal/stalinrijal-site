"use client";

import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import { editorExtensions } from "./extensions";
import { EditorToolbar } from "./EditorToolbar";
import { uploadImage } from "./upload-image";

export function PostEditor({
  content,
  onChange,
}: {
  content: JSONContent;
  onChange: (json: JSONContent) => void;
}) {
  const editor = useEditor({
    extensions: editorExtensions,
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none min-h-[300px] px-4 py-3 focus:outline-none",
      },
      handleDrop(view, event, _slice, moved) {
        if (moved || !event.dataTransfer?.files?.length) return false;
        const file = event.dataTransfer.files[0];
        if (!file.type.startsWith("image/")) return false;
        event.preventDefault();
        uploadImage(file, "blog-images").then((url) => {
          const { schema } = view.state;
          const node = schema.nodes.image.create({ src: url });
          const coords = view.posAtCoords({ left: event.clientX, top: event.clientY });
          const tr = view.state.tr.insert(coords?.pos ?? view.state.selection.from, node);
          view.dispatch(tr);
        });
        return true;
      },
      handlePaste(view, event) {
        const file = Array.from(event.clipboardData?.items ?? [])
          .find((item) => item.type.startsWith("image/"))
          ?.getAsFile();
        if (!file) return false;
        event.preventDefault();
        uploadImage(file, "blog-images").then((url) => {
          const { schema } = view.state;
          const node = schema.nodes.image.create({ src: url });
          const tr = view.state.tr.replaceSelectionWith(node);
          view.dispatch(tr);
        });
        return true;
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getJSON());
    },
  });

  return (
    <div className="rounded-md border border-neutral-700 bg-neutral-950">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
