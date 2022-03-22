import { db } from '../config/firebase-config'

import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'

const shippingCollectionRef = collection(db, 'shipping')

class ShippingDataService {
  addOrder = (newOrder) => {
    return addDoc(shippingCollectionRef, newOrder)
  }

  deleteOrder = (id) => {
    const orderDoc = doc(db, 'shipping', id)
    return deleteDoc(orderDoc)
  }

  getAllOrders = () => {
    return getDocs(shippingCollectionRef)
  }
}

export default new ShippingDataService()
