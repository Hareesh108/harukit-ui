import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-8 text-center border-t">
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} Harukit. Built with ❤️ by Hareesh Bhittam.
      </p>
      <div className="flex justify-center gap-4 mt-4">
        <a
          href="https://github.com/hareesh108"
          className="text-gray-500 hover:text-yellow-500"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com"
          className="text-gray-500 hover:text-yellow-500"
        >
          Twitter
        </a>
      </div>
    </footer>
  );
};
