"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import QRCode from "qrcode";

const COLORS = {
  green: "#063d2b",
  darkGreen: "#03291e",
  cream: "#fff5d8",
  paper: "#f9edcf",
  yellow: "#f5d000",
  pink: "#ff197d",
};

const builderClasses = [
  "AI BUILDER",
  "FULL STACK BUILDER",
  "FRONTEND BUILDER",
  "BACKEND BUILDER",
  "DESIGN BUILDER",
  "PRODUCT BUILDER",
  "OPEN SOURCE BUILDER",
  "ETHICAL HACKER",
];

function generateBuilderId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let randomPart = "";

  for (let i = 0; i < 4; i++) {
    randomPart += chars[Math.floor(Math.random() * chars.length)];
  }

  return `HH26-${randomPart}`;
}

export default function CreatePage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [cardScale, setCardScale] = useState(1);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [builderClass, setBuilderClass] = useState("AI BUILDER");

  const [photo, setPhoto] = useState<string | null>(null);

  const [photoZoom, setPhotoZoom] = useState(1);
  const [photoX, setPhotoX] = useState(0);
  const [photoY, setPhotoY] = useState(0);

  const [builderId, setBuilderId] = useState("");

  const [qrCode, setQrCode] = useState("");

  const [generating, setGenerating] = useState(false);

  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    const updateCardScale = () => {
      const preview = previewRef.current;

      if (!preview) return;

      const availableWidth = preview.clientWidth;

      setCardScale(Math.min(1, availableWidth / 560));
    };

    updateCardScale();

    const observer = new ResizeObserver(updateCardScale);

    const preview = previewRef.current;

    if (preview) {
      observer.observe(preview);
    }

    window.addEventListener("resize", updateCardScale);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateCardScale);
    };
  }, []);

  const canGenerate = useMemo(() => {
    return Boolean(name.trim() && role.trim() && photo);
  }, [name, role, photo]);

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result as string);
      setPhotoZoom(1);
      setPhotoX(0);
      setPhotoY(0);
      setGenerated(false);
    };

    reader.readAsDataURL(file);
  };

  const generateCard = () => {
    if (!canGenerate) return;

    setGenerated(true);

    setTimeout(() => {
      cardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;

    try {
      setGenerating(true);

      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: COLORS.green,
      });

      const link = document.createElement("a");

      link.download = `${builderId}-frame-in-goa.png`;
      link.href = dataUrl;

      link.click();
    } catch (error) {
      console.error("Card generation failed:", error);
      alert("Something went wrong while generating your card.");
    } finally {
      setGenerating(false);
    }
  };

  const getShareText = () => {
    const roleText = role.trim() || "Builder";
    const classText = builderClass || "AI BUILDER";
    const nameText = name.trim() || "Builder";
    const siteUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://frame-in-goa-theta.vercel.app";

    const fullText = [
      `🚀 HH Goa 2026 Builder ID unlocked!`,
      `${nameText} · ${roleText}`,
      `${classText} · ${builderId}`,
      `BUILD → SHIP → REPEAT 🌴`,
      `#FrameInGoa #HHGoa2026`,
    ].join("\n");

    if (fullText.length <= 280) return fullText;

    const compactText = [
      `🚀 HH Goa 2026 Builder ID: ${builderId}`,
      `${nameText} · ${classText}`,
      `${siteUrl}`,
      `#FrameInGoa`,
    ].join("\n");

    if (compactText.length <= 280) return compactText;

    return `${builderId} · ${siteUrl} #FrameInGoa`;
  };

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }

    return "https://frame-in-goa-theta.vercel.app";
  };

  const shareToX = () => {
    window.open(
      "https://twitter.com/intent/tweet?text=Hello%20from%20HH%20Goa%202026",
      "_blank",
    );
  };
  const shareToWhatsApp = () => {
    const text = getShareText();
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      getShareUrl(),
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyShareCaption = async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      alert("Share caption copied!");
    } catch (error) {
      console.error("Copy caption failed:", error);
      alert("Could not copy the caption. Please try again.");
    }
  };

  const nativeShare = async () => {
    if (!cardRef.current) return;

    try {
      setGenerating(true);

      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: COLORS.green,
      });

      const response = await fetch(dataUrl);
      const blob = await response.blob();

      const file = new File([blob], `${builderId}-frame-in-goa.png`, {
        type: "image/png",
      });

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: "My HH Goa 2026 Builder ID",
          text: getShareText(),
          files: [file],
        });
      } else {
        await downloadCard();
      }
    } catch (error) {
      console.error("Share failed:", error);
    } finally {
      setGenerating(false);
    }
  };

  const regenerateId = () => {
    setBuilderId(generateBuilderId());
  };

  return (
    <main
      className="min-h-screen px-4 py-6 sm:px-8 lg:px-12"
      style={{
        background: COLORS.green,
        color: COLORS.cream,
      }}
    >
      {/* HEADER */}

      <header className="mx-auto flex max-w-[1500px] items-center justify-between border-b border-[#f5d000]/20 pb-5">
        <a
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: COLORS.yellow }}
        >
          ← Frame In Goa
        </a>

        <div className="text-right">
          <p
            className="font-display text-xl uppercase tracking-tight sm:text-2xl"
            style={{ color: COLORS.yellow }}
          >
            HH GOA 2026
          </p>

          <p
            className="font-mono text-[8px] uppercase tracking-[0.2em]"
            style={{ color: COLORS.cream, opacity: 0.55 }}
          >
            Builder Identity Generator
          </p>
        </div>
      </header>

      {/* PAGE */}

      <section className="mx-auto max-w-[1500px] py-10 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* LEFT SIDE */}

          <div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: COLORS.pink }}
            >
              FRAME IN GOA · HH26
            </p>

            <h1
              className="mt-5 font-display text-[clamp(4rem,9vw,8rem)] uppercase leading-[0.78] tracking-[-0.06em]"
              style={{ color: COLORS.yellow }}
            >
              BUILD
              <br />
              YOUR
              <br />
              ID.
            </h1>

            <p
              className="mt-8 max-w-lg text-sm leading-7 sm:text-base"
              style={{ color: COLORS.cream, opacity: 0.65 }}
            >
              Upload your photo, add your builder identity and generate your
              official HH Goa 2026 Frame ID.
            </p>

            {/* FORM */}

            <div className="mt-10 space-y-5">
              {/* PHOTO */}

              <div>
                <label
                  className="mb-2 block font-mono text-[9px] uppercase tracking-[0.2em]"
                  style={{ color: COLORS.yellow }}
                >
                  01 · Photo
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/heic,image/heif"
                  onChange={handlePhoto}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="group flex min-h-[150px] w-full items-center justify-center border border-dashed px-5 transition hover:-translate-y-1"
                  style={{
                    borderColor: `${COLORS.yellow}66`,
                    background: COLORS.darkGreen,
                  }}
                >
                  {photo ? (
                    <div className="flex items-center gap-4">
                      <img
                        src={photo}
                        alt="Uploaded"
                        className="h-20 w-20 rounded-full object-cover"
                        style={{
                          border: `2px solid ${COLORS.yellow}`,
                        }}
                      />

                      <div className="text-left">
                        <p
                          className="font-mono text-xs uppercase"
                          style={{ color: COLORS.yellow }}
                        >
                          Photo loaded
                        </p>

                        <p
                          className="mt-1 text-xs"
                          style={{
                            color: COLORS.cream,
                            opacity: 0.5,
                          }}
                        >
                          Click to replace
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div
                        className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border"
                        style={{
                          borderColor: COLORS.yellow,
                          color: COLORS.yellow,
                        }}
                      >
                        +
                      </div>

                      <p
                        className="font-mono text-[10px] uppercase tracking-[0.15em]"
                        style={{ color: COLORS.cream }}
                      >
                        Upload your photo
                      </p>

                      <p
                        className="mt-2 text-[10px]"
                        style={{
                          color: COLORS.cream,
                          opacity: 0.4,
                        }}
                      >
                        JPG · PNG · WEBP · HEIC
                      </p>
                    </div>
                  )}
                </button>
              </div>

              {/* PHOTO FRAMING */}
              {photo && (
                <div
                  className="mt-4 rounded-xl p-4"
                  style={{
                    background: "rgba(3, 41, 30, 0.7)",
                    border: "1px solid rgba(245, 208, 0, 0.12)",
                  }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
                      style={{ color: COLORS.yellow }}
                    >
                      Photo framing
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoZoom(1);
                        setPhotoX(0);
                        setPhotoY(0);
                      }}
                      className="font-mono text-[7px] uppercase tracking-[0.15em]"
                      style={{ color: COLORS.pink }}
                    >
                      Reset
                    </button>
                  </div>

                  <label className="mb-3 block">
                    <div className="mb-1 flex justify-between font-mono text-[7px] uppercase tracking-[0.12em]">
                      <span style={{ color: COLORS.cream, opacity: 0.55 }}>
                        Zoom
                      </span>
                      <span style={{ color: COLORS.yellow }}>
                        {photoZoom.toFixed(1)}×
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="2.5"
                      step="0.1"
                      value={photoZoom}
                      onChange={(e) => setPhotoZoom(Number(e.target.value))}
                      className="w-full accent-[#F5D000]"
                    />
                  </label>

                  <label className="mb-3 block">
                    <div className="mb-1 flex justify-between font-mono text-[7px] uppercase tracking-[0.12em]">
                      <span style={{ color: COLORS.cream, opacity: 0.55 }}>
                        Horizontal
                      </span>
                      <span style={{ color: COLORS.yellow }}>{photoX}px</span>
                    </div>
                    <input
                      type="range"
                      min="-80"
                      max="80"
                      step="1"
                      value={photoX}
                      onChange={(e) => setPhotoX(Number(e.target.value))}
                      className="w-full accent-[#F5D000]"
                    />
                  </label>

                  <label className="block">
                    <div className="mb-1 flex justify-between font-mono text-[7px] uppercase tracking-[0.12em]">
                      <span style={{ color: COLORS.cream, opacity: 0.55 }}>
                        Vertical
                      </span>
                      <span style={{ color: COLORS.yellow }}>{photoY}px</span>
                    </div>
                    <input
                      type="range"
                      min="-120"
                      max="120"
                      step="1"
                      value={photoY}
                      onChange={(e) => setPhotoY(Number(e.target.value))}
                      className="w-full accent-[#F5D000]"
                    />
                  </label>

                  <p
                    className="mt-3 font-mono text-[7px] uppercase leading-4 tracking-[0.08em]"
                    style={{ color: COLORS.cream, opacity: 0.35 }}
                  >
                    Tip: keep the face + hair inside the frame. Use vertical
                    positioning for tall portraits and zoom for close-ups.
                  </p>
                </div>
              )}

              {/* NAME */}

              <div>
                <label
                  className="mb-2 block font-mono text-[9px] uppercase tracking-[0.2em]"
                  style={{ color: COLORS.yellow }}
                >
                  02 · Name
                </label>

                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setGenerated(false);
                  }}
                  placeholder="Your name"
                  maxLength={28}
                  className="w-full border px-4 py-4 outline-none transition"
                  style={{
                    borderColor: `${COLORS.yellow}55`,
                    background: COLORS.darkGreen,
                    color: COLORS.cream,
                  }}
                />
              </div>

              {/* ROLE */}

              <div>
                <label
                  className="mb-2 block font-mono text-[9px] uppercase tracking-[0.2em]"
                  style={{ color: COLORS.yellow }}
                >
                  03 · Stack / Role
                </label>

                <input
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setGenerated(false);
                  }}
                  placeholder="e.g. Full Stack Developer"
                  maxLength={35}
                  className="w-full border px-4 py-4 outline-none transition"
                  style={{
                    borderColor: `${COLORS.yellow}55`,
                    background: COLORS.darkGreen,
                    color: COLORS.cream,
                  }}
                />
              </div>

              {/* BUILDER CLASS */}

              <div>
                <label
                  className="mb-2 block font-mono text-[9px] uppercase tracking-[0.2em]"
                  style={{ color: COLORS.yellow }}
                >
                  04 · Builder Class
                </label>

                <select
                  value={builderClass}
                  onChange={(e) => {
                    setBuilderClass(e.target.value);
                    setGenerated(false);
                  }}
                  className="w-full appearance-none border px-4 py-4 outline-none"
                  style={{
                    borderColor: `${COLORS.yellow}55`,
                    background: COLORS.darkGreen,
                    color: COLORS.cream,
                  }}
                >
                  {builderClasses.map((item) => (
                    <option
                      key={item}
                      value={item}
                      style={{
                        background: COLORS.darkGreen,
                      }}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* BUILDER ID */}

              <div
                className="border p-4"
                style={{
                  borderColor: `${COLORS.pink}66`,
                  background: `${COLORS.pink}08`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="font-mono text-[8px] uppercase tracking-[0.2em]"
                      style={{
                        color: COLORS.cream,
                        opacity: 0.45,
                      }}
                    >
                      Your Builder ID
                    </p>

                    <p
                      className="mt-2 font-mono text-lg tracking-[0.12em]"
                      style={{ color: COLORS.pink }}
                    >
                      {builderId}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={regenerateId}
                    className="border px-3 py-2 font-mono text-[8px] uppercase tracking-widest transition hover:bg-[#f5d000] hover:text-[#063d2b]"
                    style={{
                      borderColor: `${COLORS.yellow}66`,
                      color: COLORS.yellow,
                    }}
                  >
                    New ID
                  </button>
                </div>
              </div>

              {/* GENERATE */}

              <button
                type="button"
                disabled={!canGenerate}
                onClick={generateCard}
                className="w-full px-6 py-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition disabled:cursor-not-allowed disabled:opacity-30"
                style={{
                  background: COLORS.yellow,
                  color: COLORS.green,
                }}
              >
                {generated ? "UPDATE FRAME →" : "GENERATE MY FRAME →"}
              </button>

              {!canGenerate && (
                <p
                  className="text-center font-mono text-[8px] uppercase tracking-[0.12em]"
                  style={{
                    color: COLORS.cream,
                    opacity: 0.35,
                  }}
                >
                  Add a photo, name and role to continue
                </p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="lg:sticky lg:top-8">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p
                  className="font-mono text-[9px] uppercase tracking-[0.25em]"
                  style={{ color: COLORS.pink }}
                >
                  LIVE PREVIEW
                </p>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: COLORS.cream,
                    opacity: 0.45,
                  }}
                >
                  Your identity, Goa edition.
                </p>
              </div>

              <span
                className="font-mono text-[8px] uppercase tracking-widest"
                style={{
                  color: COLORS.yellow,
                  opacity: 0.65,
                }}
              >
                01 / 01
              </span>
            </div>

            {/* Responsive preview viewport.
             */}
            <div
              ref={previewRef}
              className="relative flex w-full justify-center overflow-hidden"
              style={{
                height: `${778 * cardScale}px`,
              }}
            >
              <div
                className="relative h-[778px] w-[560px] shrink-0"
                style={{
                  transform: `scale(${cardScale})`,
                  transformOrigin: "top center",
                }}
              >
                <div
                  ref={cardRef}
                  className="relative h-[778px] w-[560px] overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(145deg, #063D2B 0%, #03291E 100%)",
                    borderRadius: "32px",
                    border: "1px solid rgba(245, 208, 0, 0.08)",
                    boxShadow:
                      "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(245, 208, 0, 0.04) inset",
                  }}
                >
                  {/* =========================
      BACKGROUND TEXTURE
  ========================== */}

                  {/* Subtle grain */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      opacity: 0.03,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      backgroundSize: "256px 256px",
                    }}
                  />

                  {/* Glowing orb – bottom right */}
                  <div
                    className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(245, 208, 0, 0.04) 0%, transparent 70%)",
                    }}
                  />

                  {/* Glowing orb – top left */}
                  <div
                    className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255, 25, 125, 0.03) 0%, transparent 70%)",
                    }}
                  />

                  {/* =========================
      DECORATIVE LINE ACCENTS
  ========================== */}

                  {/* Top left – pink slash */}
                  <div
                    className="absolute left-0 top-[18%] h-12 w-1"
                    style={{
                      background:
                        "linear-gradient(to bottom, #FF197D, transparent)",
                      borderRadius: "0 4px 4px 0",
                    }}
                  />

                  {/* Top right – yellow slash */}
                  <div
                    className="absolute right-0 top-[18%] h-12 w-1"
                    style={{
                      background:
                        "linear-gradient(to bottom, #F5D000, transparent)",
                      borderRadius: "4px 0 0 4px",
                    }}
                  />

                  {/* Bottom left – yellow dot */}
                  <div
                    className="absolute bottom-[22%] left-4 h-2 w-2 rounded-full"
                    style={{ background: "#F5D000", opacity: 0.3 }}
                  />

                  {/* Bottom right – pink dot */}
                  <div
                    className="absolute bottom-[28%] right-4 h-2 w-2 rounded-full"
                    style={{ background: "#FF197D", opacity: 0.3 }}
                  />

                  {/* =========================
      CONTENT
  ========================== */}
                  <div className="relative z-10 flex h-full flex-col px-7 py-6">
                    {/* ---- HEADER ---- */}
                    <div className="flex items-start justify-between">
                      {/* HH26 Badge */}
                      <div className="flex flex-col items-start gap-1.5">
                        <div
                          className="flex h-[58px] w-[58px] items-center justify-center rounded-2xl"
                          style={{
                            background:
                              "linear-gradient(135deg, #F5D000, #e6c200)",
                            color: "#063D2B",
                            boxShadow: "0 8px 32px rgba(245, 208, 0, 0.15)",
                          }}
                        >
                          <div className="text-center leading-none">
                            <div className="font-display text-[20px] font-black tracking-[-0.5px]">
                              HH26
                            </div>
                            <div className="font-mono text-[5px] font-bold tracking-[0.3em]">
                              GOA
                            </div>
                          </div>
                        </div>
                        <span
                          className="font-mono text-[6px] font-bold uppercase tracking-[0.3em]"
                          style={{ color: "#FF197D" }}
                        >
                          BUILDER ID
                        </span>
                      </div>

                      {/* HACKER HOUSE */}
                      <div className="text-right">
                        <div
                          className="font-display text-[34px] font-black uppercase leading-[0.8] tracking-[-0.03em]"
                          style={{ color: "#F5D000" }}
                        >
                          HACKER
                          <br />
                          HOUSE
                        </div>
                        <div
                          className="mt-1 inline-block rounded-lg px-3 py-0.5"
                          style={{
                            background: "#FF197D",
                            boxShadow: "0 4px 20px rgba(255, 25, 125, 0.2)",
                          }}
                        >
                          <span
                            className="font-display text-[15px] font-bold leading-none tracking-wide"
                            style={{ color: "#FFF5D8" }}
                          >
                            गोवा
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ---- DIVIDER + META ---- */}
                    <div className="mt-5 flex items-center justify-between">
                      <span
                        className="font-mono text-[7px] font-medium uppercase tracking-[0.3em]"
                        style={{ color: "#FFF5D8", opacity: 0.35 }}
                      >
                        GOA · INDIA
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono text-[7px] font-bold uppercase tracking-[0.2em]"
                          style={{ color: "#F5D000", opacity: 0.8 }}
                        >
                          28 — 31 OCT 2026
                        </span>
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: "#FF197D", opacity: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* ---- THE BUILDER'S ARRIVAL ---- */}
                    <div className="mt-4 flex items-center gap-3">
                      <span
                        className="h-[2px] w-6 rounded-full"
                        style={{ background: "#F5D000", opacity: 0.4 }}
                      />
                      <span
                        className="font-mono text-[6px] font-bold uppercase tracking-[0.35em]"
                        style={{ color: "#FFF5D8", opacity: 0.3 }}
                      >
                        THE BUILDER'S ARRIVAL
                      </span>
                      <span
                        className="h-[1px] flex-1"
                        style={{ background: "rgba(245, 208, 0, 0.06)" }}
                      />
                    </div>

                    {/* ---- PHOTO SECTION ---- */}
                    <div className="relative mx-auto mt-4 h-[284px] w-[72%] shrink-0">
                      {/* Outer glow ring */}
                      <div
                        className="absolute -inset-1 rounded-2xl"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(245, 208, 0, 0.15), rgba(255, 25, 125, 0.1))",
                          filter: "blur(12px)",
                        }}
                      />

                      {/* Photo frame

                      */}
                      <div
                        className="relative h-full w-full overflow-hidden rounded-2xl"
                        style={{
                          background: "#03291E",
                          border: "2px solid rgba(245, 208, 0, 0.12)",
                        }}
                      >
                        {photo ? (
                          <img
                            src={photo}
                            alt="Builder"
                            draggable={false}
                            className="absolute inset-0 h-full w-full select-none object-cover"
                            style={{
                              objectPosition: "50% 18%",
                              transform: `translate3d(${photoX}px, ${photoY}px, 0) scale(${photoZoom})`,
                              transformOrigin: "center top",
                              willChange: "transform",
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center">
                            <span
                              className="font-display text-[64px] font-black leading-none"
                              style={{ color: "#F5D000", opacity: 0.08 }}
                            >
                              HH
                            </span>
                            <span
                              className="mt-1 font-mono text-[6px] font-bold uppercase tracking-[0.25em]"
                              style={{ color: "#FFF5D8", opacity: 0.08 }}
                            >
                              UPLOAD PHOTO
                            </span>
                          </div>
                        )}

                        {/* Corner accents */}
                        <div
                          className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2"
                          style={{ borderColor: "#F5D000", opacity: 0.2 }}
                        />
                        <div
                          className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2"
                          style={{ borderColor: "#F5D000", opacity: 0.2 }}
                        />
                        <div
                          className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2"
                          style={{ borderColor: "#F5D000", opacity: 0.2 }}
                        />
                        <div
                          className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2"
                          style={{ borderColor: "#F5D000", opacity: 0.2 }}
                        />
                      </div>

                      {/* Photo side marks */}
                      <div
                        className="absolute -left-2 top-1/4 h-8 w-0.5 rounded-full"
                        style={{ background: "#FF197D", opacity: 0.4 }}
                      />
                      <div
                        className="absolute -right-2 bottom-1/4 h-8 w-0.5 rounded-full"
                        style={{ background: "#F5D000", opacity: 0.4 }}
                      />
                    </div>

                    {/* ---- NAME + ROLE ---- */}
                    <div className="mt-5 flex flex-col gap-2.5">
                      <div
                        className="w-full rounded-xl px-4 py-3 text-center"
                        style={{
                          background: "rgba(3, 41, 30, 0.6)",
                          border: "1px solid rgba(245, 208, 0, 0.06)",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        <div
                          className="font-display text-[clamp(1.3rem,4vw,2rem)] font-black uppercase leading-none tracking-tight"
                          style={{ color: "#FFF5D8" }}
                        >
                          {name || "YOUR NAME"}
                        </div>
                      </div>

                      <div
                        className="w-full rounded-xl px-4 py-2.5 text-center"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(245, 208, 0, 0.08), rgba(245, 208, 0, 0.02))",
                          border: "1px solid rgba(245, 208, 0, 0.06)",
                        }}
                      >
                        <div
                          className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
                          style={{ color: "#F5D000", opacity: 0.9 }}
                        >
                          {role || "YOUR STACK / ROLE"}
                        </div>
                      </div>
                    </div>

                    {/* ---- LOWER INFO (Class + QR) ---- */}
                    <div className="mt-5 grid grid-cols-[1fr_80px] gap-4">
                      {/* Left */}
                      <div>
                        <div
                          className="font-mono text-[6px] font-bold uppercase tracking-[0.3em]"
                          style={{ color: "#FF197D", opacity: 0.7 }}
                        >
                          BUILDER CLASS
                        </div>
                        <div
                          className="font-display text-[clamp(1rem,2.5vw,1.4rem)] font-black uppercase leading-none tracking-tight"
                          style={{ color: "#F5D000" }}
                        >
                          {builderClass}
                        </div>

                        <div
                          className="mt-3 h-px w-3/4"
                          style={{ background: "rgba(245, 208, 0, 0.06)" }}
                        />

                        <div className="mt-3">
                          <div
                            className="font-mono text-[5px] font-bold uppercase tracking-[0.25em]"
                            style={{ color: "#FFF5D8", opacity: 0.2 }}
                          >
                            BUILDER ID
                          </div>
                          <div
                            className="font-mono text-[10px] font-bold tracking-[0.15em]"
                            style={{ color: "#F5D000", opacity: 0.8 }}
                          >
                            {builderId}
                          </div>
                        </div>
                      </div>

                      {/* QR */}
                      <div>
                        <div
                          className="flex aspect-square w-full items-center justify-center rounded-xl p-1"
                          style={{
                            background: "#FFF5D8",
                            border: "1px solid rgba(245, 208, 0, 0.15)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                          }}
                        >
                          {qrCode && (
                            <img
                              src={qrCode}
                              alt="Builder ID QR"
                              className="h-full w-full rounded"
                            />
                          )}
                        </div>
                        <div
                          className="mt-0.5 text-center font-mono text-[5px] font-bold uppercase tracking-[0.15em]"
                          style={{ color: "#FF197D", opacity: 0.5 }}
                        >
                          SCAN ID
                        </div>
                      </div>
                    </div>

                    {/* ---- BUILD / SHIP / REPEAT ---- */}
                    <div className="mt-4">
                      <div
                        className="flex items-center justify-between rounded-full px-4 py-1.5"
                        style={{
                          background: "rgba(3, 41, 30, 0.4)",
                          border: "1px solid rgba(245, 208, 0, 0.04)",
                        }}
                      >
                        <span
                          className="font-mono text-[7px] font-bold uppercase tracking-[0.15em]"
                          style={{ color: "#F5D000", opacity: 0.8 }}
                        >
                          BUILD
                        </span>
                        <span
                          className="font-mono text-[10px] font-bold"
                          style={{ color: "#FF197D", opacity: 0.4 }}
                        >
                          →
                        </span>
                        <span
                          className="font-mono text-[7px] font-bold uppercase tracking-[0.15em]"
                          style={{ color: "#F5D000", opacity: 0.8 }}
                        >
                          SHIP
                        </span>
                        <span
                          className="font-mono text-[10px] font-bold"
                          style={{ color: "#FF197D", opacity: 0.4 }}
                        >
                          →
                        </span>
                        <span
                          className="font-mono text-[7px] font-bold uppercase tracking-[0.15em]"
                          style={{ color: "#F5D000", opacity: 0.8 }}
                        >
                          REPEAT
                        </span>
                      </div>
                    </div>

                    {/* ---- BOTTOM BAR ---- */}
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-b-[32px] px-6 py-3"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(245, 208, 0, 0.06), rgba(245, 208, 0, 0.02))",
                        borderTop: "1px solid rgba(245, 208, 0, 0.04)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div
                            className="font-mono text-[6px] font-bold uppercase tracking-[0.25em]"
                            style={{ color: "#FFF5D8", opacity: 0.2 }}
                          >
                            HH GOA 2026
                          </div>
                          <div
                            className="font-mono text-[5px] uppercase tracking-[0.15em]"
                            style={{ color: "#FFF5D8", opacity: 0.1 }}
                          >
                            GOA · INDIA
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className="inline-flex items-center justify-center rounded-full px-3 py-1"
                            style={{
                              background: "#FF197D",
                              border: "2px solid #F5D000",
                              boxShadow: "0 3px 12px rgba(255, 25, 125, 0.25)",
                            }}
                          >
                            <span
                              className="font-mono text-[11] font-bold tracking-[0.08em]"
                              style={{ color: "#FFF5D8" }}
                            >
                              #FRAMEINGOA
                            </span>
                          </div>
                          <div
                            className="mt-1 font-mono text-[4px] uppercase tracking-[0.2em]"
                            style={{ color: "#FFF5D8", opacity: 0.35 }}
                          >
                            BUILDERS WANTED
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ---- DECORATIVE STAMP ---- */}
                    <div
                      className="absolute right-5 top-[42%] z-20 -rotate-6 rounded-md px-2 py-1"
                      style={{
                        border: "1px solid rgba(255, 25, 125, 0.15)",
                        background: "rgba(3, 41, 30, 0.6)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <div
                        className="font-mono text-[4px] font-bold uppercase tracking-[0.12em]"
                        style={{ color: "#FF197D", opacity: 0.6 }}
                      >
                        BUILT
                      </div>
                      <div
                        className="font-mono text-[4px] font-bold uppercase tracking-[0.12em]"
                        style={{ color: "#F5D000", opacity: 0.4 }}
                      >
                        IN GOA
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ACTIONS */}

            {generated && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <button
                  type="button"
                  onClick={downloadCard}
                  disabled={generating}
                  className="px-4 py-4 font-mono text-[9px] font-bold uppercase tracking-[0.15em] transition hover:-translate-y-1 disabled:opacity-50"
                  style={{
                    background: COLORS.yellow,
                    color: COLORS.green,
                  }}
                >
                  {generating ? "CREATING..." : "↓ DOWNLOAD"}
                </button>

                <button
                  type="button"
                  onClick={shareToX}
                  className="px-4 py-4 font-mono text-[9px] font-bold uppercase tracking-[0.15em] transition hover:-translate-y-1"
                  style={{
                    background: COLORS.pink,
                    color: COLORS.cream,
                    border: `1px solid ${COLORS.yellow}`,
                    boxShadow: "0 0 18px rgba(255, 25, 125, 0.18)",
                  }}
                >
                  𝕏 SHARE TO X
                </button>

                <button
                  type="button"
                  onClick={copyShareCaption}
                  className="px-4 py-4 font-mono text-[9px] font-bold uppercase tracking-[0.15em] transition hover:-translate-y-1"
                  style={{
                    border: `1px solid ${COLORS.yellow}`,
                    color: COLORS.yellow,
                  }}
                >
                  COPY CAPTION
                </button>

                <button
                  type="button"
                  onClick={shareToWhatsApp}
                  className="px-4 py-4 font-mono text-[9px] font-bold uppercase tracking-[0.15em] transition hover:-translate-y-1"
                  style={{
                    border: `1px solid ${COLORS.yellow}`,
                    color: COLORS.yellow,
                  }}
                >
                  WHATSAPP
                </button>

                <button
                  type="button"
                  onClick={nativeShare}
                  disabled={generating}
                  className="px-4 py-4 font-mono text-[9px] font-bold uppercase tracking-[0.15em] transition hover:-translate-y-1 disabled:opacity-50"
                  style={{
                    border: `1px solid ${COLORS.pink}`,
                    color: COLORS.pink,
                  }}
                >
                  SHARE IMAGE
                </button>
              </div>
            )}

            {generated && (
              <div
                className="mt-3 flex flex-wrap items-center gap-4 font-mono text-[7px] uppercase tracking-[0.12em]"
                style={{ color: COLORS.cream, opacity: 0.42 }}
              >
                <button
                  type="button"
                  onClick={shareToFacebook}
                  className="transition hover:opacity-100"
                >
                  FACEBOOK
                </button>
                <span>·</span>
                <span>Instagram: download + copy caption</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer
        className="mx-auto max-w-[1500px] border-t pt-6"
        style={{
          borderColor: `${COLORS.yellow}22`,
        }}
      >
        <div className="flex flex-col justify-between gap-3 sm:flex-row">
          <p
            className="font-mono text-[8px] uppercase tracking-[0.18em]"
            style={{
              color: COLORS.cream,
              opacity: 0.35,
            }}
          >
            HH GOA 2026 · FRAME IN GOA
          </p>

          <p
            className="font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{
              color: COLORS.pink,
            }}
          >
            #FrameInGoa
          </p>
        </div>
      </footer>
    </main>
  );
}
