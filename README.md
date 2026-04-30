# 🌟 Kids Story Platform

A modern, fast, and SEO-optimized story blogging platform built for kids. Developed with **React 18, Vite, Tailwind CSS**, and powered by **Firebase**, this platform offers a seamless experience for both readers and administrators.

![Kids Story Platform Banner](https://via.placeholder.com/1200x500.png?text=Kids+Story+Platform)

---

## ✨ Features

### 🎨 User Experience
- **Kids-Friendly UI**: Soft pastel gradients, rounded elements, and modern typography (Poppins/Noto Sans).
- **Smooth Animations**: Powered by Framer Motion for a delightful interactive experience.
- **Dark Mode**: Built-in dark/light theme toggle.
- **Responsive Design**: Fully mobile-first and works perfectly on all screen sizes.
- **Interactive Reading**: Font size controls, reading progress bar, bookmarks, and next/previous story navigation.

### 🛠️ Admin Capabilities
- **Secure Dashboard**: Protected by Firebase Authentication.
- **Story Management**: Add, edit, and delete stories. Configure titles, categories, languages, themes, and thumbnails.
- **Category System**: Manage story categories and assign specific themes (e.g., Kids, Horror, Moral, Royal).
- **Site Settings**: Easily manage the homepage hero image and social media links directly from the admin panel.

### 🚀 Performance & SEO
- **Blazing Fast**: Built with Vite and React 18 for optimal performance.
- **Advanced SEO**: Dynamic meta tags using React Helmet, Open Graph tags for social sharing, clean slugs, and `sitemap.xml` support.
- **AdSense Ready**: Pre-configured slots for Google AdSense integration.

---

## 💻 Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Backend/Database**: Firebase (Authentication & Realtime Database)
- **Icons**: React Icons / Lucide

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Firebase project

### 1. Clone the repository

```bash
git clone https://github.com/Parmeshg-17/kids-story.git
cd kids-story
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Authentication** (Email/Password).
3. Enable **Realtime Database**.
4. Set up Realtime Database rules:
   ```json
   {
     "rules": {
       ".read": true,
       ".write": "auth != null"
     }
   }
   ```
5. Copy the `.env.example` to `.env` (or create a `.env` file in the root):
   ```bash
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_database_url
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📁 Folder Structure

```text
/
├── public/               # Static assets (images, sitemap, etc.)
├── src/
│   ├── admin/            # Admin dashboard components and pages
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context (Auth, Theme, Bookmarks)
│   ├── firebase/         # Firebase initialization and services
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Main application routes
│   ├── App.jsx           # Application entry point
│   ├── main.jsx          # React DOM render
│   └── index.css         # Global Tailwind styles
├── .env                  # Environment variables (Git-ignored)
├── package.json          # Project metadata and dependencies
├── tailwind.config.js    # Tailwind configuration
└── vite.config.js        # Vite configuration
```

---

## 📜 Legal & Security
- Admin routes are completely protected.
- Includes boilerplate for Privacy Policy, Terms & Conditions, and Disclaimer pages.

---

## 👨‍💻 Developed By

**[Parmesh]**
- GitHub: [@Parmeshg-17](https://github.com/Parmeshg-17)

*If you like this project, please consider giving it a ⭐ on GitHub!*
