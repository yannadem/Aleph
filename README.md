# 📈 Aleph

_Aleph is a streamlined crypto and FX research dashboard. It fetches market data from the Kraken API to help users analyze asset prices and trends with visual clarity and speed._

> ⚠️ This is an early-stage MVP (Minimum Viable Product). Currently, only Crypto and FX pairs from Kraken are supported.

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Current Limitations](#current-limitations)
- [Future Roadmap](#future-roadmap)

---

## Features

- Search for any **Crypto/FX pair** (Kraken-supported)
- View **interactive line and candlestick charts** powered by Chart.js
- Fetch and display **OHLC ticker data** with rounding and formatting
- Dynamic chart rendering on search submit
- Simple and responsive layout

---

## Screenshots

*Coming soon*

---

## Tech Stack up to date

### Backend
- Node.js + Express
- Axios

### Frontend
- React + Vite
- TypeScript
- Chart.js + [`chartjs-chart-financial`](https://github.com/chartjs/chartjs-chart-financial) for candlesticks
- Axios for API calls
- CSS

### Data Source
- [Kraken API](https://docs.kraken.com/rest/)

---

## Setup & Installation

### Prerequisites

- Node.js (>= 18)
- npm

### Local Setup

Open first terminal:
```bash
git clone https://github.com/your-username/aleph.git
cd aleph

cd server
npm install
npm run dev
```

Open second terminal:
```bash
cd client
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

> 🧪 No API key required — Kraken public endpoints are free to use.

---

## Current Limitations

- ✅ Only Crypto and FX pairs from Kraken supported
- ❌ Ticker not live — data is manually fetched on search submit
- ❌ No news or economic indicators implemented yet
- ❌ No watchlist or user login functionality
- ❌ Framer Motion installed but not in use
- ❌ No visual styling frameworks used (e.g., Tailwind, Chakra)

---

## Future Roadmap

- 🔜 **Live Ticker Updates**
- 🔜 **Curated News Feed** (NewsAPI or custom scrapers)
- 🔜 **Economic Calendar** filtered by asset
- 🔜 **Analytics Dashboard** (volatility, Z-spread, yield, etc.)
- 🔜 **User Accounts & Watchlists**
- 🔜 **Smart Suggestions**: correlated assets, hedging options
- 🔜 **Portfolio Tracker**: positions & P&L tracking
