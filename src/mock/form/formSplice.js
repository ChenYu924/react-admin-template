import searchIcon2 from "@/assets/images/search/searchIcon2.png";
import searchIcon3 from "@/assets/images/search/searchIcon3.png";
import searchIcon4 from "@/assets/images/search/searchIcon4.png";
import searchIcon5 from "@/assets/images/search/searchIcon5.png";
import searchIcon6 from "@/assets/images/search/searchIcon6.png";

export const unitOptions = [
  {
    value: "1",
    label: "单位1",
  },
  {
    value: "2",
    label: "单位2",
  },
  {
    value: "3",
    label: "单位3",
  },
  {
    value: "4",
    label: "单位4",
  },
  {
    value: "5",
    label: "单位5",
  },
];

export const organizationOptions = [
  {
    value: "1",
    label: "机构1",
  },
  {
    value: "2",
    label: "机构2",
  },
  {
    value: "3",
    label: "机构3",
  },
  {
    value: "4",
    label: "机构4",
  },
  {
    value: "5",
    label: "机构5",
  },
];

export const statisticsData = {
  total: 15487,
  list: [
    {
      key: "be-filled",
      label: "待填报",
      num: 3548,
      pic: searchIcon2,
    },
    {
      key: "check",
      label: "审核中",
      num: 896,
      pic: searchIcon3,
    },
    {
      key: "entrust",
      label: "可委托",
      num: 4783,
      pic: searchIcon4,
    },
    {
      key: "accept",
      label: "已验收",
      num: 2684,
      pic: searchIcon5,
    },
    {
      key: "finished",
      label: "已归档",
      num: 5846,
      pic: searchIcon6,
    },
  ],
};
