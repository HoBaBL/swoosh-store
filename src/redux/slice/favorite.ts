import {createSlice} from '@reduxjs/toolkit'


type ProductItem = {
    id: string,
    name:string,
    size: number[],
    price: string,
    description:string,
    specifications: string[],
    photo: string[],
    gender: string,
    count: number
}

export interface FavoriteFull {
    Favorite: ProductItem[]
}

const initialState: FavoriteFull = {
    Favorite: JSON.parse(localStorage.getItem('favorite')!) || []
}

const Favorite = createSlice({
    name:'Favorite',
    initialState,
    reducers: {
        addProductFavorite(state, action) {
            const samePizza = state.Favorite.find(o => o.id === action.payload.id)
            if (samePizza) {
                state.Favorite = state.Favorite.filter(o => o.id !== action.payload.id)
            } else {
                state.Favorite.push(action.payload)
            }
            localStorage.setItem('favorite', JSON.stringify(state.Favorite))
        }
    }
})

export const {  addProductFavorite } = Favorite.actions;

export default Favorite.reducer