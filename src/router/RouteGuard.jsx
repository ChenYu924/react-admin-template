import { useSelector } from "react-redux";
import useToken from "@/hooks/useToken";

// 路由守卫
function RouteGuard({ children }) {
  const token = useToken();
  const stateMenuListAll = useSelector((state) => state.user.menuListAll);
  const stateMenuList = useSelector((state) => state.user.menuList);
  const currentPath = window.location.pathname;

  // 权限判断
  function hasPermission() {
    const inMenuAll = stateMenuListAll.includes(currentPath);
    const inUserMenu = stateMenuList.includes(currentPath);

    // 在全局菜单中但不在用户菜单中
    if (inMenuAll && !inUserMenu) {
      return false;
    }

    // 其余情况可自定义
    // ...

    return true;
  }

  // 根据token和权限进行页面跳转
  if (token) {
    if (!hasPermission()) {
      window.location.href = "/403";
      return null;
    }
  } else {
    if (currentPath !== "/login") {
      window.location.href = "/login";
      return null;
    }
  }

  return children;
}

export default RouteGuard;
