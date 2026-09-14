# 🍽️ Hungry Spot

A full-featured restaurant ordering platform where users can browse dishes by category, place orders, and track their order status through a personal receipt — all built with a clean separation between guest, authenticated user, and admin experiences.

---

## 📖 Overview

**Hungry Spot** is a restaurant web application designed to make food ordering simple and transparent for customers while giving restaurant admins full control over their business operations.

### How it works

- **Guests** land on a landing page featuring a hero section and a preview of popular items — designed to encourage them to create an account and start ordering. The landing page also includes **About** and **Contact** sections.
- To place an order, a user must have an account. New users can **sign up**, and existing users can **log in** through dedicated authentication pages with full form validation.
- Once authenticated, users can browse dishes across different categories, place orders, and view a **receipt** for each order that shows its live **status** (e.g., pending, in progress, completed).
- **Admins** have exclusive access to a protected **Dashboard**, which regular users cannot enter. From the dashboard, admins can:
  - Manage user accounts
  - Manage menu items (add, update, delete)
  - Manage orders and update their status
  - View an **Analytics** page with statistics on total revenue, total items, total orders (with status breakdown), and total users

Access control is strictly enforced — **unauthorized users cannot access the dashboard or any admin-only routes**, ensuring a clear boundary between customer-facing and admin-facing functionality.

---

## ✨ Why This Project Is Beneficial

- **Clear separation of roles:** Distinct, protected flows for guests, authenticated users, and admins keep the app secure and easy to reason about.
- **End-to-end ordering experience:** From discovering a dish on the landing page to tracking the final order status, the entire customer journey is covered in one platform.
- **Real business insights:** The analytics dashboard gives admins actionable data on revenue, orders, items, and users — turning the app into a genuine management tool, not just a storefront.
- **Validated, reliable forms:** Authentication and other forms use schema-based validation, reducing bad data and improving user trust.
- **Modern, responsive UI:** Smooth animations and a utility-first styling approach create a polished, professional user experience.
- **Scalable architecture:** A well-structured state management and service flow makes the codebase easier to extend with new features over time.

---

## 📦 Installed Packages

### Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.2.8 | Core UI library |
| `react-dom` | ^19.2.8 | React rendering for the web |
| `react-router-dom` | ^7.18.3 | Client-side routing (pages, protected routes) |
| `axios` | ^1.20.0 | HTTP client for backend integration |
| `react-hook-form` | ^7.87.0 | Form state management |
| `@hookform/resolvers` | ^5.9.1 | Connects validation schemas to react-hook-form |
| `zod` | ^4.6.1 | Schema validation (auth forms, etc.) |
| `recharts` | ^3.10.1 | Charts for the analytics page |
| `framer-motion` | ^13.2.0 | Animations and UI transitions |
| `lucide-react` | ^1.44.0 | Icon set |
| `sweetalert2` | ^11.26.25 | Alert/confirmation modals |
| `@tailwindcss/vite` | ^4.3.3 | Tailwind CSS integration for Vite |
| `@tailwindcss/postcss` | ^4.3.3 | Tailwind CSS PostCSS plugin |
| `postcss` | ^8.5.28 | CSS transformation tooling |
| `postcss-preset-mantine` | ^1.18.0 | PostCSS preset with Mantine-friendly features |
| `postcss-simple-vars` | ^7.0.1 | CSS variable support in PostCSS |

### Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^8.2.2 | Build tool and dev server |
| `@vitejs/plugin-react` | ^6.1.0 | React support for Vite |
| `eslint` | ^10.9.0 | Code linting |
| `@eslint/js` | ^10.0.1 | ESLint JS config |
| `eslint-plugin-react-hooks` | ^7.1.1 | Lint rules for React Hooks |
| `eslint-plugin-react-refresh` | ^0.5.4 | Lint rules for React Fast Refresh |
| `globals` | ^17.11.0 | Global variable definitions for ESLint |
| `@types/react` | ^19.2.18 | TypeScript types for React |
| `@types/react-dom` | ^19.2.4 | TypeScript types for React DOM |

---

## 🚀 Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` / `start` | `vite` | Runs the app in development mode |
| `build` | `vite build` | Builds the app for production |
| `preview` | `vite preview` | Previews the production build locally |
| `lint` | `eslint .` | Runs ESLint across the project |

---

## 👥 Team

### Hossam Ibrahim
Responsible for the core architecture of the project, including:
- Designing the **state management** structure and overall **service/data flow**
- Building the **authorization flow** to distinguish between regular user access and admin access
- Building the **authentication pages** (Login, Sign Up) with full validation
- Building the **restaurant page**, allowing users to browse items, place orders, view their receipts, and trace their order status

### Menna Elsayed
Responsible for:
- Building the **Analytics page**
- Building the **Landing page**
- Building the **Users page**
- Full backend integration for the above, including proper **loading** and **error state** handling

### Menna Khaled
Responsible for:
- Building the **Orders page**, showing users' orders and allowing admins to update order status
- Building the **Menu page**, showing admins their items and allowing them to update or delete items
- Full backend integration for the above, including proper **loading** and **error state** handling

---

## 🔐 Access Control Summary

| Route/Page | Guest | User | Admin |
|---|:---:|:---:|:---:|
| Landing Page (Hero, Items Preview, About, Contact) | ✅ | ✅ | ✅ |
| Login / Sign Up | ✅ | — | — |
| Restaurant / Order Page | ❌ | ✅ | ✅ |
| Receipt & Order Status | ❌ | ✅ | ✅ |
| Dashboard (Users, Items, Orders Management) | ❌ | ❌ | ✅ |
| Analytics Page | ❌ | ❌ | ✅ |
