import { createContext, useState, useEffect } from "react";
import { Form } from "antd";

const PageContext = createContext(null);

function withPageFactory({ fetchUrl, fetchParam }) {
  return (WrappedComponent) => {
    return function PageContainer() {
      const [form] = Form.useForm();
      const [url, setUrl] = useState(fetchUrl);
      const [param, setParam] = useState(fetchParam);
      const [tableData, setTableData] = useState([]);

      useEffect(() => {
        fetchTableData();
      }, []);

      function fetchTableData() {
        console.log(url, param);
      }

      return (
        <PageContext.Provider
          value={{
            tableData,
            fetchTableData,
            form,
          }}
        >
          <WrappedComponent
            setUrl={setUrl}
            setParam={setParam}
            tableData={tableData}
            setTableData={setTableData}
            fetchTableData={fetchTableData}
            form={form}
          />
        </PageContext.Provider>
      );
    };
  };
}

export default withPageFactory;
