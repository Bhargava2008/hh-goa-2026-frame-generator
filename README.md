# FRAME IN GOA — HH Goa 2026 Builder ID Generator

> **Build your identity. Frame your journey. Ship from Goa.**

A cinematic **HH Goa 2026 Frame / Builder ID Generator** built for the **Frame In Goa** shortlisting task.

The project allows a participant to:

```text
Upload Photo
     ↓
Enter Name
     ↓
Enter Stack / Role
     ↓
Select Builder Class
     ↓
Generate Unique Builder ID
     ↓
Preview HH Goa 2026 ID
     ↓
Download / Share
     ↓
#FrameInGoa
```

---

# 1. Project Information

| Item | Details |
|---|---|
| Project | Frame In Goa |
| Event | HH Goa 2026 |
| Purpose | Builder ID / Frame Generator |
| Framework | Next.js |
| Language | TypeScript |
| UI | React + Tailwind CSS |
| Deployment | Vercel |
| Main generator | `app/create/page.tsx` |

---

# 2. Main Features

## Landing experience

- HH Goa 2026 cinematic intro
- Hacker House Goa branding
- Animated aircraft on desktop/tablet
- Mobile-friendly intro behavior
- Green / yellow / pink visual identity

## Builder ID generator

The generated card contains:

```text
HH26
HACKER HOUSE
गोवा
GOA, INDIA
28 — 31 OCT 2026

PHOTO

BUILDER NAME
STACK / ROLE
BUILDER CLASS
UNIQUE BUILDER ID

QR CODE

#FRAMEINGOA
```

## Sharing

The project supports:

```text
↓ DOWNLOAD
𝕏 SHARE TO X
COPY CAPTION
WHATSAPP
SHARE IMAGE
FACEBOOK
```

The X message is intentionally kept short so it can be posted without requiring a premium account.

---

# 3. Design System

The main palette is:

```tsx
const COLORS = {
  green: "#063D2B",
  yellow: "#F5D000",
  pink: "#FF197D",
  cream: "#FFF5D8",
};
```

## Color usage

```text
#063D2B
Primary background / main environment

#F5D000
Headings / borders / buttons / important metadata

#FF197D
Event accents / badges / highlighted #FrameInGoa

#FFF5D8
Supporting text / cream elements
```

---

# 4. Project Structure

```text
frame-generator/
│
├── app/
│   ├── create/
│   │   └── page.tsx        ← Main Builder ID generator
│   │
│   ├── favicon.ico
│   ├── globals.css         ← Global styles
│   ├── layout.tsx          ← Root layout
│   └── page.tsx            ← Landing page
│
├── public/
│   └── ...                 ← Static assets
│
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
└── README.md
```

---

# 5. Important Files

## `app/page.tsx`

This is the main landing page.

```tsx
export default function Home() {
  return (
    <main>
      {/* HH Goa landing experience */}
    </main>
  );
}
```

## `app/create/page.tsx`

This is the main generator.

```tsx
"use client";

export default function CreatePage() {
  // photo
  // name
  // role
  // builder class
  // unique ID
  // preview
  // download
  // sharing
}
```

Because this page uses browser APIs such as:

```tsx
window
document
navigator
File
ResizeObserver
```

it must remain a Client Component.

---

# 6. Development Setup

## Clone

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd frame-generator
```

## Install

```bash
npm install
```

## Run development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

# 7. Production Build

Before deploying to Vercel:

```bash
npm run build
```

If the build succeeds:

```bash
npm start
```

Then test:

```text
http://localhost:3000
```

### Important

Warnings such as:

```text
The class `h-[778px]` can be written as `h-194.5`
```

are Tailwind suggestions.

The important thing is that there are **no actual TypeScript/build errors**.

---

# 8. Fixed Builder ID Dimensions

The ID card intentionally uses fixed dimensions.

```tsx
const CARD_WIDTH = 560;
const CARD_HEIGHT = 778;
```

The card should not resize its internal layout based on the user's photo.

Instead:

```text
Actual card
560 × 778
     ↓
Preview container
     ↓
Responsive scale
```

Example:

```tsx
<div
  className="relative h-[778px] w-[560px] shrink-0"
>
  {/* Builder ID */}
</div>
```

This keeps the generated design consistent.

---

# 9. Responsive Preview Scaling

The preview can scale down while keeping the card dimensions unchanged.

```tsx
const [cardScale, setCardScale] = useState(1);

useEffect(() => {
  const updateCardScale = () => {
    const preview = previewRef.current;

    if (!preview) return;

    const availableWidth = preview.clientWidth;

    setCardScale(
      Math.min(1, availableWidth / 560)
    );
  };

  updateCardScale();

  const observer = new ResizeObserver(updateCardScale);

  const preview = previewRef.current;

  if (preview) {
    observer.observe(preview);
  }

  window.addEventListener(
    "resize",
    updateCardScale
  );

  return () => {
    observer.disconnect();

    window.removeEventListener(
      "resize",
      updateCardScale
    );
  };
}, []);
```

This prevents the TypeScript error caused by:

```tsx
observer.observe(previewRef.current);
```

when the ref can be `null`.

---

# 10. Photo Handling

The uploaded photo should stay inside the designated photo area.

The important principle is:

```text
PHOTO
 ↓
Fixed frame
 ↓
object-fit: cover
 ↓
No overflow outside the frame
```

Example:

```tsx
<div className="relative overflow-hidden">
  <img
    src={photo}
    alt="Builder"
    className="h-full w-full object-cover"
  />
</div>
```

The key class is:

```text
overflow-hidden
```

and:

```text
object-cover
```

This prevents the photo from escaping the designated area.

---

# 11. Photo Controls

For a controlled photo crop:

```tsx
<img
  src={photo}
  alt="Builder"
  className="h-full w-full object-cover"
  style={{
    objectPosition: `${positionX}% ${positionY}%`,
    transform: `scale(${zoom})`,
  }}
/>
```

Typical state:

```tsx
const [zoom, setZoom] = useState(1);
const [positionX, setPositionX] = useState(50);
const [positionY, setPositionY] = useState(50);
```

The idea is:

```text
Zoom
  +
Horizontal position
  +
Vertical position
       ↓
Correct photo framing
```

This lets different portrait and landscape photos fit the same card.

---

# 12. Builder ID Format

Builder IDs use the HH Goa 2026 prefix:

```text
HH26-XXXX
```

Examples:

```text
HH26-GYT3
HH26-NT8N
HH26-JUST
HH26-C4FH
```

A simple random generator can use:

```tsx
const generateBuilderId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let suffix = "";

  for (let i = 0; i < 4; i++) {
    suffix += chars[
      Math.floor(Math.random() * chars.length)
    ];
  }

  return `HH26-${suffix}`;
};
```

For a production system requiring guaranteed global uniqueness, IDs should eventually be generated and checked server-side.

---

# 13. `#FrameInGoa` Highlight

The official sharing tag should remain visually prominent.

Example:

```tsx
<div
  style={{
    background: "#FF197D",
    border: "2px solid #F5D000",
  }}
  className="rounded-full px-5 py-2"
>
  <span
    className="font-mono text-[11px] font-bold tracking-[0.08em]"
    style={{
      color: "#FFF5D8",
    }}
  >
    #FRAMEINGOA
  </span>
</div>
```

Visual hierarchy:

```text
PINK BACKGROUND
      +
YELLOW BORDER
      +
CREAM TEXT
      ↓
#FRAMEINGOA
```

---

# 14. Unique Builder Information

The card should display:

```tsx
<div>
  <p>BUILDER CLASS</p>
  <h3>{builderClass}</h3>
</div>

<div>
  <p>BUILDER ID</p>
  <strong>{builderId}</strong>
</div>
```

Example result:

```text
BUILDER CLASS

OPEN SOURCE BUILDER


BUILDER ID

HH26-NT8N
```

---

# 15. QR Code

The QR code should be generated from the builder identity or validation URL.

Conceptually:

```tsx
const validationUrl =
  `${window.location.origin}/verify/${builderId}`;
```

Then generate the QR code from:

```tsx
validationUrl
```

This makes the QR code useful for future validation rather than simply being decorative.

> If `/verify/[id]` is not implemented yet, the QR code should not claim to validate a builder. It can remain decorative until a verification route exists.

---

# 16. Downloading the ID

The final card can be exported as a PNG.

Conceptual implementation:

```tsx
const downloadCard = async () => {
  if (!cardRef.current) return;

  const dataUrl = await toPng(cardRef.current, {
    pixelRatio: 3,
    cacheBust: true,
    backgroundColor: COLORS.green,
  });

  const link = document.createElement("a");

  link.download =
    `${builderId}-frame-in-goa.png`;

  link.href = dataUrl;

  link.click();
};
```

