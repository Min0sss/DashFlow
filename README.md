# DashFlow - Full Stack ERP System

**DashFlow** is a modern, high-performance **Full Stack Enterprise Resource Planning (ERP)** application. It provides a centralized interface for managing users, clients, inventory, and financial transactions.

Originally a frontend concept, this project has evolved into a fully functional application powered by **Supabase**, featuring real-time database connections, secure authentication, and a professional "Glassmorphism" UI design.

---
## Live Demo

https://dash-flow-eight.vercel.app/

## ✨ Key Features

### 🔐 Security & Backend
- **Real Authentication:** Secure Sign Up and Login powered by Supabase Auth.
- **Cloud Database:** PostgreSQL database hosted on Supabase.
- **Row Level Security (RLS):** Data protection ensuring users only access authorized information.
- **Environment Security:** API keys protected via environment variables.

### 📊 Dashboard & Management
- **Modern UI:** "Hellio" inspired design with Glassmorphism, dark mode, and ambient lighting.
- **Interactive Analytics:** Real-time charts using Recharts (Area charts, KPIs).
- **Inventory Control:** Create, edit, and delete products with stock management.
- **Client & Order Management:** Full CRUD operations for clients and sales orders.
- **Team Management:** Admin controls to manage staff access.

### 🛠 Tools
- **Data Export:** Built-in export to **Excel** (.xlsx) and **PDF** for reports.
- **Responsive Design:** Fully adaptive layout (Mobile/Desktop) with hamburger menu.

---

## 💻 Tech Stack

**Frontend:**
- **React 18** (Vite)
- **Tailwind CSS** (Styling & Dark Mode)
- **Framer Motion** (Animations & Transitions)
- **Recharts** (Data Visualization)

**Backend / BaaS:**
- **Supabase** (PostgreSQL Database)
- **Supabase Auth** (Authentication)

**Utilities:**
- **xlsx** (Excel Export)
- **jsPDF** (PDF Generation)
- **Lucide React** (Icons)

---
## Project Structure

```bash
src/
├── components/
│   ├── ActivityPage.jsx
│   ├── ClientModal.jsx
│   ├── ClientsPage.jsx
│   ├── ConfirmDelete.jsx
│   ├── DashboardHome.jsx
│   ├── DashboardLayout.jsx
│   ├── OrdersPage.jsx
│   ├── OrderModal.jsx
│   ├── ProductsPage.jsx
│   ├── ProductModal.jsx
│   ├── ReportsPage.jsx
│   ├── UserModal.jsx
│   └── UsersPage.jsx
├── context/
│   ├── DataContext.jsx
│   └── ThemeContext.jsx
├── pages/
│   └── Login.jsx
├── utils/
│   └── exportDashboard.js
├── App.jsx
├── main.jsx
├── index.css
└── App.css

```
# Clone repository
git clone https://github.com/Min0sss/DashFlow.git

# Install dependencies
npm install

# Run development server
npm run dev

##  Notes

- Full Stack Evolution: This project has evolved from a static frontend template to a fully functional application connected to Supabase.

- Real Backend: It no longer uses mock data. All Clients, Products, and Orders are stored in a PostgreSQL database.

- Export features (Excel / PDF) are implemented for demo purposes.

- Security: Implements Row Level Security (RLS) and Authentication (Sign Up / Login) flow.

- Responsive UI: Features a mobile-optimized layout with a custom hamburger menu and Glassmorphism design system ("Hellio" Style).

## Author

Guillermo Contreras
Front-End Developer

This project is part of my Junior / Semi-Pro Portfolio and demonstrates real-world admin dashboard architecture, UI/UX design, state management, and data export features.