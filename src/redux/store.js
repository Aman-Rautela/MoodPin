import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice"
import collectionReducer from "./features/colletionSlice"
export const store = configureStore({
    reducer:{
        search: searchReducer,
        collection: collectionReducer,
    }
})