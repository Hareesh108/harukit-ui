import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col  bg-white text-gray-900">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-lg">
                {/* Image placeholder - uncomment and add your logo */}
                {/* <Image
                  src="/logo/hareesh-bhittam.png"
                  alt="Harukit Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                /> */}
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900">
                  Harukit UI
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  React Components
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/docs"
                className="text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200 relative group"
              >
                Documentation
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link
                href="/components"
                className="text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200 relative group"
              >
                Components
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link
                href="/examples"
                className="text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200 relative group"
              >
                Examples
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link
                href="https://github.com/Hareesh108/harukit-ui"
                target="_blank"
                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 group"
              >
                <svg
                  className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="p-2 rounded-lg text-gray-700 hover:text-yellow-600 hover:bg-gray-100 transition-colors duration-200">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
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
