Create a fully production-ready, SEO-optimized Story Blogging Platform using React 18.

---

🧠 TECH STACK:

* React 18 (Vite setup recommended)
* Tailwind CSS
* Firebase (Authentication + Realtime Database)
* Framer Motion (animations)
* React Router DOM (latest)
* Fully responsive (mobile-first)

---

⚠️ IMPORTANT RULES:

* Do NOT use paid APIs
* Use working placeholder image URLs everywhere
* Code must be clean, modular, scalable
* Follow SEO + Google AdSense policies strictly
* Focus on complete system (do not skip anything)

---

🔥 FIREBASE SETUP (ADD PLACEHOLDERS):

Create firebase config file with placeholders:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};
```

Use:

* Firebase Auth (email/password)
* Firebase Realtime Database

---

🌐 WEBSITE TYPE:

A kids-friendly story platform (Hindi + English stories)

---

🎨 UI/UX DESIGN:

* Kids-friendly + modern UI
* Soft pastel gradients
* Rounded UI (2xl)
* Smooth animations

Fonts:

* English → Poppins / Nunito
* Hindi → Noto Sans Devanagari

---

🌈 THEME SYSTEM (DYNAMIC):

Themes:

* Default
* Kids
* Horror
* Moral
* Royal

👉 Admin selects theme during category creation
👉 Auto apply on frontend

---

🏠 HOMEPAGE:

* Hero banner (admin controlled image URL)
* Featured stories slider
* Categories (with images)
* Recent stories
* Suggested stories
* Trending stories (views based)
* Social follow section (toggle based)

---

📚 STORY SYSTEM:

Each story:

* Title
* Slug (SEO friendly)
* Category
* Theme (auto)
* Language (Hindi/English)
* Banner Image URL
* Thumbnail URL
* Content
* Meta title
* Meta description
* Keywords
* Reading time

---

🛠️ ADMIN PANEL:

Auth:

* Firebase email/password login

Features:

1. Dashboard

2. Add Story

3. Manage Stories

4. Category Management:

   * Name
   * Slug
   * Theme select
   * Category Image URL
   * Status toggle

5. Social Media:

   * YouTube, Instagram, Telegram, Facebook
   * Link + Enable toggle

6. Homepage:

   * Hero image URL

7. Ads:

   * AdSense code fields

👉 Show only enabled links in frontend

---

📸 IMAGE SYSTEM:

Use URL-based images only

Show in admin UI:

* Recommended size
* Format (JPG/PNG)
* Max size
* Live preview

Sizes:

* Hero → 1200x500
* Banner → 1200x600
* Thumbnail → 600x400
* Category → 800x600
* Share → 1200x630

---

📁 PUBLIC FOLDER:

/public/images/default-og.jpg

Use fallback image if missing

---

🔗 SEO SYSTEM:

* Dynamic meta tags (React Helmet)
* Open Graph tags
* Twitter cards
* Canonical URL
* Image alt tags

---

📈 ADVANCED SEO:

* SEO URLs (/story/slug)
* Sitemap.xml
* robots.txt
* Breadcrumb navigation
* Internal linking
* Pagination
* hreflang support

---

💰 ADSENSE READY:

* Header ads
* In-content ads
* Sidebar ads
* Footer ads

Clean UI + no clickbait

---

👨‍💻 USER PANEL:

* Category filter
* Language filter
* Search bar
* Suggested stories
* Trending stories

---

📖 STORY PAGE:

* Banner image
* Clean content
* Reading progress bar
* Font size control
* Next/Prev story
* Share buttons

---

🌗 DARK MODE:

* Toggle
* Save in localStorage

---

✨ EXTRA:

* Bookmark system
* Continue reading
* View counter
* Infinite scroll + pagination
* Skeleton loaders
* 404 page

---

🔐 SECURITY:

* Protect admin routes
* Firebase rules:

  * Admin write
  * Public read

---

📜 LEGAL:

* Privacy Policy
* Terms
* Disclaimer

---

⚡ PERFORMANCE:

* Lazy loading
* Code splitting
* Fast load

---

📂 FOLDER STRUCTURE:

/src
/components
/pages
/admin
/firebase
/data
/public/images

---

FINAL OUTPUT:

* Full React 18 project
* Firebase setup guide
* Ready to deploy

---

IMPORTANT:

Do NOT skip any feature. Build full system completely.









// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCurTFIdwpIu0JWecuAxv1JsJRvOXsC28E",
  authDomain: "kids-story-platflorm.firebaseapp.com",
  projectId: "kids-story-platflorm",
  storageBucket: "kids-story-platflorm.firebasestorage.app",
  messagingSenderId: "915050117974",
  appId: "1:915050117974:web:840518a9aeeef1df2834f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);