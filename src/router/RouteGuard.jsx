import useToken from "@/hooks/useToken";

// 路由守卫
function RouteGuard({ children }) {
  const token = useToken();
  if (!token && window.location.pathname !== "/login") {
    window.location.href = "/login";
    return null;
  } else {
    return children;
  }
}

export default RouteGuard;
