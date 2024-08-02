import { useEffect, useRef } from "react";
import { Badge } from "antd";
import * as echarts from "echarts";
import { workbenchNavBoxData } from "@/mock/mockData";
import styles from "./WorkBench.module.scss";

function WorkBench() {
  // 平滑曲线图配置
  const smoothCurveChartOption = {
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
  const barChartOption = {
    title: {
      text: "柱状图",
    },
    tooltip: {},
    legend: {
      data: ["对象1", "对象2"],
      top: 2,
    },
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
      }
    ],
  };
  const smoothCurveChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    const smoothCurveChart = echarts.init(smoothCurveChartRef.current);
    smoothCurveChart.setOption(smoothCurveChartOption);
    const barChart = echarts.init(barChartRef.current);
    barChart.setOption(barChartOption);

    return () => {
      smoothCurveChart.dispose();
      barChart.dispose();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* 头部-信息导航盒 */}
      <div className={styles["nav-box-wrapper"]}>
        {workbenchNavBoxData.map((item) => (
          <div key={item.key} className={styles["nav-box"]}>
            <Badge count={item.count}>
              <div className={styles.icon} />
            </Badge>
            <div className={styles.content}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.desc}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
      {/* 中层 */}
      <div className={styles.middle}>
        <div
          ref={smoothCurveChartRef}
          className={styles["smooth-curve-chart"]}
        />
        <div ref={barChartRef} className={styles["bar-chart"]} />
      </div>
      {/* 底部 */}
    </>
  );
}

export default WorkBench;
