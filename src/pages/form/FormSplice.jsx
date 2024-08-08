import { useEffect, useState } from "react";
import { Form } from "antd";
import FormSpliceSearchForm from "@/components/form/FormSpliceSearchForm";
import FormSpliceSort from "@/components/form/FormSpliceSort";
import FormSpliceStatistics from "@/components/form/FormSpliceStatistics";

function FormSplice() {
  const [form] = Form.useForm();
  const sortItems = [
    {
      key: "createTime",
      label: "创建时间",
    },
    {
      key: "quantity",
      label: "商品数量",
    },
    {
      key: "budget",
      label: "最终预算",
    },
  ];
  const [sortStatus, setSortStatus] = useState({});
  const [currentCardKey, setCurrentCardKey] = useState("");
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    handleSubmit();
  }, [sortStatus, currentCardKey]); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchList(params) {
    console.log("fetch list with params: ", params);
  }
  function handleSubmit() {
    form.validateFields().then((fieldsValue) => {
      const values = { ...fieldsValue };
      if (sortStatus.sortKey) {
        values.sortField = sortStatus.sortKey;
        values.sortType = sortStatus.sortType;
      }
      if (currentCardKey || currentCardKey === "") {
        values.cardKey = currentCardKey;
      }
      setSearchParams(values);
      fetchList(values);
    });
  }
  function handleReset() {
    form.resetFields();
    setSortStatus({});
    setCurrentCardKey("");
  }

  return (
    <>
      <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <FormSpliceSearchForm onSubmit={handleSubmit} onReset={handleReset} />
      </Form>
      <FormSpliceSort
        sortItems={sortItems}
        sortStatus={sortStatus}
        setSortStatus={setSortStatus}
      />
      <FormSpliceStatistics
        currentCardKey={currentCardKey}
        setCurrentCardKey={setCurrentCardKey}
      />
      <div className="mt-8">
        当前的搜索条件searchParams：
        <br />
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            fontStyle: "italic",
            letterSpacing: "0.5px",
          }}
        >
          {JSON.stringify(searchParams)}
        </span>
      </div>
    </>
  );
}

export default FormSplice;
