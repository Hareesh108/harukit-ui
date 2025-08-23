"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const buttonLinks = [
  { label: "Alert", href: "components/alert", variant: "default" },
  { label: "Button", href: "components/button", variant: "secondary" },
  { label: "Card", href: "components/card", variant: "outline" },
  { label: "Input", href: "components/input", variant: "ghost" },
  { label: "Label", href: "components/label", variant: "ghost" },
  { label: "Tooltip", href: "components/tooltip", variant: "ghost" },
];

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4">
        {buttonLinks.map((btn, idx) => (
          <Button
            key={idx}
            variant="outline"
            className="w-40 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => router.push(btn.href)}
          >
            {btn.label}
          </Button>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Link
          href="/"
          className="relative z-10 px-6 py-3 bg-yellow-400 text-white font-medium rounded-lg shadow hover:bg-yellow-500 transition"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
