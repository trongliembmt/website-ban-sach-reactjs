import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../app/isLogin'
import ListCartItem from './ListCartItem'

export default configureStore({
  reducer: {
    isLogin:counterReducer,
    listCartItem:ListCartItem
  }
})