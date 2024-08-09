import { Divider } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import classNames from "classnames";
import styles from "./FormSplice.module.scss";

function FormSpliceSort({ isAsc, sortItems, searchParams, setSearchParams }) {
  function arrowPlaceholderJSX() {
    return <ArrowUpOutlined style={{ opacity: 0 }} />;
  }
  function arrowRealJSX() {
    return searchParams.sortType === "desc" ? (
      <ArrowDownOutlined />
    ) : (
      <ArrowUpOutlined />
    );
  }
  function handleSortItem(key) {
    let nowSortStatus = { ...searchParams };
    if (key === searchParams.sortKey) {
      nowSortStatus.sortType =
        nowSortStatus.sortType === "desc" ? "asc" : "desc";
    } else {
      nowSortStatus.sortKey = key;
      nowSortStatus.sortType = isAsc ? "asc" : "desc";
    }
    setSearchParams(nowSortStatus);
  }

  return (
    <div className={styles.sort}>
      <span className={styles.label}>排序：</span>
      {sortItems.map((item, index) => (
        <div key={item.key} className={styles["sort-block"]}>
          <span
            className={classNames(styles["sort-item"], {
              [styles["sort-item-active"]]: item.key === searchParams.sortKey,
            })}
            onClick={() => handleSortItem(item.key)}
          >
            {arrowPlaceholderJSX()}
            {item.label}
            {item.key === searchParams.sortKey
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
