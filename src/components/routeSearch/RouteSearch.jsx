import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Input, Dropdown } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { findLabelLevel } from "@/utils/tools";

function RouteSearch() {
  const stateMenuData = useSelector((state) => state.menu.menuData);
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
  // useEffect(() => {
  //   console.log("stateMenuData", stateMenuData);
  // }, [stateMenuData])

  function handleSearchClick() {
    setInputVisibility(!inputVisibility);
  }
  function InputValueChange(e) {
    setInputValue(e.target.value);
    // setItems(findLabelLevel(stateMenuData, e.target.value));
  }
  function InputFocus() {
    if (inputValue) {
      setDropDownOpen(true);
    }
  }

  return (
    <div className="search-wrapper">
      <FileSearchOutlined className="header-icon" onClick={handleSearchClick} />
      <Dropdown
        open={dropDownOpen}
        arrow
        placement="topLeft"
        menu={{
          items,
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
          onBlur={() => setInputVisibility(false)}
          onFocus={InputFocus}
        />
      </Dropdown>
    </div>
  );
}

export default RouteSearch;