The important part is:

```tsx
pixelRatio: 3
```

which gives the downloaded card better resolution.

---

# 17. X Sharing

The X message is intentionally short.

Example:

```text
🚀 HH Goa 2026 Builder ID unlocked!

AI BUILDER · HH26-JUST
BUILD → SHIP → REPEAT 🌴

https://your-project.vercel.app
#FrameInGoa #HHGoa2026
```

The code should use:

```tsx
const getShareText = () => {
  const text = [
    "🚀 HH Goa 2026 Builder ID unlocked!",
    `${builderClass} · ${builderId}`,
    "BUILD → SHIP → REPEAT 🌴",
    getShareUrl(),
    "#FrameInGoa #HHGoa2026",
  ].join("\n");

  return text;
};
```

Then:

```tsx
const shareToX = () => {
  const url =
    `https://twitter.com/intent/tweet?text=${
      encodeURIComponent(getShareText())
    }`;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
};
```

---

# 18. Never Share `localhost` in Production

Do **not** hardcode:

```tsx
"http://localhost:3000"
```

for production sharing.

Use:

```tsx
const getShareUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "https://YOUR-VERCEL-DOMAIN.vercel.app";
};
```

During development:

```text
window.location.origin
↓
http://localhost:3000
```

After deployment:

```text
window.location.origin
↓
https://your-project.vercel.app
```

This means the same code works in both environments.

---

# 19. WhatsApp Sharing

```tsx
const shareToWhatsApp = () => {
  const text = getShareText();

  const url =
    `https://wa.me/?text=${encodeURIComponent(text)}`;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
};
```

---

# 20. Facebook Sharing

```tsx
const shareToFacebook = () => {
  const url =
    `https://www.facebook.com/sharer/sharer.php?u=${
      encodeURIComponent(getShareUrl())
    }`;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
};
```

---

# 21. Native Share

On supported devices:

```tsx
const nativeShare = async () => {
  if (!navigator.share) {
    return;
  }

  await navigator.share({
    title: "My HH Goa 2026 Builder ID",
    text: getShareText(),
  });
};
```

For image sharing:

```tsx
const file = new File(
  [blob],
  `${builderId}-frame-in-goa.png`,
  {
    type: "image/png",
  }
);

if (
  navigator.share &&
  navigator.canShare?.({
    files: [file],
  })
) {
  await navigator.share({
    title: "My HH Goa 2026 Builder ID",
    text: getShareText(),
    files: [file],
  });
}
```

---

# 22. Instagram

Instagram does not provide the same simple browser URL-sharing mechanism as X or WhatsApp.

Therefore the recommended flow is:

```text
Generate ID
     ↓
Download image
     ↓
Copy caption
     ↓
Open Instagram
     ↓
Post
```

Do not create a fake Instagram share URL.

---

# 23. Vercel Deployment

## Step 1 — Check the build

```bash
npm run build
```

The command must complete successfully.

---

## Step 2 — Check Git status

```bash
git status
```

---

## Step 3 — Add changes

```bash
git add .
```

---

## Step 4 — Commit

```bash
git commit -m "Prepare Frame In Goa generator for deployment"
```

---

## Step 5 — Push

```bash
git push
```

If this is the first push:

```bash
git push -u origin main
```

---

# 24. Deploy on Vercel

Open Vercel and:

```text
Add New Project
       ↓
Import Git Repository
       ↓
Select frame-generator
       ↓
