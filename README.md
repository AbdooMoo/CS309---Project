# UniTrack — Smart Attendance & Digital ID System
### CS 309 Academic Project | Faculty of Science — Cairo University

UniTrack is a modern web application designed for universities to streamline attendance management, prevent check-in fraud, and issue digital student ID cards. Built with React.js and Vite.

---

## 🚀 Key Features & Roadmap

- **Authentication & Digital ID (Milestone 1):**
  - **Login Page (`src/pages/auth/Login.jsx`):** Complete interactive login interface with Cairo University Science building visuals, real-time client-side validation, password visibility toggle, SSO shortcuts, and mouse-reactive parallax dynamics.
  - **Register Page (`src/pages/auth/Register.jsx`):** Student & Instructor account onboarding with input validation.
  - **Student Digital ID & Profile (`src/pages/profile/Profile.jsx`):** Dynamic digital ID card with student photo, barcode/QR code, academic credentials, and live semester attendance statistics.
- **Role-Based Portals (Upcoming):**
  - **Student Portal:** View enrolled courses, check-in history, attendance percentage, and real-time QR code.
  - **Instructor Portal:** Timed QR session generation, attendance audits, manual check-in overrides, and review queues.
  - **Admin Portal:** User management, course schedules, and analytics.
- **Smart Attendance & Report Cart:**
  - Dynamic QR check-in with duplicate scan prevention.
  - Multi-course **Report Cart** allowing batch selection of subjects to export combined attendance summaries.

---

## 📁 Project Architecture

```text
CS309-Project/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Media assets (campus imagery, logos, icons)
│   ├── components/
│   │   ├── common/         # Reusable atomic UI components (Buttons, Inputs, Modals)
│   │   └── layout/         # Shell components (Navbar, Sidebar, Footer)
│   ├── context/            # Global context state (AuthContext, ThemeContext)
│   ├── hooks/              # Custom reusable React hooks
│   ├── pages/
│   │   ├── attendance/     # QR scanner & attendance tracking
│   │   ├── auth/           # Login & Register components
│   │   ├── courses/        # Course catalog & enrollment
│   │   ├── dashboards/     # Role-specific dashboards (Student, Instructor, Admin)
│   │   ├── landing/        # Public showcase landing page
│   │   ├── profile/        # Digital ID card & student profile
│   │   ├── report-cart/    # Multi-course attendance report generator
│   │   └── reviews/        # Attendance audit & session review queues
│   ├── routes/             # Router configuration & protected route guards
│   ├── services/           # API integration & mock services
│   ├── styles/             # Global design tokens and typography
│   ├── utils/              # Validation helpers, date utilities, QR formatters
│   ├── App.css
│   ├── App.jsx             # Main application component
│   └── main.jsx            # React root mounting point
├── package.json
└── vite.config.js
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js** (v18.0 or higher recommended)
- **npm** (v9.0 or higher)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd CS309-Project

# Install project dependencies
npm install
```

### Running Locally
```bash
# Start Vite development server
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Production Build
```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🎨 Design System
- **Primary Color:** Deep Burgundy (`#5B1B29` / `#681D2E`)
- **Accent Color:** Warm University Gold (`#B88E57` / `#C59B63`)
- **Background:** Soft Campus Cream (`#FBF8F3` / `#F8F5EE`)
- **Typography:** Modern Sans-Serif with refined editorial headings matching Cairo University Faculty of Science heritage.
