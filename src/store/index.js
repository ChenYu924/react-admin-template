import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./modules/tabSlice";

// 创建store
const store = configureStore({
  reducer: {
    tab: tabReducer,
  },
});

export default store;
