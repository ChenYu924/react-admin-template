import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Space,
  Button,
  DatePicker,
  Radio,
} from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { useToggle } from "ahooks";
import styles from "./FormSplice.module.scss";
import { unitOptions, organizationOptions } from "@/mock/form/formSplice";
import InputPriceRange from "@/components/form/InputPriceRange";

function FormSpliceSearchForm({ sourceOptions, onSubmit, onReset }) {
  const { RangePicker } = DatePicker;
  const [isExpand, { toggle }] = useToggle(false);

  function validateToAmount(rule, value, callback) {
    if (value && value[0] && value[1] && Number(value[0]) > Number(value[1])) {
      callback("请输入正确的金额范围");
    }
    callback();
  }

  return (
    <div className={styles["search-form"]}>
      {/* 默认展示 */}
      <Row>
        <Col span={8}>
          <Form.Item name="keyword" label="项目编号">
            <Input placeholder="模糊查询" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="unitId" label="单位">
            <Select
              options={unitOptions}
              placeholder="请选择单位"
              allowClear
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="organizationId" label="机构">
            <Select
              options={organizationOptions}
              placeholder="请选择机构"
              allowClear
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>
        </Col>
      </Row>
      {/* 拓展搜索 */}
      {isExpand && (
        <>
          <Row>
            <Col span={8}>
              <Form.Item
                name="amount"
                label="金额"
                rules={[{ validator: validateToAmount }]}
              >
                <InputPriceRange />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="year" label="年份">
                <DatePicker style={{ width: "100%" }} picker="year" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="createTime" label="创建日期">
                <RangePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item name="source" label="数据来源">
                <Radio.Group options={sourceOptions} />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
      {/* 功能按钮 */}
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Space>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              htmlType="submit"
              onClick={onSubmit}
            >
              查询
            </Button>
            <Button icon={<ReloadOutlined />} onClick={onReset}>
              重置
            </Button>
            <Button
              icon={isExpand ? <UpOutlined /> : <DownOutlined />}
              onClick={toggle}
            >
              {isExpand ? "收起" : "展开"}
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
}

export default FormSpliceSearchForm;
