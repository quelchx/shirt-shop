import { createContext, useContext, useEffect, useState } from 'react'

import {
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth'

import { auth } from '../config/firebase-config'

const UserAuthContext = createContext()

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState('')

  // sign up handler
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // login handler
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logOut() {
    return signOut(auth)
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleAuthProvider)
  }

  // incomplete function atm => need to add this + test
  function resetPassword() {
    return sendPasswordResetEmail(auth, email)
  }

  // will be called when this component is mounted
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => {
      unsubscribe
    }
  }, [])

  return (
    <UserAuthContext.Provider
      value={{ user, googleSignIn, signUp, logIn, logOut }}
    >
      {children}
    </UserAuthContext.Provider>
  )
}

// custom hook
export function useUserAuth() {
  return useContext(UserAuthContext)
}
