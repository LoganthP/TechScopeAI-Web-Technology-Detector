# 🌌 TechScope AI — Web Technology & Security Exposure Detector
<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Build-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Server-Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/Charts-Recharts-FF6384?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Scraper-Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white"/>
  <img src="https://img.shields.io/badge/State-Zustand-000000?style=for-the-badge"/>
</p>

<p align="center">
  <img src="client/public/vite.svg" width="100" />
  <h3 align="center">Analyze · Detect · Compare · Visualize</h3>
  <p align="center"><b>Cyber Intelligence Dashboard for Web Technology & Risk Exposure Analysis</b></p>
</p>

---

# 🚀 Overview

**TechScope AI** is an advanced, cyberpunk-themed Web Technology Detector designed to analyze, visualize, and compare the technology stack and security exposure of any website in real-time.

It performs deep analysis of:
- Frontend frameworks (React, Vue, Next.js)
- Backend technologies (Node, PHP, Python)
- CMS platforms (WordPress, Shopify)
- Security headers & exposure risks
- Comparative intelligence between two targets

> ⚡ Built with a Zero-Database Architecture for maximum privacy and Git-friendly deployment.

---

# ✨ Core Features

## 🕵️ Deep Technology Detection
- Detects frameworks, libraries, CMS, CDN, and analytics tools
- Uses DOM parsing + headers + script fingerprinting

## 🛡️ AI Risk Exposure Analysis
- AI Risk Score (0–100)
- Security Grade (A+ to F)
- Exposure Mapping (Radar Chart)
- Header weakness detection (CSP, HSTS, etc.)

## ⚖️ Compare Intelligence (Premium Module)
- Side-by-side comparison of two URLs
- Risk difference calculation
- Safer target identification
- Tech stack inconsistencies detection
- Header discrepancy analysis

## 📊 Advanced Visualizations
- Donut Charts (Stack Composition)
- Radar Charts (Exposure Mapping)
- Risk Meters & Grade Badges

## 💾 Zero Database Architecture (Git-Friendly)
- No MongoDB / Supabase / Firebase
- Local JSON file storage
- Fully offline compatible
- Privacy-first design

## 📄 Export PDF Reports
- Cyber-themed security intelligence reports
- Includes Risk Score, Grade, Tech Stack & Headers

---

# 🏗️ Complete Project Architecture

```text
TechScopeAI/
│
├── client/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/        # UI Components (Cards, Charts, Risk Panels)
│   │   ├── pages/             # Dashboard, Compare, Logs
│   │   ├── store/             # Zustand State Management
│   │   ├── utils/             # PDF Exporter, Validators
│   │   ├── services/          # API Communication Layer
│   │   └── styles/            # Tailwind + Global CSS
│   └── public/                # Static Assets & Icons
│
├── server/                    # Backend (Node + Express + TypeScript)
│   ├── controllers/           # API Controllers
│   ├── routes/                # API Route Definitions
│   ├── services/              # Detection Engine & Risk Engine
│   ├── utils/                 # Parser, Scanner, Comparators
│   └── data/
│       └── scan-history.json  # Local Storage (No Database)
│
├── package.json               # Root Workspace Scripts
└── README.md
```

---

# 🧠 System Working — Block Diagram

```text
                ┌─────────────────────────┐
                │       User Input        │
                │   (Target URL / Compare)│
                └─────────────┬───────────┘
                              │
                              ▼
                ┌─────────────────────────┐
                │   React Cyber Dashboard │
                │  (Scanner + Compare UI)│
                └─────────────┬───────────┘
                              │ API Calls
                              ▼
                ┌─────────────────────────┐
                │      Express Server     │
                │   (REST API Layer)     │
                └─────────────┬───────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
 ┌──────────────┐   ┌────────────────┐   ┌────────────────┐
 │ Tech Detector│   │ Risk Engine    │   │ Compare Engine │
 │ (HTML + JS)  │   │ (Score + Grade)│   │ (A vs B Logic) │
 └──────────────┘   └────────────────┘   └────────────────┘
          │                   │                   │
          └──────────────┬────┴──────────────┬────┘
                         ▼                   ▼
                ┌─────────────────────────┐
                │  JSON Storage Handler   │
                │ (scan-history.json)     │
                └─────────────┬───────────┘
                              ▼
                ┌─────────────────────────┐
                │  Visual Analytics Layer │
                │ (Charts, Risk UI, Logs) │
                └─────────────────────────┘
```

---

# ⚙️ Tech Stack

## Frontend
- React 18 + Vite
- TypeScript (Strict Mode)
- Tailwind CSS v4
- Framer Motion (Animations)
- Recharts (Data Visualization)
- Zustand (State Management)
- React Router DOM

## Backend
- Node.js + Express
- TypeScript
- Puppeteer (Headless Scraping)
- Axios (HTTP Requests)
- Cheerio (HTML Parsing)
- Native FS (Local Storage)

---

# 📦 Installation & Setup

## 🔹 Prerequisites
- Node.js v18+
- npm or yarn

---

# 🖥️ Run Client & Server (Recommended for Full Functionality)

> ⚠️ IMPORTANT: Run client and server separately for the fully-functional project.

## 1️⃣ Clone the Repository
```bash
git clone https://github.com/LoganthP/TechScopeAI-Web-Technology-Detector.git
cd TechScopeAI-Web-Technology-Detector
```

## 2️⃣ Install Dependencies

### Install Server Dependencies
```bash
cd server
npm install
```

### Install Client Dependencies
```bash
cd ../client
npm install
```

---

# ▶️ Running the Project (Development Mode)

## 🚀 Start Backend Server
```bash
cd server
npm run dev
```
Backend runs on:
```
http://localhost:3000
```

## 🎨 Start Frontend Client
```bash
cd client
npm run dev
```
Frontend runs on:
```
http://localhost:5173
```

---

# 📡 API Endpoints

## POST /api/scan
Scans a single target URL
```json
{ "url": "https://example.com" }
```

## POST /api/compare
Compare two websites intelligence
```json
{
  "url1": "https://siteA.com",
  "url2": "https://siteB.com"
}
```

## GET /api/history
Fetch scan telemetry logs from local JSON storage

---

# 📊 Compare Intelligence Workflow

1. Enter Target A & Target B URLs
2. Dual parallel scanning engine executes
3. Risk engine calculates score & grade
4. Comparison engine detects:
   - Risk Difference
   - Tech Stack Gaps
   - Header Discrepancies
5. AI determines the Safer Target
6. Visual comparison dashboard rendered

---

# 🛡️ Security & Privacy

- No external databases used
- No cloud tracking
- Local JSON storage only
- Safe read-only analysis (no intrusive attacks)
- Fully offline compatible

---

# 🧪 Build for Production

```bash
# From root
npm run build
```

This will:
- Compile TypeScript backend
- Build optimized Vite frontend

---

<p align="center">
  <b>TechScope AI</b> — Establish Absolute Visibility Over The Modern Web 🌐<br/>
</p>
