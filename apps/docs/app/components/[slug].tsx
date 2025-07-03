import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default async function ComponentDocPage({
  params,
}: {
  params: { slug: string };
}) {
  const filePath = path.join(
    process.cwd(),
    "apps/docs/app/components",
    `${params.slug}.md`
  );
  let content = "";
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch (e) {
    notFound();
  }
  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
