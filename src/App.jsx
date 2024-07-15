import { RouterProvider } from "react-router-dom";
import router from "@/router";
import RouteGuard from "@/router/RouteGuard";

function App() {
  return (
    <RouteGuard>
      <RouterProvider router={router} />
    </RouteGuard>
  );
}

export default App;
