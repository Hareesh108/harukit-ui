"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-b from-yellow-50 to-white dark:from-yellow-900 dark:to-slate-900 p-6 gap-10 overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-400/30 rounded-full blur-3xl"></div>
      </div>

      {/* Plain centered box */}
      <div className="relative z-10 w-[500px] h-[500px] shadow-lg rounded-lg border bg-white flex items-center justify-center">
        {children}
      </div>

      {pathname !== "/components" && (
        <Link
          href="/components"
          className="relative z-10 px-6 py-3 bg-yellow-400 text-white font-medium rounded-lg shadow hover:bg-yellow-500 transition"
        >
          Back
        </Link>
      )}
    </div>
  );
}
