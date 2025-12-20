# DashFlow

**DashFlow** is a high-performance **Enterprise Resource Planning (ERP) Dashboard** built to demonstrate advanced frontend architecture. It provides a centralized interface for managing users, clients, inventory, and financial transactions with a focus on data integrity and professional UI/UX.

This project is part of my **front-end professional portfolio** and focuses on clean architecture, real-world admin features, and a modern, business-oriented UI.

---

## Live Demo



## Features

- Admin dashboard with KPIs and analytics
- Users management:
  - Create, edit and delete users
  - Search, filters and sorting
  - Export users to **Excel** and **PDF**
- Clients management with data export
- Products management:
  - Categories, stock and status
  - Excel / PDF export
- Orders management:
  - Multi-product orders
  - Order status handling
  - Excel / PDF export
- Reports and analytics with charts
- Activity log visualization
- Dark mode
- Fully responsive layout
- Smooth animations and transitions

---

## Tech Stack

* **Core:** React 20 (LTS) & Vite.
- **React** (Vite)
- **Tailwind CSS**
- **Framer Motion**
- **Context API**
- **Recharts**
- **xlsx** (Excel export)
- **jsPDF** (PDF export)

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
git clone 

# Install dependencies
npm install

# Run development server
npm run dev

##  Notes

- This project is frontend-focused.

- All data is handled locally using Context API.

- Export features (Excel / PDF) are implemented for demo purposes.

- No backend or authentication services are connected.

- Designed to be easily extensible with APIs or backend services.

## Author

Guillermo Contreras
Front-End Developer

This project is part of my Junior / Semi-Pro Portfolio and demonstrates real-world admin dashboard architecture, UI/UX design, state management, and data export features.