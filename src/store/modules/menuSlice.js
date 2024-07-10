import { createSlice } from "@reduxjs/toolkit";

// 菜单数据切片
const menuSlice = createSlice({
  name: "menu-slice",
  initialState: {
    // 菜单数据
    menuData: [],
  },
  reducers: {
    setMenu(state, action) {
      return {
        menuData: action.payload,
      };
    },
    setClear() {
      return {
        menuData: [],
      };
    },
  },
});

export default menuSlice.reducer;
