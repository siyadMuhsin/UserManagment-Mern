import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name:'users',
    initialState:{
        users:[],   
    },
    reducers:{
        addUsersToState:(state,action)=>{
            state.users=action.payload;
            
        },
        updateUserInState:(state,action)=>{
           
            
            const {id,updateData}=action.payload;
            const userIndex=state.users.findIndex((user)=>user._id===id)
            if(userIndex !== -1){
                state.users[userIndex]={ ...state.users[userIndex],...updateData }
            }
        },
        deletUser:(state,action)=>{
            state.users=state.users.filter((user)=>user._id!==action.payload)

        },
        clearUsersState:(state,action)=>{
            state.users=[]
        }
    }
})

export const {addUsersToState,clearUsersState,updateUserInState,deletUser} =userSlice.actions;
export default userSlice.reducer
