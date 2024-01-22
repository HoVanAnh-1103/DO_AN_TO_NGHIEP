import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'counter',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions
export const selectUser = (state: any) => state.user;

export default userSlice.reducer