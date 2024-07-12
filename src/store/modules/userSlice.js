import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const init = {
  id: JSON.parse(localStorage.getItem("id")) || "",
  info: JSON.parse(localStorage.getItem("info")) || {},
  // 菜单树
  menuTree: JSON.parse(localStorage.getItem("menuTree")) || [],
  menuTreeAll: JSON.parse(localStorage.getItem("menuTreeAll")) || [],
  // 菜单项列表(无结构层级)
  menuList: JSON.parse(localStorage.getItem("menuList")) || [],
  menuListAll: JSON.parse(localStorage.getItem("menuListAll")) || [],
  token: Cookies.get("token") || "",
};

// 用户数据切片
const userSlice = createSlice({
  name: "user-slice",
  initialState: init,
  reducers: {
    setUser(state, { payload }) {
      localStorage.setItem("id", JSON.stringify(payload.id));
      localStorage.setItem("info", JSON.stringify(payload.info));
      localStorage.setItem("menuTree", JSON.stringify(payload.menuTree));
      localStorage.setItem("menuTreeAll", JSON.stringify(payload.menuTreeAll));
      localStorage.setItem("menuList", JSON.stringify(payload.menuList));
      localStorage.setItem("menuListAll", JSON.stringify(payload.menuListAll));
      return { ...state, ...payload };
    },
    setToken(state, { payload }) {
      Cookies.set("token", payload);
      return { ...state, token: payload };
    },
    setClear() {
      // 清空localStorage
      localStorage.clear();
      return { ...init };
    },
  },
});

export default userSlice.reducer;
