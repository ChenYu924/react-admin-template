import { Divider } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import classNames from "classnames";
import styles from "./FormSplice.module.scss";

function FormSpliceSort({ isAsc, sortItems, sortStatus, setSortStatus }) {
  function arrowPlaceholderJSX() {
    return <ArrowUpOutlined style={{ opacity: 0 }} />;
  }
  function arrowRealJSX() {
    return sortStatus.sortType === "desc" ? (
      <ArrowDownOutlined />
    ) : (
      <ArrowUpOutlined />
    );
  }
  function handleSortItem(key) {
    let nowSortStatus = { ...sortStatus };
    if (key === sortStatus.sortKey) {
      nowSortStatus.sortType =
        nowSortStatus.sortType === "desc" ? "asc" : "desc";
    } else {
      nowSortStatus = { sortKey: key, sortType: isAsc ? "asc" : "desc" };
    }
    setSortStatus(nowSortStatus);
  }

  return (
    <div className={styles.sort}>
      <span className={styles.label}>排序：</span>
      {sortItems.map((item, index) => (
        <div key={item.key} className={styles["sort-block"]}>
          <span
            className={classNames(styles["sort-item"], {
              [styles["sort-item-active"]]: item.key === sortStatus.sortKey,
            })}
            onClick={() => handleSortItem(item.key)}
          >
            {arrowPlaceholderJSX()}
            {item.label}
            {item.key === sortStatus.sortKey
              ? arrowRealJSX()
              : arrowPlaceholderJSX()}
          </span>
          {sortItems.length !== index + 1 && (
            <Divider type="vertical" className="mt-1" />
          )}
        </div>
      ))}
    </div>
  );
}

export default FormSpliceSort;
