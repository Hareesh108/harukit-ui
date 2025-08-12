import React from "react";

export const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-yellow-100 to-white py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-yellow-500">Harukit</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Build beautiful UI components faster with our modern React + Tailwind
          kit.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#get-started"
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
          >
            Get Started
          </a>
          <a
            href="#docs"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            View Docs
          </a>
        </div>
      </div>
    </section>
  );
};
