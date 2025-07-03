import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import fs from "fs/promises";
import path from "path";

export default async function ComponentPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;
  const filePath = path.join(
    process.cwd(),
    "apps/docs/components-docs",
    `${slug}.md`
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
