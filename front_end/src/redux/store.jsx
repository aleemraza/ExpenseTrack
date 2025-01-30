import {configureStore} from '@reduxjs/toolkit'
import authReducer from './API/api'


export const store = configureStore({
    reducer:{
        auth: authReducer
    },
})