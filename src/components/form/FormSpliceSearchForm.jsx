import { Row, Col, Form, Input, Select, Space, Button } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { useToggle } from "ahooks";
import styles from "./FormSplice.module.scss";
import { unitOptions, organizationOptions } from "@/mock/form/formSplice";

function FormSpliceSearchForm({ onSubmit, onReset }) {
  const [isExpand, { toggle }] = useToggle(false);

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
            <Select options={unitOptions} placeholder="请选择单位" allowClear />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="organizationId" label="机构">
            <Select
              options={organizationOptions}
              placeholder="请选择机构"
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>
      {/* 拓展搜索 */}
      {isExpand && (
        <Row>
          <Col span={8}>
            <Form.Item name="projectName" label="项目名称">
              <Input placeholder="模糊查询" />
            </Form.Item>
          </Col>
          <Col span={8}></Col>
          <Col span={8}></Col>
        </Row>
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
