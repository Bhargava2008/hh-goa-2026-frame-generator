"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Create ID", href: "/create" },
  { label: "Apply Now", href: "https://hhgoa.com/" },
];

export default function Home() {
  const [introVisible, setIntroVisible] = useState(true);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    // Development mode:
    // Always show the intro while we are designing/testing it.
    setIntroVisible(true);
    setIntroDone(false);
  }, []);

  const enterGoa = () => {
    window.localStorage.setItem("hh-goa-intro-seen", "true");
    setIntroVisible(false);

    window.setTimeout(() => {
      setIntroDone(true);
    }, 650);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#063d2b] text-[#fff5d8]">
      {introVisible && <IntroAnimation onComplete={enterGoa} />}

      <div
        className={`transition-opacity duration-700 ${
          introDone ? "opacity-100" : introVisible ? "opacity-0" : "opacity-100"
        }`}
      >
        <Hero />
        <TicketSection />
        <BuildShipRepeat />
        <FinalCTA />
        <Footer />
      </div>

      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        .intro {
          width: 100vw !important;
          max-width: 100vw !important;
          height: 100dvh !important;
          overflow: hidden !important;
          isolation: isolate;
        }

        /* The old title no longer travels with the plane. */
        .intro .flying-title {
          display: none !important;
        }

        /* ================= AIRPLANE ================= */

        .intro .goa-flight {
          position: absolute !important;
          z-index: 10 !important;
         
          width: 240px !important;
          height: 100px !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: visible !important;
          pointer-events: none !important;
          will-change: left, top, transform;
        }

        .intro .goa-flight .hero-plane {
          position: absolute !important;
          left: 0 !important;
          right: auto !important;
          top: 0 !important;
          width: 240px !important;
          height: 100px !important;
          margin: 0 !important;
          transform: rotate(-2deg) !important;
          transform-origin: center !important;
        }

        /* Flight trail: the wake stays behind the aircraft as it travels right → left. */
        .intro .goa-flight::before {
          content: "";
          position: absolute;
          left: 250px;
          top: 57px;
          width: 460px;
          height: 3px;
          border-radius: 999px;
          background: repeating-linear-gradient(
            90deg,
            rgba(245, 208, 0, 0.95) 0 16px,
            transparent 16px 30px
          );
          filter: drop-shadow(0 0 7px rgba(245, 208, 0, 0.28));
          opacity: 0.82;
          transform: rotate(-1deg);
        }

        .intro .goa-flight .goa-tail-banner.hide {
  opacity: 0 !important;
  transform: scale(2) !important;
}

        .intro .goa-flight::after {
          content: "✦  ·  ✦  ·  ✦";
          position: absolute;
          left: 360px;
          top: 19px;
          color: #ff197d;
          font-family: "DM Mono", monospace;
          font-size: 11px;
          letter-spacing: 0.42em;
          white-space: nowrap;
          opacity: 0.82;
          text-shadow: 0 0 10px rgba(255, 25, 125, 0.4);
          animation: wake-spark 0.8s ease-in-out infinite alternate;
        }

        .intro .goa-flight .hero-plane {
          transform: rotate(-2deg) scaleX(-1) !important;
        }

        .intro .goa-flight .hero-plane-logo {
          transform: scaleX(-1);
        }

        /* HH GOA is physically towed behind the aircraft's tail. */
        .goa-tail-banner {
          position: absolute;
          left: 255px;
          top: 38px;
          z-index: 4;
          width: 210px;
          height: 66px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 8px 18px 8px 26px;
          border: 2px solid #f5d000;
          background: #063d2b;
          color: #fff5d8;
          clip-path: polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%, 8% 50%);
          box-shadow: 0 5px 0 rgba(0, 0, 0, 0.16);
          transform: rotate(-1deg);
        }

        .goa-tail-cable {
          position: absolute;
          left: -32px;
          top: 32px;
          width: 35px;
          border-top: 2px dashed #f5d000;
        }

        .goa-tail-label {
          font-family: "Oswald", "Arial Narrow", sans-serif;
          font-size: 28px;
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: 0.08em;
          color: #f5d000;
        }

        .goa-tail-year {
          margin-top: 4px;
          font-family: "DM Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.28em;
          color: #ff197d;
        }

        .goa-tail-point {
          position: absolute;
          right: 18px;
          top: 9px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ff197d;
          box-shadow: 0 0 14px rgba(255, 25, 125, 0.7);
        }

        @keyframes wake-spark {
          from { opacity: 0.45; transform: translateY(1px); }
          to { opacity: 1; transform: translateY(-3px); }
        }

          15% {
            transform: translateX(16vw) translateY(-8px) rotate(2deg);
            opacity: 1;
          }
          35% {
            transform: translateX(40vw) translateY(18px) rotate(-1deg);
            opacity: 1;
          }
          55% {
            transform: translateX(64vw) translateY(-8px) rotate(1deg);
            opacity: 1;
          }
          75% {
            transform: translateX(86vw) translateY(4px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 520px)) translateY(-12px)
              rotate(1deg);
            opacity: 1;
          }
        }

        /* ================= ARRIVAL TITLE ================= */

        .intro .arrival-title {
  position: absolute !important;
  z-index: 22 !important;
  left: 50% !important;
  top: 51% !important;
  width: min(94vw, 1550px) !important;
  margin: 0 !important;
  padding: 0 !important;
  text-align: center !important;
  opacity: 0 !important;
  transform: translate(-50%, -50%) scale(0.08) rotate(-10deg) !important;
  transform-origin: center !important;
  pointer-events: none !important;
  /* Remove the animation; we'll add a class dynamically */
}

