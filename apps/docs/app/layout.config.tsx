import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center gap-3 px-2 py-1">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-xl shadow-lg ring-2 ring-yellow-200/30 hover:ring-yellow-200/50 transition-all duration-200 hover:scale-105">
          {/* Image placeholder - uncomment and add your logo */}
          {/* <Image
                  src="/logo/hareesh-bhittam.png"
                  alt="Harukit Logo"
                  width={40}
                  height={40}
                  className="rounded-xl"
                /> */}
          <span className="text-white font-bold text-xl tracking-tight">H</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            Harukit UI
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Documentation
          </span>
        </div>
      </div>
    ),
  },
  githubUrl: "https://github.com/Hareesh108/harukit-ui",

  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [],
};
