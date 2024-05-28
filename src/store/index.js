// combine redux children components, and export store instance 

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";

export default configureStore({
    reducer: {
        user: userReducer
    }
})