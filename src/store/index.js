import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/userSlice";
import tabReducer from "./modules/tabSlice";

// 创建store
const store = configureStore({
  reducer: {
    user: userReducer,
    tab: tabReducer,
  },
});

export default store;
