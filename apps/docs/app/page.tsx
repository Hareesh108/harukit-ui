import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <h1>Welcome to Harukit UI</h1>
      <p>
        Harukit UI is a modern React component library for building beautiful
        and accessible web apps.
      </p>
      <h2>About</h2>
      <p>
        This project provides a set of customizable UI components. Browse the
        docs using the sidebar.
      </p>
      <p>
        <Link href="https://github.com/your-repo">GitHub Repo</Link>
      </p>
    </>
  );
}
