import { createBrowserRouter } from "react-router-dom";

import LoginPage from "@/pages/login/LoginPage";
// 通用布局
import PrimaryLayout from "@/layouts/PrimaryLayout";
import WorkflowLayout from "@/layouts/WorkflowLayout";
// 引入通用布局的二级路由页面
import WorkBench from "@/pages/workBench/WorkBench";
import FloatButtonPosition from "@/pages/button/FloatButtonPosition";
import WithSteps1 from "@/pages/commonTemplate/WithSteps1";
import GridBasic from "@/pages/grid/GridBasic";
import GridGutter from "@/pages/grid/GridGutter";
import GridOffset from "@/pages/grid/GridOffset";
import GridAlign from "@/pages/grid/GridAlign";
import AnchorShow from "@/pages/nav/anchor/AnchorShow";
import DropdownBasic from "@/pages/nav/dropdown/DropdownBasic";
import FormSplice from "@/pages/form/FormSplice";
import FormBasic from "@/pages/form/FormBasic";
import FormCall from "@/pages/form/FormCall";
import FormLayout from "@/pages/form/FormLayout";
import FormLayoutMixin from "@/pages/form/FormLayoutMixin";
import FormRequiredMask from "@/pages/form/FormRequiredMask";
import TableBasic from "@/pages/table/TableBasic";
import TableCustomSelect from "@/pages/table/TableCustomSelect";
import TableRowSelect from "@/pages/table/TableRowSelect";
import CarouselHorizontal from "@/pages/carousel/CarouselHorizontal";
import Workflow from "@/pages/workflow/Workflow";
import MineCenter from "@/pages/mine/MineCenter";
import MineMessage from "@/pages/mine/MineMessage";
import BadResult from "@/pages/result/BadResult";
// 引入工作流布局的二级路由页面
import WfBasic from "@/pages/workflow/WfBasic";

// 403
import Page403 from "@/pages/403";
// 404
import Page404 from "@/pages/404";
// 500
import Page500 from "@/pages/500";

const router = createBrowserRouter([
  // 登录页
  {
    path: "/login",
    element: <LoginPage />,
  },
  // 通用布局
  {
    path: "/",
    element: <PrimaryLayout />,
    children: [
      {
        path: "workbench",
        element: <WorkBench />,
      },
      {
        path: "float-button-position",
        element: <FloatButtonPosition />,
      },
      {
        path: "with-steps1",
        element: <WithSteps1 />,
      },
      {
        path: "grid-basic",
        element: <GridBasic />,
      },
      {
        path: "grid-gutter",
        element: <GridGutter />,
      },
      {
        path: "grid-offset",
        element: <GridOffset />,
      },
      {
        path: "grid-align",
        element: <GridAlign />,
      },
      {
        path: "anchor-show",
        element: <AnchorShow />,
      },
      {
        path: "dropdown-basic",
        element: <DropdownBasic />,
      },
      {
        path: "form-splice",
        element: <FormSplice />,
      },
      {
        path: "form-basic",
        element: <FormBasic />,
      },
      {
        path: "form-call",
        element: <FormCall />,
      },
      {
        path: "form-layout",
        element: <FormLayout />,
      },
      {
        path: "form-layout-mixin",
        element: <FormLayoutMixin />,
      },
      {
        path: "form-required-mask",
        element: <FormRequiredMask />,
      },
      {
        path: "table-basic",
        element: <TableBasic />,
      },
      {
        path: "table-custom-select",
        element: <TableCustomSelect />,
      },
      {
        path: "table-row-select",
        element: <TableRowSelect />,
      },
      {
        path: "carousel-horizontal",
        element: <CarouselHorizontal />,
      },
      {
        path: "workflow",
        element: <Workflow />,
      },
      {
        path: "bad-result",
        element: <BadResult />,
      },
      {
        path: "mine-center",
        element: <MineCenter />,
      },
      {
        path: "mine-message",
        element: <MineMessage />,
      },
    ],
  },
  // 工作流布局
  {
    path: "/wf",
    element: <WorkflowLayout />,
    children: [
      {
        path: "wf-basic",
        element: <WfBasic />,
      },
    ],
  },
  // 403和404
  {
    path: "/403",
    element: <Page403 />,
  },
  {
    path: "/404",
    element: <Page404 />,
  },
  {
    path: "/500",
    element: <Page500 />,
  },
]);

export default router;
