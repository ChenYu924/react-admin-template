import { useState } from "react";
import { Divider, Switch, message } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import styles from "./SettingPopover.module.scss";
import classNames from "classnames";
import usePrimaryLayoutContext from "@/hooks/usePrimaryLayoutContext";

/*
  PrimaryLayout -> PrimaryHeader -> 点击设置按钮后Popover内的内容:
    页签开关、禅模式开关、恢复默认按钮等
*/
function SettingPopover({ setPopoverOpen }) {
  const {
    collapsed,
    menuDark,
    menuAccordionOpen,
    tabsBarShow,
    zenModeOpen,
    setMenuDark,
    setMenuAccordionOpen,
    setTabsBarShow,
    setZenModeOpen,
    onResetSettingOptions,
  } = usePrimaryLayoutContext();
  const [isRotate, setIsRotate] = useState(false);

  function settingItemJSX(label, checked, setMethod) {
    return (
      <>
        <div className={styles.settingItem}>
          <div className={styles.settingItemLabel}>{label}：</div>
          <Switch checked={checked} onChange={() => setMethod(!checked)} />
        </div>
        <div className="placeholder-box" />
      </>
    );
  }
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
      {/* 菜单深色模式开关 */}
      {settingItemJSX("菜单深色模式", menuDark, setMenuDark)}
      {/* 菜单手风琴模式开关 */}
      {settingItemJSX(
        "菜单手风琴模式",
        menuAccordionOpen,
        setMenuAccordionOpen,
      )}
      {/* 页签开关 */}
      {settingItemJSX("页签", tabsBarShow, setTabsBarShow)}
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
