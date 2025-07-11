# 📊 Aleph

Aleph is a streamlined platform for tracking crypto and FX assets, designed to simplify investment decisions through a unified, clear, and performant interface.

📚 Table of Contents

About

Features

Screenshots

Tech Stack

Getting Started

Usage

Roadmap

Limitations

License

🧠 About
Aleph centralises real-time market data to help traders and analysts gain instant insights into selected crypto and FX pairs. Its modular dashboard architecture enables rapid data ingestion and visualisation with minimal noise. While it currently supports assets via the Kraken API, future versions will support stocks, ETFs, and macroeconomic indicators.

✨ Features

  ✅ Currently Implemented

  📈 Historical Price Charts: Line and candlestick charts using OHLC data

  🔍 Symbol Search: Enter a crypto/FX pair to fetch data

  💬 Modular Chart Container: Swappable views for line and candlestick

  💱 Bid/Ask & Ticker Info: Display fetched from Kraken ticker endpoint

  🧮 Data Formatting Utilities: Rounding, comma separation, etc.

🔜 In Progress / Planned

  🧠 Curated News Feed (tailored headlines per asset)

  📅 Economic Calendar (events filtered by relevance)

  📊 Analytics Dashboard (Z-spread, volatility, yield, etc.)

  📌 Watchlist Support (save and track preferred assets)

  💡 Smart Suggestions (correlated assets, hedges)

  📤 Live Ticker Updates (currently manual refresh)

  💼 Portfolio Management (positions, P&L tracking)

🖼️ Screenshots
Coming soon...

⚙️ Tech Stack

Frontend

  React – UI Library

  TypeScript – Strong typings

  Vite – Build tool

  Chart.js + chartjs-chart-financial – Candlestick & line charts

  Date-fns adapter – Time parsing for charts

Backend

  Express – REST API

  TypeScript – Strongly typed

  Kraken API – Only data provider for now (OHLC, ticker)

🚀 Getting Started

  1. Prerequisites
  Node.js

  No external API keys required — Kraken API is free and public

  2. Installation
  bash
  Copy
  Edit
  # Install dependencies
  npm install

  # Run dev server (frontend and backend should be set up separately if applicable)
  npm run dev

🧭 Usage

  Start typing a crypto/FX pair (e.g. BTC/USD) in the search bar.

  Submit to trigger:

  OHLC fetch

  Ticker fetch

  View:

  Candlestick or Line chart

  Last trade price, bid/ask info

🛣 Roadmap

  Add asset categories beyond crypto (stocks, bonds, ETFs)

  Add backend caching layer for better performance

  Real-time websocket ticker updates

  News integration (NewsAPI or custom scraping)

  Watchlist and saved state

  Framer Motion UI/UX animations

⚠️ Limitations

  Only crypto and FX assets are supported for now (via Kraken)

  No live ticker — refresh happens on user submit

  No news or economic events yet

  Framer Motion, Tailwind/CSS modules are not currently in use

  Charts limited to up to 60 OHLC data points

📄 License

  MIT — feel free to fork, improve, and contribute.