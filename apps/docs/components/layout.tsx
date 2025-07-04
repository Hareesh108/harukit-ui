import Link from "next/link";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <nav
        style={{
          width: 220,
          background: "#fafafa",
          borderRight: "1px solid #eee",
          padding: 24,
        }}
      >
        <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>
          Components
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li>
            <Link href="/components/accordion">Accordion</Link>
          </li>
          <li>
            <Link href="/components/button">Button</Link>
          </li>
          <li>
            <Link href="/components/card">Card</Link>
          </li>
          <li>
            <Link href="/components/input">Input</Link>
          </li>
          <li>
            <Link href="/components/label">Label</Link>
          </li>
          <li>
            <Link href="/components/tooltip">Tooltip</Link>
          </li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: 32 }}>{children}</main>
    </div>
  );
}
