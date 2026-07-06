# 🚗 SpotSync - Smart Parking Management System

SpotSync is a full-stack, real-time smart parking management application built with the MERN stack. It allows users to effortlessly find available parking spaces, book them in advance based on their vehicle type, and process payments dynamically upon exit.

## ✨ Key Features
- **Real-Time Availability:** Instantly see which parking slots are occupied or free.
- **Smart Allocation Algorithm:** Automatically assigns the closest parking spot to the entrance based on vehicle size.
- **VIP & Premium Tiers:** Priority slot allocation and premium rates for VIP members.
- **Dynamic Billing:** Auto-calculates the exact parking fee based on the time spent (entry vs. exit timestamps).
- **Google OAuth:** Frictionless and secure user authentication using Google One-Tap Login.

## 🛠️ Technology Stack
- **Frontend:** React.js, Tailwind CSS, Vite, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** JSON Web Tokens (JWT), Google OAuth 2.0

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
- Node.js installed
- MongoDB installed locally OR a MongoDB Atlas URI

### 1. Backend Setup
1. Open a terminal and navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` folder with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` folder with the following variables:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```
4. Start the frontend server:
   ```bash
   npm run dev
   ```

## 🏗️ Folder Structure
- `/client` - Contains the React frontend code (Pages, Components, Assets).
- `/server` - Contains the Node.js backend code (Controllers, Routes, Models).

## 🌍 Deployment
- **Frontend:** Deployed seamlessly on Vercel.
- **Backend:** Deployed as a web service on Render.
