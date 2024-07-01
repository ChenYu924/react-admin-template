import { createSlice } from "@reduxjs/toolkit";

// 当前页签切片(点击Sider中的菜单项时将此项数据保存至此)
const tabSlice = createSlice({
  name: "tab-slice",
  initialState: [],
  reducers: {
    setTab(state, action) {
      if (!state.length) {
        return [action.payload];
      } else {
        const exists = state.find((tab) => tab.key === action.payload.key);
        if (!exists) {
          return [...state, action.payload];
        }
      }
    },
  },
});

// 导出reducer
export default tabSlice.reducer;