.intro .arrival-title.pop {
  animation: hhgoa-arrival-pop 1.35s cubic-bezier(0.16, 1.28, 0.3, 1) 0s both !important;
}
        .intro .arrival-title-main {
          width: 100% !important;
          margin: 0 !important;
          white-space: nowrap !important;
          font-family: "Oswald", "Arial Narrow", sans-serif !important;
          font-size: clamp(4.5rem, 11.5vw, 12rem) !important;
          font-weight: 500 !important;
          line-height: 0.78 !important;
          letter-spacing: -0.065em !important;
          color: #f5d000 !important;
          text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.22) !important;
        }

        .intro .arrival-title-goa {
          position: absolute !important;
          left: 50% !important;
          top: 49% !important;
          z-index: 3 !important;
          font-family: "Noto Sans Devanagari", sans-serif !important;
          font-size: clamp(4rem, 7vw, 7.5rem) !important;
          font-weight: 900 !important;
          line-height: 1 !important;
          color: #ff197d !important;
          text-shadow:
            -5px -5px 0 #063d2b,
            5px 5px 0 #ff197d !important;
          transform: translate(-50%, -50%) rotate(-3deg) !important;
          animation: hhgoa-goa-float 2.8s ease-in-out 6s infinite !important;
        }

        .intro .arrival-title-details {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 16px !important;
          margin-top: 34px !important;
          font-family: "DM Mono", monospace !important;
          font-size: clamp(9px, 1.1vw, 14px) !important;
          line-height: 1 !important;
          letter-spacing: 0.14em !important;
          text-transform: uppercase !important;
          color: #f5d000 !important;
        }

        @keyframes hhgoa-arrival-pop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.08) rotate(-10deg);
          }
          15% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.58) rotate(5deg);
          }
          34% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.08) rotate(-2deg);
          }
          48% {
            transform: translate(-50%, -50%) scale(0.96) rotate(1deg);
          }
          62% {
            transform: translate(-50%, -50%) scale(1.025) rotate(-0.4deg);
          }
          76%,
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
        }

        @keyframes hhgoa-goa-float {
          0%,
          100% {
            transform: translate(-50%, -50%) rotate(-3deg);
          }
          50% {
            transform: translate(-50%, calc(-50% - 9px)) rotate(2deg);
          }
        }

        /* Keep the HH Goa stamp away from the title. */
        .intro .arrival-stamp {
          left: auto !important;
          right: 6% !important;
          top: 14% !important;
          opacity: 0 !important;
          transform: translateY(-18px) rotate(-16deg) scale(0.55) !important;
          animation: hhgoa-stamp-side-pop 0.85s cubic-bezier(0.16, 1.35, 0.3, 1) 5.05s both !important;
        }

        @keyframes hhgoa-stamp-side-pop {
          0% {
            opacity: 0;
            transform: translateY(-18px) rotate(-16deg) scale(0.55);
          }
          55% {
            opacity: 1;
            transform: translateY(5px) rotate(7deg) scale(1.08);
          }
          78% {
            transform: translateY(-2px) rotate(-3deg) scale(0.96);
          }
          100% {
            opacity: 0.9;
            transform: translateY(0) rotate(-5deg) scale(1);
          }
        }

        /* ================= LANDING HERO ================= */

        .hero-landing {
          background:
            radial-gradient(
              circle at 50% 45%,
              rgba(18, 110, 72, 0.32),
              transparent 54%
            ),
            #063d2b;
        }

        .hero-glow {
          position: absolute;
          left: 50%;
          top: 48%;
          width: min(70vw, 950px);
          height: min(50vw, 650px);
          border-radius: 999px;
          background: rgba(245, 208, 0, 0.035);
          filter: blur(50px);
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .hero-orbit {
          position: absolute;
          left: 50%;
          top: 52%;
          width: min(85vw, 1250px);
          aspect-ratio: 2 / 1;
          border: 1px solid rgba(245, 208, 0, 0.11);
          border-radius: 50%;
          transform: translate(-50%, -50%) rotate(-7deg);
          pointer-events: none;
        }

        .hero-orbit-two {
          width: min(58vw, 850px);
          border-color: rgba(255, 25, 125, 0.09);
          transform: translate(-50%, -50%) rotate(12deg);
        }

        .hero-studio-mark {
          position: absolute;
          left: 5%;
          top: 34px;
          z-index: 20;
          display: flex;
          flex-direction: column;
          color: #f5d000;
          font-family: "Oswald", "Arial Narrow", sans-serif;
          line-height: 0.76;
          user-select: none;
          animation: studio-settle 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
        }

        .hero-studio-time {
          font-size: clamp(3rem, 5vw, 5.4rem);
          font-weight: 800;
          letter-spacing: -0.09em;
        }

        .hero-studio-pm {
          align-self: flex-end;
          margin-top: -4px;
          margin-right: 2px;
          font-family: "DM Mono", monospace;
          font-size: 12px;
          letter-spacing: -0.04em;
        }

        .hero-studio-name {
          margin-left: 34px;
          margin-top: 5px;
          font-size: clamp(1.5rem, 2.5vw, 2.7rem);
          font-weight: 800;
          letter-spacing: -0.05em;
        }

        @keyframes studio-settle {
          from {
            opacity: 0;
            transform: translateY(-14px) rotate(-2deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(0);
          }
        }

        .hero-actions {
          position: absolute;
          right: 5%;
          top: 34px;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: clamp(10px, 1.6vw, 24px);
        }

        .hero-hype-link,
        .hero-create-link,
        .hero-apply-link {
          font-family: "DM Mono", monospace;
          font-size: clamp(9px, 1vw, 12px);
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          transition:
            transform 0.25s ease,
            opacity 0.25s ease,
            background 0.25s ease;
        }

        .hero-hype-link {
          color: #fff5d8;
          opacity: 0.82;
        }

        .hero-create-link {
          padding: 13px 18px;
          border: 1px solid rgba(245, 208, 0, 0.55);
          color: #f5d000;
        }

        .hero-apply-link {
          padding: 15px 28px;
          background: #f5d000;
          color: #063d2b;
        }

        .hero-hype-link:hover,
        .hero-create-link:hover,
        .hero-apply-link:hover {
          transform: translateY(-3px);
        }

        .hero-apply-link:hover {
          box-shadow: 0 0 28px rgba(245, 208, 0, 0.25);
        }

        .hero-stamp-centered {
          margin-bottom: 26px;
          animation: hero-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
        }

        .hero-eyebrow-centered {
          margin-bottom: 22px;
          animation: hero-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
        }

        .hero-title-wrap {
          position: relative;
          width: min(95vw, 1550px);
          margin-inline: auto;
          animation: hero-title-enter 1.15s cubic-bezier(0.16, 1, 0.3, 1) 0.62s
            both;
        }

        .hero-title-centered {
          width: 100%;
          margin: 0;
          text-align: center;
          white-space: nowrap;
          font-family: "Oswald", "Arial Narrow", sans-serif;
          font-size: clamp(4.6rem, 12vw, 12.5rem);
          font-weight: 500;
          line-height: 0.78;
          letter-spacing: -0.065em;
          color: #f5d000;
          text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.22);
        }

        .hero-goa-float {
          position: absolute;
          left: 50%;
          top: 48%;
          z-index: 5;
          font-family: "Noto Sans Devanagari", sans-serif;
          font-size: clamp(4rem, 7vw, 8rem);
          font-weight: 900;
          line-height: 1;
          color: #ff197d;
          text-shadow:
            -5px -5px 0 #063d2b,
            5px 5px 0 #ff197d;
          transform: translate(-50%, -50%) rotate(-3deg);
          animation: landing-goa-float 3.5s ease-in-out 1.25s infinite;
        }

        @keyframes landing-goa-float {
          0%,
          100% {
            transform: translate(-50%, -50%) rotate(-3deg);
          }
          50% {
            transform: translate(-50%, calc(-50% - 11px)) rotate(2deg);
          }
        }

        .hero-meta-centered {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 17px;
          margin-top: 32px;
          font-family: "DM Mono", monospace;
          font-size: clamp(9px, 1vw, 13px);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #f5d000;
          animation: hero-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both;
        }

        .hero-copy-centered {
          margin-top: 34px;
          animation: hero-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.02s both;
        }

        .hero-cta-centered {
          margin-top: 30px;
          animation: hero-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.15s both;
        }

        .hero-flight-board {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 40px;
          font-family: "DM Mono", monospace;
          font-size: 8px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 245, 216, 0.42);
          animation: hero-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.28s both;
        }

        .hero-flight-board i {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #ff197d;
        }

        @keyframes hero-enter {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hero-title-enter {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 700px) {
          .intro .arrival-title-main,
          .hero-title-centered {
            font-size: clamp(3.25rem, 17vw, 6rem) !important;
            letter-spacing: -0.055em !important;
          }

          .intro .arrival-title-goa,
          .hero-goa-float {
            font-size: clamp(3rem, 13vw, 5rem) !important;
          }

          .intro .arrival-title-details,
          .hero-meta-centered {
            gap: 8px !important;
            font-size: 7px !important;
            letter-spacing: 0.09em !important;
          }

          .hero-studio-mark {
              position: absolute;
              left: 4%;
              top: 28px;
              z-index: 20;
         }
            .hero-actions {
              position: absolute;
              right: 4%;
              top: 28px;
              z-index: 20;
              display: flex;
              align-items: center;
              gap: 14px;
            }

          .hero-hype-link {
            display: none;
          }

          .hero-create-link {
            padding: 10px 11px;
            font-size: 8px;
          }

          .hero-apply-link {
            padding: 11px 13px;
            font-size: 8px;
          }

          .hero-stamp-centered {
            margin-top: 36px;
          }

          .hero-flight-board {
            max-width: 90vw;
            line-height: 1.8;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .intro .arrival-title,
          .intro .arrival-title-goa,
          .hero-studio-mark,
          .hero-stamp-centered,
          .hero-eyebrow-centered,
          .hero-title-wrap,
          .hero-goa-float,
          .hero-meta-centered,
          .hero-copy-centered,
          .hero-cta-centered,
          .hero-flight-board {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}

function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [planeX, setPlaneX] = useState(0);
  const [planeY, setPlaneY] = useState(0);
  const [planeRotation, setPlaneRotation] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [hideBanner, setHideBanner] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 700;

    // ==========================================
    // MOBILE
    // No airplane animation
    // ==========================================
    if (isMobile) {
      setShowTitle(true);
      setHideBanner(true);

      const mobileTimer = window.setTimeout(() => {
        onComplete();
      }, 1500);

      return () => {
        window.clearTimeout(mobileTimer);
      };
    }

    // ==========================================
    // DESKTOP / TABLET
    // Full airplane animation
    // ==========================================

    let frameId: number;
    let startTime: number | null = null;

    const DURATION_IN = 2000;
    const DURATION_HOLD = 900;
    const DURATION_OUT = 2000;

    const startX = window.innerWidth + 100;

    // Your current plane position
    const centerX = Math.max(-40, window.innerWidth * 0.01);

    const endX = -640;

    let phase: "in" | "hold" | "out" = "in";

    let holdTimer: ReturnType<typeof setTimeout> | null = null;
    let popTimer: ReturnType<typeof setTimeout> | null = null;
    let completeTimer: ReturnType<typeof setTimeout> | null = null;

    // ==========================================
    // PLANE ENTER
    // ==========================================

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      if (phase === "in") {
        const progress = Math.min(elapsed / DURATION_IN, 1);

        const eased = 1 - Math.pow(1 - progress, 3);

        const x = startX + (centerX - startX) * eased;

        const y = Math.sin(progress * Math.PI * 2) * 20;

        const rotation = Math.sin(progress * Math.PI * 2) * 1.5;

        setPlaneX(x);
        setPlaneY(y);
        setPlaneRotation(rotation);

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          // ====================================
          // PLANE REACHED CENTER
          // ====================================

          phase = "hold";

          holdTimer = setTimeout(() => {
            setShowTitle(true);
            setHideBanner(true);

            // Wait for Hacker House pop animation
            popTimer = setTimeout(() => {
              phase = "out";
              startTime = null;

              frameId = requestAnimationFrame(animateOut);
            }, 1350);
          }, DURATION_HOLD);
        }
      }
    };

    // ==========================================
    // PLANE EXIT
    // ==========================================

    const animateOut = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      const progress = Math.min(elapsed / DURATION_OUT, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      const x = centerX + (endX - centerX) * eased;

      const y = Math.sin(progress * Math.PI * 2) * 20 - progress * 10;

      const rotation = Math.sin(progress * Math.PI * 2) * 1.5 - 0.5;

      setPlaneX(x);
      setPlaneY(y);
      setPlaneRotation(rotation);

      if (progress < 1) {
        frameId = requestAnimationFrame(animateOut);
      } else {
        completeTimer = setTimeout(() => {
          onComplete();
        }, 300);
      }
    };

    // ==========================================
    // START
    // ==========================================

    frameId = requestAnimationFrame(animate);

    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      if (holdTimer) {
        clearTimeout(holdTimer);
      }

      if (popTimer) {
        clearTimeout(popTimer);
      }

      if (completeTimer) {
        clearTimeout(completeTimer);
      }
    };
  }, [onComplete]);

  return (
    <section className="intro fixed inset-0 z-[100] overflow-hidden bg-[#063d2b]">
      {/* ==========================================
          BACKGROUND
          ========================================== */}

      <div className="intro-grain absolute inset-0" />

      <div className="intro-sun absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="intro-stars absolute inset-0" />

      <div className="intro-cloud cloud-a" />
      <div className="intro-cloud cloud-b" />
      <div className="intro-cloud cloud-c" />

      <div className="intro-palm palm-left" />
      <div className="intro-palm palm-right" />

      <div className="intro-waves">
        <span />
        <span />
        <span />
      </div>

      {/* ==========================================
          2:47 PM STUDIO
          ========================================== */}

      <div className="studio-mark">
        <span className="studio-time">2:47</span>
        <span className="studio-pm">PM</span>
        <span className="studio-name">STUDIO</span>
      </div>

      {/* ==========================================
          AIRPLANE
          Hidden completely on mobile
          ========================================== */}

      <div
        className="goa-flight"
        aria-hidden="true"
        style={{
          display:
            typeof window !== "undefined" && window.innerWidth <= 700
              ? "none"
              : "block",

          left: `${planeX}px`,
          top: `calc(40vh + ${planeY}px)`,
          transform: `rotate(${planeRotation}deg)`,
        }}
      >
        <div className="hero-plane">
          <div className="hero-plane-body">
            <span className="hero-plane-window w1" />
            <span className="hero-plane-window w2" />
            <span className="hero-plane-window w3" />
            <span className="hero-plane-window w4" />
            <span className="hero-plane-window w5" />

            <span className="hero-plane-logo">HH26</span>

            <span className="hero-plane-wing top-wing" />
            <span className="hero-plane-wing bottom-wing" />

            <span className="hero-plane-tail" />
          </div>

          <div className="engine-glow" />
        </div>

        {/* HH GOA banner */}

        <div
          className={`goa-tail-banner ${hideBanner ? "hide" : ""}`}
          aria-hidden="true"
        >
          <span className="goa-tail-cable" />

          <span className="goa-tail-label">HH GOA</span>

          <span className="goa-tail-year">2026</span>

          <span className="goa-tail-point" />
        </div>
      </div>

      {/* ==========================================
          HACKER HOUSE TITLE
          ========================================== */}

      <div
        className={`arrival-title ${showTitle ? "pop" : ""}`}
        aria-hidden="true"
      >
        <div className="arrival-title-main">HACKER HOUSE</div>

        <div className="arrival-title-goa">गोवा</div>

        <div className="arrival-title-details">
          <span>GOA, INDIA</span>

          <span>•</span>

          <span>28 — 31 OCT 2026</span>
        </div>
      </div>

      {/* ==========================================
          ARRIVAL STAMP
          ========================================== */}

      <div className="arrival-stamp" aria-hidden="true">
        <div className="stamp-ring">
          <span>DESTINATION</span>
          <strong>GOA</strong>
          <span>HH26</span>
        </div>
      </div>
    </section>
  );
}
function Hero() {
  return (
    <section className="hero-landing relative min-h-[calc(100vh-72px)] overflow-hidden border-b border-[#f5d000]/20">
      <div className="hero-pattern absolute inset-0" />

      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />
      <div className="hero-glow" />

      {/* Same 2:47 PM STUDIO identity as the intro */}
      <div className="hero-studio-mark" aria-label="2:47 PM Studio">
        <span className="hero-studio-time">2:47</span>
        <span className="hero-studio-pm">PM</span>
        <span className="hero-studio-name">STUDIO</span>
      </div>

      {/* Top-right actions */}
      <div className="hero-actions">
        <a href="/create" className="hero-create-link">
          CREATE ID
        </a>
        <a
          href="https://hhgoa.com/"
          target="_blank"
          rel="noreferrer"
          className="hero-apply-link"
        >
          APPLY
        </a>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-[1600px] flex-col items-center justify-center px-5 py-24 text-center sm:px-10 lg:px-16">
        <div className="hero-stamp hero-stamp-centered hero-stamp-top">
          <span className="pulse-dot" />
          OPEN FOR BUILDERS · GOA 2026
        </div>

        <p className="hero-eyebrow hero-eyebrow-centered">
          THE BUILDER'S ARRIVAL
        </p>

        <div className="hero-title-wrap">
          <h1 className="hero-title hero-title-centered">HACKER HOUSE</h1>

          {/* Floating Goa treatment */}
          <div className="hero-goa-float" aria-label="Goa">
            गोवा
          </div>
        </div>

        <div className="hero-meta-centered">
          <span>GOA, INDIA</span>
          <span>•</span>
          <span>28 — 31 OCT 2026</span>
        </div>

        <div className="hero-copy-centered">
          <p className="font-display text-xl leading-relaxed text-[#fff5d8]/90 sm:text-2xl">
            Your photo. Your stack. Your builder identity.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#fff5d8]/55 sm:text-base">
            Step into Goa, claim your builder class, and create a shareable
            Hacker House identity in seconds.
          </p>
        </div>

        <a href="/create" className="hero-cta hero-cta-centered">
          <span>CREATE YOUR BUILDER ID</span>
          <span className="text-xl">↗</span>
        </a>

        <div className="hero-flight-board" aria-hidden="true">
          <span>HH26 / BOARDING OPEN</span>
          <i />
          <span>BUILD → SHIP → REPEAT</span>
          <i />
          <span>DESTINATION: GOA</span>
        </div>
      </div>
    </section>
  );
}

