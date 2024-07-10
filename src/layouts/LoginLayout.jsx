import { Layout } from "antd";

function LoginLayout({ loginContentJSX }) {
  const { Header, Content } = Layout;

  return (
    <Layout className="login-layout">
      <Header className="header">
        <div className="logo"></div>
      </Header>
      <Content className="content">{loginContentJSX}</Content>
    </Layout>
  );
}

export default LoginLayout;
