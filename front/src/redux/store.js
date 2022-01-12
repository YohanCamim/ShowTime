import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './token/tokenSlice'

const store = configureStore({
    reducer: {
        token: tokenReducer
    }
})

export default store