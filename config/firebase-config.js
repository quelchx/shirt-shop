import { initializeApp } from 'firebase/app'

import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

// leaving configuration inside here due to .env variables causing firebase auth to not function
const firebaseConfig = {
  apiKey: 'AIzaSyBqM5GkhwhmYP_IXmVvOKiw-QuJIBThxDI',
  authDomain: 'group-nine-project.firebaseapp.com',
  projectId: 'group-nine-project',
  storageBucket: 'group-nine-project.appspot.com',
  messagingSenderId: '181165999168',
  appId: '1:181165999168:web:38b099c8b2e5afb1b4cba5',
  measurementId: 'G-9PFHGTNJPS',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
// export const analytics = getAnalytics(app)

export default app
// https://firebase.google.com/
