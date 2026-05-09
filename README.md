# 🏮 Dansal Finder Sri Lanka

**Dansal Finder Sri Lanka** is a mobile-first, community-driven platform designed for the Buddhist festival seasons (Vesak and Poson). It helps users discover nearby **Dansal** (free food stalls) and **Kalapaya** (festival zones) across the country.

![Theme](https://img.shields.io/badge/Theme-Buddhist--Inspired-f4a261)
![Tech](https://img.shields.io/badge/Stack-Next.js%20%7C%20Express%20%7C%20MongoDB-2a9d8f)

---

## 🌟 Features

- **📍 Real-time Map**: Discover dansals near your current location using Leaflet.
- **🍱 Food Categories**: Filter by rice, noodles, ice cream, tea, etc.
- **🕒 Live Status**: View and update if a dansal is Open, Closed, or Crowded.
- **🗺️ Festival Zones**: Explore curated "Kalapaya" locations with descriptions.
- **➕ Community Driven**: Easily add new dansal locations with a single tap.
- **📱 Mobile Optimized**: Lightweight and fast, designed for Sri Lankan mobile networks.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), Vanilla CSS, Lucide React (Icons).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas.
- **Maps**: Leaflet (OpenStreetMap).

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/CerberusMrX/Dansal-Lanka
   cd Dansal
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   ```
   Start the backend:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
   Start the frontend:
   ```bash
   npm run dev
   ```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/dansal` | Create a new Dansal |
| `GET` | `/api/dansal` | List all Dansals |
| `GET` | `/api/dansal/near` | Find nearby Dansals (query: `lat`, `lng`, `radius`) |
| `PATCH` | `/api/dansal/:id` | Update live status (Open/Closed/Crowded) |
| `GET` | `/api/kalapaya` | List festival zones |

---

## 🌍 Deployment

### Backend (Render)
1. Set **Root Directory** to `backend`.
2. **Build Command**: `npm install`.
3. **Start Command**: `node server.js`.
4. Add `MONGODB_URI` in Environment Variables.

### Frontend (Vercel)
1. Set **Root Directory** to `frontend`.
2. Add `NEXT_PUBLIC_API_URL` (your Render URL) in Environment Variables.
3. Deploy!

---

## 🤝 Contributing

Contributions are what make the community amazing! 
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## ☸️ Acknowledgements

- Inspired by the spirit of **Dana** (Giving) during Vesak and Poson seasons in Sri Lanka.
- Icons by [Lucide](https://lucide.dev/).
- Map data by [OpenStreetMap](https://www.openstreetmap.org/).

Developed by SerendibWare
