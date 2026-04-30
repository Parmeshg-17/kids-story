// =============================================
// FIREBASE CONFIGURATION
// Replace placeholder values with your actual
// Firebase project credentials from console.firebase.google.com
// =============================================

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://demo-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
}

let app, auth, db

try {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getDatabase(app)
} catch (e) {
  console.warn('Firebase init error - using demo mode:', e.message)
}

export { auth, db }
export default app
