import { configureStore } from '@reduxjs/toolkit'
import menu from './slice/menu'
import Cart from './slice/cart'
import Favorite from './slice/favorite'
import blogMenu from './slice/blogMenu'

export const store = configureStore({
    reducer: { menu, Cart, Favorite, blogMenu },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch