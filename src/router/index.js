import { createBrowserRouter } from "react-router-dom";

import Login from "@/pages/login/Login";
// 通用布局
import PrimaryLayout from "@/layouts/PrimaryLayout";
// 引入通用布局的二级路由页面
import WorkBench from "@/pages/workBench/WorkBench";
import FormBasic from "@/pages/form/FormBasic";
import FormCall from "@/pages/form/FormCall";
import FormLayout from "@/pages/form/FormLayout";
import FormLayoutMixin from "@/pages/form/FormLayoutMixin";
import FormRequiredMask from "@/pages/form/FormRequiredMask";
import TableBasic from "@/pages/table/TableBasic";
import TableCustomSelect from "@/pages/table/TableCustomSelect";
import TableRowSelect from "@/pages/table/TableRowSelect";

// 404
import Page404 from "@/pages/404";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <PrimaryLayout />,
    children: [
      {
        path: "/workbench",
        element: <WorkBench />,
      },
      {
        path: "/form-basic",
        element: <FormBasic />,
      },
      {
        path: "/form-call",
        element: <FormCall />,
      },
      {
        path: "/form-layout",
        element: <FormLayout />,
      },
      {
        path: "/form-layout-mixin",
        element: <FormLayoutMixin />,
      },
      {
        path: "/form-required-mask",
        element: <FormRequiredMask />,
      },
      {
        path: "/table-basic",
        element: <TableBasic />,
      },
      {
        path: "/table-custom-select",
        element: <TableCustomSelect />,
      },
      {
        path: "/table-row-select",
        element: <TableRowSelect />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default router;
