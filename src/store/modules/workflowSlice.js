import { createSlice } from "@reduxjs/toolkit";

// 工作流-侧边栏进度条数据切片
const workflowSlice = createSlice({
  name: "workflow-slice",
  initialState: {
    stepsList: [],
    currentStep: 0,
  },
  reducers: {
    setData(state, { payload }) {
      return { stepsList: payload.list, currentStep: payload.current };
    },
    setCurrentAdd(state) {
      const len = state.stepsList.length;
      const nowCurrent = state.currentStep + 1;
      if (nowCurrent >= len) {
        return { ...state };
      }
      return { ...state, currentStep: state.currentStep + 1 };
    },
    setCurrentSub(state) {
      const nowCurrent = state.currentStep - 1;
      if (nowCurrent < 0) {
        return { ...state };
      }
      return { ...state, currentStep: state.currentStep - 1 };
    },
    setCurrentStep(state, { payload }) {
      return { ...state, currentStep: payload };
    }
  },
});

export default workflowSlice.reducer;
