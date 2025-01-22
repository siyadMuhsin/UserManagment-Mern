import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    filerterdUsers: [],
  },
  reducers: {
    addUsersToState: (state, action) => {
      state.users = action.payload;
      state.filerterdUsers=action.payload
    },
    updateUserInState: (state, action) => {
      const { id, updateData } = action.payload;
      const userIndex = state.users.findIndex((user) => user._id === id);
      if (userIndex !== -1) {
        state.users[userIndex] =state.filerterdUsers[userIndex]= { ...state.users[userIndex], ...updateData };
      }
    },
    deletUser: (state, action) => {
      state.users =state.filerterdUsers= state.users.filter((user) => user._id !== action.payload);
    },
    searchUsers: (state, action) => {
      const searchTerm = action.payload.toLowerCase();

      state.filerterdUsers = state.users.filter((user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
      );
    },

    clearUsersState: (state, action) => {
      state.users = [];
      state.filerterdUsers=[]
      localStorage.removeItem("adminToken");
    },
  },
});

export const {
  addUsersToState,
  clearUsersState,
  updateUserInState,
  deletUser,
  searchUsers,
} = userSlice.actions;
export default userSlice.reducer;
