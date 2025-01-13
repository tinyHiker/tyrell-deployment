import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

const initialState = {
  cartItems: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      )
      console.log(action.payload.title)
      if (!existingItem) {
        state.cartItems.push(action.payload)
        Swal.fire({
          icon: 'success',
          title: `'${action.payload.title}' has been added to your cart`,
          text: 'Keep exploring more books to discover your next favorite read!',
          width: '600px',
          background: '#f8fafc',
          showConfirmButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        })
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Item already in cart',
          text: `You have already added '${action.payload.title}' to your cart`,
          width: '600px',
          background: '#f8fafc',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        })
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      )
    },
    clearCart: (state) => {
      state.cartItems = []
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
