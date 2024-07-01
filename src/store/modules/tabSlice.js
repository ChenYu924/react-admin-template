import { createSlice } from "@reduxjs/toolkit";

// 页签数据切片(点击Sider中的菜单项时将对应数据保存至此)
const tabSlice = createSlice({
  name: "tab-slice",
  initialState: {
    // 页签数组
    tabList: [],
    // 当前激活的页签
    activeKey: "",
  },
  reducers: {
    setTab(state, action) {
      if (!state.tabList.length) {
        return {
          tabList: [action.payload],
          activeKey: action.payload.key,
        };
      } else {
        const exists = state.tabList.find(
          (tab) => tab.key === action.payload.key,
        );
        if (!exists) {
          return {
            tabList: [...state.tabList, action.payload],
            activeKey: action.payload.key,
          };
        } else {
          return {
            ...state,
            activeKey: action.payload.key,
          };
        }
      }
    },
    setActiveKey(state, action) {
      return {
        ...state,
        activeKey: action.payload,
      };
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
        return {
          tabList: calcTabList,
          activeKey: newActiveKey,
        };
      } else {
        return {
          tabList: calcTabList,
          activeKey: state.activeKey,
        };
      }
    },
    setRemoveAll(state) {
      if (state.tabList.length && !state.tabList[0].closable) {
        return {
          tabList: [state.tabList[0]],
          activeKey: state.tabList[0].key,
        };
      }
    },
  },
});

// 导出reducer
export default tabSlice.reducer;
