import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updatePassword as firebaseUpdatePassword
} from 'firebase/auth'
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

export const resetPassword = async (email) => {
  try {
    if (!auth) return { success: true, error: null }
    await sendPasswordResetEmail(auth, email)
    return { success: true, error: null }
  } catch (error) {
    // Avoid account enumeration in production feedback if needed, return descriptive message
    return { success: false, error: error.message }
  }
}

export const completePasswordReset = async (oobCode, newPassword) => {
  try {
    if (!auth) return { success: true, error: null }
    await confirmPasswordReset(auth, oobCode, newPassword)
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateUserPassword = async (newPassword) => {
  try {
    if (!auth || !auth.currentUser) return { success: false, error: 'No active user session' }
    await firebaseUpdatePassword(auth.currentUser, newPassword)
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}
