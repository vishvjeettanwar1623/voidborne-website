"use client";

import { useState, useRef, useEffect } from "react";

/* ─────────── GAME DATA ─────────── */
const GAMES = [
  {
    id: "voidborne",
    title: "VOIDBORNE",
    genre: "SCI-FI RPG",
    tagline: "Step beyond the rift. Survive what awaits.",
    description: "Explore fractured dimensions, forge alliances with alien civilizations, and unravel the mystery of the Void — a dark energy consuming reality itself. 60+ hours of story-driven gameplay.",
    rating: "9.2",
    price: "$49.99",
    year: "2026",
    status: "AVAILABLE NOW",
    platforms: ["PC", "PS5", "XBOX"],
    players: "127K active",
    image: "/images/voidborne.png",
  },
  {
    id: "iron-reign",
    title: "IRON REIGN",
    genre: "STRATEGY",
    tagline: "Command. Conquer. Build an empire of steel.",
    description: "Lead your steampunk army across a war-torn continent. Build clockwork war machines, manage resources, and outmaneuver rival factions in this deep tactical strategy experience.",
    rating: "8.7",
    price: "$39.99",
    year: "2025",
    status: "AVAILABLE NOW",
    platforms: ["PC", "PS5"],
    players: "89K active",
    image: "/images/iron-reign.png",
  },
  {
    id: "neon-drift",
    title: "NEON DRIFT",
    genre: "ACTION RACING",
    tagline: "Burn neon. Break limits.",
    description: "Tear through the rain-soaked streets of Neo-Tokyo in illegal street races. Customize your cyberbike, drift through holographic checkpoints, and outrun the corporate enforcers.",
    rating: "9.0",
    price: "$29.99",
    year: "2025",
    status: "AVAILABLE NOW",
    platforms: ["PC", "PS5", "XBOX", "SWITCH"],
    players: "203K active",
    image: "/images/neon-drift.png",
  },
];

const NEWS_ITEMS = [
  {
    title: "Voidborne: The Awakening DLC",
    date: "MAY 20, 2026",
    category: "ANNOUNCEMENT",
    excerpt: "A massive expansion adding 20+ hours of new story content, two new alien worlds, and the long-awaited multiplayer co-op mode. Coming Summer 2026.",
  },
  {
    title: "Patch 2.4.1 — Balance Update",
    date: "MAY 15, 2026",
    category: "PATCH NOTES",
    excerpt: "Major balance pass on Void Weapons, new difficulty modifiers, and performance optimizations.",
  },
  {
    title: "Community Event: Void Wars",
    date: "MAY 10, 2026",
    category: "COMMUNITY",
    excerpt: "Join the first cross-platform PvP tournament with exclusive cosmetic rewards.",
  },
  {
    title: "Eclipse Studios is Hiring",
    date: "MAY 5, 2026",
    category: "STUDIO",
    excerpt: "We're looking for Senior Gameplay Engineers and Concept Artists. Remote-first.",
  },
];

const COMMUNITY_STATS = {
  activePlayers: "419K",
  copiesSold: "2.8M",
  avgRating: "4.9",
  discordMembers: "85K",
  awardsWon: "12",
  countriesReached: "140+",
};

