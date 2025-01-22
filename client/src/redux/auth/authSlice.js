import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null,
    isAdmin: false,
    adminToken: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("userToken");
    },
    setAdminToken: (state, action) => {
      state.adminToken = action.payload;
      state.isAdmin = true;
    },
    logOutAdmin:(state,action)=>{
        state.isAdmin=false;
        state.adminToken=null;
        localStorage.removeItem('adminToken')
    }
  },
});

export const { setToken, setUser, logOut ,setAdminToken,logOutAdmin} = authSlice.actions;
export default authSlice.reducer;
