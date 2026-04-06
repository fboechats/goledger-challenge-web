# 🎬 TV Shows Manager

A modern React application to manage TV Shows, Seasons, Episodes and Watchlists.

---

## ✨ Features

* 📺 TV Shows CRUD (create, edit, delete)
* 📚 Seasons management per TV Show
* 🎞 Episodes management per Season
* ⭐ Watchlist (add/remove TV Shows)
* 🔎 Data fetching with caching
* 🔔 User feedback with toast notifications
* 📦 Clean and modular architecture

---

## 🧠 Tech Stack

* React
* TypeScript
* Tailwind CSS
* TanStack Query (React Query)
* React Router

---

## 🏗 Architecture

The project follows a feature-based structure:

src/
├── features/
│   ├── tv-shows/
│   ├── seasons/
│   ├── episodes/
│   ├── watchlist/
│
├── shared/
│   ├── components/
│   ├── utils/
│
├── pages/

### Key decisions

* Separation of concerns (UI, hooks, utils)
* Reusable hooks for API calls
* Pure utility functions for data transformations
* Centralized query state handling

---

## ⚙️ Installation

Clone the repository:

git clone https://github.com/fboechats/goledger-challenge-web.git

Install dependencies:

npm install

Run the project:

npm run dev

## 🔐 Environment Variables

Create a `.env` file in the root:

VITE_API_URL = "your_api_url"
VITE_USER = "your_user"
VITE_PASSWORD = "your_password"

## 🧪 Improvements (Future Work)

* Pagination / infinite scroll
* Better watchlist UX (multiple lists support)
* Unit and E2E tests
* Dark mode

---

## 👨‍💻 Author

Made with 💻 by Filipe
