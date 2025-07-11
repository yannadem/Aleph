📈 Aleph
An early-stage crypto & FX dashboard for faster investment decisions.

Aleph centralises financial data for cryptocurrency and FX markets using the Kraken API. The app allows users to select a crypto/FX pair and view a clear, concise snapshot of historical price charts and ticker data. The long-term goal is to simplify multi-asset investing with a unified, intuitive interface — starting with digital assets.

📋 Table of Contents
Features

Screenshots

Tech Stack

Getting Started

Usage

Roadmap

✅ Features (Current)
🧩 Core Functionality (Crypto & FX only)
Pair Selection: Choose crypto/FX trading pairs (e.g., BTC/USD, ETH/EUR)

Ticker Display: See bid, ask, and last traded price (manual refresh on pair change)

OHLC Charts:

📉 Line Chart (close price over time)

🕯️ Candlestick Chart (OHLC representation)

Timeframes: Currently shows ~700 data points from Kraken (1-min to 15 days granularity)

Data Source: Kraken REST API

🖼️ Screenshots
(To be added soon: Candlestick chart, search interface, basic dashboard layout)

⚙️ Tech Stack
🖥️ Frontend
React – UI library

TypeScript – Type safety

Vite – Fast bundler & dev server

Chart.js + chartjs-chart-financial – For line and candlestick charts

❌ Not yet used: Framer Motion, TailwindCSS, Chakra UI

🌐 Backend
Node.js + Express – Server to proxy Kraken API calls

TypeScript – Typed server logic

🔐 No API keys required — Kraken endpoints used are publicly accessible

🚀 Getting Started
Prerequisites
Node.js (v18+ recommended)

1. Clone the repository:
bash
Copy code
git clone https://github.com/your-username/aleph.git
cd aleph
2. Set up environment variable
Create a .env file in the client folder with:

ini
Copy code
VITE_API_URL=http://localhost:3000
3. Install dependencies
In the client folder:

bash
Copy code
npm install
In the server folder:

bash
Copy code
npm install
4. Start the application
Run the backend server:

bash
Copy code
cd server
npm run dev
In another terminal, start the frontend:

bash
Copy code
cd client
npm run dev
Then open the Vite link in your browser (usually http://localhost:5173).

🧪 Usage
1. Select a crypto/FX pair
Type or select from available trading pairs (e.g., XBTUSD, ETHEUR).

2. View charts and ticker
Candlestick and line charts render based on latest OHLC data from Kraken.

Ticker values refresh manually on pair or time frame change.

🔭 Roadmap
In Progress / Planned
 ♻️ Live Ticker (WebSocket integration)

 🗞️ News Feed (curated per asset)

 🧮 Analytics Dashboard: Z-spread, volatility, yield

 🗓️ Economic Calendar: Macro events per asset

 ⭐ Watchlist: Save and track favourite assets

 🧠 Smart Suggestions: Find correlated assets, hedges

 💼 Positions & P&L Tracker

 🧪 Unit tests + Integration tests

 🌍 Add support for stocks, ETFs, and bonds

🧠 Philosophy
Aleph is built to fight information overload. Instead of jumping between 10 tabs, investors should have everything that matters — price data, context, risks — on one single page.