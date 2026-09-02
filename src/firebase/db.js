import { ref, set, get, push, update, remove, query, orderByChild, limitToLast, equalTo, runTransaction } from 'firebase/database'
import { db } from './config'

// Helper to check if Firebase is available
const isAvailable = () => !!db

// ===== STORIES =====
export const addStory = async (story) => {
  if (!isAvailable()) return null
  const storiesRef = ref(db, 'stories')
  const newRef = push(storiesRef)
  await set(newRef, { ...story, id: newRef.key, createdAt: Date.now(), views: 0 })
  return newRef.key
}

export const updateStory = async (id, data) => {
  if (!isAvailable()) return
  await update(ref(db, `stories/${id}`), { ...data, updatedAt: Date.now() })
}

export const deleteStory = async (id) => {
  if (!isAvailable()) return
  await remove(ref(db, `stories/${id}`))
}

export const getStory = async (id) => {
  if (!isAvailable()) return getDemoStories().find(s => s.id === id) || null
  try {
    const snap = await get(ref(db, `stories/${id}`))
    if (snap.exists()) return snap.val()
  } catch (e) {
    console.warn("getStory error:", e)
  }
  return getDemoStories().find(s => s.id === id) || null
}

export const getStoryBySlug = async (slug) => {
  if (!isAvailable()) return getDemoStories().find(s => s.slug === slug) || null
  try {
    const q = query(ref(db, 'stories'), orderByChild('slug'), equalTo(slug))
    const snap = await get(q)
    if (snap.exists()) return Object.values(snap.val())[0]
  } catch (e) {
    console.warn("getStoryBySlug query error, falling back to local filter:", e)
  }

  // Fallback to fetch all and filter locally
  try {
    const all = await getAllStories()
    const found = all.find(s => s.slug === slug)
    if (found) return found
  } catch (e) {}

  return getDemoStories().find(s => s.slug === slug) || null
}

export const getAllStories = async () => {
  if (!isAvailable()) return getDemoStories()
  try {
    const snap = await get(ref(db, 'stories'))
    if (!snap.exists()) return []
    return Object.values(snap.val()).sort((a, b) => b.createdAt - a.createdAt)
  } catch { return getDemoStories() }
}

export const getTrendingStories = async (limit = 6) => {
  if (!isAvailable()) return getDemoStories().slice(0, limit)
  try {
    const q = query(ref(db, 'stories'), orderByChild('views'), limitToLast(limit))
    const snap = await get(q)
    if (!snap.exists()) return []
    return Object.values(snap.val()).reverse()
  } catch { return getDemoStories().slice(0, limit) }
}

export const incrementView = async (id) => {
  if (!isAvailable()) return
  try {
    const viewRef = ref(db, `stories/${id}/views`)
    await runTransaction(viewRef, (current) => (current || 0) + 1)
  } catch {}
}

// ===== CATEGORIES =====
export const addCategory = async (cat) => {
  if (!isAvailable()) return null
  const ref2 = push(ref(db, 'categories'))
  await set(ref2, { ...cat, id: ref2.key, createdAt: Date.now() })
  return ref2.key
}

export const updateCategory = async (id, data) => {
  if (!isAvailable()) return
  await update(ref(db, `categories/${id}`), data)
}

export const deleteCategory = async (id) => {
  if (!isAvailable()) return
  await remove(ref(db, `categories/${id}`))
}

export const getAllCategories = async () => {
  if (!isAvailable()) return getDemoCategories()
  try {
    const snap = await get(ref(db, 'categories'))
    if (!snap.exists()) return []
    return Object.values(snap.val())
  } catch { return getDemoCategories() }
}

// ===== SETTINGS =====
export const getSiteSettings = async () => {
  if (!isAvailable()) return {}
  try {
    const snap = await get(ref(db, 'settings'))
    return snap.exists() ? snap.val() : {}
  } catch { return {} }
}

export const updateSettings = async (path, data) => {
  if (!isAvailable()) return
  await update(ref(db, `settings/${path}`), data)
}

// ===== FEEDBACK / SUPPORT =====
export const addFeedback = async (feedbackData) => {
  if (!isAvailable()) {
    const stored = JSON.parse(localStorage.getItem('kidsstory_support_messages') || '[]')
    stored.push({ ...feedbackData, id: 'local-' + Date.now(), createdAt: Date.now() })
    localStorage.setItem('kidsstory_support_messages', JSON.stringify(stored))
    return 'local-' + Date.now()
  }
  try {
    const feedbackRef = ref(db, 'feedback')
    const newRef = push(feedbackRef)
    await set(newRef, { ...feedbackData, id: newRef.key, createdAt: Date.now() })
    return newRef.key
  } catch (e) {
    console.warn("addFeedback error, falling back to local:", e)
    const stored = JSON.parse(localStorage.getItem('kidsstory_support_messages') || '[]')
    stored.push({ ...feedbackData, id: 'local-' + Date.now(), createdAt: Date.now() })
    localStorage.setItem('kidsstory_support_messages', JSON.stringify(stored))
    return 'local-' + Date.now()
  }
}