function TicketSection() {
  return (
    <section className="relative overflow-hidden bg-[#f9edcf] px-5 py-24 text-[#063d2b] sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-[1250px] items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex justify-center">
          <SampleBuilderId />
        </div>

        <div>
          <p className="section-kicker">YOUR TICKET TO GOA</p>

          <h2 className="section-title">
            YOUR
            <br />
            BUILDER
            <br />
            ID.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#063d2b]/65 sm:text-lg">
            Upload your photo, tell us what you build, and let the Goa machine
            turn you into a builder worth remembering.
          </p>

          <a href="/create" className="dark-cta mt-8 inline-flex">
            CREATE MY ID <span>→</span>
          </a>

          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#063d2b]/45">
            No login · No cropping · Generated in your browser
          </p>
        </div>
      </div>
    </section>
  );
}

function SampleBuilderId() {
  return (
    <div className="builder-card">
      <div className="builder-card-top">
        <div>
          <p className="builder-card-brand">HH GOA</p>
          <p className="builder-card-year">2026 · BUILDER ID</p>
        </div>

        <div className="builder-card-stamp">GOA</div>
      </div>

      <div className="builder-photo">
        <div className="sample-person">
          <div className="sample-head" />
          <div className="sample-body" />
        </div>
        <span className="photo-label">BUILDER PHOTO</span>
      </div>

      <div className="builder-name">BHARGAV CHANDRA</div>

      <div className="builder-role">FULL STACK DEVELOPER</div>

      <div className="builder-class">
        <span>BUILDER CLASS</span>
        COCONUT COMPILER
      </div>

      <div className="builder-meta">
        <div>
          <span>DESTINATION</span>
          GOA · INDIA
        </div>

        <div>
          <span>BUILDER ID</span>
          HHG26-GOA-7K9M2
        </div>
      </div>

      <div className="builder-barcode">
        {Array.from({ length: 28 }).map((_, index) => (
          <i key={index} />
        ))}
      </div>

      <div className="builder-footer">
        <span>BUILD</span>
        <span>SHIP</span>
        <span>REPEAT</span>
      </div>
    </div>
  );
}

