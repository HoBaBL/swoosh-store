import {createSlice} from '@reduxjs/toolkit'


type ProductItem = {
    id: string,
    name:string,
    size: number,
    price: string,
    description:string,
    specifications: string[],
    img: string,
    gender: string,
    count: number,
    link: string
}

export interface CartFull {
    Cart: ProductItem[]
}

const initialState: CartFull = {
    Cart: JSON.parse(localStorage.getItem('cart')!) || []
}

const Cart = createSlice({
    name:'Cart',
    initialState,
    reducers: {
        addProduct(state, action) {
            const sameSneakers = state.Cart.find(o => o.id === action.payload.id && o.size === action.payload.size)
            if (sameSneakers) {
                sameSneakers.count = sameSneakers.count + action.payload.count
            } else {
                state.Cart.push(action.payload)
            }
            localStorage.setItem('cart', JSON.stringify(state.Cart))
        },
        deleteProduct(state, action) {
            state.Cart = state.Cart.filter(o => o.id !== action.payload.id)
            localStorage.setItem('cart', JSON.stringify(state.Cart))
        },
        PlusProduct(state, action) {
            const PlusProduct = state.Cart.find(o => o.id === action.payload.id )
            if (PlusProduct) {
                PlusProduct.count++
            }
            localStorage.setItem('cart', JSON.stringify(state.Cart))
        },
        MinusProduct(state, action) {
            const MinusProduct = state.Cart.find(o => o.id === action.payload.id)
            if (MinusProduct) {
                MinusProduct.count--
            }
            if (MinusProduct?.count === 0) {
                state.Cart = state.Cart.filter(o => o.id !== action.payload.id)
            }
            localStorage.setItem('cart', JSON.stringify(state.Cart))
        }
    }
})

export const {  addProduct, deleteProduct, PlusProduct, MinusProduct } = Cart.actions;

export default Cart.reducer