import { ComponentFile } from "../registry/types";

export const COMPONENTS = [
  {
    name: "button",
    description: "Versatile button with multiple variants",
    category: "Form",
  },
  {
    name: "card",
    description: "Container for content with header, content, and footer",
    category: "Layout",
  },
  { name: "input", description: "Form input field", category: "Form" },
  {
    name: "label",
    description: "Form label with accessibility features",
    category: "Form",
  },
  { name: "tooltip", description: "Hover tooltips", category: "Feedback" },
];

function toRawGithubUrl(url: string) {
  return url
    .replace("https://github.com/", "https://raw.githubusercontent.com/")
    .replace("/blob/", "/");
}

const githubBase =
  "https://github.com/Hareesh108/harukit-ui/blob/main/apps/web/registry/ui";

export function makeFile(
  folder: string,
  name: string,
  type: ComponentFile["type"]
): ComponentFile {
  const blobUrl = `${githubBase}/${folder}/${name}`;
  return {
    name,
    content: "",
    path: toRawGithubUrl(blobUrl),
    type,
  };
}