function BuildShipRepeat() {
  return (
    <section className="relative overflow-hidden bg-[#063d2b] px-5 py-28 text-[#fff5d8] sm:px-10 lg:px-16 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <p className="section-kicker text-[#f5d000]">THE BUILDER CODE</p>

        <div className="mt-10 space-y-2">
          <div className="massive-word massive-word-yellow">BUILD</div>
          <div className="massive-word massive-word-pink">SHIP</div>
          <div className="massive-word massive-word-cream">REPEAT</div>
        </div>

        <div className="mt-14 flex max-w-xl items-start gap-5">
          <div className="mt-2 h-px w-16 bg-[#f5d000]" />
          <p className="text-sm leading-7 text-[#fff5d8]/55 sm:text-base">
            Good builders don't wait for perfect conditions. They arrive, build
            something strange, ship it, and do it again.
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#ff197d] px-5 py-28 text-[#063d2b] sm:px-10 lg:px-16 lg:py-40">
      <div className="mx-auto max-w-[1200px] text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em]">
          NEXT STOP · GOA
        </p>

        <h2 className="mt-5 font-display text-[clamp(3.5rem,11vw,9rem)] uppercase leading-[0.78] tracking-[-0.06em]">
          READY TO
          <br />
          LAND?
        </h2>

        <a href="/create" className="final-cta-button mt-12 inline-flex">
          CREATE YOUR BUILDER ID <span>↗</span>
        </a>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em]">
          #FrameInGoa · #HHGoa2026
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#f5d000]/20 bg-[#063d2b] px-5 py-8 text-[#fff5d8] sm:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.12em]">
            Frame In Goa
          </p>
          <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-[#f5d000]">
            A builder identity experiment
          </p>
        </div>

        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#fff5d8]/40">
          GOA · INDIA · 2026
        </p>
      </div>
    </footer>
  );
}
