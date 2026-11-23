# UniTrack — Smart Attendance & Digital ID System
### CS 309 | Faculty of Science, Cairo University

UniTrack is a React-based web application for university attendance verification and digital ID management.

---

## Current Implementation

- **Login Component (`src/pages/auth/Login.jsx`):**
  - Cairo University Faculty of Science visual and live session status card.
  - Form validation for academic email addresses and passwords.
  - Dynamic cursor tracking, card tilt, and real-time countdown timer.
  - Password toggle, quick-test credential presets, and password reset dialog.

---

## Project Structure

```text
CS309-Project/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── assets/
    │   └── SCI-CU.jpg
    ├── pages/
    │   └── auth/
    │       ├── Login.css
    │       └── Login.jsx
    ├── styles/
    │   └── index.css
    ├── utils/
    │   └── validation.js
    ├── App.css
    ├── App.jsx
    └── main.jsx
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
