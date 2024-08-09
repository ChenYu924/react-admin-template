import { Space, Avatar } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import styles from "./FormSplice.module.scss";
import classNames from "classnames";
import { statisticsData } from "@/mock/form/formSplice";
import searchIcon1 from "@/assets/images/search/searchIcon1.png";

function FormSpliceStatistics({ searchParams, setSearchParams }) {
  return (
    <Space className={styles.statistics} size={16} wrap>
      {/* 合计 */}
      <div
        className={classNames(styles.box, {
          [styles["box-active"]]: searchParams.cardKey === "",
        })}
        onClick={() => setSearchParams({ ...searchParams, cardKey: "" })}
      >
        <Avatar src={searchIcon1} size={56} />
        <div className={styles.text}>
          <div className={styles.top}>
            项目合计 <span className={styles.num}>{statisticsData.total}</span>{" "}
            项
          </div>
        </div>
      </div>
      <CaretRightOutlined />
      {statisticsData.list.map((item) => (
        <div
          key={item.key}
          className={classNames(styles.box, {
            [styles["box-active"]]: searchParams.cardKey === item.key,
          })}
          onClick={() =>
            setSearchParams({ ...searchParams, cardKey: item.key })
          }
        >
          <Avatar src={item.pic} size={56} />
          <div className={styles.text}>
            <div className={styles.top}>
              {item.label} <span className={styles.num}>{item.num}</span> 项
            </div>
            <div className={styles.bottom}>
              占比{" "}
              <span className={styles.percent}>
                {`${(
                  (statisticsData.total && item.num / statisticsData.total) *
                  100
                ).toFixed(0)}%`}
              </span>
            </div>
          </div>
        </div>
      ))}
    </Space>
  );
}

export default FormSpliceStatistics;
