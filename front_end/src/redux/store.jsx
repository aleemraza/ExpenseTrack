import {configureStore} from '@reduxjs/toolkit'
import authReducer from './API/api'
import groupReducer from './API/groupApi'


export const store = configureStore({
    reducer:{
        auth: authReducer,
        group: groupReducer
    },
})