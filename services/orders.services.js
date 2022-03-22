import { db } from '../config/firebase-config'

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'

const orderCollectionRef = collection(db, 'orders')

class OrderDataService {
  addOrder = (newOrder) => {
    return addDoc(orderCollectionRef, newOrder)
  }

  deleteOrder = (id) => {
    const orderDoc = doc(db, 'orders', id)
    return deleteDoc(orderDoc)
  }

  getAllOrders = () => {
    return getDocs(orderCollectionRef)
  }
  
}

export default new OrderDataService()
