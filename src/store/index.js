import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/userSlice";
import tabReducer from "./modules/tabSlice";
import workflowReducer from "./modules/workflowSlice";

// 创建store
const store = configureStore({
  reducer: {
    user: userReducer,
    tab: tabReducer,
    workflow: workflowReducer,
  },
});

export default store;
