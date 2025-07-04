import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col  bg-white text-gray-900">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo/hareesh-bhittam.png"
            alt="Harukit Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-bold text-2xl text-yellow-500">Harukit UI</span>
        </div>
        <nav className="space-x-6 text-sm font-medium">
          <Link href="/docs" className="hover:text-yellow-500 transition">
            Docs
          </Link>
          <Link
            href="https://github.com/Hareesh108/harukit-ui"
            target="_blank"
            className="hover:text-yellow-500 transition"
          >
            GitHub
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-b from-yellow-50 to-white">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Build Modern React Apps <br /> with{" "}
          <span className="text-yellow-500">Harukit UI</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">
          A modern CLI tool & React component library — copy, customize, and
          control every piece of your UI. Inspired by{" "}
          <code className="bg-gray-100 px-1 py-0.5 rounded">shadcn/ui</code>,
          built for your workflow.
        </p>
        <pre className="bg-black text-green-400 text-sm text-left p-4 rounded-lg mb-8 w-full max-w-xl">
          npx harukit@latest init --yes
        </pre>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <Link
            href="/docs"
            className="px-8 py-4 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/Hareesh108/harukit-ui"
            target="_blank"
            className="px-8 py-4 border-2 border-yellow-500 text-yellow-500 rounded-lg font-semibold hover:bg-yellow-500 hover:text-black transition"
          >
            View on GitHub
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-24 bg-gray-50 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Why Choose Harukit?</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Ship faster with fully customizable, beautiful, and accessible React
            components — your code, your control.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            <div className="bg-white shadow-lg p-6 rounded-lg border-t-4 border-yellow-500">
              <h3 className="text-xl font-semibold mb-2">🧩 Copy & Own</h3>
              <p className="text-gray-600">
                Components live in your codebase — no vendor lock-in. Tweak
                every line to match your design system perfectly.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg border-t-4 border-yellow-500">
              <h3 className="text-xl font-semibold mb-2">
                🌈 Beautiful & Accessible
              </h3>
              <p className="text-gray-600">
                Pre-built with modern styling and a11y best practices. Focus on
                features, not boilerplate.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg border-t-4 border-yellow-500">
              <h3 className="text-xl font-semibold mb-2">⚡️ CLI Powered</h3>
              <p className="text-gray-600">
                Add, update, or remove components instantly with the Harukit
                CLI. Simple. Fast. Flexible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500 bg-gray-100 border-t border-gray-200">
        © {new Date().getFullYear()} Harukit UI — Crafted by Hareesh Bhittam 🚀
      </footer>
    </main>
  );
}