// ===== DEMO DATA (shown when Firebase not configured) =====
function getDemoStories() {
  return [
    {
      id: 'demo-1', title: 'The Clever Fox 🦊', slug: 'the-clever-fox',
      category: 'Moral Stories', categorySlug: 'moral-stories', language: 'English',
      theme: 'moral', views: 1234, readingTime: 5, featured: true,
      thumbnail: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&q=80',
      banner: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&q=80',
      content: '<p>Once upon a time, in a beautiful forest, there lived a very clever fox named Rumi. He was known for his sharp mind and kind heart...</p><p>One day, a poor farmer came to him crying. His crops had failed and he had no food for winter. Rumi thought carefully and said, "Friend, let me show you a secret garden."</p><p>Together they discovered a hidden valley full of fruits and vegetables. The farmer was overjoyed!</p><p><strong>Moral:</strong> True cleverness is used to help others.</p>',
      createdAt: Date.now() - 86400000,
    },
    {
      id: 'demo-2', title: 'चाँद की कहानी 🌙', slug: 'chand-ki-kahani',
      category: 'Hindi Stories', categorySlug: 'hindi-stories', language: 'Hindi',
      theme: 'kids', views: 890, readingTime: 4, featured: true,
      thumbnail: 'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=600&q=80',
      banner: 'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=1200&q=80',
      content: '<p>एक बार की बात है, एक छोटे से गाँव में एक प्यारी सी लड़की रहती थी जिसका नाम मीना था।</p><p>हर रात वह छत पर बैठकर चाँद को निहारती थी। एक रात चाँद ने उससे कहा, "मीना, क्या तुम मेरी दोस्त बनोगी?"</p><p>मीना बहुत खुश हुई और बोली, "हाँ, जरूर!"</p><p><strong>सीख:</strong> दोस्ती सबसे कीमती चीज है।</p>',
      createdAt: Date.now() - 172800000,
    },
    {
      id: 'demo-3', title: 'The Magic Library ✨', slug: 'the-magic-library',
      category: 'Adventure', categorySlug: 'adventure', language: 'English',
      theme: 'royal', views: 567, readingTime: 8, featured: false,
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80',
      content: '<p>In the heart of a mysterious castle, there was a library where books could come alive at midnight...</p><p>Young Prince Leo discovered this secret one stormy night when he snuck out of bed to read.</p><p>Suddenly, a dragon flew out of a storybook! But it was friendly and offered to take Leo on an adventure through all the stories in the library.</p>',
      createdAt: Date.now() - 259200000,
    },
    {
      id: 'demo-4', title: 'राजा और जादुई पेड़ 🌳', slug: 'raja-aur-jadui-ped',
      category: 'Hindi Stories', categorySlug: 'hindi-stories', language: 'Hindi',
      theme: 'royal', views: 445, readingTime: 6, featured: false,
      thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80',
      content: '<p>एक समय की बात है, एक दूर के राज्य में एक न्यायप्रिय राजा रहता था।</p><p>उसके महल के बगीचे में एक जादुई पेड़ था जो सच बोलने वाले को सोने के फल देता था।</p>',
      createdAt: Date.now() - 345600000,
    },
    {
      id: 'demo-5', title: 'The Little Star ⭐', slug: 'the-little-star',
      category: 'Bedtime Stories', categorySlug: 'bedtime-stories', language: 'English',
      theme: 'kids', views: 789, readingTime: 3, featured: true,
      thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=80',
      content: '<p>High above the clouds, there lived a little star named Twinkle who was afraid of the dark...</p>',
      createdAt: Date.now() - 432000000,
    },
    {
      id: 'demo-6', title: 'The Brave Little Turtle 🐢', slug: 'the-brave-little-turtle',
      category: 'Moral Stories', categorySlug: 'moral-stories', language: 'English',
      theme: 'moral', views: 334, readingTime: 5, featured: false,
      thumbnail: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600&q=80',
      content: '<p>Timmy the turtle was always told he was too slow. But one day, a great flood came to the forest and only Timmy knew the way to safety...</p>',
      createdAt: Date.now() - 518400000,
    },
  ]
}

function getDemoCategories() {
  return [
    { id: 'cat-1', name: 'Moral Stories', slug: 'moral-stories', theme: 'moral', status: true, image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80' },
    { id: 'cat-2', name: 'Hindi Stories', slug: 'hindi-stories', theme: 'kids', status: true, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80' },
    { id: 'cat-3', name: 'Bedtime Stories', slug: 'bedtime-stories', theme: 'kids', status: true, image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=800&q=80' },
    { id: 'cat-4', name: 'Adventure', slug: 'adventure', theme: 'royal', status: true, image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=80' },
    { id: 'cat-5', name: 'Horror Tales', slug: 'horror-tales', theme: 'horror', status: true, image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&q=80' },
    { id: 'cat-6', name: 'Royal Tales', slug: 'royal-tales', theme: 'royal', status: true, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80' },
  ]
}
