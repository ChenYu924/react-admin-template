import { useContext } from "react";
import { PrimaryLayoutContext } from "@/layouts/PrimaryLayout";

export default function usePrimaryLayoutContext() {
  return useContext(PrimaryLayoutContext);
}
