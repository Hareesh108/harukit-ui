import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import fs from "fs/promises";
import path from "path";

export default async function ComponentPage({
  params,
}: {
  params: { slug: string };
}) {
  const filePath = path.join(
    process.cwd(),
    "apps/docs/components-docs",
    `${params.slug}.md`
  );
  let content = "";
  try {
    content = await fs.readFile(filePath, "utf8");
  } catch (e) {
    notFound();
  }
  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
