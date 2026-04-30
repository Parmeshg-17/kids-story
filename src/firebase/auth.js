import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from './config'

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error) {
    return { user: null, error: error.message }
  }
}

export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}
