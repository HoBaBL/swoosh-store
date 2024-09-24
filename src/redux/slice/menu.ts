import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    menu: ''
}

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenu(state, action) {
            state.menu = action.payload
        }
    }
})

export const { setMenu } = menu.actions;

export default menu.reducer