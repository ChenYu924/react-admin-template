import { useSelector } from "react-redux";

function useToken() {
  return useSelector((state) => state.user.token);
}

export default useToken;
