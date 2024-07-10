import { createBrowserRouter } from "react-router-dom";

import LoginPage from "@/pages/login/LoginPage";
// 通用布局
import PrimaryLayout from "@/layouts/PrimaryLayout";
// 引入通用布局的二级路由页面
import WorkBench from "@/pages/workBench/WorkBench";
import FloatButtonPosition from "@/pages/button/FloatButtonPosition";
import DividerShow from "@/pages/divider/DividerShow";
import GridBasic from "@/pages/grid/GridBasic";
import GridGutter from "@/pages/grid/GridGutter";
import GridOffset from "@/pages/grid/GridOffset";
import GridAlign from "@/pages/grid/GridAlign";
import AnchorShow from "@/pages/nav/anchor/AnchorShow";
import DropdownBasic from "@/pages/nav/dropdown/DropdownBasic";
import FormBasic from "@/pages/form/FormBasic";
import FormCall from "@/pages/form/FormCall";
import FormLayout from "@/pages/form/FormLayout";
import FormLayoutMixin from "@/pages/form/FormLayoutMixin";
import FormRequiredMask from "@/pages/form/FormRequiredMask";
import TableBasic from "@/pages/table/TableBasic";
import TableCustomSelect from "@/pages/table/TableCustomSelect";
import TableRowSelect from "@/pages/table/TableRowSelect";
import MineCenter from "@/pages/mine/MineCenter";
import MineMessage from "@/pages/mine/MineMessage";

// 404
import Page404 from "@/pages/404";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
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
        path: "/float-button-position",
        element: <FloatButtonPosition />,
      },
      {
        path: "/divider-show",
        element: <DividerShow />,
      },
      {
        path: "/grid-basic",
        element: <GridBasic />,
      },
      {
        path: "/grid-gutter",
        element: <GridGutter />,
      },
      {
        path: "/grid-offset",
        element: <GridOffset />,
      },
      {
        path: "/grid-align",
        element: <GridAlign />,
      },
      {
        path: "/anchor-show",
        element: <AnchorShow />,
      },
      {
        path: "/dropdown-basic",
        element: <DropdownBasic />,
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
      {
        path: "/mine-center",
        element: <MineCenter />,
      },
      {
        path: "/mine-message",
        element: <MineMessage />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default router;
