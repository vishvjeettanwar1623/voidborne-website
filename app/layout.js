import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://eclipsestudios.dev"),
  title: "Eclipse Studios — Indie Game Studio",
  description: "Eclipse Studios is an indie game studio forging breathtaking digital worlds. Explore our games, meet the team, and join the community.",
  openGraph: {
    title: "Eclipse Studios — Indie Game Studio",
    description: "Forging new worlds. Explore our games: Voidborne, Iron Reign, Neon Drift.",
    type: "website",
    siteName: "Eclipse Studios",
    images: [{ url: "/images/hero.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eclipse Studios",
    description: "Indie game studio forging breathtaking digital worlds.",
    images: ["/images/hero.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0a0a12" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}

