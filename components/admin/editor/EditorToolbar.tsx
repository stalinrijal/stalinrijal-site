"use client";

import { useRef } from "react";
import type { Editor } from "@tiptap/react";
import { uploadImage } from "./upload-image";

function ToolbarButton({
  onClick,
  active,
  disabled,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`rounded px-2 py-1 text-sm font-medium hover:bg-neutral-800 disabled:opacity-40 ${
        active ? "bg-neutral-800 text-neutral-100" : "text-neutral-400"
      }`}
    >
      {children}
    </button>
  );
}

export function EditorToolbar({ editor }: { editor: Editor | null }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!editor) return null;

  async function handleImagePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const url = await uploadImage(file, "blog-images");
    editor!.chain().focus().setImage({ src: url }).run();
  }

  function promptLink() {
    const previousUrl = editor!.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor!.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor!.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  function promptYoutube() {
    const url = window.prompt("YouTube video URL");
    if (!url) return;
    editor!.chain().focus().setYoutubeVideo({ src: url }).run();
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-neutral-800 p-2">
      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleImagePick} />

      <ToolbarButton title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        B
      </ToolbarButton>
      <ToolbarButton title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        I
      </ToolbarButton>
      <ToolbarButton title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
        S
      </ToolbarButton>
      <ToolbarButton title="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>
        {"</>"}
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-neutral-800" />

      <ToolbarButton title="Heading 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        H1
      </ToolbarButton>
      <ToolbarButton title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        H2
      </ToolbarButton>
      <ToolbarButton title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        H3
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-neutral-800" />

      <ToolbarButton title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        • List
      </ToolbarButton>
      <ToolbarButton title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        1. List
      </ToolbarButton>
      <ToolbarButton title="Task list" active={editor.isActive("taskList")} onClick={() => editor.chain().focus().toggleTaskList().run()}>
        ☑ Tasks
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-neutral-800" />

      <ToolbarButton title="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        Quote
      </ToolbarButton>
      <ToolbarButton title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        Code
      </ToolbarButton>
      <ToolbarButton title="Callout" active={editor.isActive("callout")} onClick={() => editor.chain().focus().toggleCallout({ variant: "info" }).run()}>
        Callout
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-neutral-800" />

      <ToolbarButton
        title="Insert table"
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
      >
        Table
      </ToolbarButton>
      <ToolbarButton title="Insert link" active={editor.isActive("link")} onClick={promptLink}>
        Link
      </ToolbarButton>
      <ToolbarButton title="Insert image" onClick={() => fileInputRef.current?.click()}>
        Image
      </ToolbarButton>
      <ToolbarButton title="Embed YouTube video" onClick={promptYoutube}>
        Video
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-neutral-800" />

      <ToolbarButton title="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
        Undo
      </ToolbarButton>
      <ToolbarButton title="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
        Redo
      </ToolbarButton>
    </div>
  );
}
