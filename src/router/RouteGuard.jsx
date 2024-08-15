import { useSelector } from "react-redux";
import useToken from "@/hooks/useToken";
import { isDevelopment } from "@/utils/check";
import MgrType from "@/const/MgrType";

// 路由守卫
function RouteGuard({ children }) {
  const token = useToken();
  const stateMgrType = useSelector((state) => state.user.mgrType);
  const currentPath = window.location.pathname;

  // 权限判断
  function hasPermission() {
    if (isDevelopment() && stateMgrType === MgrType.SUPER_ADMIN) {
      return true;
    }

    // 如：在全局菜单中但不在用户菜单中
    // if (inMenuAll && !inUserMenu) {
    //   return false;
    // }

    // 其余情况可自定义
    // ...

    return true;
  }

  // 根据token和权限进行页面跳转
  if (token) {
    if (!hasPermission()) {
      // 无权限则跳转到403页面
    }
  } else {
    // 未登录则跳转到登录页面
    if (currentPath !== "/login") {
      window.location.href = "/login";
      return null;
    }
  }

  return children;
}

export default RouteGuard;
