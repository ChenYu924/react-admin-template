import { createBrowserRouter } from "react-router-dom";

import Login from "@/pages/login/Login";
// 通用布局
import PrimaryLayout from "@/layouts/PrimaryLayout";
// 引入通用布局的二级路由页面
import WorkBench from "@/pages/workBench/WorkBench";
import TableBasicUsage from "@/pages/table/TableBasicUsage";
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
        path: "/table-basic",
        element: <TableBasicUsage />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default router;
