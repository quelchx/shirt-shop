import React, { useReducer, useContext, useEffect, useState } from 'react'
import CartContext from './CartContext'
import CartReducer from './CartReducer'

import { SHOW_HIDE_CART, ADD_TO_CART, REMOVE_ITEM, CLEAR_CART } from './Types'

export function CartState({ children }) {
  const initialState = {
    showCart: false,
    cartItems: [],
  }

  const [state, dispatch] = useReducer(CartReducer, initialState)

  // useEffect(() => {
  //   const data = localStorage.getItem('User-Cart')
    
  //   if (data) {
  //     initialState.cartItems = JSON.parse(data)
  //   }
  // })

  // useEffect(() => {
  //   localStorage.setItem('User-Cart', JSON.stringify(initialState.cartItems))
  // })

  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item })
  }
  const showHideCart = () => {
    dispatch({ type: SHOW_HIDE_CART })
  }
  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: id })
  }

  const clearCart = () => {
    dispatch({type: CLEAR_CART})
  }

  return (
    <CartContext.Provider
      value={{
        showCart: state.showCart,
        cartItems: state.cartItems,
        addToCart,
        showHideCart,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  return useContext(CartContext)
}
