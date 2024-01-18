import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBAJ6u5uLrzxK35EajRxquACmphz-UShO8',
  authDomain: 'iccs372-hw1.firebaseapp.com',
  projectId: 'iccs372-hw1',
  storageBucket: 'iccs372-hw1.appspot.com',
  messagingSenderId: '1087605462188',
  appId: '1:1087605462188:web:5095257de9a8503aca7b09'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
