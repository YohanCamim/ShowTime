import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: ''
}

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        set:(state,action) => {
            state.value = action.payload
        }
    }
})

export const { set } = tokenSlice.actions
export default tokenSlice