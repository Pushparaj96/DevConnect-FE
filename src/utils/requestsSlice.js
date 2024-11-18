import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addReceivedRequests:(state,action)=>action.payload,
        removeReviewedRequest:(state,action)=>{
            const remainingRequests = state.filter(req=>req._id !== action.payload);
            return remainingRequests;
        }
    }
});


export const { addReceivedRequests , removeReviewedRequest } = requestsSlice.actions;

export default requestsSlice.reducer;