/* ─────────── COMPONENT ─────────── */
export default function Home() {
  const [currentTab, setCurrentTab] = useState("featured");
  const [isDark, setIsDark] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [introPhase, setIntroPhase] = useState("text");
  const prevTabRef = useRef(currentTab);
  const featuredGame = GAMES[0]; // Voidborne is the featured game

  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("shrink"), 1200);
    const t2 = setTimeout(() => setIntroPhase("reveal"), 2000);
    const t3 = setTimeout(() => setIntroPhase("done"), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    if (prevTabRef.current !== currentTab) {
      prevTabRef.current = currentTab;
      setIsFlipping(true);
      const timer = setTimeout(() => setIsFlipping(false), 900);
      return () => clearTimeout(timer);
    }
  }, [currentTab]);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = -(y - yc) / (rect.height / 8);
    const angleY = (x - xc) / (rect.width / 8);
    card.style.setProperty("--rx", `${angleX}deg`);
    card.style.setProperty("--ry", `${angleY}deg`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <>
      {/* ===== CINEMATIC INTRO SPLASH ===== */}
      {introPhase !== "done" && (
        <div className={`intro-overlay ${
          introPhase === "shrink" ? "intro-shrink" : 
          introPhase === "reveal" ? "intro-reveal" : ""
        }`}>
          <div className="intro-text-wrapper">
            <div className="intro-text-line">ECLIPSE STUDIOS</div>
            <div className="intro-text-sub">FORGING NEW WORLDS</div>
          </div>
        </div>
      )}

    <div className={`page-container theme-${isDark ? "dark" : "light"}${introPhase !== "done" ? " site-hidden" : " site-revealed"}`}>
      {/* Floating Premium HUD Navigation */}
      <div className="hud-nav">
        {["featured", "games", "studio", "news", "community"].map((tab) => (
          <button
            key={tab}
            id={`nav-${tab}`}
            className={`hud-btn ${currentTab === tab ? "active" : ""}`}
            onClick={() => setCurrentTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main A4 Canvas Layout */}
      <div className="page">
        <div className={`card layout-${currentTab}${isFlipping ? " card-flip" : ""}`}>

          {/* ===== TOP PANEL ===== */}
          <div className="top-panel" style={{ backgroundImage: "url(/images/hero.png)", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="top-panel-overlay">
              <div className="hero-title-group">
                <span className="hero-tag">{featuredGame.genre}</span>
                <h1 className="hero-title">{featuredGame.title}</h1>
                <p className="hero-tagline">{featuredGame.tagline}</p>
              </div>
            </div>

            {/* Theme toggle badge */}
            <div className="badge badge-tl" onClick={() => setIsDark(!isDark)} title="Toggle Theme">
              <svg className="badge-logo" viewBox="0 0 24 24" fill="none" stroke="white">
                <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="2.2" strokeDasharray="3 2" />
                <circle cx="12" cy="12" r="3" fill="white" />
              </svg>
            </div>

            <div className="badge badge-tr"></div>
            <div className="panel-notch-scoop"></div>
            <div className="badge badge-center"></div>
          </div>

          {/* ===== BOTTOM AREA ===== */}
          <div className="bottom-area">

            {/* Left Column: info pills */}
            <div className="col col-left">
              <div className="pill pill-wide pill-label">
                <span className="pill-text">{currentTab === "featured" ? "LATEST RELEASE" : currentTab === "games" ? "ALL TITLES" : currentTab === "studio" ? "EST. 2019" : currentTab === "news" ? "LATEST" : "JOIN US"}</span>
              </div>
              <div className="pill pill-medium pill-label">
                <span className="pill-text">{currentTab === "featured" ? featuredGame.status : currentTab === "games" ? `${GAMES.length} GAMES` : currentTab === "studio" ? "25+ DEVS" : currentTab === "news" ? `${NEWS_ITEMS.length} ARTICLES` : "DISCORD"}</span>
              </div>
              <div className="thin-lines">
                <div className="thin-line" style={{ width: "100%" }}></div>
                <div className="thin-line" style={{ width: "100%" }}></div>
                <div className="thin-line" style={{ width: "85%" }}></div>
                <div className="thin-line" style={{ width: "60%" }}></div>
              </div>
              
              <div className="pill pill-button pill-label">
                <span className="pill-text">{currentTab === "featured" ? featuredGame.price : currentTab === "games" ? "BROWSE" : currentTab === "studio" ? "CAREERS" : currentTab === "news" ? "RSS" : "FOLLOW"}</span>
              </div>
              
              {currentTab === "community" && (
                <div className="thin-lines achievements-extra-lines" style={{ marginTop: "10px" }}>
                  <div className="thin-line" style={{ width: "95%" }}></div>
                  <div className="thin-line" style={{ width: "100%" }}></div>
                  <div className="thin-line" style={{ width: "90%" }}></div>
                  <div className="thin-line" style={{ width: "75%" }}></div>
                  <div className="thin-line" style={{ width: "40%" }}></div>
                </div>
              )}
            </div>

            {/* ===== MORPHING CARDS ===== */}
            <div className="morph-container">
              
              {/* ── CARD 1 ── */}
              <div className="morph-card card-1" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                {/* FEATURED: Game title showcase */}
                <div className="card-content featured-content">
                  <div className="game-title-card">
                    <span className="card-label">FEATURED</span>
                    <span className="card-game-title">{featuredGame.title}</span>
                    <span className="card-genre-tag">{featuredGame.genre}</span>
                  </div>
                </div>
                {/* GAMES: Voidborne cover */}
                <div className="card-content games-content game-cover-card" style={{ backgroundImage: `url(${GAMES[0].image})` }}>
                  <div className="game-cover-overlay">
                    <span className="cover-genre">{GAMES[0].genre}</span>
                    <span className="cover-title">{GAMES[0].title}</span>
                    <span className="cover-rating">★ {GAMES[0].rating}</span>
                  </div>
                </div>
                {/* STUDIO: Studio story */}
                <div className="card-content studio-content" style={{ backgroundImage: "url(/images/studio.png)", backgroundSize: "cover", backgroundPosition: "center" }}>
                  <div className="studio-story-overlay">
                    <span className="card-label">OUR STORY</span>
                    <p className="studio-story-text">Founded in 2019 by a team of passionate gamers, Eclipse Studios set out with one mission: create worlds that players never want to leave. From our first prototype to millions of players worldwide — we&apos;re just getting started.</p>
                  </div>
                </div>
                {/* NEWS: Featured article */}
                <div className="card-content news-content">
                  <div className="news-article-card">
                    <span className="news-category">{NEWS_ITEMS[0].category}</span>
                    <h3 className="news-title">{NEWS_ITEMS[0].title}</h3>
                    <p className="news-excerpt">{NEWS_ITEMS[0].excerpt}</p>
                    <span className="news-date">{NEWS_ITEMS[0].date}</span>
                  </div>
                </div>
                {/* COMMUNITY: Timeline banner */}
                <div className="card-content community-content">
                  <div className="community-timeline">
                    <div className="timeline-milestone">
                      <div className="timeline-dot"></div>
                      <span className="timeline-label">2019 — Founded</span>
                    </div>
                    <div className="timeline-connector"></div>
                    <div className="timeline-milestone">
                      <div className="timeline-dot"></div>
                      <span className="timeline-label">2025 — First Launch</span>
                    </div>
                    <div className="timeline-connector"></div>
                    <div className="timeline-milestone">
                      <div className="timeline-dot active-dot"></div>
                      <span className="timeline-label">2026 — 2.8M Sold</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── CARD 2 ── */}
              <div className="morph-card card-2" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <div className="card-content featured-content">
                  <div className="stat-block">
                    <span className="stat-number">{featuredGame.rating}</span>
                    <span className="stat-label">RATING</span>
                  </div>
                </div>
                <div className="card-content games-content game-cover-card" style={{ backgroundImage: `url(${GAMES[1].image})` }}>
                  <div className="game-cover-overlay">
                    <span className="cover-genre">{GAMES[1].genre}</span>
                    <span className="cover-title">{GAMES[1].title}</span>
                    <span className="cover-rating">★ {GAMES[1].rating}</span>
                  </div>
                </div>
                <div className="card-content studio-content">
                  <div className="stat-block">
                    <span className="stat-number">25+</span>
                    <span className="stat-label">DEVELOPERS</span>
                  </div>
                </div>
                <div className="card-content news-content">
                  <div className="news-article-card news-compact">
                    <span className="news-category">{NEWS_ITEMS[1].category}</span>
                    <h3 className="news-title">{NEWS_ITEMS[1].title}</h3>
                    <span className="news-date">{NEWS_ITEMS[1].date}</span>
                  </div>
                </div>
                <div className="card-content community-content">
                  <div className="stat-block">
                    <span className="stat-number">{COMMUNITY_STATS.activePlayers}</span>
                    <span className="stat-label">ACTIVE PLAYERS</span>
                  </div>
                </div>
              </div>

              {/* ── CARD 3 ── */}
              <div className="morph-card card-3" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <div className="card-content featured-content">
                  <div className="stat-block">
                    <span className="stat-number">{featuredGame.year}</span>
                    <span className="stat-label">RELEASE YEAR</span>
                  </div>
                </div>
                <div className="card-content games-content game-cover-card" style={{ backgroundImage: `url(${GAMES[2].image})` }}>
                  <div className="game-cover-overlay">
                    <span className="cover-genre">{GAMES[2].genre}</span>
                    <span className="cover-title">{GAMES[2].title}</span>
                    <span className="cover-rating">★ {GAMES[2].rating}</span>
                  </div>
                </div>
                <div className="card-content studio-content">
                  <div className="stat-block">
                    <span className="stat-number">3</span>
                    <span className="stat-label">TITLES SHIPPED</span>
                  </div>
                </div>
                <div className="card-content news-content">
                  <div className="news-article-card news-compact">
                    <span className="news-category">{NEWS_ITEMS[2].category}</span>
                    <h3 className="news-title">{NEWS_ITEMS[2].title}</h3>
                    <span className="news-date">{NEWS_ITEMS[2].date}</span>
                  </div>
                </div>
                <div className="card-content community-content">
                  <div className="stat-block">
                    <span className="stat-number">{COMMUNITY_STATS.avgRating}★</span>
                    <span className="stat-label">AVG RATING</span>
                  </div>
                </div>
              </div>

              {/* ── CARD 4 ── */}
              <div className="morph-card card-4" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <div className="card-content featured-content">
                  <div className="description-card">
                    <p className="desc-text">{featuredGame.description}</p>
                    <div className="platform-row">
                      {featuredGame.platforms.map((p) => (
                        <span key={p} className="platform-badge">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card-content games-content">
                  <div className="coming-soon-card">
                    <span className="card-label">COMING 2027</span>
                    <span className="coming-title">ECHOES OF AETHER</span>
                    <span className="coming-genre">ADVENTURE</span>
                    <span className="coming-status">IN DEVELOPMENT</span>
                  </div>
                </div>
                <div className="card-content studio-content">
                  <div className="description-card">
                    <p className="desc-text">We believe games are the ultimate art form — combining music, storytelling, and interactivity into experiences that stay with you forever.</p>
                  </div>
                </div>
                <div className="card-content news-content">
                  <div className="news-article-card news-compact">
                    <span className="news-category">{NEWS_ITEMS[3].category}</span>
                    <h3 className="news-title">{NEWS_ITEMS[3].title}</h3>
                    <span className="news-date">{NEWS_ITEMS[3].date}</span>
                  </div>
                </div>
                <div className="card-content community-content">
                  <div className="stat-block">
                    <span className="stat-number">{COMMUNITY_STATS.copiesSold}</span>
                    <span className="stat-label">COPIES SOLD</span>
                  </div>
                </div>
              </div>

              {/* ── CARD 5 ── */}
              <div className="morph-card card-5" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <div className="card-content featured-content">
                  <div className="cta-card">
                    <span className="cta-price">{featuredGame.price}</span>
                    <button className="cta-button">BUY NOW</button>
                    <span className="cta-sub">{featuredGame.players}</span>
                  </div>
                </div>
                <div className="card-content games-content">
                  <div className="browse-all-card">
                    <span className="browse-count">{GAMES.length} RELEASED</span>
                    <span className="browse-label">+ 1 IN DEV</span>
                  </div>
                </div>
                <div className="card-content studio-content">
                  <div className="description-card">
                    <p className="desc-text">Remote-first. Player-obsessed. We ship games we&apos;d play ourselves — no compromises.</p>
                  </div>
                </div>
                <div className="card-content news-content">
                  <div className="news-article-card news-compact">
                    <span className="news-category">MEDIA</span>
                    <h3 className="news-title">Eclipse Studios at GDC 2026</h3>
                    <span className="news-date">MAR 20, 2026</span>
                  </div>
                </div>
                <div className="card-content community-content">
                  <div className="stat-block">
                    <span className="stat-number">{COMMUNITY_STATS.countriesReached}</span>
                    <span className="stat-label">COUNTRIES</span>
                  </div>
                </div>
              </div>

              {/* ── CARD 6 ── */}
              <div className="morph-card card-6" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <div className="card-content featured-content">
                  <svg className="platform-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                <div className="card-content games-content">
                  <div className="mini-badge-text">PC</div>
                </div>
                <div className="card-content studio-content">
                  <div className="action-pill-text">JOIN US</div>
                </div>
                <div className="card-content news-content">
                  <div className="action-pill-text">ALL</div>
                </div>
                <div className="card-content community-content">
                  <div className="medal-icon">🏆</div>
                </div>
              </div>

              {/* ── CARD 7 ── */}
              <div className="morph-card card-7" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <div className="card-content featured-content">
                  <svg className="platform-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                </div>
                <div className="card-content games-content">
                  <div className="mini-badge-text">PS5</div>
                </div>
                <div className="card-content studio-content">
                  <div className="action-pill-text">PRESS</div>
                </div>
                <div className="card-content news-content">
                  <div className="action-pill-text">PATCHES</div>
                </div>
                <div className="card-content community-content">
                  <div className="medal-icon">⚔️</div>
                </div>
              </div>

              {/* ── CARD 8 ── */}
              <div className="morph-card card-8" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <div className="card-content featured-content">
                  <svg className="platform-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                </div>
                <div className="card-content games-content">
                  <div className="mini-badge-text">XBOX</div>
                </div>
                <div className="card-content studio-content">
                  <div className="action-pill-text">CONTACT</div>
                </div>
                <div className="card-content news-content">
                  <div className="action-pill-text">EVENTS</div>
                </div>
                <div className="card-content community-content">
                  <div className="medal-icon">🎮</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}
