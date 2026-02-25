# 🌌 TechScope AI

**The Ultimate Web Technology & Security Exposure Detector**

> An advanced, cyberpunk-themed intelligence platform designed to analyze, dissect, and visualize the technology stack and security posture of any given target URL.

<div align="center">
  <img src="client/public/vite.svg" alt="TechScope AI Logo" width="100"/>
  <br/>
  <p>
    <b>Analyze</b> stacks · <b>Discover</b> vulnerabilities · <b>Compare</b> intelligence
  </p>
</div>

---

## ⚡ Core Features

- 🕵️ **Deep Technology Detection**: Instantly identify frontend frameworks (React, Next.js, Vue, Svelte), backend languages (Node.js, PHP, Python), CMS platforms (WordPress, Shopify), Analytics tools, CDNs, and UI libraries (Tailwind, Bootstrap).
- 🛡️ **AI Risk Exposure Analysis**: Evaluates HTTP response headers and detected technologies to calculate a composite `AI Risk Score` (0-100) and assign a recognizable Security Grade (A+ to F).
- 📊 **Dynamic Visualizations**: Utilizes Recharts to render beautiful, interactive "Stack Composition" (Donut charts) and "Exposure Mapping" (Radar charts) for deep analytical insight.
- ⚖️ **Compare Intelligence**: Run side-by-side comparative scans of two discrete URLs. Automatically calculates Risk Differences, Tech Stack Uniqueness, and Security Header Gaps to mathematically determine the "Safer Target".
- 💾 **Zero-Database Architecture**: Stores scan history locally via a high-performance JSON file system handler `scan-history.json`, ensuring absolute privacy and zero external database dependencies.
- 🎨 **Premium Cyber Aesthetic**: Built with React, Tailwind CSS (v4), and Framer Motion for a stunning, responsive, dark-mode-first User Experience featuring glassmorphism cards and neon typography.

---

## 🛠️ Tech Stack Architecture

**Frontend Client:**

- **Framework**: React 18 (Vite compiler for HMR and lightning-fast builds)
- **Styling**: Tailwind CSS v4 + `clsx` & `tailwind-merge` for utility class manipulation.
- **Animations**: Framer Motion
- **Visuals & Icons**: Recharts (Data Visualization), Lucide React (Icons)
- **State Management**: Zustand
- **Routing**: React Router DOM
- **UI Components**: Radix UI primitives + Custom styled `shadcn/ui`-inspired components.

**Backend Server:**

- **Runtime**: Node.js + Express
- **Language**: TypeScript (`tsc` compiler)
- **Scanning Engine**: Custom Regex heuristics mapped against HTML DOM, Scripts, Cookies, and HTTP Headers.
- **Network Protocol**: Puppeteer (Headless Browser integration for dynamic SPA scraping) and Axios.
- **Data Persistence**: Native Node `fs` (File System) operations.

---

## 🚀 Quick Start & Installation

TechScope AI is configured as a monolithic workspace, meaning you can install and run both the client and the server from the root directory with a single terminal session.

### Prerequisites

Ensure you have **Node.js (v18+)** and **npm** installed on your system.

### 1. Clone the repository

\`\`\`bash
git clone <https://github.com/your-username/TechScope.git>
cd TechScope
\`\`\`

### 2. Install Dependencies (Root Command)

This will install all node modules for both the frontend `client/` and backend `server/` seamlessly.
\`\`\`bash
npm run install:all

# Or manually

# cd server && npm install && cd ../client && npm install

\`\`\`

### 3. Start the Development Server

Our unified dev script runs both the Vite Client and the Node Server concurrently.
\`\`\`bash
npm run dev
\`\`\`

- **Frontend Client**: `http://localhost:5173`
- **Backend API API**: `http://localhost:3000`

---

## 📡 API Documentation

TechScope AI features a clean RESTful API for programmatic access to the detection engine.

### `POST /api/scan`

Initiates a deep scan of a single target.

- **Body**: `{ "url": "https://example.com" }`
- **Response**: Returns detected components, raw headers, payload size, and Risk Score calculations.

### `POST /api/compare`

Executes dual-parallel scans and calculates differences.

- **Body**: `{ "url1": "https://example.com", "url2": "https://demo.com" }`
- **Response**: Returns comprehensive data for `targetA`, `targetB`, and a `comparison` object calculating safe targets and tech gaps.

### `GET /api/history`

Retrieves the local history of previously scanned URLs.

---

## 🛡️ Security & Privacy Notice

> **IMPORTANT**: This application performs active HTTP requests, headless browser scraping, and header analysis against public-facing URLs. It does *not* execute intrusive penetration testing payloads. Always ensure you have authorization to scan target infrastructure.

Additionally, this project explicitly avoids external cloud database requirements (like PostgreSQL, MongoDB, or Supabase). All local scan history resides wholly on the host machine within `server/data/scan-history.json`.

---

## 👨‍💻 Development & Build Process

If you wish to build the application for deployment or production use:

\`\`\`bash

# From the root directory

npm run build
\`\`\`
*(This will compile the TypeScript Node.js backend to `/dist` and package the React Vite frontend)*.

---

<p align="center">
  <i>Developed to establish absolute visibility over the modern web.</i><br/>
  <b>System Integrity: SECURE</b>
</p>
