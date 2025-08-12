"use client";

import { Button } from "@repo/ui/button";
import { Rocket, Code, Zap } from "lucide-react";
import { Hero } from "./components/ui/hero";
import { FeatureCard } from "./components/ui/feature-card";
import { Footer } from "./components/ui/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      {/* Hero */}
      <Hero />

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          Why Choose Harukit?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <FeatureCard
            icon={Rocket}
            title="Fast Development"
            description="Quickly build UI components with Tailwind CSS."
          />
          <FeatureCard
            icon={Code}
            title="Clean Code"
            description="Maintainable, type-safe, and reusable components."
          />
          <FeatureCard
            icon={Zap}
            title="Lightning Performance"
            description="Optimized for speed and scalability."
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <h3 className="text-2xl font-semibold mb-6">
          Start building beautiful apps today
        </h3>
        <Button
          appName="web"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl shadow-lg"
        >
          Get Started
        </Button>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
