import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    blogMenu: ''
}

const blogMenu = createSlice({
    name: 'blogMenu',
    initialState,
    reducers: {
        setBlogMenu(state, action) {
            state.blogMenu = action.payload
        }
    }
})

export const { setBlogMenu } = blogMenu.actions;

export default blogMenu.reducer