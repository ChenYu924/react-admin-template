import { InputNumber } from "antd";
import Decimal from "decimal.js";

function InputPriceRange({ value = [], onChange }) {
  let [valueMin, valueMax] = value;
  valueMin = valueMin ? calcWithDecimal(valueMin, "div") : valueMin;
  valueMax = valueMax ? calcWithDecimal(valueMax, "div") : valueMax;

  function tenThousandUnitsJSX() {
    return (
      <span className="text-xs" style={{ color: "orange", fontWeight: "bold" }}>
        万元
      </span>
    );
  }
  function calcWithDecimal(value, method = "mul") {
    return new Decimal(value)[method](10000).toNumber();
  }
  function handleMinChange(val) {
    let minVal = val ? calcWithDecimal(val) : val;
    onChange([minVal, value[1] || null]);
  }
  function handleMaxChange(val) {
    let maxVal = val ? calcWithDecimal(val) : val;
    onChange([value[0] || null, maxVal]);
  }

  return (
    <div className="flex items-center">
      <InputNumber
        min={0}
        value={valueMin}
        onChange={handleMinChange}
        addonAfter={tenThousandUnitsJSX()}
        changeOnWheel
      />
      <span className="mx-2">~</span>
      <InputNumber
        min={0}
        value={valueMax}
        onChange={handleMaxChange}
        addonAfter={tenThousandUnitsJSX()}
        changeOnWheel
      />
    </div>
  );
}

export default InputPriceRange;
