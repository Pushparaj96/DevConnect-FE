import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>action.payload,
        removeUserFromFeed:(state,action)=>{
            const filteredUsers = state.filter(user=> user._id !== action.payload);
            return filteredUsers;
        }
    }
});

export const {addFeed , removeUserFromFeed} = feedSlice.actions;

export default feedSlice.reducer;