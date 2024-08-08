// 我的工作台-头部导航盒数据
export const workbenchNavBoxData = [
  {
    key: "001",
    title: "未读消息",
    desc: "共有101条未读消息",
    count: 101,
  },
  {
    key: "002",
    title: "待办事项",
    desc: "共有8个待办事项",
    count: 8,
  },
  {
    key: "003",
    title: "我的日程",
    desc: "共有5个日程安排",
    count: 5,
  },
  {
    key: "004",
    title: "我的项目",
    desc: "描述文本",
    count: 0,
  },
];

// 我的工作台-图标配置
export const smoothCurveChartOption = {
  title: {
    text: "平滑曲线图",
  },
  tooltip: {},
  legend: {
    data: ["对象1", "对象2"],
    top: 2,
  },
  xAxis: {
    data: ["A", "B", "C", "D", "E"],
  },
  yAxis: {},
  series: [
    {
      name: "对象1",
      data: [5, 8, 19, 12, 25],
      type: "line",
      smooth: true,
    },
    {
      name: "对象2",
      data: [5, 12, 6, 8, 10],
      type: "line",
      smooth: true,
    },
  ],
};
export const barChartOption = {
  title: {
    text: "柱状图",
  },
  tooltip: {},
  legend: {
    data: ["对象1", "对象2", "对象3", "对象4"],
    top: 2,
  },
  xAxis: {
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  yAxis: {},
  series: [
    {
      name: "对象1",
      type: "bar",
      data: [23, 24, 18, 25, 27, 28, 25],
    },
    {
      name: "对象2",
      type: "bar",
      data: [15, 16, 20, 14, 16, 20, 9],
    },
    {
      name: "对象3",
      type: "bar",
      data: [5, 6, 8, 10, 12, 14, 16],
    },
    {
      name: "对象4",
      type: "bar",
      data: [3, 4, 5, 6, 7, 8, 9],
    },
  ],
};
export const roseChartOption = {
  title: {
    text: "南丁格尔玫瑰图",
  },
  tooltip: {},
  legend: {
    data: ["A", "B", "C", "D", "E"],
    bottom: 0,
  },
  series: [
    {
      type: "pie",
      data: [
        {
          value: 100,
          name: "A",
        },
        {
          value: 200,
          name: "B",
        },
        {
          value: 300,
          name: "C",
        },
        {
          value: 400,
          name: "D",
        },
        {
          value: 500,
          name: "E",
        },
      ],
      roseType: "area",
    },
  ],
};
export const radarChartOption = {
  title: {
    text: "雷达图",
  },
  tooltip: {},
  legend: {
    data: ["预算分配", "实际开销"],
    bottom: 0,
  },
  radar: {
    indicator: [
      { name: "销售" },
      { name: "管理" },
      { name: "技术" },
      { name: "客服" },
      { name: "研发" },
      { name: "市场" },
    ],
  },
  series: [
    {
      name: "预算 vs 开销",
      type: "radar",
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: "预算分配",
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: "实际开销",
        },
      ],
    },
  ],
};