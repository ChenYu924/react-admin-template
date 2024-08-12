import { InputNumber } from "antd";
import Decimal from "decimal.js";

function InputPriceRange({ value = [], onChange }) {
  let [valueMin, valueMax] = value;
  valueMin = valueMin ? new Decimal(valueMin).div(10000).toNumber() : valueMin;
  valueMax = valueMax ? new Decimal(valueMax).div(10000).toNumber() : valueMax;

  function tenThousandUnitsJSX() {
    return (
      <span className="text-xs" style={{ color: "orange", fontWeight: "bold" }}>
        万元
      </span>
    );
  }
  function handleMinChange(val) {
    let minVal = val ? new Decimal(val).mul(10000).toNumber() : val;
    onChange([minVal, value[1] || null]);
  }
  function handleMaxChange(val) {
    let maxVal = val ? new Decimal(val).mul(10000).toNumber() : val;
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
