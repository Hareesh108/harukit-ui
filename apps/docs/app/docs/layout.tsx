import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { RootProvider } from "fumadocs-ui/provider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <RootProvider>
        <DocsLayout tree={source.pageTree} {...baseOptions}>
          {children}
        </DocsLayout>
      </RootProvider>
    </div>
  );
}
