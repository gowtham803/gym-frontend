# Sanctum Athletic Club — Unified Full-Stack Repository

A unified single-repository for **Sanctum Athletic Club**, combining the luxury React frontend, interactive AI athletic suite, and the FastAPI / SQLite membership backend.

---

## 📁 Monorepo Structure

```
gym-frontend/ (Unified Single Repository)
├── backend/                  # Python FastAPI Backend
│   ├── main.py               # API Endpoints (CRUD, dynamic status, calculate expiry)
│   ├── gym.db                # SQLite Member Database
│   ├── seed.py               # Sample member seeder
│   └── requirements.txt      # Python dependencies (fastapi, uvicorn, sqlalchemy)
│
├── src/                      # React 19 Frontend
│   ├── assets/               # Visual assets and icons
│   ├── components/           # UI, AI Coach, Timetable, Roster, Modals, Gallery
│   ├── config/               # Centralized gymConfig.js
│   ├── utils/                # AI engine, audio haptics, CSV export
│   ├── api.js                # API Client (configurable via VITE_API_BASE)
│   ├── App.jsx               # Main application orchestration
│   └── index.css             # Obsidian luxury dark design system
│
├── public/                   # Static icons and assets
├── package.json              # Unified npm scripts & dependencies
└── vite.config.js            # Vite 8 configuration
```

---

## 🚀 Quick Start

### 1. Run the Frontend (React + Vite)
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 2. Run the Backend (FastAPI + SQLite)
```bash
# Navigate to backend or run directly:
npm run backend

# Or using python directly:
python backend/main.py
```
The FastAPI documentation will be available at **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**.

---

## 🌐 Deployments
- **Frontend Live URL**: [https://gym-frontend-sage.vercel.app/](https://gym-frontend-sage.vercel.app/)
- **Backend Live URL**: [https://gym-backend-4tbh.onrender.com](https://gym-backend-4tbh.onrender.com)
