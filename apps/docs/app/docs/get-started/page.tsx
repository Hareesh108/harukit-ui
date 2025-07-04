export default function GetStartedPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Get Started</h1>
      <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
        Welcome to Harukit UI! Follow these steps to install and use the
        component library in your project.
      </p>
      <h2 className="text-xl font-semibold mb-2">Installation</h2>
      <pre className="bg-black text-green-400 text-sm p-4 rounded mb-4">
        npx harukit@latest init --yes
      </pre>
      <p className="mb-2">
        After running the command, you can start using Harukit UI components in
        your React project.
      </p>
    </section>
  );
}
