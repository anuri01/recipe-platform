# Copilot Instructions for recipe-platform

## Overview
This project is a full-stack recipe platform with a React (Vite) frontend and a Node.js/Express backend. It is organized into `client/` (frontend) and `server/` (backend) directories. The backend manages user and recipe data, while the frontend provides the user interface and interacts with the backend via REST APIs.

## Architecture & Key Patterns
- **Frontend (`client/`)**
  - Built with React and Vite. Uses functional components and hooks (`useState`, `useEffect`).
  - API requests are abstracted in `src/api/axiosConfig.js`.
  - State management uses React context and custom stores in `src/store/` (e.g., `userStore.js`).
  - Page components are in `src/pages/`, shared UI in `src/components/`.
  - Routing is handled by `react-router-dom`.
  - Image assets are in `public/images/`.
  - Uses `react-hot-toast` for notifications and `react-slick` for image sliders.

- **Backend (`server/`)**
  - Node.js with Express. Entry point: `server.js`.
  - Data models in `server/models/` (e.g., `User.js`, `Recipe.js`).
  - File uploads handled in `upload.js`.
  - Exposes RESTful endpoints (e.g., `GET /recipes/:id`).

## Developer Workflows
- **Frontend**
  - Install dependencies: `npm install` in `client/`
  - Start dev server: `npm run dev` in `client/`
  - Lint: `npm run lint` (uses ESLint config in `eslint.config.js`)

- **Backend**
  - Install dependencies: `npm install` in `server/`
  - Start server: `node server.js` in `server/`

## Project-Specific Conventions
- API calls should use the abstraction in `src/api/axiosConfig.js`.
- Recipe and user data structures are defined in backend models and expected to match in frontend usage.
- Use `react-hot-toast` for user-facing error/success messages.
- Use `react-slick` for displaying multiple images (see `RecipeDetailPage.jsx`).
- All page-level components go in `src/pages/`, not `src/components/`.
- Use `.css` files colocated with components for styling.

## Integration Points
- Frontend and backend communicate via REST API (see `api/axiosConfig.js` for base URL setup).
- Image uploads and serving are managed by backend (`upload.js`).
- Vercel deployment config in `client/vercel.json`.

## Examples
- See `src/pages/RecipeDetailPage.jsx` for API usage, image slider, and error handling patterns.
- See `src/store/userStore.js` for custom state management.

---

For questions about conventions or architecture, check this file first and reference the relevant code in `client/` or `server/` as needed.
