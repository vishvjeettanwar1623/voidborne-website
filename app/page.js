"use client";

import { useState, useRef, useEffect, useCallback } from "react";

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

const TABS = ["featured", "games", "studio", "news", "community"];

/* ─────────── ANIMATED COUNTER HOOK ─────────── */
function useAnimatedCounter(target, isActive, duration = 1200) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!isActive) return;

    // Parse the numeric part
    const numMatch = target.match(/[\d.]+/);
    if (!numMatch) { setDisplay(target); return; }
    
    const numVal = parseFloat(numMatch[0]);
    const prefix = target.slice(0, numMatch.index);
    const suffix = target.slice(numMatch.index + numMatch[0].length);
    const hasDecimal = numMatch[0].includes(".");
    const startTime = performance.now();
    
    let raf;
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numVal * eased;
      
      if (hasDecimal) {
        setDisplay(`${prefix}${current.toFixed(1)}${suffix}`);
      } else {
        setDisplay(`${prefix}${Math.round(current)}${suffix}`);
      }
      
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setDisplay(target);
      }
    };
    
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, isActive, duration]);

  return display;
}

/* ─────────── ANIMATED STAT COMPONENT ─────────── */
function AnimatedStat({ number, label, isActive }) {
  const animated = useAnimatedCounter(number, isActive);
  return (
    <div className="stat-block">
      <span className="stat-number">{animated}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

/* ─────────── FLOATING PARTICLES ─────────── */
function FloatingParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseOffset: Math.random() * Math.PI * 2,
    }));

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.5 + 0.5;
        const alpha = p.opacity * (0.5 + pulse * 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${alpha * 0.1})`;
        ctx.fill();
      });

      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.03 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function Home() {
  const [currentTab, setCurrentTab] = useState("featured");
  const [isDark, setIsDark] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [introPhase, setIntroPhase] = useState("text");
  const prevTabRef = useRef(currentTab);
  const featuredGame = GAMES[0];

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

  // Keyboard navigation: left/right arrows to switch tabs
  const handleKeyDown = useCallback((e) => {
    if (introPhase !== "done") return;
    const idx = TABS.indexOf(currentTab);
    if (e.key === "ArrowRight" && idx < TABS.length - 1) {
      setCurrentTab(TABS[idx + 1]);
    } else if (e.key === "ArrowLeft" && idx > 0) {
      setCurrentTab(TABS[idx - 1]);
    }
  }, [currentTab, introPhase]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

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
      {/* Floating ambient particles */}
      <FloatingParticles />

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
        {TABS.map((tab) => (
          <button
            key={tab}
            id={`nav-${tab}`}
            className={`hud-btn ${currentTab === tab ? "active" : ""}`}
            onClick={() => setCurrentTab(tab)}
            aria-label={`Navigate to ${tab}`}
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
            <div className="badge badge-tl" onClick={() => setIsDark(!isDark)} title="Toggle Theme" role="button" aria-label="Toggle dark/light theme">
              <svg className="badge-logo" viewBox="0 0 24 24" fill="none" stroke="white">
                <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="2.2" strokeDasharray="3 2" />
                <circle cx="12" cy="12" r="3" fill="white" />
              </svg>
            </div>

            {/* Top-right: Online status indicator */}
            <div className="badge badge-tr" title="Online">
              <span className="online-dot"></span>
            </div>

            <div className="panel-notch-scoop"></div>
            <div className="badge badge-center">
              <svg className="eclipse-logo" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" stroke="rgba(0,229,255,0.5)" strokeWidth="1.5" />
                <circle cx="14" cy="12" r="6" fill="rgba(0,229,255,0.15)" />
              </svg>
            </div>
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
                <div className="card-content featured-content">
                  <div className="game-title-card">
                    <span className="card-label">FEATURED</span>
                    <span className="card-game-title">{featuredGame.title}</span>
                    <span className="card-genre-tag">{featuredGame.genre}</span>
                  </div>
                </div>
                <div className="card-content games-content game-cover-card" style={{ backgroundImage: `url(${GAMES[0].image})` }}>
                  <div className="game-cover-overlay">
                    <span className="cover-genre">{GAMES[0].genre}</span>
                    <span className="cover-title">{GAMES[0].title}</span>
                    <span className="cover-rating">★ {GAMES[0].rating}</span>
                  </div>
                </div>
                <div className="card-content studio-content" style={{ backgroundImage: "url(/images/studio.png)", backgroundSize: "cover", backgroundPosition: "center" }}>
                  <div className="studio-story-overlay">
                    <span className="card-label">OUR STORY</span>
                    <p className="studio-story-text">Founded in 2019 by a team of passionate gamers, Eclipse Studios set out with one mission: create worlds that players never want to leave. From our first prototype to millions of players worldwide — we&apos;re just getting started.</p>
                  </div>
                </div>
                <div className="card-content news-content">
                  <div className="news-article-card">
                    <span className="news-category">{NEWS_ITEMS[0].category}</span>
                    <h3 className="news-title">{NEWS_ITEMS[0].title}</h3>
                    <p className="news-excerpt">{NEWS_ITEMS[0].excerpt}</p>
                    <span className="news-date">{NEWS_ITEMS[0].date}</span>
                  </div>
                </div>
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
                  <AnimatedStat number={featuredGame.rating} label="RATING" isActive={currentTab === "featured"} />
                </div>
                <div className="card-content games-content game-cover-card" style={{ backgroundImage: `url(${GAMES[1].image})` }}>
                  <div className="game-cover-overlay">
                    <span className="cover-genre">{GAMES[1].genre}</span>
                    <span className="cover-title">{GAMES[1].title}</span>
                    <span className="cover-rating">★ {GAMES[1].rating}</span>
                  </div>
                </div>
                <div className="card-content studio-content">
                  <AnimatedStat number="25+" label="DEVELOPERS" isActive={currentTab === "studio"} />
                </div>
                <div className="card-content news-content">
                  <div className="news-article-card news-compact">
                    <span className="news-category">{NEWS_ITEMS[1].category}</span>
                    <h3 className="news-title">{NEWS_ITEMS[1].title}</h3>
                    <span className="news-date">{NEWS_ITEMS[1].date}</span>
                  </div>
                </div>
                <div className="card-content community-content">
                  <AnimatedStat number={COMMUNITY_STATS.activePlayers} label="ACTIVE PLAYERS" isActive={currentTab === "community"} />
                </div>
              </div>

              {/* ── CARD 3 ── */}
              <div className="morph-card card-3" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <div className="card-content featured-content">
                  <AnimatedStat number={featuredGame.year} label="RELEASE YEAR" isActive={currentTab === "featured"} />
                </div>
                <div className="card-content games-content game-cover-card" style={{ backgroundImage: `url(${GAMES[2].image})` }}>
                  <div className="game-cover-overlay">
                    <span className="cover-genre">{GAMES[2].genre}</span>
                    <span className="cover-title">{GAMES[2].title}</span>
                    <span className="cover-rating">★ {GAMES[2].rating}</span>
                  </div>
                </div>
                <div className="card-content studio-content">
                  <AnimatedStat number="3" label="TITLES SHIPPED" isActive={currentTab === "studio"} />
                </div>
                <div className="card-content news-content">
                  <div className="news-article-card news-compact">
                    <span className="news-category">{NEWS_ITEMS[2].category}</span>
                    <h3 className="news-title">{NEWS_ITEMS[2].title}</h3>
                    <span className="news-date">{NEWS_ITEMS[2].date}</span>
                  </div>
                </div>
                <div className="card-content community-content">
                  <AnimatedStat number={COMMUNITY_STATS.avgRating + "★"} label="AVG RATING" isActive={currentTab === "community"} />
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
                  <AnimatedStat number={COMMUNITY_STATS.copiesSold} label="COPIES SOLD" isActive={currentTab === "community"} />
                </div>
              </div>

              {/* ── CARD 5 ── */}
              <div className="morph-card card-5" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <div className="card-content featured-content">
                  <div className="cta-card">
                    <span className="cta-price">{featuredGame.price}</span>
                    <button className="cta-button" id="buy-now-btn">BUY NOW</button>
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
                  <AnimatedStat number={COMMUNITY_STATS.countriesReached} label="COUNTRIES" isActive={currentTab === "community"} />
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

      {/* ===== FOOTER ===== */}
      <footer className="site-footer" id="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">ECLIPSE STUDIOS</span>
            <span className="footer-tagline">Forging New Worlds</span>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link" aria-label="Discord">DISCORD</a>
            <a href="#" className="footer-link" aria-label="Twitter">TWITTER</a>
            <a href="#" className="footer-link" aria-label="YouTube">YOUTUBE</a>
            <a href="#" className="footer-link" aria-label="Steam">STEAM</a>
          </div>
          <div className="footer-legal">
            <span className="footer-copyright">© 2026 Eclipse Studios. All rights reserved.</span>
            <span className="footer-nav-hint">← → Arrow keys to navigate</span>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
