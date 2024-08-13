import { createSlice } from "@reduxjs/toolkit";

// 页签数据切片(点击Sider中的菜单项时将对应数据保存至此)
const tabSlice = createSlice({
  name: "tab-slice",
  initialState: {
    // 页签数组
    tabList: JSON.parse(localStorage.getItem("tabList")) || [],
    // 当前激活的页签
    activeKey: localStorage.getItem("activeKey") || "",
  },
  reducers: {
    setTab(state, action) {
      const exists = state.tabList.find(
        (tab) => tab.key === action.payload.key,
      );
      if (!exists) {
        localStorage.setItem("tabList", JSON.stringify([...state.tabList, action.payload]));
        localStorage.setItem("activeKey", action.payload.key);
        return {
          tabList: [...state.tabList, action.payload],
          activeKey: action.payload.key,
        };
      } else {
        localStorage.setItem("activeKey", action.payload.key);
        return {
          ...state,
          activeKey: action.payload.key,
        };
      }
    },
    setRemoveTab(state, action) {
      const calcTabList = state.tabList.filter(
        (tab) => tab.key !== action.payload,
      );
      if (action.payload === state.activeKey) {
        const targetTab = state.tabList.find(
          (item) => item.key === action.payload,
        );
        const index = state.tabList.indexOf(targetTab);
        const newActiveKey = state.tabList[index - 1].key;
        localStorage.setItem("tabList", JSON.stringify(calcTabList));
        localStorage.setItem("activeKey", newActiveKey);
        return {
          tabList: calcTabList,
          activeKey: newActiveKey,
        };
      } else {
        localStorage.setItem("tabList", JSON.stringify(calcTabList));
        return {
          tabList: calcTabList,
          activeKey: state.activeKey,
        };
      }
    },
    setRemoveAll(state) {
      if (state.tabList.length && !state.tabList[0].closable) {
        localStorage.setItem("tabList", JSON.stringify([state.tabList[0]]));
        localStorage.setItem("activeKey", state.tabList[0].key);
        return {
          tabList: [state.tabList[0]],
          activeKey: state.tabList[0].key,
        };
      }
    },
    setActiveKey(state, action) {
      localStorage.setItem("activeKey", action.payload);
      return {
        ...state,
        activeKey: action.payload,
      };
    },
  },
});

export default tabSlice.reducer;
