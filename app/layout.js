import "./globals.css";

export const metadata = {
  title: "Eclipse Studios — Indie Game Studio",
  description: "Eclipse Studios is an indie game studio forging breathtaking digital worlds. Explore our games, meet the team, and join the community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
