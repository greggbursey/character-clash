<div align="center">
<img alt="Character Clash Banner" src="https://png.pngtree.com/png-vector/20250605/ourmid/pngtree-vs-letters-gaming-blue-png-image_16432872.png" />

# ⚔️ Character Clash

**The Ultimate Cinematic Crossover Battle Simulator**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12-ff0055?style=flat-square&logo=framer)](https://motion.dev/)

[View App in AI Studio](https://ai.studio/apps/051a6abf-79c6-439e-9f87-7765198c20a8)

</div>

---

## 🚀 About the Project

**Character Clash** is a high-fidelity web application that brings together legendary heroes and villains from across popular culture—including **Marvel**, **DC**, **TMNT**, **X-Men**, **Mortal Kombat**, **Street Fighter**, **Star Wars**, and **Godzilla**.

Designed with a focus on cinematic aesthetics and fluid user experience, the app allows fans to explore character lore, compare stats, and simulate high-stakes battles between individual fighters or entire universes.

## ✨ Key Features

- **🎬 Cinematic Interface**: A premium, dark-mode design with dynamic backgrounds tailored to each character and universe.
- **🥋 Diverse Roster**: Over 50 meticulously detailed characters across 8 iconic universes, each with unique stats, lore, and visual assets.
- **🔥 Three Battle Modes**:
  - **Single View**: Deep dive into character backgrounds, lore, and power scores.
  - **Battle Mode**: Pit two legendary fighters against each other in a randomized, power-weighted clash.
  - **Universe Mode**: Measure the combined strength of entire franchises to see which universe reigns supreme.
- **🔍 Intelligent Selection**: Fast, searchable character picker organized by universe.
- **🪄 Fluid Animations**: Powered by **Motion 12** for smooth state transitions and a "living" UI.
- **⚡ AI Narratives**: Dynamic battle commentary powered by Google Gemini AI for immersive storytelling.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Motion 12](https://motion.dev/) (Framer Motion)
- **Backend**: [Firebase](https://firebase.google.com/) (Real-time database & hosting)
- **AI Integration**: [Google Gemini AI API](https://ai.google.dev/) (Dynamic battle narratives & character analysis)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/character-clash.git
   cd character-clash
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory with your API keys:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Data & Assets

The character data residing in `data/characters.ts` is dynamically populated using a custom scraping engine (`scripts/scrape.ts`) that sources high-quality assets and portraits to ensure a premium visual experience.

---

<div align="center">
Built with ❤️ for fans of legendary characters everywhere.
</div>
