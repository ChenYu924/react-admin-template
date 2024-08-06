import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Badge } from "antd";
import * as echarts from "echarts";
import {
  workbenchNavBoxData,
  smoothCurveChartOption,
  barChartOption,
  roseChartOption,
  radarChartOption,
} from "@/mock/mockData";
import { personalTab } from "@/utils/tools";
import styles from "./WorkBench.module.scss";

function WorkBench() {
  const dispatch = useDispatch();
  const smoothCurveChartRef = useRef(null);
  const barChartRef = useRef(null);
  const roseChartRef = useRef(null);
  const radarChartRef = useRef(null);

  useEffect(() => {
    const smoothCurveChart = echarts.init(smoothCurveChartRef.current);
    const barChart = echarts.init(barChartRef.current);
    const roseChart = echarts.init(roseChartRef.current);
    const radarChart = echarts.init(radarChartRef.current);
    smoothCurveChart.setOption(smoothCurveChartOption);
    barChart.setOption(barChartOption);
    roseChart.setOption(roseChartOption);
    radarChart.setOption(radarChartOption);

    function chartsResize() {
      smoothCurveChart.resize();
      barChart.resize();
      roseChart.resize();
      radarChart.resize();
    }

    window.addEventListener("resize", chartsResize);

    return () => {
      smoothCurveChart.dispose();
      barChart.dispose();
      window.removeEventListener("resize", chartsResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleNavBox(item) {
    if (item.title === "未读消息") {
      dispatch({
        type: "tab-slice/setTab",
        payload: personalTab("mine-message", "消息中心"),
      });
    } else {
      dispatch({
        type: "tab-slice/setTab",
        payload: personalTab("mine-center", "个人中心"),
      });
    }
  }

  return (
    <div className={styles.container}>
      {/* 头部-信息导航盒 */}
      <div className={styles.header}>
        {workbenchNavBoxData.map((item) => (
          <div
            key={item.key}
            className={styles["nav-box"]}
            onClick={() => handleNavBox(item)}
          >
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
      <div className={styles.footer}>
        <div ref={roseChartRef} className={styles["rose-chart"]} />
        <div ref={radarChartRef} className={styles["radar-chart"]} />
      </div>
    </div>
  );
}

export default WorkBench;
