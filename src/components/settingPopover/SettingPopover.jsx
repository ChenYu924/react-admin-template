import { Divider, Switch, message } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import styles from "./SettingPopover.module.scss";
import classNames from "classnames";
import { useState } from "react";

/*
  PrimaryLayout -> PrimaryHeader -> 点击设置按钮后Popover内的内容:
    页签开关、禅模式开关、恢复默认按钮等
*/
function SettingPopover(props) {
  const {
    collapsed,
    menuAccordionOpen,
    tabsBarShow,
    zenModeOpen,
    setMenuAccordionOpen,
    setTabsBarShow,
    setZenModeOpen,
    setPopoverOpen,
    onResetSettingOptions,
  } = props;
  const [isRotate, setIsRotate] = useState(false);

  function handleReset() {
    setIsRotate(true);
    onResetSettingOptions();
    setTimeout(() => {
      setIsRotate(false);
    }, 500);
  }
  function zenModeChange() {
    if (collapsed) {
      message.warning("请先展开侧边菜单栏，再开启禅模式");
      return;
    }
    setZenModeOpen(!zenModeOpen);
    setPopoverOpen(false);
  }

  return (
    <div className={styles.settingPopover} style={{ marginTop: "4px" }}>
      {/* 菜单手风琴模式开关 */}
      <div className={styles.settingItem}>
        <div className={styles.settingItemLabel}>菜单手风琴：</div>
        <Switch
          checked={menuAccordionOpen}
          onChange={() => setMenuAccordionOpen(!menuAccordionOpen)}
        />
      </div>
      <div className="placeholder-box" />
      {/* 页签开关 */}
      <div className={styles.settingItem}>
        <div className={styles.settingItemLabel}>页签：</div>
        <Switch
          checked={tabsBarShow}
          onChange={() => setTabsBarShow(!tabsBarShow)}
        />
      </div>
      <div className="placeholder-box" />
      {/* 禅模式开关 */}
      <div className={styles.settingItem}>
        <div className={styles.settingItemLabel}>禅模式：</div>
        <Switch checked={zenModeOpen} onChange={zenModeChange} />
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div className={styles.resetWrapper}>
        <div className={styles.reset} onClick={handleReset}>
          <span>恢复默认 </span>
          <RedoOutlined className={classNames({ rotate: isRotate })} />
        </div>
      </div>
    </div>
  );
}

export default SettingPopover;
