import {configureStore} from '@reduxjs/toolkit'

import authReducer from './redux/auth/authSlice'
import usersReducer from './redux/userSlice/userSlice'
const store=configureStore({
    reducer:{
        auth:authReducer,
        users:usersReducer
    },
})
export default store