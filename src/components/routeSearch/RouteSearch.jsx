import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Dropdown } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { findPathsByKeyword, findLabelByKey } from "@/utils/menuCalc";

function RouteSearch() {
  const stateMenuTree = useSelector((state) => state.user.menuTree);
  const dispatch = useDispatch();
  const [items, setItems] = useState([{}]);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  useEffect(() => {
    if (inputVisibility) {
      inputRef.current.focus();
    } else {
      setInputValue("");
    }
  }, [inputVisibility]);
  useEffect(() => {
    inputValue ? setDropDownOpen(true) : setDropDownOpen(false);
  }, [inputValue]);

  function handleSearchClick() {
    setInputVisibility(!inputVisibility);
  }
  function InputValueChange(e) {
    setInputValue(e.target.value);
    setItems(findPathsByKeyword(stateMenuTree, e.target.value));
  }
  function InputFocus() {
    if (inputValue) {
      setDropDownOpen(true);
    }
  }
  function handleDropdownBtn(e) {
    const label = findLabelByKey(stateMenuTree, e.key);
    const path = e.domEvent.target.innerText.split(" > ");
    const tab = { key: e.key, label, closable: true, path };
    dispatch({ type: "tab-slice/setTab", payload: tab });
  }

  return (
    <div className="search-wrapper">
      <SearchOutlined className="header-icon" onClick={handleSearchClick} />
      <Dropdown
        open={dropDownOpen}
        arrow
        placement="topLeft"
        menu={{
          items: items.map((item) => ({
            key: item.key,
            label: item.label,
            onClick: handleDropdownBtn,
          })),
        }}
      >
        <Input
          ref={inputRef}
          className={classNames("input-wrapper-hidden", {
            "input-wrapper": inputVisibility,
          })}
          placeholder="页面搜索"
          variant="borderless"
          value={inputValue}
          onChange={InputValueChange}
          onBlur={() =>
            // 延迟隐藏，避免点击下拉菜单按钮时先于点击事件触发
            setTimeout(() => {
              setInputVisibility(false);
            }, 100)
          }
          onFocus={InputFocus}
        />
      </Dropdown>
    </div>
  );
}

export default RouteSearch;
