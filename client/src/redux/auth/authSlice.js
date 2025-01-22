import {createSlice} from '@reduxjs/toolkit'

const authSlice =createSlice({
    name:'auth',
    initialState:{
        isAuthenticated:false,
        token:null,
        user:null
    },
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload
        },
        setUser:(state,action)=>{
            state.isAuthenticated=true
            state.user= action.payload
        },
        
        logOut:(state)=>{
            state.isAuthenticated=false
            state.user=null
            state.token=null
            localStorage.clear()

        }

    }
})

export const {setToken,setUser,logOut} = authSlice.actions;
export default authSlice.reducer