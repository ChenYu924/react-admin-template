import { createBrowserRouter } from "react-router-dom";

import Login from "@/pages/login/Login";
import PrimaryLayout from "@/layouts/PrimaryLayout";
import WorkBench from "@/pages/workBench/WorkBench";

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
    ],
  },
]);

export default router;