Deploy
```

Vercel should detect:

```text
Framework: Next.js
```

Recommended configuration:

```text
Framework Preset: Next.js
Build Command: npm run build
Install Command: npm install
Output Directory: Default
```

Do not add unnecessary configuration.

---

# 25. Production Testing

After Vercel deployment, test the actual production URL.

Example:

```text
https://frame-generator.vercel.app
```

## Desktop

```text
✓ Landing page
✓ Intro animation
✓ Create page
✓ Photo upload
✓ Photo crop
✓ Name
✓ Stack / Role
✓ Builder class
✓ Unique ID
✓ QR
✓ Download
✓ X
✓ WhatsApp
✓ Facebook
```

## Mobile

```text
✓ No broken horizontal layout
✓ No unwanted aircraft animation
✓ Photo stays inside frame
✓ Zoom works
✓ Horizontal positioning works
✓ Vertical positioning works
✓ Card scales correctly
✓ Download works
✓ Native share works where supported
```

---

# 26. Production Sharing Test

This is especially important.

### Local

```text
http://localhost:3000
```

### Production

```text
https://your-project.vercel.app
```

When pressing X on production, the generated text must contain:

```text
https://your-project.vercel.app
```

and NEVER:

```text
http://localhost:3000
```

---

# 27. Browser API Safety

Because Next.js can render code outside the browser, browser APIs should be protected.

Avoid doing this at module/component initialization:

```tsx
const width = window.innerWidth;
```

Prefer:

```tsx
useEffect(() => {
  const width = window.innerWidth;

  // browser-only code
}, []);
```

or:

```tsx
if (typeof window !== "undefined") {
  // browser-only code
}
```

This prevents:

```text
ReferenceError: window is not defined
```

---

# 28. Error Handling

Always guard DOM references.

Instead of:

```tsx
observer.observe(previewRef.current);
```

use:

```tsx
const preview = previewRef.current;

if (preview) {
  observer.observe(preview);
}
```

Similarly:

```tsx
if (!cardRef.current) {
  return;
}
```

before generating the card.

---

# 29. Performance

The generator should feel immediate.

Prefer:

```text
Client-side photo processing
       ↓
Local preview
       ↓
Client-side card generation
       ↓
Download/share
```

Avoid unnecessary:

```text
Upload → Server → Process → Server → Download
```

unless server-side functionality is required.

---

# 30. Security

Never commit secrets.

Do not put private credentials in:

```text
.env
.env.local
NEXT_PUBLIC_*
```

Remember:

```text
NEXT_PUBLIC_*
       ↓
Accessible to browser
       ↓
NOT secret
```

For private server credentials, use Vercel environment variables without the `NEXT_PUBLIC_` prefix and access them only from server-side code.

---

# 31. Git Workflow

Create a feature branch:

```bash
git checkout -b feature/photo-controls
```

Make changes:

```bash
git status
```

Review:

```bash
git diff
```

Commit:

```bash
git add .
git commit -m "Improve photo controls"
```

Push:

```bash
git push -u origin feature/photo-controls
```

For the final deployment:

```bash
git checkout main
git merge feature/photo-controls
git push
```

---

# 32. Final Submission Checklist

Before sharing the project:

```text
[ ] npm run build passes
[ ] No red TypeScript errors
[ ] Landing page works
[ ] Intro works
[ ] Mobile intro works
[ ] Photo upload works
[ ] Portrait photo works
[ ] Landscape photo works
[ ] Zoom works
[ ] Horizontal positioning works
[ ] Vertical positioning works
[ ] Photo stays inside frame
[ ] Name renders
[ ] Stack / Role renders
[ ] Builder class renders
[ ] Builder ID is generated
[ ] QR renders
[ ] #FrameInGoa is highlighted
[ ] Download works
[ ] X sharing works
[ ] WhatsApp works
[ ] Facebook works
[ ] Production URL is used
[ ] No localhost URL in production
[ ] Vercel deployment works
[ ] Mobile tested
[ ] Desktop tested
```

---

# 33. Future Improvements

```text
[ ] Public /verify/[builderId] route
[ ] Real QR validation
[ ] Server-side unique ID validation
[ ] Leaderboard
[ ] Builder profile pages
[ ] Shareable builder URLs
[ ] Open Graph preview cards
[ ] Multiple ID formats
[ ] Advanced photo editor
[ ] Custom domain
[ ] Analytics
```

---

# 34. Product Philosophy

The project should not feel like:

```text
A form
+
An image
+
A download button
```

It should feel like:

```text
HH GOA 2026
      ↓
BUILDER IDENTITY
      ↓
PERSONALIZED ARTIFACT
      ↓
SHAREABLE ID
      ↓
#FrameInGoa
```

The generated card should look like something a participant would **actually want to share**.

The visual hierarchy should always prioritize:

```text
HACKER HOUSE
      ↓
PERSON
      ↓
BUILDER IDENTITY
      ↓
#FRAMEINGOA
```

---

# 35. Credits

Built for:

**HH Goa 2026 — Frame In Goa**

Designed and developed by

# **Bhargav Chandra**

