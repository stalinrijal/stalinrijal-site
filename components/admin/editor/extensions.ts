import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { TableKit } from "@tiptap/extension-table";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Youtube from "@tiptap/extension-youtube";
import { Callout } from "./callout-extension";

export const editorExtensions = [
  StarterKit.configure({
    link: { openOnClick: false, autolink: true },
  }),
  Image,
  Placeholder.configure({ placeholder: "Write your post..." }),
  TableKit.configure({ table: { resizable: true } }),
  TaskList,
  TaskItem.configure({ nested: true }),
  Youtube,
  Callout,
];
