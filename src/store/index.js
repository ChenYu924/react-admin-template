import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./modules/tabSlice";
import menuReducer from "./modules/menuSlice";

// 创建store
const store = configureStore({
  reducer: {
    tab: tabReducer,
    menu: menuReducer,
  },
});

export default store;
